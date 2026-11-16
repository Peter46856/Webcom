// Local test fixture only. Never use these accounts/tokens in a deployed environment.
import http from 'node:http';
const ADMIN = '11111111-1111-4111-8111-111111111111';
const USER = '22222222-2222-4222-8222-222222222222';
const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const TOKEN = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: ADMIN, aud: 'authenticated', role: 'authenticated', exp: Math.floor(Date.now() / 1000) + 3600 })}.fixture-signature`;
let posts = [];
let projects = [];
let pricing = [];
const settings = { id: 'main', inquiry_email: 'owner@example.test' };
const inquiries = [
  {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'Test Buyer',
    company: 'Fixture Logistics',
    email: 'buyer@example.test',
    scope: 'Software engineering',
    budget: 'Under $5,000',
    message: 'We need an operations platform with dispatch and reporting for our team.',
    status: 'new',
    created_at: '2026-10-31T10:00:00Z',
  },
];
http
  .createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    res.setHeader('Content-Type', 'application/json');
    const reply = (value, status = 200) => {
      res.statusCode = status;
      res.end(JSON.stringify(value));
    };
    if (url.pathname === '/health') return reply({ ok: true });
    const admin = req.headers.authorization === `Bearer ${TOKEN}`;
    const single = String(req.headers.accept).includes('vnd.pgrst.object');
    if (url.pathname === '/auth/v1/token') {
      let body = '';
      for await (const chunk of req) body += chunk;
      const data = JSON.parse(body);
      if (data.email !== 'admin@example.test' || data.password !== 'Fixture-password-2026')
        return reply(
          { error: 'invalid_grant', error_description: 'Invalid login credentials' },
          400,
        );
      return reply({
        access_token: TOKEN,
        refresh_token: 'test-unused-refresh',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        user: {
          id: ADMIN,
          email: 'admin@example.test',
          aud: 'authenticated',
          role: 'authenticated',
          app_metadata: {},
          user_metadata: {},
          created_at: '2026-10-31T10:00:00Z',
        },
      });
    }
    if (url.pathname === '/auth/v1/user')
      return reply({
        id: admin ? ADMIN : USER,
        email: admin ? 'admin@example.test' : 'ordinary@example.test',
        aud: 'authenticated',
        role: 'authenticated',
        app_metadata: {},
        user_metadata: {},
      });
    if (url.pathname === '/rest/v1/admin_members') return reply(admin ? [{ user_id: ADMIN }] : []);
    if (url.pathname === '/rest/v1/studio_settings') {
      if (!admin) return reply({ code: '42501' }, 403);
      if (req.method === 'PATCH') {
        let text = '';
        for await (const chunk of req) text += chunk;
        Object.assign(settings, JSON.parse(text));
      }
      return reply(single ? settings : [settings]);
    }
    if (url.pathname === '/rest/v1/pricing_packages') {
      const slug = url.searchParams.get('slug');
      const existing = pricing.find((p) => `eq.${p.slug}` === slug);
      if (req.method === 'POST' || req.method === 'PATCH') {
        if (!admin) return reply({ code: '42501' }, 403);
        let text = '';
        for await (const chunk of req) text += chunk;
        const data = JSON.parse(text);
        if (req.method === 'POST' && pricing.some((p) => p.slug === data.slug))
          return reply({ code: '23505' }, 409);
        if (req.method === 'PATCH' && !existing) return reply(single ? null : []);
        const row = existing || {};
        Object.assign(row, data);
        if (!existing) pricing.push(row);
        return reply(single ? row : [row], req.method === 'POST' ? 201 : 200);
      }
      if (req.method === 'DELETE') {
        if (!admin) return reply({ code: '42501' }, 403);
        pricing = pricing.filter((p) => p !== existing);
        return reply(single ? existing : existing ? [existing] : []);
      }
      return reply(
        pricing.filter(
          (p) =>
            (admin || p.published) &&
            (!url.searchParams.get('published') ||
              `eq.${p.published}` === url.searchParams.get('published')),
        ),
      );
    }
    if (url.pathname === '/rest/v1/inquiries') {
      if (!admin) return reply({ code: '42501' }, 403);
      if (req.method === 'PATCH') {
        let text = '';
        for await (const chunk of req) text += chunk;
        const data = JSON.parse(text);
        const row = inquiries.find((i) => `eq.${i.id}` === url.searchParams.get('id'));
        if (row) row.status = data.status;
        return reply(single ? row : row ? [row] : []);
      }
      let found = inquiries.filter(
        (i) =>
          !url.searchParams.get('status') || `eq.${i.status}` === url.searchParams.get('status'),
      );
      res.setHeader('Content-Range', `0-${Math.max(0, found.length - 1)}/${found.length}`);
      if (req.method === 'HEAD') return res.end();
      const offset = Number(url.searchParams.get('offset') || 0),
        limit = Number(url.searchParams.get('limit') || 25);
      found = found.slice(offset, offset + limit);
      return reply(found);
    }
    if (url.pathname === '/rest/v1/portfolio_projects') {
      if (req.method === 'POST') {
        if (!admin) return reply({ code: '42501' }, 403);
        let text = '';
        for await (const chunk of req) text += chunk;
        const row = JSON.parse(text);
        if (projects.some((p) => p.slug === row.slug)) return reply({ code: '23505' }, 409);
        projects.push(row);
        return reply(null, 201);
      }
      if (req.method === 'DELETE') {
        if (!admin) return reply({ code: '42501' }, 403);
        projects = projects.filter((p) => `eq.${p.slug}` !== url.searchParams.get('slug'));
        return reply(null);
      }
      return reply(projects.map((p) => ({ data: p.data })));
    }
    if (url.pathname === '/rest/v1/blog_posts') {
      if (req.method === 'POST' || req.method === 'PATCH') {
        if (!admin) return reply({ code: '42501' }, 403);
        let text = '';
        for await (const chunk of req) text += chunk;
        const data = JSON.parse(text);
        const existing = posts.find((p) => `eq.${p.id}` === url.searchParams.get('id'));
        if (posts.some((p) => p.slug === data.slug && p.id !== existing?.id))
          return reply({ code: '23505' }, 409);
        const now = new Date().toISOString();
        const post = existing || { id: crypto.randomUUID(), created_at: now };
        Object.assign(post, data, {
          updated_at: now,
          published_at: data.status === 'published' ? now : null,
        });
        if (!existing) posts.unshift(post);
        return reply(single ? post : [post], req.method === 'POST' ? 201 : 200);
      }
      if (req.method === 'DELETE') {
        if (!admin) return reply({ code: '42501' }, 403);
        const row = posts.find((p) => `eq.${p.id}` === url.searchParams.get('id'));
        posts = posts.filter((p) => p !== row);
        return reply(single ? row : row ? [row] : []);
      }
      const found = posts.filter(
        (p) =>
          (admin || p.status === 'published') &&
          (!url.searchParams.get('status') ||
            `eq.${p.status}` === url.searchParams.get('status')) &&
          (!url.searchParams.get('id') || `eq.${p.id}` === url.searchParams.get('id')),
      );
      res.setHeader('Content-Range', `0-${Math.max(0, found.length - 1)}/${found.length}`);
      if (req.method === 'HEAD') return res.end();
      return reply(single ? found[0] || null : found);
    }
    reply({ error: 'Not found' }, 404);
  })
  .listen(54329, '127.0.0.1', () => console.log('Mock Supabase fixture at 127.0.0.1:54329'));
