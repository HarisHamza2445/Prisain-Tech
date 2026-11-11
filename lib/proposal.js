// PrisainTech "Digital Growth & AI Automation Infrastructure" proposal: the packages, add-ons,
// retainers and terms the booking portal is built from. Amounts are in rupees.
// Each package carries what it contains (web, app, ai, media) so the portal knows which add-ons fit.

export const inr = (n) => "₹" + n.toLocaleString("en-IN");

export const SUMMARY = [
  "Most businesses fail to scale not because of poor products, but because of operational latency and fragmented customer acquisition engines. Traditional software houses deliver isolated, static assets: websites that sit idle, mobile apps without retention mechanisms, or manual support teams that leak leads after business hours.",
  "PrisainTech does not build simple digital brochureware. We deploy fully integrated, AI-automated revenue infrastructure. By unifying high-converting web interfaces, native mobile apps, autonomous AI call/text agents and high-cadence digital media retainers, we eliminate labour overhead, maximise client conversion rate and capture enterprise market dominance.",
];

export const PILLARS = [
  {
    title: "High-converting web",
    text: "Fast, responsive sites built to spec, with domain, SSL and deployment handled.",
  },
  {
    title: "Native mobile apps",
    text: "Cross-platform apps, submitted and approved on Google Play and the App Store.",
  },
  {
    title: "Autonomous AI agents",
    text: "Voice and text agents that answer, qualify and book around the clock.",
  },
  {
    title: "Media retainers",
    text: "AI product reels, performance ads and digital twin stories, delivered weekly.",
  },
];

export const ROI_INSIGHT =
  "Operating without AI automation costs the average SMB ₹45,000+ monthly in missed calls, delayed responses and manual staff hours. Deploying Tier 2 or Tier 4 pays for itself within the first 30 days of operation.";

export const TIERS = [
  {
    id: "t1",
    tier: "Tier 1",
    name: "The Foundation Suite",
    for: "For early-stage businesses needing immediate credibility",
    valued: 35000,
    price: 15000,
    has: { web: true, app: true },
    includes: [
      "Fully functional web ecosystem OR mobile app",
      "Custom deployment build tailored to your requirement form",
      "Complimentary domain registration & SSL configuration",
      "Full App Store / Play Store submission (if app chosen)",
      "Clean, high-speed UI layout optimised for conversion",
    ],
    benefit: "Lowest-friction entry point to establish digital market authority rapidly.",
  },
  {
    id: "t2",
    tier: "Tier 2",
    name: "The Core Growth Engine",
    for: "For scaling brands seeking automated operations",
    valued: 65000,
    price: 29900,
    popular: true,
    has: { web: true, ai: true },
    includes: [
      "Complete web architecture (responsive, custom spec)",
      "24/7 AI Automation Suite (call & text autonomous agents)",
      "Instant lead qualification, automatic scheduling & FAQ response",
      "Up to 5 custom page/element upgrades (₹2,500 value)",
      "Full analytics integration & operational handover",
    ],
    benefit: "Replaces human front-desk overhead with zero-latency AI lead capture.",
  },
  {
    id: "t3",
    tier: "Tier 3",
    name: "The Market Dominator",
    for: "For established players aiming for ecosystem control",
    valued: 95000,
    price: 44500,
    has: { web: true, app: true, ai: true, media: true },
    includes: [
      "Triple-threat tech stack: web + app + AI automation",
      "Complete Play Store & Apple App Store deployment",
      "Autonomous voice & SMS AI workflow automation",
      "Monthly content jumpstart: 7 AI product reels included",
      "Priority server architecture setup & optimisation",
    ],
    benefit: "Full multi-channel dominance pairing web, mobile, AI and organic reel marketing.",
  },
  {
    id: "t4",
    tier: "Tier 4",
    badge: "Exclusive",
    name: "Enterprise White-Glove VIP",
    for: "For high-ticket brands demanding total market supremacy",
    valued: 145000,
    price: 59900,
    has: { web: true, app: true, ai: true, media: true, pages: true },
    includes: [
      "Full-stack ecosystem: web + app + AI Automation Suite",
      "Continuous retainer engine: 8 digital twin reels + 7 product reels + 2 product ads monthly",
      "Dedicated AI engineer maintenance & monthly workflow retraining",
      "Uncapped custom page customisation & white-glove onboarding",
    ],
    benefit: "Hands-off enterprise growth pairing full tech infrastructure with media retainers.",
  },
];

