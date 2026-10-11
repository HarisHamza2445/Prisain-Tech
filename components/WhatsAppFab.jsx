import { WA_GENERAL } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={WA_GENERAL}
      target="_blank"
      rel="noopener"
      aria-label="Chat with PrisainTech on WhatsApp"
    >
      <span className="dot">
        <svg aria-hidden="true">
          <use href="#i-chat" />
        </svg>
      </span>
      <span className="txt">Chat on WhatsApp</span>
    </a>
  );
}
