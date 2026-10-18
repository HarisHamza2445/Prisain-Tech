import { WA_GENERAL } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="lockup">
            <svg viewBox="0 0 48 48" aria-hidden="true" style={{ color: "var(--ivory)" }}>
              <use href="#ps-mark" />
            </svg>
            <span className="wordmark">
              PRISAIN<span>TECH</span>
            </span>
          </div>
          <p className="serif" style={{ margin: "0" }}>
            Websites that sell.
            <br />
            AI that works 24/7.
          </p>
        </div>
        <div className="foot-col">
          <span className="label">Explore</span>
          <ul>
            <li>
              <a href="/#services">Services</a>
            </li>
            <li>
              <a href="/#booking">Packages</a>
            </li>
            <li>
              <a href="/#process">7-day delivery</a>
            </li>
            <li>
              <a href="/#work">Concept work</a>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <span className="label">Studio</span>
          <ul>
            <li>
              <a href="/#about">Our story</a>
            </li>
            <li>
              <a href="/#mission">Mission</a>
            </li>
            <li>
              <a href="/#protocol">Protocol & values</a>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="foot-col c3">
          <span className="label">Contact</span>
          <ul>
            <li>
              <a href={WA_GENERAL} className="" target="_blank" rel="noopener">
                WhatsApp · +91 89757 66680
              </a>
            </li>
            <li>
              <a href="mailto:prisaintech@prisaintech.com">prisaintech@prisaintech.com</a>
            </li>
          </ul>
        </div>
        <div className="foot-giant" aria-hidden="true">
          PRISAINTECH
        </div>
        <div className="foot-base">
          <span className="label">© 2026 PrisainTech. All rights reserved.</span>
          <a className="label" href="/#top" style={{ textDecoration: "none" }}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
