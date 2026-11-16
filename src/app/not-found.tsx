import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="container empty-state not-found">
      <span className="section-kicker">404 / Page not found</span>
      <h1>This path doesn’t connect.</h1>
      <p>The page may have moved. Explore our work or head back to the studio.</p>
      <Link className="button" href="/">
        Back to WebCom
      </Link>
    </section>
  );
}
