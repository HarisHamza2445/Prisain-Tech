"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROLES, applyUrl } from "@/lib/careers";

const STORAGE_KEY = "pt-hiring-seen";

// A small corner card, shown once the visitor has had a moment with the page.
// Each device sees it only once; after that the roles live on /careers and in the footer.
export function HiringPopup() {
  const [open, setOpen] = useState(false);
  const onCareers = usePathname() === "/careers";

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    // whichever comes first opens it, then both triggers are removed so it can't reopen
    const stop = () => {
      clearTimeout(timer);
      removeEventListener("scroll", onScroll);
    };
    const show = () => {
      stop();
      setOpen(true);
    };
    const timer = setTimeout(show, 3000);
    const onScroll = () => scrollY > innerHeight * 0.8 && show();
    addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, []);

  // remember it as seen the moment it appears
  useEffect(() => {
    if (!open || onCareers) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  }, [open, onCareers]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  if (!open || onCareers) return null;

  return (
    <aside className="hiring" role="dialog" aria-labelledby="hiringTitle">
      <div className="hiring-head">
        <span className="label">
          <span className="live" />
          We&apos;re hiring
        </span>
        <button className="x-btn" type="button" aria-label="Close" onClick={close}>
          ✕
        </button>
      </div>
      <h2 id="hiringTitle">
        Build with <em>PrisainTech.</em>
      </h2>
      <ul className="hiring-roles">
        {ROLES.map((role) => (
          <li key={role.key}>
            <div>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
            </div>
            <a className="btn btn-wa btn-sm" href={applyUrl(role.title)} target="_blank" rel="noopener">
              <svg aria-hidden="true">
                <use href="#i-chat" />
              </svg>
              Apply <span className="arr">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="hiring-note">
        Opens WhatsApp with your message ready. <a href="/careers">See role details</a>
      </p>
    </aside>
  );
}
