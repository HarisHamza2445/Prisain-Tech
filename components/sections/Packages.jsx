"use client";

import { useEffect, useRef, useState } from "react";
import { useCopy, useToast } from "@/components/Toast";
import { CATEGORIES, PACKAGES } from "@/lib/packages";
import { SITE, waUrl } from "@/lib/site";

const labelOf = (key) => CATEGORIES.find((c) => c.key === key).label;
const priceLine = (p) => `${p.inr} / ${p.usd}`;

function bookingMessage(pkg, name, business) {
  const lines = [
    "Hi PrisainTech! I'd like to book a package.",
    "",
    "Package: " + pkg.name,
    "Category: " + labelOf(pkg.category),
    "Price: " + priceLine(pkg) + (pkg.recurring ? ` (${pkg.recurring})` : ""),
  ];
  if (name.trim()) lines.push("Name: " + name.trim());
  if (business.trim()) lines.push("Business: " + business.trim());
  lines.push("", "I've filled in the client intake form.");
  return lines.join("\n");
}

export function Packages() {
  const [category, setCategory] = useState("primary");
  const [currency, setCurrency] = useState("inr");
  const [selected, setSelected] = useState(null);
  const tabs = useRef({});
  const trigger = useRef(null);

  // remember the visitor's currency
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pt-cur");
      if (saved === "usd" || saved === "inr") setCurrency(saved);
    } catch {}
  }, []);
  const pickCurrency = (value) => {
    setCurrency(value);
    try {
      localStorage.setItem("pt-cur", value);
    } catch {}
  };

  const onTabKey = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      CATEGORIES[(index + (e.key === "ArrowRight" ? 1 : -1) + CATEGORIES.length) % CATEGORIES.length];
    setCategory(next.key);
    tabs.current[next.key].focus();
  };

  // on a phone the tabs scroll sideways; keep the chosen one in view
  useEffect(() => {
    const tab = tabs.current[category];
    const strip = tab?.parentElement;
    if (strip) strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2 });
  }, [category]);

  const list = PACKAGES.filter((p) => p.category === category);
  const code = category[0].toUpperCase();

  return (
    <>
      <section className="sec wrap" id="booking" data-bg="#080D1C" aria-labelledby="bk-h">
        <div className="sec-head">
          <span className="label">
            <b>04</b> — Booking portal
          </span>
          <h2 className="display d-l" id="bk-h" data-reveal>
            <span className="ln">
              <span>Pick your package.</span>
            </span>
            <span className="ln">
              <span>
                We&apos;ll build the <em>engine.</em>
              </span>
            </span>
          </h2>
        </div>
        <div className="pk-intro">
          <p>
            Choose a package and press Book now. You&apos;ll fill in a short client intake form, then send
            your booking to our team on WhatsApp with the package details already written for you.
          </p>
        </div>
        <div className="portal-bar">
          <div className="tabs" role="tablist" aria-label="Package categories">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.key}
                className="tab"
                role="tab"
                id={`tab-${c.key}`}
                aria-controls="pkGrid"
                aria-selected={category === c.key}
                tabIndex={category === c.key ? 0 : -1}
                ref={(el) => {
                  tabs.current[c.key] = el;
                }}
                onClick={() => setCategory(c.key)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {c.tab}
                <sup>{PACKAGES.filter((p) => p.category === c.key).length}</sup>
              </button>
            ))}
          </div>
          <div className="cur" role="group" aria-label="Currency">
            <button type="button" aria-pressed={currency === "inr"} onClick={() => pickCurrency("inr")}>
              ₹ INR
            </button>
            <button type="button" aria-pressed={currency === "usd"} onClick={() => pickCurrency("usd")}>
              $ USD
            </button>
          </div>
        </div>
        <div className="pk-grid" id="pkGrid" role="tabpanel" aria-labelledby={`tab-${category}`}>
          {list.map((pkg, k) => (
            <article key={pkg.name} className={pkg.popular ? "pk feat" : "pk"} style={{ "--k": k }}>
              <div className="pk-top">
                <span className="label">
                  {code}—{String(k + 1).padStart(2, "0")}
                </span>
                {pkg.popular ? (
                  <span className="badge">Most popular</span>
                ) : pkg.recurring ? (
                  <span className="badge soft">Retainer</span>
                ) : null}
              </div>
              <h3>{pkg.name}</h3>
              <div className="price">
                <span className="main">{currency === "inr" ? pkg.inr : pkg.usd}</span>
                <span className="alt">{currency === "inr" ? `${pkg.usd} USD` : `${pkg.inr} INR`}</span>
                {pkg.recurring && <span className="rec">{pkg.recurring}</span>}
              </div>
              <ul>
                {pkg.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {pkg.idealFor && (
                <p className="ideal">
                  <b>Ideal for</b>
                  {pkg.idealFor}
                </p>
              )}
              <button
                className={pkg.popular ? "btn btn-primary" : "btn btn-ghost"}
                type="button"
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setSelected(pkg);
                }}
              >
                Book now <span className="arr">→</span>
              </button>
            </article>
          ))}
        </div>
        <div className="portal-note">
          <span>Prices shown in INR and USD</span>
          <span>Monthly retainers are billed separately where listed</span>
          <span>Questions first? Message us on WhatsApp</span>
        </div>
      </section>

      <BookingDialog
        pkg={selected}
        onClose={() => {
          setSelected(null);
          trigger.current?.focus();
        }}
      />
    </>
  );
}

