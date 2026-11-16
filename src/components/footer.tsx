import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './icons';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="WebCom home">
              <Logo />
            </Link>
            <p>
              Thoughtful software.
              <br />
              Connected infrastructure.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>Explore</span>
              <Link href="/services">Services</Link>
              <Link href="/pricing">Pricing & packages</Link>
              <Link href="/projects">Selected work</Link>
              <Link href="/blog">Engineering journal</Link>
              <Link href="/industries">Industry solutions</Link>
              <Link href="/how-we-work">How we work</Link>
            </div>
            <div>
              <span>Studio</span>
              <Link href="/about">About WebCom</Link>
              <Link href="/contact">
                Start a conversation <ArrowUpRight size={13} />
              </Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/engagements">Engagement models</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/admin">Studio admin</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WebCom Engineering Studio</span>
          <span>Software development & network infrastructure</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
