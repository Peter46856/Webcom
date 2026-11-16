import ReactMarkdown from 'react-markdown';
export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      skipHtml
      disallowedElements={['img']}
      components={{
        h1: ({ children }) => <h2>{children}</h2>,
        a: ({ href, children }) => (
          <a href={href} rel="noreferrer noopener">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
