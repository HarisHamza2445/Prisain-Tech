// PrisainTech Company Policy, Pricing Terms & Service Agreement (PT-MSA-2026-V1).
// This is the source for the client agreement, the 7-day process and the protocol section.

export const POLICY_REF = "PT-MSA-2026-V1";
export const POLICY_TITLE = "Company Policy, Pricing Terms & Service Agreement";
export const POLICY_PDF = "/prisaintech-company-policy.pdf";

export const EXECUTION_TERMS = [
  {
    id: "1.1",
    title: "Payment schedule & presentation trigger",
    tag: "Strictly enforced",
    text: "All client engagements under PrisainTech operate under a performance-triggered billing framework. Full project payment is strictly due, payable, and collected immediately upon the First Presentation of the completed product or project demo. The First Presentation marks the substantial completion of initial development deliverables.",
  },
  {
    id: "1.2",
    title: "Mandatory revision protocol",
    tag: "Conditional processing",
    text: "PrisainTech enforces a strict post-payment revision workflow. No revision requests, design modifications, feature adjustments, or code and content changes will be queued, processed, or initiated until the First Presentation payment has fully cleared and been credited to PrisainTech's bank account.",
  },
  {
    id: "1.3",
    title: "Post-launch & maintenance billing structure",
    text: "Charges for ongoing system maintenance, post-launch site/app modifications, infrastructure scaling, and additional scope feature requests are independent of primary project delivery fees. All post-launch items are billed and payable after final product delivery under mutually agreed retainer schedules or ad-hoc technical work orders.",
  },
];

export const PRICING_PRIMARY = [
  { name: "Website Only", desc: "High-converting custom site deployment", inr: "₹12,000", usd: "$150" },
  { name: "Starter Brand Pack", desc: "Visual identity & brand assets", inr: "₹15,000", usd: "$180" },
  { name: "Website + Logo + Special Design", desc: "Complete digital launch", inr: "₹15,000", usd: "$180" },
  {
    name: "AI Automation for Calls/Web",
    desc: "24/7 voice & web bot integration",
    inr: "₹15,000",
    usd: "$180",
  },
  {
    name: "Website + AI Automation",
    desc: "Web platform with embedded AI workflows",
    inr: "₹27,000",
    usd: "$330",
  },
  {
    name: "Web + Logo + Special + AI",
    desc: "Full brand and automated workflow stack",
    inr: "₹30,000",
    usd: "$370",
  },
  { name: "Growth Pack", desc: "Scalable growth architecture", inr: "₹35,000", usd: "$420" },
  {
    name: "Website + App + AI Suite",
    desc: "Web, mobile app, and full AI automation",
    inr: "₹36,000",
    usd: "$450",
  },
];

export const PRICING_ADVANCED = [
  {
    name: "Web + App + AI + Product Ad",
    desc: "Complete digital commerce engine",
    inr: "₹45,000",
    usd: "$550",
  },
  { name: "Mega All-Pack", desc: "All-inclusive technical and design suite", inr: "₹50,000", usd: "$600" },
  {
    name: "Scale Suite + Retainer",
    desc: "Infrastructure setup + monthly operations",
    inr: "₹75,000 + ₹10,000/mo",
    usd: "$900 + $120/mo",
  },
  {
    name: "E-Commerce AI Dominance",
    desc: "Conversational sales & AI inventory",
    inr: "₹60,000",
    usd: "$750",
  },
  {
    name: "AI Voice & Telephony Engine",
    desc: "Inbound/outbound calling stack",
    inr: "₹20,000 + ₹5,000/mo",
    usd: "Custom quote",
  },
  {
    name: "Digital Twin Content Machine",
    desc: "Autonomous AI content pipeline",
    inr: "₹40,000 + ₹12,000/mo",
    usd: "Custom quote",
  },
  {
    name: "Real Estate & Healthcare Accelerator",
    desc: "Vertical AI automation",
    inr: "₹65,000",
    usd: "$800",
  },
  {
    name: "Enterprise AI Retainer Pack",
    desc: "Full-scale dedicated AI operations",
    inr: "₹1,20,000",
    usd: "$1,500",
  },
];

export const SOFTWARE_OVERHEAD =
  "Active third-party software overheads, cloud hosting, API compute, and third-party SaaS subscriptions managed or required for full operational integration (including but not limited to Framer Pro, Claude Pro, Higgsfield, WATI, HeyGen, and Midjourney) are either factored directly into custom service agreements or billed separately based on actual deployment scale and token/API consumption.";

export const DELIVERY_CADENCE = [
  {
    days: "Days 1–2",
    title: "Strategy & Design",
    text: "Brand strategy alignment, visual identity logo creation, high-fidelity website wireframing, and design system approval.",
  },
  {
    days: "Days 3–4",
    title: "Production",
    text: "Full-stack website development, mobile application buildout, database schema configuration, and frontend responsiveness styling.",
  },
  {
    days: "Day 5",
    title: "AI & Integration",
    text: "AI telephony infrastructure setup, voice agent neural tuning, and WhatsApp automation workflow integration.",
  },
  {
    days: "Days 6–7",
    title: "QA, Demo & Launch",
    text: "AI video asset generation, end-to-end quality assurance, formal First Presentation demo to client, payment clearance, and live deployment.",
  },
];

export const ACKNOWLEDGEMENT =
  "By engaging PrisainTech services, client acknowledges and agrees to all financial payment triggers, pricing schedules, and operational protocols detailed herein.";

export const findPrice = (name) => [...PRICING_PRIMARY, ...PRICING_ADVANCED].find((p) => p.name === name);
