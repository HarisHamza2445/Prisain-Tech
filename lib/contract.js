// The client agreement shown at the end of booking, built from the company policy in lib/policy.js.
import {
  ACKNOWLEDGEMENT,
  DELIVERY_CADENCE,
  EXECUTION_TERMS,
  POLICY_REF,
  PRICING_ADVANCED,
  PRICING_PRIMARY,
  SOFTWARE_OVERHEAD,
  findPrice,
} from "@/lib/policy";

export const AGREEMENT_VERSION = POLICY_REF;

const plain = (text) => text.replace(/₹/g, "INR ").replace(/\$/g, "USD ");
const priceRow = (p) => `${p.name} — ${p.desc}: ${plain(p.inr)} / ${plain(p.usd)}`;

export function agreementSections(pkg, client) {
  const who = [client.name, client.business].filter(Boolean).join(", ");
  const price = findPrice(pkg.name);
  return [
    {
      heading: "Parties",
      body: `This agreement (${POLICY_REF}) is between PrisainTech and ${who || "the Client"} ("the Client"), for the package below.`,
    },
    {
      heading: "Selected package",
      body: price
        ? `${pkg.name} — ${price.desc}. Rate: ${plain(price.inr)} / ${plain(price.usd)}. Includes:`
        : `${pkg.name}. Includes:`,
      list: pkg.includes,
    },
    {
      heading: "1. Core financial & project execution terms",
      parts: EXECUTION_TERMS.map((t) => ({
        title: `${t.id} ${t.title}${t.tag ? ` (${t.tag.toLowerCase()})` : ""}`,
        text: t.text,
      })),
    },
    {
      heading: "2. Primary agency service catalog & pricing",
      body: "Standard baseline pricing for PrisainTech core deliverables, fixed in INR and USD:",
      list: PRICING_PRIMARY.map(priceRow),
    },
    {
      heading: "3. Advanced & enterprise solutions schedule",
      body: "Specialized enterprise systems, recurring retainers and high-capacity AI deployments:",
      list: PRICING_ADVANCED.map(priceRow),
    },
    { heading: "4. Software overhead & tech stack governance", body: SOFTWARE_OVERHEAD },
    {
      heading: "5. Standard 7-day delivery cadence",
      body: "All standard project implementations follow PrisainTech's 7-day execution framework:",
      list: DELIVERY_CADENCE.map((d) => `${d.days} — ${d.title}: ${d.text}`),
    },
    {
      heading: "6. Authorization & agreement acknowledgement",
      body: `${ACKNOWLEDGEMENT} By signing below, the Client accepts these terms electronically; an electronic signature has the same effect as a handwritten one.`,
    },
  ];
}

export const newAgreementRef = () =>
  "PT-" +
  new Date().toISOString().slice(2, 10).replace(/-/g, "") +
  "-" +
  Math.random().toString(36).slice(2, 6).toUpperCase();
