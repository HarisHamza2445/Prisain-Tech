import { WA_GENERAL } from "@/lib/site";

export function Cta() {
  return (
    <section className="cta" id="cta" data-bg="#04060D" aria-labelledby="cta-h">
      <span className="cta-ring" aria-hidden="true"></span>
      <span className="cta-ring r2" aria-hidden="true"></span>
      <span className="label" style={{ position: "relative", zIndex: "2", marginBottom: "28px" }}>
        <b>10</b>
        {" — Your turn"}
      </span>
      <h2 className="display" id="cta-h" data-reveal>
        <span className="ln">
          <span>Build your</span>
        </span>
        <span className="ln">
          <span>AI engine</span>
        </span>
        <span className="ln">
          <span>this week.</span>
        </span>
      </h2>
      <p className="lede">
        {"Pick a package, tell us about your business, and we'll take it from idea to launch in seven days."}
      </p>
      <div className="ctas">
        <a className="btn btn-primary" href="#booking">
          {"View packages "}
          <span className="arr">→</span>
        </a>
        <a href={WA_GENERAL} className="btn btn-wa" target="_blank" rel="noopener">
          <svg aria-hidden="true">
            <use href="#i-chat" />
          </svg>
          {" Chat on WhatsApp"}
        </a>
      </div>
    </section>
  );
}