export const SERVICES = [
  {
    id: "s1",
    name: "Website Baseline",
    scope:
      "Fully responsive, high-speed website built to client spec. Includes domain registration, SSL setup and deployment.",
    price: 15000,
    has: { web: true },
  },
  {
    id: "s2",
    name: "Custom Page / Upgrade",
    scope: "Specialised page layout, custom web module, or bespoke database logic customisation.",
    price: 500,
    unit: "page",
    has: { web: true },
  },
  {
    id: "s3",
    name: "Mobile App Baseline",
    scope:
      "Fully functional cross-platform app + complete submission to Google Play Store & Apple App Store.",
    price: 15000,
    has: { app: true },
  },
  {
    id: "s4",
    name: "AI Automation Suite",
    scope:
      "Autonomous AI voice & text agents to automate inbound inquiries, appointment booking and routine customer service.",
    price: 17000,
    has: { ai: true },
  },
  {
    id: "s5",
    name: "Product Ads (Retainer)",
    scope:
      "High-converting AI-generated functional product advertisement content designed for performance marketing campaigns.",
    price: 2000,
    unit: "ad",
    has: { media: true },
  },
  {
    id: "s6",
    name: "Product Reels (Retainer)",
    scope: "Batch of 7 AI-generated dynamic product showcase reels engineered for organic viral traction.",
    price: 5000,
    unit: "7 reels",
    has: { media: true },
  },
  {
    id: "s7",
    name: "Digital Twin Story Reels",
    scope:
      "Batch of 8 bespoke AI digital twin story videos engineered for brand authority and elite founder-led positioning.",
    price: 10000,
    unit: "8 reels",
    has: { media: true },
  },
];

export const BUNDLE_GROUPS = [
  {
    title: "Core standalone",
    items: [
      {
        id: "b1",
        name: "Website Baseline Only",
        price: 15000,
        has: { web: true },
      },
      {
        id: "b2",
        name: "Custom Web (Baseline + 10 Custom Pages)",
        price: 20000,
        has: { web: true },
      },
      { id: "b3", name: "Mobile App Only", price: 15000, has: { app: true } },
      {
        id: "b4",
        name: "AI Call/Text Automation Only",
        price: 17000,
        has: { ai: true },
      },
    ],
  },
  {
    title: "2-way bundles",
    items: [
      {
        id: "b5",
        name: "Web + Mobile App",
        price: 30000,
        has: { web: true, app: true },
      },
      {
        id: "b6",
        name: "Web + AI Automation Suite",
        price: 32000,
        has: { web: true, ai: true },
      },
      {
        id: "b7",
        name: "Mobile App + AI Automation Suite",
        price: 32000,
        has: { app: true, ai: true },
      },
      {
        id: "b8",
        name: "Web + Product Reels Retainer (7 Reels)",
        price: 20000,
        has: { web: true, media: true },
      },
      {
        id: "b9",
        name: "Mobile App + Digital Twin Retainer (8 Story Reels)",
        price: 25000,
        has: { app: true, media: true },
      },
    ],
  },
  {
    title: "3-way bundles",
    items: [
      {
        id: "b10",
        name: "Web + Mobile App + AI Automation Suite",
        price: 47000,
        has: { web: true, app: true, ai: true },
      },
      {
        id: "b11",
        name: "Web + AI Automation + Product Reels (7) & Ads (2 Ads)",
        price: 41000,
        has: { web: true, ai: true, media: true },
      },
      {
        id: "b12",
        name: "Mobile App + AI Automation + Digital Twin Reels (8)",
        price: 42000,
        has: { app: true, ai: true, media: true },
      },
    ],
  },
  {
    title: "4-way & full stack",
    items: [
      {
        id: "b13",
        name: "Complete Tech Build (Web + App + AI Automation + Ads + Product Reels + Digital Twin Reels)",
        price: 64000,
        note: "Raw stack total",
        has: { web: true, app: true, ai: true, media: true },
      },
    ],
  },
];

export const BUNDLES = BUNDLE_GROUPS.flatMap((g) => g.items.map((b) => ({ ...b, group: g.title })));

// Custom scaling add-ons. `rate` is the price when added to a package; `standalone` the price on its own.
// `fits` says which packages can take the add-on.
export const ADDONS = [
  {
    id: "pages",
    name: "Custom Page Expansion",
    text: "Bespoke UI landing page, specialised sales funnel layout, or custom web form integration.",
    standalone: 750,
    rate: 500,
    unit: "page",
    max: 50,
    fits: (has) => has.web && !has.pages,
  },
  {
    id: "ads",
    name: "Product Ads Volume",
    text: "High-converting AI performance ads crafted specifically for Meta, Google or TikTok paid campaigns.",
    standalone: 2500,
    rate: 2000,
    unit: "ad",
    max: 50,
    fits: () => true,
  },
  {
    id: "reels",
    name: "Organic Product Reels Pack",
    text: "7 AI-generated dynamic product demonstration short-form videos optimised for viral organic discovery.",
    standalone: 7500,
    rate: 5000,
    unit: "pack of 7 reels",
    max: 12,
    fits: () => true,
  },
  {
    id: "twin",
    name: "Digital Twin Story Suite",
    text: "8 AI digital twin video stories featuring hyper-realistic founder or brand avatar storytelling.",
    standalone: 15000,
    rate: 10000,
    unit: "pack of 8 reels",
    max: 12,
    fits: () => true,
  },
  {
    id: "voice",
    name: "AI Voice Agent Expansion",
    text: "Custom multi-language voice models, CRM deep integrations (HubSpot/Salesforce) and bespoke webhook logic.",
    standalone: 25000,
    rate: 15000,
    unit: "integration",
    max: 10,
    fits: (has) => has.ai,
  },
  {
    id: "aso",
    name: "App Store Optimisation (ASO)",
    text: "Bespoke App Store keyword research, high-converting screenshots and store copy optimisation.",
    standalone: 8000,
    rate: 4500,
    unit: "one-time",
    once: true,
    fits: (has) => has.app,
  },
];

