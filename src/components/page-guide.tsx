import { pageGuides } from '@/lib/page-guides';
import { domainGuides } from '@/lib/domain-guides';
export function PageGuide({ name }: { name: string }) {
  const guide = pageGuides[name] || domainGuides[name];
  if (!guide) return null;
  const prefix = `guide-${name}`;
  return (
    <section className="container page-guide" aria-labelledby={`${prefix}-title`}>
      <header className="guide-heading">
        <h2 id={`${prefix}-title`}>{guide.title}</h2>
        <p>{guide.intro}</p>
      </header>
      <div className="guide-layout">
        <nav className="guide-index" aria-label="Guide chapters">
          <span>In this guide</span>
          {guide.sections.map((section, index) => (
            <a key={section.title} href={`#${prefix}-${index}`}>
              {section.title}
            </a>
          ))}
          {guide.table && <a href={`#${prefix}-reference`}>{guide.table.title}</a>}
        </nav>
        <div className="guide-body">
          {guide.sections.map((section, index) => (
            <section id={`${prefix}-${index}`} key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {guide.table && (
            <section id={`${prefix}-reference`}>
              <h3>{guide.table.title}</h3>
              <div
                className="guide-table-wrap"
                role="region"
                aria-label={guide.table.title}
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      {guide.table.columns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, index) =>
                          index === 0 ? (
                            <th scope="row" key={index}>
                              {cell}
                            </th>
                          ) : (
                            <td key={index}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
