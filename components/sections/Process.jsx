import { DELIVERY_CADENCE } from "@/lib/policy";

export function Process() {
  return (
    <section className="sec wrap" id="process" data-bg="#060913" aria-labelledby="proc-h">
      <div className="process">
        <div className="process-head">
          <div className="inner">
            <span className="label">
              <b>05</b> — Signature 7-day delivery
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
                  <em>Live</em> by next
                </span>
              </span>
              <span className="ln">
                <span>week.</span>
              </span>
            </h2>
            <p className="lede" style={{ fontSize: "1rem" }}>
              Every standard build follows the same seven-day cadence. Larger platforms and retainers are
              scheduled with you during discovery.
            </p>
          </div>
        </div>
        <ol className="steps" id="steps">
          <span className="track" aria-hidden="true"></span>
          <span className="fill" id="stepFill" aria-hidden="true"></span>
          {DELIVERY_CADENCE.map((phase) => (
            <li className="step lit" key={phase.days}>
              <span className="n">{phase.days}</span>
              <h3>{phase.title}</h3>
              <p>{phase.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
