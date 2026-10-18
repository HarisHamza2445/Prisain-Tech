"use client";

import { useEffect, useState } from "react";
import { waUrl } from "@/lib/site";

const ROLES = [
  {
    key: "marketing",
    title: "Marketing",
    text: "Social media, ads and campaigns for our clients.",
  },
  {
    key: "ai",
    title: "AI automation",
    text: "Voice agents, WhatsApp bots and AI workflows.",
  },
];

const STORAGE_KEY = "pt-hiring-closed";
const HIDE_FOR_DAYS = 7;

const applyLink = (role) =>
  waUrl(`Hi PrisainTech! I saw you're hiring. I'd like to apply for the ${role} role.`);

// A small corner card, shown once the visitor has had a moment with the page.
// Closing it keeps it away for a week on this device.
export function HiringPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const closedAt = Number(localStorage.getItem(STORAGE_KEY));
      if (closedAt && Date.now() - closedAt < HIDE_FOR_DAYS * 864e5) return;
    } catch {}
    const show = () => setOpen(true);
    const timer = setTimeout(show, 6000);
    const onScroll = () => scrollY > innerHeight * 0.8 && show();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  };

  if (!open) return null;

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
              <p>{role.text}</p>
            </div>
            <a className="btn btn-wa btn-sm" href={applyLink(role.title)} target="_blank" rel="noopener">
              <svg aria-hidden="true">
                <use href="#i-chat" />
              </svg>
              Apply <span className="arr">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="hiring-note">Opens WhatsApp with your message ready. Press send there.</p>
    </aside>
  );
}
