"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, WA_GENERAL } from "@/lib/site";

export function Nav() {
  const home = usePathname() === "/";
  // section links scroll on the home page and lead back to it from other pages
  const hrefOf = (link) => link.href || (home ? `#${link.id}` : `/#${link.id}`);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(home ? null : "careers");
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef(null);
  const indicator = useRef(null);
  const links = useRef({});
  const menuButton = useRef(null);
  const closeButton = useRef(null);

  // solid bar and reading-progress line once the page has moved
  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 40);
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // which section is in the middle of the screen
  useEffect(() => {
    if (!home) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach(({ id, href }) => {
      if (href) return;
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  // the highlight slides under the hovered link, else the current one
  useLayoutEffect(() => {
    const place = () => {
      const el = links.current[hovered ?? current];
      const pill = indicator.current;
      if (!el) {
        pill.style.opacity = 0;
        return;
      }
      pill.style.width = el.offsetWidth + "px";
      pill.style.transform = `translateX(${el.offsetLeft}px)`;
      pill.style.opacity = 1;
    };
    place();
    addEventListener("resize", place);
    return () => removeEventListener("resize", place);
  }, [hovered, current]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    closeButton.current.focus();
    const onKey = (e) => e.key === "Escape" && closeMenu(true);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = (refocus) => {
    setMenuOpen(false);
    if (refocus) menuButton.current.focus();
  };

  return (
    <>
      <header className={scrolled ? "nav scrolled" : "nav"} id="nav">
        <a className="brand" href={home ? "#top" : "/"} aria-label="PrisainTech, back to top">
          <svg aria-hidden="true">
            <use href="#ps-mark" />
          </svg>
          <span className="wordmark">
            PRISAIN<span>TECH</span>
          </span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links" onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={hrefOf(link)}
                  ref={(el) => {
                    links.current[link.id] = el;
                  }}
                  aria-current={current === link.id ? "true" : "false"}
                  onMouseEnter={() => setHovered(link.id)}
                  onFocus={() => setHovered(link.id)}
                  onBlur={() => setHovered(null)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-ind" ref={indicator} aria-hidden="true" />
          </ul>
        </nav>
        <div className="nav-right">
          <a className="btn btn-primary btn-sm" href={home ? "#booking" : "/#booking"}>
            Book now <span className="arr">→</span>
          </a>
          <button
            className="menu-btn"
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen(true)}
          >
            MENU
          </button>
        </div>
        <span className="nav-progress" ref={progress} aria-hidden="true" />
      </header>

      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobileMenu" aria-hidden={!menuOpen}>
        <button className="menu-btn close" ref={closeButton} type="button" onClick={() => closeMenu(true)}>
          CLOSE
        </button>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a className="big" href={hrefOf(link)} onClick={() => closeMenu(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="row">
          <a
            className="btn btn-primary"
            href={home ? "#booking" : "/#booking"}
            onClick={() => closeMenu(false)}
          >
            Book now <span className="arr">→</span>
          </a>
          <a
            className="btn btn-wa"
            href={WA_GENERAL}
            target="_blank"
            rel="noopener"
            onClick={() => closeMenu(false)}
          >
            <svg aria-hidden="true">
              <use href="#i-chat" />
            </svg>{" "}
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
