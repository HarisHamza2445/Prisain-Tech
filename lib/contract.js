// The client agreement shown at the end of booking, built from the company policy in lib/policy.js
// and the investment terms in lib/proposal.js.
import {
  ACKNOWLEDGEMENT,
  DELIVERY_CADENCE,
  EXECUTION_TERMS,
  POLICY_REF,
  SOFTWARE_OVERHEAD,
} from "@/lib/policy";
import { GUARANTEES, RETAINER_NOTE, addonLine, inr, kindLabel, totalLine } from "@/lib/proposal";

export const AGREEMENT_VERSION = POLICY_REF;

// What the client is signing for, from a priced order (see priceOrder).
export function orderSummary(quote) {
  const { base, addons, retainer } = quote;
  return {
    name: base.label,
    lines: [
      `${kindLabel(base)}: ${base.label}: ${inr(base.price)}${base.unit ? ` / ${base.unit}` : ""}`,
      ...addons.map((a) => "Add-on: " + addonLine(a)),
      ...(retainer
        ? [`Retainer: ${retainer.name} (${retainer.output}): ${inr(retainer.price)} / month`]
        : []),
    ],
    includes: base.includes || [base.scope || base.name],
    total: totalLine(quote),
    monthly: quote.monthly > 0,
  };
}

export function agreementSections(pkg, client) {
  const who = [client.name, client.business].filter(Boolean).join(", ");
  const numbered = [
    {
      heading: "Core financial & project execution terms",
      parts: EXECUTION_TERMS.map((t) => ({
        title: `${t.id} ${t.title}${t.tag ? ` (${t.tag.toLowerCase()})` : ""}`,
        text: t.text,
      })),
    },
    {
      heading: "High-trust guarantees & partnership terms",
      parts: GUARANTEES.map((g, i) => ({
        title: `${i + 1}. ${g.title}`,
        text: g.text,
      })),
    },
    {
      heading: "Software overhead & tech stack governance",
      body: SOFTWARE_OVERHEAD,
    },
    {
      heading: "Standard 7-day delivery cadence",
      body: "All standard project implementations follow PrisainTech's 7-day execution framework:",
      list: DELIVERY_CADENCE.map((d) => `${d.days} — ${d.title}: ${d.text}`),
    },
    ...(pkg.monthly ? [{ heading: "Media retainer terms", body: RETAINER_NOTE }] : []),
    {
      heading: "Authorization & agreement acknowledgement",
      body: `${ACKNOWLEDGEMENT} By signing below, the Client accepts these terms electronically; an electronic signature has the same effect as a handwritten one.`,
    },
  ];
  return [
    {
      heading: "Parties",
      body: `This agreement (${POLICY_REF}) is between PrisainTech and ${who || "the Client"} ("the Client"), for the package below.`,
    },
    {
      heading: "Selected package & add-ons",
      body: `Estimated total investment: ${pkg.total}.`,
      list: pkg.lines,
    },
    { heading: "Package deliverables", list: pkg.includes },
    ...numbered.map((s, i) => ({ ...s, heading: `${i + 1}. ${s.heading}` })),
  ];
}

export const newAgreementRef = () =>
  "PT-" +
  new Date().toISOString().slice(2, 10).replace(/-/g, "") +
  "-" +
  Math.random().toString(36).slice(2, 6).toUpperCase();
