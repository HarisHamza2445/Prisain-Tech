// The client agreement shown at the end of booking. Edit the wording here.
// Terms marked "studio default" in comments are starting points to confirm before going live.

export const AGREEMENT_VERSION = "2026-10";

const plainPrice = (text) => text.replace("₹", "INR ").replace("$", "USD ");

export function agreementSections(pkg, client) {
  const who = [client.name, client.business].filter(Boolean).join(", ");
  return [
    {
      heading: "1. Parties",
      body: `This agreement is between PrisainTech ("the Studio") and ${who || "the Client"} ("the Client").`,
    },
    {
      heading: "2. Services",
      body: `The Studio will deliver the ${pkg.name} package, which includes:`,
      list: pkg.includes,
    },
    {
      heading: "3. Fees and payment",
      body:
        `The fee is ${plainPrice(pkg.inr)} (${plainPrice(pkg.usd)}).` +
        (pkg.recurring
          ? ` A monthly retainer of ${plainPrice(pkg.recurring.replace(/^\+\s*/, ""))} applies from launch.`
          : "") +
        // studio default: 50 / 50
        " 50% is paid in advance to start the work and the remaining 50% before launch or handover. Payment details are shared on WhatsApp or email.",
    },
    {
      heading: "4. Timeline",
      body: "Standard builds are delivered within 7 working days. The clock starts once the advance is received, the intake form is complete and the Client has shared the content needed. Larger platforms and retainers follow the schedule agreed during discovery.",
    },
    {
      heading: "5. Revisions",
      body: "Revision meetings are included as listed in the package. Further changes, or new work outside the package, are quoted and billed separately.",
    },
    {
      heading: "6. Client responsibilities",
      body: "The Client provides content, brand assets, logins and approvals on time. Delays in these move the delivery date by the same amount.",
    },
    {
      heading: "7. Third-party costs",
      body: "Domains, hosting, paid software, AI usage (for example call minutes or WhatsApp API fees) and advertising spend are paid by the Client directly or billed at cost.",
    },
    {
      heading: "8. Ownership",
      body: "Once the full fee is paid, the Client owns the final deliverables made for them. The Studio may show the work in its portfolio unless the Client asks it not to in writing.",
    },
    {
      heading: "9. Confidentiality",
      body: "Both parties keep each other's non-public business information confidential.",
    },
    {
      heading: "10. Cancellation",
      body:
        // studio defaults: advance non-refundable once work starts; 30 days' notice for retainers
        "Either party may cancel in writing. The advance is non-refundable once work has started, and work completed up to cancellation is payable. Monthly retainers can be cancelled with 30 days' notice.",
    },
    {
      heading: "11. Liability",
      body: "The Studio's total liability under this agreement is limited to the fees the Client has paid.",
    },
    {
      heading: "12. Governing law",
      body: "This agreement is governed by the laws of India.",
    },
    {
      heading: "13. Signature",
      body: "By signing below, the Client confirms they have read and agree to these terms. An electronic signature has the same effect as a handwritten one.",
    },
  ];
}

export const newAgreementRef = () =>
  "PT-" +
  new Date().toISOString().slice(2, 10).replace(/-/g, "") +
  "-" +
  Math.random().toString(36).slice(2, 6).toUpperCase();
