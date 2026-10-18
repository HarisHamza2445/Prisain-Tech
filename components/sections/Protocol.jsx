import { EXECUTION_TERMS, POLICY_PDF, POLICY_REF } from "@/lib/policy";

// How an engagement runs, from booking to after launch. `pay` marks where payment falls.
const PROTOCOL = [
  { title: "Book", text: "Pick a package and send your booking on WhatsApp." },
  { title: "Intake & agreement", text: "Fill in the intake form and sign the service agreement online." },
  { title: "Seven-day build", text: "Strategy, design, production and AI integration." },
  { title: "First Presentation", text: "We demo the finished product to you.", pay: "Full payment due" },
  { title: "Revisions & launch", text: "Revisions start once payment clears, then we go live." },
  { title: "After launch", text: "Maintenance and new features on a retainer or work order." },
];

const VALUES = [
  {
    title: "Pay when you see it working",
    text: "Full payment only at the First Presentation, with the product in front of you.",
  },
  {
    title: "Seven days, start to launch",
    text: "Every standard build runs on the same cadence, so you always know what's next.",
  },
  {
    title: "Published, fixed pricing",
    text: "Fixed prices in INR and USD. Software and API costs billed at actual usage.",
  },
  {
    title: "Clear scope",
    text: "The fee covers delivery. Anything after launch is agreed separately, in writing.",
  },
];

// one plain sentence per clause; the full policy wording opens underneath
const SUMMARY = {
  1.1: "Full payment is due at the First Presentation of the finished product.",
  1.2: "Revisions begin only after that payment has cleared.",
  1.3: "Maintenance and new features after launch are billed separately.",
};
const RULES = [
  ...EXECUTION_TERMS.map((t) => ({ ...t, summary: SUMMARY[t.id] })),
  {
    id: "4",
    title: "Software & API costs",
    summary: "Software, hosting and API costs are billed by actual usage.",
    text: "Third-party software overheads, cloud hosting, API compute and SaaS subscriptions are either factored into custom service agreements or billed separately based on actual deployment scale and token/API consumption.",
  },
];

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

      <div className="pr-flow-wrap">
        <h3 className="label pr-title">Engagement protocol</h3>
        <ol className="pr-flow">
          {PROTOCOL.map((step, i) => (
            <li key={step.title} className={step.pay ? "pr-step pay" : "pr-step"}>
              <span className="pr-node" aria-hidden="true" />
              <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
              {step.pay && <span className="badge">{step.pay}</span>}
            </li>
          ))}
        </ol>
      </div>

      <div className="pr-cols">
        <div>
          <h3 className="label pr-title">Values</h3>
          <ul className="pr-values">
            {VALUES.map((value, i) => (
              <li key={value.title} className="pr-value">
                <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="label pr-title">Rules</h3>
          <div className="pr-rules">
            {RULES.map((rule, i) => (
              <details key={rule.id} className="pr-rule" open={i === 0}>
                <summary>
                  <span className="pr-rule-id">{rule.id}</span>
                  <span className="pr-rule-main">
                    <span className="pr-rule-title">
                      {rule.title}
                      {rule.tag && <span className="badge soft">{rule.tag}</span>}
                    </span>
                    <span className="pr-rule-sum">{rule.summary}</span>
                  </span>
                  <span className="pr-rule-icon" aria-hidden="true" />
                </summary>
                <p>{rule.text}</p>
              </details>
            ))}
          </div>
          <a className="btn btn-ghost btn-sm pr-pdf" href={POLICY_PDF} target="_blank" rel="noopener">
            Full policy · {POLICY_REF} <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