export const RETAINERS = [
  {
    id: "growth",
    name: "Growth Retainer",
    output: "7 product reels + 2 performance ads monthly",
    standard: 12000,
    price: 7500,
  },
  {
    id: "authority",
    name: "Authority Retainer",
    output: "8 digital twin story reels + 7 product reels monthly",
    standard: 20000,
    price: 12900,
  },
  {
    id: "dominance",
    name: "Dominance Retainer",
    output: "8 digital twin reels + 14 product reels + 5 product ads monthly",
    standard: 35000,
    price: 19500,
  },
];

export const RETAINER_NOTE =
  "All media retainer contracts operate on a flexible 30-day rolling term. Content assets are delivered in structured weekly batches, ready for instant publishing.";

export const GUARANTEES = [
  {
    title: "100% operational capability guarantee",
    text: "All web platforms, mobile applications and AI voice/text agents will deploy fully functional according to the agreed-upon specification document. If any component fails to perform its defined task, our engineering team will remediate the issue at zero additional cost within 48 business hours.",
  },
  {
    title: "Seamless App Store approval guarantee",
    text: "Mobile application builds in Tier 1, Tier 3 and Tier 4 include full submission management. We guarantee approval on both the Google Play Store and Apple App Store. If a store rejects the app on technical compliance, PrisainTech handles all revisions until final publication.",
  },
  {
    title: "Intellectual property ownership & privacy",
    text: "Upon final milestone payment, 100% of code, customised AI workflows, media assets, digital twins and design files become your exclusive corporate property. PrisainTech retains zero restrictive licensing rights.",
  },
];

export const NEXT_STEPS = [
  "Select your preferred investment package and any optional add-ons.",
  "Sign the execution agreement to lock in current price anchoring.",
  "Complete the PrisainTech onboarding requirement form to start sprint engineering.",
];

const KINDS = {
  tier: "Strategic tier",
  bundle: "Bundle",
  service: "Individual service",
};

export function findBase(id) {
  const tier = TIERS.find((t) => t.id === id);
  if (tier) return { ...tier, kind: "tier", label: `${tier.tier} · ${tier.name}` };
  const bundle = BUNDLES.find((b) => b.id === id);
  if (bundle) return { ...bundle, kind: "bundle", label: bundle.name };
  const service = SERVICES.find((s) => s.id === id);
  if (service) return { ...service, kind: "service", label: service.name };
  return null;
}

export const kindLabel = (base) => KINDS[base.kind];

export const addonsFor = (base) => (base ? ADDONS.filter((a) => a.fits(base.has)) : []);

// Turns { baseId, addons: { id: qty }, retainerId } into priced lines and totals.
export function priceOrder(order) {
  const base = findBase(order.baseId);
  if (!base) return null;
  const addons = addonsFor(base)
    .filter((a) => order.addons[a.id] > 0)
    .map((a) => {
      const qty = a.once ? 1 : order.addons[a.id];
      return {
        ...a,
        qty,
        amount: qty * a.rate,
        saved: qty * (a.standalone - a.rate),
      };
    });
  const retainer = base.has.media ? RETAINERS.find((r) => r.id === order.retainerId) || null : null;
  const oneTime = base.price + addons.reduce((sum, a) => sum + a.amount, 0);
  const monthly = retainer ? retainer.price : 0;
  const saved =
    (base.valued ? base.valued - base.price : 0) +
    addons.reduce((sum, a) => sum + a.saved, 0) +
    (retainer ? retainer.standard - retainer.price : 0);
  return { base, addons, retainer, oneTime, monthly, saved };
}

export const addonLine = (a) =>
  a.once ? `${a.name}: ${inr(a.amount)} one-time` : `${a.name}: ${a.qty} × ${a.unit} = ${inr(a.amount)}`;

export const totalLine = (q) => inr(q.oneTime) + (q.monthly ? ` + ${inr(q.monthly)} / month` : "");
