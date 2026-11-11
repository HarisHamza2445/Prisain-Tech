"use client";

import { useOrder } from "@/components/Order";
import { GUARANTEES, NEXT_STEPS, inr } from "@/lib/proposal";

export function Terms() {
  const { quote, setBooking } = useOrder();
  return (
    <section className="sec wrap" id="terms" data-bg="#0A1022" aria-labelledby="terms-h">
      <div className="sec-head">
        <span className="label">
          <b>06</b> — Investment terms &amp; execution authorization
        </span>
        <h2 className="display d-l" id="terms-h" data-reveal>
          <span className="ln">
            <span>Mutual commitments.</span>
          </span>
          <span className="ln">
            <span>
              <em>Guaranteed</em> in writing.
            </span>
          </span>
        </h2>
      </div>

      <div className="terms">
        <div className="terms-g">
          <span className="label">High-trust guarantees &amp; partnership terms</span>
          <ol className="guar">
            {GUARANTEES.map((g, i) => (
              <li key={g.title}>
                <span className="guar-n">{i + 1}</span>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="terms-side">
          <div className="next">
            <span className="label">Next steps &amp; project initiation</span>
            <ol>
              {NEXT_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="auth" aria-labelledby="auth-h">
            <span className="label">Agreement acceptance &amp; project authorization</span>
            <h3 id="auth-h">Selected package &amp; add-ons</h3>
            <ul>
              <li>
                <span>{quote.base.label}</span>
                <span>{inr(quote.base.price)}</span>
              </li>
              {quote.addons.map((a) => (
                <li key={a.id}>
                  <span>
                    {a.name}
                    {!a.once && ` × ${a.qty}`}
                  </span>
                  <span>{inr(a.amount)}</span>
                </li>
              ))}
              {quote.retainer && (
                <li>
                  <span>{quote.retainer.name}</span>
                  <span>{inr(quote.retainer.price)} / mo</span>
                </li>
              )}
            </ul>
            <div className="auth-total">
              <span>Estimated total investment</span>
              <strong>{inr(quote.oneTime)}</strong>
              {quote.monthly > 0 && <span className="auth-mo">+ {inr(quote.monthly)} / month</span>}
            </div>
            <div className="auth-actions">
              <button type="button" className="btn btn-primary" onClick={() => setBooking(true)}>
                Authorize &amp; sign <span className="arr">→</span>
              </button>
              <a className="linkish" href="#customize">
                Change package or add-ons
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
