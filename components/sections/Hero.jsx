export function Hero() {
  return (
    <section className="hero" id="top" data-bg="#060913" aria-label="Introduction">
      <div className="hero-top">
        <span className="label fade" style={{ "--d": ".1s" }}>
          <span className="live"></span>Websites that sell + AI automation that works 24/7
        </span>
        <span className="label fade" style={{ "--d": ".2s" }}>
          Signature 7-day delivery
        </span>
      </div>
      <div className="hero-fallback" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path fill="#F4F0E8" d="M24 5.5L42.5 14.75L24 24L5.5 14.75Z" />
          <path fill="#00F0FF" d="M24 11.6L30.3 14.75L24 17.9L17.7 14.75Z" />
          <path
            fill="none"
            stroke="#F4F0E8"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".62"
            d="M7 23.2L24 31.7L41 23.2"
          />
          <path
            fill="none"
            stroke="#F4F0E8"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".32"
            d="M7 31.4L24 39.9L41 31.4"
          />
        </svg>
      </div>
      <div className="hero-head">
        <h1>
          <span className="display">
            <span className="ln">
              <span style={{ "--d": ".15s" }}>Scale faster,</span>
            </span>
            <span className="ln l2">
              <span style={{ "--d": ".27s" }}>
                {"spend "}
                <em>less.</em>
              </span>
            </span>
          </span>
          <span className="h1-sub fade" style={{ "--d": ".45s" }}>
            {"Transform your online presence with high-performance web design and "}
            <em>smart AI integration.</em>
          </span>
        </h1>
        <div className="ctas hero-ctas fade" style={{ "--d": ".6s" }}>
          <a className="btn btn-primary" href="#booking">
            {"Build your AI engine "}
            <span className="arr">→</span>
          </a>
          <a className="btn btn-ghost" href="#booking">
            {"View packages "}
            <span className="arr">↓</span>
          </a>
        </div>
      </div>
      <span className="v-rail label fade" aria-hidden="true" style={{ "--d": ".9s" }}>
        Websites · Apps · AI automation · AI ads
      </span>
      <div className="hero-foot">
        <ul className="meta-list fade" style={{ "--d": ".7s" }}>
          <li className="label">{"Web design & development"}</li>
          <li className="label">{"Mobile apps & PWAs"}</li>
          <li className="label">{"AI receptionists, chat & ads"}</li>
        </ul>
        <div className="scroll-cue fade" aria-hidden="true" style={{ "--d": "1s" }}>
          <span className="label">Scroll</span>
          <span className="bar"></span>
        </div>
      </div>
    </section>
  );
}
