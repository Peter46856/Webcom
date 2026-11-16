// Exercise actual server modules with isolated fetch/env substitutes. No real emails or credentials.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { webcrypto } from 'node:crypto';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function moduleAt(file, { fetch, env = {}, mocks = {} } = {}) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(
    js,
    {
      exports,
      require: (name) =>
        name in mocks ? mocks[name] : name === 'server-only' ? {} : require(name),
      process: { env },
      fetch,
      URL,
      AbortSignal,
      Buffer,
      crypto: webcrypto,
      console: { info() {}, error() {} },
    },
    { filename: file },
  );
  return exports;
}
const inquiry = {
  name: 'Example Buyer',
  email: 'buyer@example.test',
  company: 'Example Company',
  scope: 'Software engineering',
  budget: 'Under $5,000',
  message: 'We need a new warehouse operations platform and reporting dashboard.',
  consent: true,
  website: '',
};
const configured = {
  RESEND_API_KEY: 'fixture-private-key',
  INQUIRY_EMAIL_FROM: 'WebCom <notify@example.test>',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
};
test('email goes only to configured owner, uses reply-to and text, and retries with same key', async () => {
  const calls = [];
  const { sendInquiryEmail } = moduleAt('src/lib/inquiry-email.ts', {
    env: configured,
    fetch: async (url, init) => {
      calls.push({ url, ...init });
      return new Response('{}', { status: calls.length === 1 ? 503 : 200 });
    },
  });
  assert.equal(
    (await sendInquiryEmail(inquiry, 'fixture-id', 'owner@example.test')).status,
    'accepted',
  );
  assert.equal(calls.length, 2);
  assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key']);
  const body = JSON.parse(calls[0].body);
  assert.deepEqual(body.to, ['owner@example.test']);
  assert.equal(body.reply_to, inquiry.email);
  assert.equal(body.html, undefined);
  assert.match(body.text, /warehouse operations/);
});
test('missing configuration never calls provider; permanent rejection is not retried', async () => {
  let count = 0;
  const fetch = async () => {
    count++;
    return new Response('{}', { status: 403 });
  };
  assert.equal(
    (
      await moduleAt('src/lib/inquiry-email.ts', { fetch }).sendInquiryEmail(
        inquiry,
        'id',
        'owner@example.test',
      )
    ).status,
    'not_configured',
  );
  assert.equal(count, 0);
  assert.equal(
    (
      await moduleAt('src/lib/inquiry-email.ts', { fetch, env: configured }).sendInquiryEmail(
        inquiry,
        'id',
        'owner@example.test',
      )
    ).status,
    'failed',
  );
  assert.equal(count, 1);
});
test('changing notification recipient changes deduplication key', async () => {
  const keys = [];
  const { sendInquiryEmail } = moduleAt('src/lib/inquiry-email.ts', {
    env: configured,
    fetch: async (_, init) => {
      keys.push(init.headers['Idempotency-Key']);
      return new Response('{}');
    },
  });
  await sendInquiryEmail(inquiry, 'id', 'first@example.test');
  await sendInquiryEmail(inquiry, 'id', 'second@example.test');
  assert.notEqual(keys[0], keys[1]);
});
function inquiryRoute(javaStatus, mailStatus) {
  let sent = 0;
  const { inquirySchema } = moduleAt('src/lib/inquiry.ts');
  const route = moduleAt('src/app/api/inquiries/route.ts', {
    env: {
      JAVA_API_URL: 'http://java.test',
      JAVA_API_TOKEN: 'fixture-token-with-at-least-32-characters',
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    },
    fetch: async () =>
      new Response(
        JSON.stringify({
          id: '11111111-1111-4111-8111-111111111111',
          notificationEmail: 'private@example.test',
        }),
        { status: javaStatus },
      ),
    mocks: {
      '@/lib/inquiry': { inquirySchema },
      '@/lib/inquiry-email': {
        sendInquiryEmail: async () => {
          sent++;
          return { status: mailStatus };
        },
      },
    },
  });
  return { route, sent: () => sent };
}
function request() {
  return new Request('http://localhost:3000/api/inquiries', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000', 'content-type': 'application/json' },
    body: JSON.stringify(inquiry),
  });
}
test('failed persistence never sends email', async () => {
  const x = inquiryRoute(503, 'accepted');
  assert.equal((await x.route.POST(request())).status, 503);
  assert.equal(x.sent(), 0);
});
test('failed email cannot turn a saved inquiry into a failure or expose recipient', async () => {
  const x = inquiryRoute(201, 'failed');
  const result = await x.route.POST(request());
  assert.equal(result.status, 201);
  assert.equal(x.sent(), 1);
  assert.doesNotMatch(await result.text(), /private@example|notificationEmail/);
});
test('mail network outage has bounded attempts', async () => {
  let calls = 0;
  const { sendInquiryEmail } = moduleAt('src/lib/inquiry-email.ts', {
    env: configured,
    fetch: async () => {
      calls++;
      throw new Error('offline');
    },
  });
  assert.equal((await sendInquiryEmail(inquiry, 'id', 'owner@example.test')).status, 'failed');
  assert.equal(calls, 2);
});
