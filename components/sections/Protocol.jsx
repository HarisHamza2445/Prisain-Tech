import { EXECUTION_TERMS, POLICY_PDF, POLICY_REF } from "@/lib/policy";

// How an engagement runs, from booking to after launch.
const PROTOCOL = [
  { title: "Book a package", text: "Pick a package and send your booking on WhatsApp." },
  { title: "Intake & agreement", text: "Fill in the intake form and sign the service agreement online." },
  {
    title: "Seven-day build",
    text: "Strategy, design, production and AI integration, on the 7-day cadence.",
  },
  { title: "First Presentation", text: "We demo the finished product. Full payment is due at this point." },
  { title: "Revisions & launch", text: "Revisions start once payment clears, then the product goes live." },
  { title: "After launch", text: "Maintenance and new features run on a retainer or a separate work order." },
];

const VALUES = [
  {
    title: "Pay when you see it working",
    text: "You pay in full only at the First Presentation, once the product is built and in front of you.",
  },
  {
    title: "Seven days, start to launch",
    text: "Every standard build follows the same seven-day cadence, so you always know what happens next.",
  },
  {
    title: "Published, fixed pricing",
    text: "Every package has a fixed price in INR and USD. Software and API costs are billed at actual usage.",
  },
  {
    title: "Clear scope",
    text: "The project fee covers delivery. Maintenance and new features are agreed separately, in writing.",
  },
];

const RULE_EXTRA = {
  id: "4",
  title: "Software & API costs",
  text: "Third-party software, cloud hosting, API compute and SaaS subscriptions are included in custom agreements or billed separately by actual usage.",
};

export function Protocol() {
  return (
    <section className="sec wrap" id="protocol" data-bg="#0A1022" aria-labelledby="pr-h">
      <div className="sec-head">
        <span className="label">
          <b>06</b> — Protocol, rules &amp; values
        </span>
        <h2 className="display d-l" id="pr-h" data-reveal>
          <span className="ln">
            <span>How we work,</span>
          </span>
          <span className="ln">
            <span>
              <em>in writing.</em>
            </span>
          </span>
        </h2>
      </div>

      <div className="pr-grid">
        <div className="pr-block">
          <h3 className="label">Engagement protocol</h3>
          <ol className="pr-steps">
            {PROTOCOL.map((step, i) => (
              <li key={step.title}>
                <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pr-block">
          <h3 className="label">Rules</h3>
          <ul className="pr-rules">
            {[...EXECUTION_TERMS, RULE_EXTRA].map((rule) => (
              <li key={rule.id}>
                <div className="pr-rule-head">
                  <h4>{rule.title}</h4>
                  {rule.tag && <span className="badge soft">{rule.tag}</span>}
                </div>
                <p>{rule.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pr-block">
          <h3 className="label">Values</h3>
          <ul className="pr-values">
            {VALUES.map((value) => (
              <li key={value.title}>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="pr-foot">
        From the PrisainTech Company Policy, Pricing Terms &amp; Service Agreement ({POLICY_REF}).{" "}
        <a href={POLICY_PDF} target="_blank" rel="noopener">
          Read the full policy (PDF) ↗
        </a>
      </p>
    </section>
  );
}
