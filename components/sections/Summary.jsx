import { PILLARS, ROI_INSIGHT, SUMMARY } from "@/lib/proposal";

export function Summary() {
  return (
    <section className="sec wrap" id="summary" data-bg="#070B18" aria-labelledby="sum-h">
      <div className="sec-head">
        <span className="label">
          <b>04</b> — Executive summary &amp; growth positioning
        </span>
        <h2 className="display d-l" id="sum-h" data-reveal>
          <span className="ln">
            <span>Not brochureware.</span>
          </span>
          <span className="ln">
            <span>
              <em>Revenue</em> infrastructure.
            </span>
          </span>
        </h2>
      </div>
      <div className="exec">
        <div className="exec-copy">
          {SUMMARY.map((p, i) => (
            <p key={i} className={i === 0 ? "lede" : undefined}>
              {p}
            </p>
          ))}
        </div>
        <ol className="exec-pillars">
          {PILLARS.map((p, i) => (
            <li key={p.title}>
              <span className="label">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
        <aside className="exec-roi">
          <span className="label">Behavioral ROI insight</span>
          <strong>
            ₹45,000<small>+ / month</small>
          </strong>
          <p>{ROI_INSIGHT}</p>
          <a className="btn btn-primary btn-sm" href="#booking">
            See the packages <span className="arr">→</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
