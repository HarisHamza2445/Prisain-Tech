export function Process() {
  return (
    <section className="sec wrap" id="process" data-bg="#060913" aria-labelledby="proc-h">
      <div className="process">
        <div className="process-head">
          <div className="inner">
            <span className="label">
              <b>05</b>
              {" — Signature 7-day delivery"}
            </span>
            <h2 className="display d-m" id="proc-h" data-reveal>
              <span className="ln">
                <span>Idea on</span>
              </span>
              <span className="ln">
                <span>Monday.</span>
              </span>
              <span className="ln">
                <span>
                  <em>Live</em>
                  {" by next"}
                </span>
              </span>
              <span className="ln">
                <span>week.</span>
              </span>
            </h2>
            <p className="lede" style={{ fontSize: "1rem" }}>
              How a typical build moves. Larger platforms and retainers are scheduled with you during
              discovery.
            </p>
          </div>
        </div>
        <ol className="steps" id="steps">
          <span className="track" aria-hidden="true"></span>
          <span className="fill" id="stepFill" aria-hidden="true"></span>
          <li className="step lit">
            <span className="n">Day 1</span>
            <h3>Discover</h3>
            <p>
              Your intake form and a kickoff call: the business, the audience, and what the website and
              automations must achieve.
            </p>
          </li>
          <li className="step lit">
            <span className="n">Day 2</span>
            <h3>Define</h3>
            <p>Site structure, content hierarchy, automation flows and creative direction agreed.</p>
          </li>
          <li className="step lit">
            <span className="n">Days 3–4</span>
            <h3>Design</h3>
            <p>The visual system, key pages and your revision meetings.</p>
          </li>
          <li className="step lit">
            <span className="n">Days 5–6</span>
            <h3>{"Build & automate"}</h3>
            <p>Responsive development, AI agents, WhatsApp workflows and testing.</p>
          </li>
          <li className="step lit">
            <span className="n">Day 7</span>
            <h3>Launch</h3>
            <p>Final presentation, launch and handover so your team knows how everything works.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