function BookingDialog({ pkg, onClose }) {
  const dialog = useRef(null);
  const nameInput = useRef(null);
  const [formDone, setFormDone] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const say = useToast();
  const copy = useCopy();

  // each booking starts at step one
  useEffect(() => {
    const el = dialog.current;
    if (pkg) {
      setFormDone(false);
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [pkg]);

  const message = pkg ? bookingMessage(pkg, name, business) : "";

  return (
    <dialog
      className="bk"
      ref={dialog}
      aria-labelledby="bkTitle"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      {pkg && (
        <div className="bk-in">
          <div className="bk-head">
            <div>
              <span className="label">{labelOf(pkg.category)}</span>
              <h2 id="bkTitle">{pkg.name}</h2>
              <div className="p">
                {priceLine(pkg)}
                {pkg.recurring ? `  ${pkg.recurring}` : ""}
              </div>
            </div>
            <button
              className="x-btn"
              type="button"
              aria-label="Close booking"
              onClick={() => dialog.current.close()}
            >
              ✕
            </button>
          </div>
          <div className={formDone ? "bk-step done" : "bk-step"}>
            <span className="num">1</span>
            <div>
              <h3>Fill in the client intake form</h3>
              <p>Tell us about your business, goals and timeline. The form opens in a new tab.</p>
              <a
                className="btn btn-primary btn-sm"
                href={SITE.intakeFormUrl}
                target="_blank"
                rel="noopener"
                onClick={() => setTimeout(() => setFormDone(true), 400)}
              >
                Open intake form <span className="arr">↗</span>
              </a>
            </div>
          </div>
          <div className={formDone ? "bk-step" : "bk-step locked"}>
            <span className="num">2</span>
            <div>
              <h3>Send your booking on WhatsApp</h3>
              <p>
                Once you&apos;ve submitted the form, send your booking. WhatsApp opens with your package
                details filled in; press send there to notify our team.
              </p>
              <div className="bk-fields need-lock" inert={!formDone}>
                <label htmlFor="bkName">
                  Your name
                  <input
                    id="bkName"
                    ref={nameInput}
                    autoComplete="name"
                    placeholder="Optional"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label htmlFor="bkBiz">
                  Business
                  <input
                    id="bkBiz"
                    autoComplete="organization"
                    placeholder="Optional"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                </label>
              </div>
              <a
                className="btn btn-wa btn-sm need-lock"
                inert={!formDone}
                href={waUrl(message)}
                target="_blank"
                rel="noopener"
                onClick={() => say("Opening WhatsApp — press send there to notify us")}
              >
                <svg aria-hidden="true">
                  <use href="#i-chat" />
                </svg>{" "}
                Send booking on WhatsApp <span className="arr">↗</span>
              </a>
              <p style={{ margin: "12px 0 0" }}>
                <button
                  type="button"
                  className="linkish"
                  onClick={() => {
                    setFormDone(true);
                    requestAnimationFrame(() => nameInput.current?.focus());
                  }}
                >
                  I&apos;ve already filled in the form
                </button>
              </p>
            </div>
          </div>
          <div className="bk-foot">
            <span>
              Prefer email? Write to <b style={{ color: "var(--ivory)", userSelect: "all" }}>{SITE.email}</b>
            </span>
            <button type="button" className="copy" onClick={() => copy(message)}>
              Copy booking details
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
