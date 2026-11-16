const guidance: Record<string, { title: string; steps: [string, string][] }> = {
  overview: {
    title: 'A practical rhythm for studio administration',
    steps: [
      [
        'Review new conversations',
        'Start with inquiries awaiting review. Check the project context, identify the relevant service, and decide which questions are needed before a discovery conversation. The dashboard counts reflect database records; a status change is an internal tracking action, not an automatic reply to the prospect.',
      ],
      [
        'Separate publishing from client work',
        'Use the blog studio to turn engineering knowledge into public material. Do not copy inquiry messages or customer details into an article. Drafts remain private until published, and a published post should distinguish an illustrative design from a measured project result.',
      ],
      [
        'Maintain account ownership',
        'Administrator access is based on explicit Supabase membership. Use your own account and sign out on shared devices. Ask the project owner to revoke membership when access is no longer needed. The Java API token is an application credential, not an administrator password.',
      ],
    ],
  },
  inquiries: {
    title: 'Use the inbox as a follow-up workflow',
    steps: [
      [
        'Read the complete context',
        'Review the original brief, company, contact address, focus, budget context, and submission date. A budget range helps plan a conversation; it is not an accepted quotation. Keep the original submission intact when discussing clarifications with the prospect.',
      ],
      [
        'Apply a status deliberately',
        'New means awaiting review; contacted means follow-up has taken place; qualified means enough fit has been established for a scoped next step; closed means the conversation is no longer active. These labels organize the inbox. They do not send emails or establish commercial commitments.',
      ],
      [
        'Keep sensitive details contained',
        'The email link opens your email application. Do not put credentials or private operational records into copied follow-up material. If the project needs confidential information, agree the purpose and a suitable channel before requesting it.',
      ],
    ],
  },
  blog: {
    title: 'An editorial workflow worth repeating',
    steps: [
      [
        'Start with a reader’s question',
        'Choose a problem the reader needs to understand, then describe the context, assumptions, approach, and tradeoffs. An article should do more than list frameworks or call a solution scalable without explaining the relevant workload and conditions.',
      ],
      [
        'Review the evidence',
        'Separate observations, recommendations, and measured results. Use client information only with appropriate permission. The original three guides remain in the repository; managed posts here use a separate Markdown workflow in Supabase.',
      ],
      [
        'Publish and verify',
        'Preview the article and check its summary, category, and public page. Changing a published slug changes the URL without creating an automatic redirect. Unpublishing removes the managed post from public reads while preserving its draft.',
      ],
    ],
  },
  editor: {
    title: 'Review the article before making it public',
    steps: [
      [
        'Give the article a complete argument',
        'Explain the problem, constraints, approach, failure conditions, and evaluation method. Use concrete examples to clarify the reasoning. A technical term is useful when it explains a decision, not when it merely makes prose sound advanced.',
      ],
      [
        'Check publication details',
        'The title identifies the article, the summary explains why it matters, and the slug becomes its address. Choose a stable slug and appropriate category. Save before navigating within the workspace; unsaved work is not automatically backed up as a revision.',
      ],
      [
        'Understand the controls',
        'Save draft keeps a managed post private. Publish exposes its article page and journal entry. Unpublish returns it to draft. Delete removes it after confirmation. Raw HTML, executable MDX, and images are disabled; use Markdown headings, lists, links, quotes, and fenced code.',
      ],
    ],
  },
};
export function AdminTaskHelp({ context }: { context: string }) {
  const help = guidance[context];
  if (!help) return null;
  return (
    <section className="admin-task-help">
      <h2>{help.title}</h2>
      <div>
        {help.steps.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
