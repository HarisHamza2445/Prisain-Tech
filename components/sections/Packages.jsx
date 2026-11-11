"use client";

import { useEffect, useRef, useState } from "react";
import { AgreementStep } from "@/components/AgreementStep";
import { useOrder } from "@/components/Order";
import { useCopy, useToast } from "@/components/Toast";
import { orderSummary } from "@/lib/contract";
import {
  ADDONS,
  BUNDLES,
  BUNDLE_GROUPS,
  RETAINERS,
  RETAINER_NOTE,
  SERVICES,
  TIERS,
  addonLine,
  addonsFor,
  inr,
  kindLabel,
  totalLine,
} from "@/lib/proposal";
import { SITE, waUrl } from "@/lib/site";

const VIEWS = [
  { key: "tiers", tab: "Strategic tiers", count: TIERS.length },
  { key: "bundles", tab: "Bundle matrix", count: BUNDLES.length },
  { key: "services", tab: "Individual services", count: SERVICES.length },
];

function bookingMessage(quote, name, business) {
  const lines = [
    "Hi PrisainTech! I'd like to book.",
    "",
    `${kindLabel(quote.base)}: ${quote.base.label} (${inr(quote.base.price)})`,
  ];
  if (quote.addons.length) lines.push("Add-ons:", ...quote.addons.map((a) => "- " + addonLine(a)));
  if (quote.retainer) lines.push(`Retainer: ${quote.retainer.name} (${inr(quote.retainer.price)} / month)`);
  lines.push("Estimated total: " + totalLine(quote));
  if (name.trim()) lines.push("Name: " + name.trim());
  if (business.trim()) lines.push("Business: " + business.trim());
  lines.push("", "I've filled in the client intake form.");
  return lines.join("\n");
}

function PickButton({ id, featured }) {
  const { order, pickBase } = useOrder();
  const on = order.baseId === id;
  return (
    <button
      className={on || featured ? "btn btn-primary btn-sm pick" : "btn btn-ghost btn-sm pick"}
      type="button"
      aria-pressed={on}
      onClick={() => {
        pickBase(id);
        document.getElementById("customize").scrollIntoView({ block: "start" });
      }}
    >
      {on ? "Selected" : "Select & customise"} <span className="arr">{on ? "✓" : "→"}</span>
    </button>
  );
}

