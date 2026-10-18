import { waUrl } from "@/lib/site";

export const ROLES = [
  {
    key: "marketing",
    title: "Marketing",
    summary: "Social media, ads and campaigns for our clients.",
    work: [
      "Plan and post social media content for client brands",
      "Run launch campaigns alongside the AI video ads we produce",
      "Report what worked each month and suggest what to try next",
    ],
  },
  {
    key: "ai-automation",
    title: "AI automation",
    summary: "Voice agents, WhatsApp bots and AI workflows.",
    work: [
      "Set up AI voice receptionists that answer calls and book appointments",
      "Build WhatsApp chatbots, follow-ups and cart-recovery flows",
      "Connect lead capture to calendars, sheets and CRMs",
    ],
  },
];

export const applyUrl = (role) =>
  waUrl(`Hi PrisainTech! I saw you're hiring. I'd like to apply for the ${role} role.`);
