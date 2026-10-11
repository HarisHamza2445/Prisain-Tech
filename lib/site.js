// Everything about the business that appears in more than one place.
export const SITE = {
  name: "PrisainTech",
  tagline: "Websites that sell. AI that works 24/7.",
  description:
    "PrisainTech builds high-performance websites, apps and AI automation — voice receptionists, WhatsApp workflows and AI video ads — delivered in 7 days.",
  whatsappNumber: "918975766680",
  whatsappDisplay: "+91 89757 66680",
  email: "prisaintech@prisaintech.com",
  intakeFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfnpxKHNA-9sGvZLKZdrWut4ELi8vK6ySR2d4hoheJgcG_JjA/viewform?usp=header",
};

export const waUrl = (text) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const WA_GENERAL = waUrl(
  "Hi PrisainTech! I'd like to know more about your websites and AI automation.",
);

export const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "booking", label: "Packages" },
  { id: "process", label: "7-Day Delivery" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
