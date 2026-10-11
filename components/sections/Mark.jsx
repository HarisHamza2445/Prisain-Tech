export function Mark() {
  return (
    <section
      className="sec wrap"
      id="mark"
      data-bg="#060913"
      aria-labelledby="mk-h"
      style={{ paddingTop: "0" }}
    >
      <div className="sec-head" style={{ marginBottom: "40px" }}>
        <span className="label">
          <b>11</b>
          {" — The mark"}
        </span>
        <h2 className="display d-m" id="mk-h">
          {"Three layers. "}
          <em>One core.</em>
        </h2>
      </div>
      <p className="lede" style={{ marginBottom: "40px" }}>
        Website, app and AI, stacked into one system. The cyan core on top is where they connect and where
        your customers meet the business.
      </p>
      <div className="marks">
        <div className="mk k1 lock">
          <div className="lockup">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <use href="#ps-mark" />
            </svg>
            <span className="wordmark">
              PRISAIN<span>TECH</span>
            </span>
          </div>
          <span className="cap">Primary lockup</span>
        </div>
        <div className="mk k2">
          <svg className="sym" viewBox="0 0 48 48" aria-hidden="true">
            <use href="#ps-mark" />
          </svg>
          <span className="cap">Symbol</span>
        </div>
        <div className="mk k3">
          <svg className="sym" viewBox="0 0 48 48" aria-hidden="true">
            <use href="#ps-mark" />
          </svg>
          <span className="cap">Mono · dark</span>
        </div>
        <div className="mk k4">
          <svg className="sym" viewBox="0 0 48 48" aria-hidden="true">
            <use href="#ps-mark" />
          </svg>
          <span className="cap">Mono · light</span>
        </div>
      </div>
    </section>
  );
}