function Tiers() {
  return (
    <div className="pk-grid tiers">
      {TIERS.map((t, k) => (
        <article key={t.id} className={t.popular ? "pk feat" : "pk"} style={{ "--k": k }}>
          <div className="pk-top">
            <span className="label">{t.tier}</span>
            {t.popular ? (
              <span className="badge">Most popular</span>
            ) : t.badge ? (
              <span className="badge soft">{t.badge}</span>
            ) : null}
          </div>
          <div>
            <h3>{t.name}</h3>
            <p className="pk-for">{t.for}</p>
          </div>
          <div className="price">
            <span className="was">
              Valued <s>{inr(t.valued)}</s>
            </span>
            <span className="main">{inr(t.price)}</span>
            <span className="rec">You save {inr(t.valued - t.price)}</span>
          </div>
          <ul>
            {t.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="ideal">
            <b>Key benefit</b>
            {t.benefit}
          </p>
          <PickButton id={t.id} featured={t.popular} />
        </article>
      ))}
    </div>
  );
}

function Bundles() {
  return (
    <div className="mx">
      {BUNDLE_GROUPS.map((g) => (
        <div className="mx-group" key={g.title}>
          <h3 className="mx-title">{g.title}</h3>
          {g.items.map((b) => (
            <div className="mx-row" key={b.id}>
              <span className="mx-name">{b.name}</span>
              <span className="mx-price">
                {inr(b.price)}
                {b.note && <small>{b.note}</small>}
              </span>
              <PickButton id={b.id} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Services() {
  return (
    <ol className="menu">
      {SERVICES.map((s, i) => (
        <li className="menu-row" key={s.id}>
          <span className="menu-n">{String(i + 1).padStart(2, "0")}</span>
          <div className="menu-body">
            <h3>{s.name}</h3>
            <p>{s.scope}</p>
          </div>
          <span className="mx-price">
            {s.unit === "page" && "+"}
            {inr(s.price)}
            {s.unit && <small>/ {s.unit}</small>}
          </span>
          <PickButton id={s.id} />
        </li>
      ))}
    </ol>
  );
}

function Stepper({ addon, qty }) {
  const { setAddon } = useOrder();
  return (
    <div className="step-qty" role="group" aria-label={`${addon.name} quantity`}>
      <button
        type="button"
        aria-label="One less"
        disabled={qty <= 1}
        onClick={() => setAddon(addon.id, qty - 1)}
      >
        −
      </button>
      <output aria-live="polite">
        {qty} <small>{addon.unit}</small>
      </output>
      <button
        type="button"
        aria-label="One more"
        disabled={qty >= addon.max}
        onClick={() => setAddon(addon.id, qty + 1)}
      >
        +
      </button>
    </div>
  );
}

function Customizer() {
  const { order, quote, setAddon, setRetainer, setBooking } = useOrder();
  const base = quote.base;
  const fitting = addonsFor(base);
  const left = ADDONS.filter((a) => !fitting.includes(a));

  return (
    <div className="cfg" id="customize">
      <div className="cfg-main">
        <div className="cfg-block">
          <span className="label">
            <b>Step 2</b> — Custom scaling add-ons
          </span>
          <h3 className="cfg-h">Customise {base.label}</h3>
          <p className="cfg-note">
            Tick what you want to add. Add-ons are priced at the package rate, lower than buying them on their
            own.
          </p>
          <ul className="ao-list">
            {fitting.map((a) => {
              const qty = order.addons[a.id] || 0;
              const on = qty > 0;
              return (
                <li key={a.id} className={on ? "ao on" : "ao"}>
                  <label className="ao-check">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => setAddon(a.id, e.target.checked ? 1 : 0)}
                    />
                    <span className="box" aria-hidden="true" />
                    <span className="ao-text">
                      <b>{a.name}</b>
                      <small>{a.text}</small>
                    </span>
                  </label>
                  <div className="ao-side">
                    <span className="ao-price">
                      {inr(a.rate)} <small>/ {a.unit}</small>
                      <s>{inr(a.standalone)} standalone</s>
                    </span>
                    {on && !a.once && <Stepper addon={a} qty={qty} />}
                  </div>
                </li>
              );
            })}
          </ul>
          {left.length > 0 && (
            <p className="cfg-note small">
              Not available with this package: {left.map((a) => a.name).join(", ")}.
            </p>
          )}
        </div>

        <div className="cfg-block">
          <span className="label">
            <b>Step 3</b> — Retainer subscription scaling matrix
          </span>
          {base.has.media ? (
            <>
              <h3 className="cfg-h">Keep the content coming</h3>
              <p className="cfg-note">
                Your package includes reels or ads. Add a monthly media retainer at partner rates.
              </p>
              <div className="rt-list" role="radiogroup" aria-label="Monthly retainer">
                {[null, ...RETAINERS].map((r) => {
                  const on = (order.retainerId || null) === (r ? r.id : null);
                  return (
                    <label key={r ? r.id : "none"} className={on ? "rt on" : "rt"}>
                      <input
                        type="radio"
                        name="retainer"
                        checked={on}
                        onChange={() => setRetainer(r ? r.id : null)}
                      />
                      <span className="rt-name">{r ? r.name : "No retainer"}</span>
                      <span className="rt-out">{r ? r.output : "One-time build only"}</span>
                      {r && (
                        <span className="rt-price">
                          {inr(r.price)} <small>/ mo</small>
                          <s>{inr(r.standard)}</s>
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
              <p className="cfg-note small">{RETAINER_NOTE}</p>
            </>
          ) : (
            <p className="cfg-note">
              Monthly media retainers come with packages that include product reels, ads or digital twin
              reels: Tier 3, Tier 4, the media bundles, or the reel and ad services.
            </p>
          )}
        </div>
      </div>

      <aside className="cfg-sum" aria-label="Total price">
        <span className="label">Total price calculator</span>
        <h3>{base.label}</h3>
        <span className="cfg-kind">{kindLabel(base)}</span>
        <dl className="sum-lines">
          <div>
            <dt>Package</dt>
            <dd>{inr(base.price)}</dd>
          </div>
          {quote.addons.map((a) => (
            <div key={a.id}>
              <dt>
                {a.name}
                {!a.once && <small> × {a.qty}</small>}
              </dt>
              <dd>{inr(a.amount)}</dd>
            </div>
          ))}
          {quote.retainer && (
            <div>
              <dt>{quote.retainer.name}</dt>
              <dd>{inr(quote.retainer.price)} / mo</dd>
            </div>
          )}
        </dl>
        <div className="sum-total">
          <span>One-time total</span>
          <strong aria-live="polite">{inr(quote.oneTime)}</strong>
          {quote.monthly > 0 && <span className="sum-mo">+ {inr(quote.monthly)} / month</span>}
        </div>
        {quote.saved > 0 && (
          <p className="sum-save">You save {inr(quote.saved)} against standard valuation</p>
        )}
        <button type="button" className="btn btn-primary" onClick={() => setBooking(true)}>
          Book &amp; sign <span className="arr">→</span>
        </button>
        <p className="sum-fine">Full payment is due at the first presentation of your finished product.</p>
      </aside>
    </div>
  );
}

export function Packages() {
  const [view, setView] = useState("tiers");
  const tabs = useRef({});

  const onTabKey = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = VIEWS[(index + (e.key === "ArrowRight" ? 1 : -1) + VIEWS.length) % VIEWS.length];
    setView(next.key);
    tabs.current[next.key].focus();
  };

  // on a phone the tabs scroll sideways; keep the chosen one in view
  useEffect(() => {
    const tab = tabs.current[view];
    const strip = tab?.parentElement;
    if (strip)
      strip.scrollTo({
        left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      });
  }, [view]);

  return (
    <>
      <section className="sec wrap" id="booking" data-bg="#080D1C" aria-labelledby="bk-h">
        <div className="sec-head">
          <span className="label">
            <b>05</b> — Booking portal
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
            <b>Step 1:</b> choose a strategic tier, a bundle or a single service. Then add the extras you
            need, see your total, and book. You&apos;ll fill in a short intake form, send your booking on
            WhatsApp and sign the agreement.
          </p>
        </div>
        <div className="catalog">
          <div className="portal-bar">
            <div className="tabs" role="tablist" aria-label="Package types">
              {VIEWS.map((v, i) => (
                <button
                  key={v.key}
                  className="tab"
                  role="tab"
                  id={`tab-${v.key}`}
                  aria-controls="pkPanel"
                  aria-selected={view === v.key}
                  tabIndex={view === v.key ? 0 : -1}
                  ref={(el) => {
                    tabs.current[v.key] = el;
                  }}
                  onClick={() => setView(v.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {v.tab}
                  <sup>{v.count}</sup>
                </button>
              ))}
            </div>
            <span className="cur-note">All prices in INR</span>
          </div>
          <div id="pkPanel" role="tabpanel" aria-labelledby={`tab-${view}`}>
            {view === "tiers" && <Tiers />}
            {view === "bundles" && <Bundles />}
            {view === "services" && <Services />}
          </div>
        </div>

        <Customizer />
      </section>

      <BookingDialog />
    </>
  );
}

function BookingDialog() {
  const { quote, booking, setBooking } = useOrder();
  const dialog = useRef(null);
  const opener = useRef(null);
  const nameInput = useRef(null);
  const [formDone, setFormDone] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const say = useToast();
  const copy = useCopy();

  // each booking starts at step one
  useEffect(() => {
    const el = dialog.current;
    if (booking) {
      opener.current = document.activeElement;
      setFormDone(false);
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [booking]);

  const pkg = orderSummary(quote);
  const message = bookingMessage(quote, name, business);

  return (
    <dialog
      className="bk"
      ref={dialog}
      aria-labelledby="bkTitle"
      onClose={() => {
        setBooking(false);
        opener.current?.focus();
      }}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      {booking && (
        <div className="bk-in">
          <div className="bk-head">
            <div>
              <span className="label">{kindLabel(quote.base)}</span>
              <h2 id="bkTitle">{pkg.name}</h2>
              <div className="p">{pkg.total}</div>
              {(quote.addons.length > 0 || quote.retainer) && (
                <ul className="bk-extras">
                  {quote.addons.map((a) => (
                    <li key={a.id}>{addonLine(a)}</li>
                  ))}
                  {quote.retainer && (
                    <li>
                      {quote.retainer.name}: {inr(quote.retainer.price)} / month
                    </li>
                  )}
                </ul>
              )}
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
                Once you&apos;ve submitted the form, send your booking. WhatsApp opens with your package,
                add-ons and total filled in; press send there to notify our team.
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
          <AgreementStep
            key={pkg.lines.join("|")}
            pkg={pkg}
            defaultName={name}
            defaultBusiness={business}
            locked={!formDone}
          />
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
