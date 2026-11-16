export function headingId(text: string) {
  return (
    'article-' +
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  );
}
export function articleHeadings(source: string) {
  let fenced = false;
  const result: string[] = [];
  for (const line of source.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      continue;
    }
    const match = !fenced && line.match(/^##\s+(.+)$/);
    if (match) result.push(match[1]);
  }
  return result;
}
