import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SvgDefs } from "@/components/SvgDefs";
import { ToastProvider } from "@/components/Toast";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ROLES, applyUrl } from "@/lib/careers";

export const metadata = {
  title: "Careers",
  description: "Open roles at PrisainTech: marketing and AI automation. Apply on WhatsApp.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <ToastProvider>
      <SvgDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="aura" aria-hidden="true" />
      <Nav />
      <WhatsAppFab />
      <main id="main" className="careers">
        <section className="careers-hero wrap" aria-labelledby="careers-h">
          <span className="label">
            <span className="live" />
            Careers · {ROLES.length} open roles
          </span>
          <h1 className="display" id="careers-h">
            Build the engine <em>with us.</em>
          </h1>
          <p className="lede">
            PrisainTech is a small studio building websites and AI automation for businesses. If you want your
            work to go live every week, we&apos;d like to hear from you.
          </p>
        </section>

        <section className="careers-roles wrap" aria-label="Open roles">
          {ROLES.map((role, i) => (
            <article className="role" key={role.key} id={role.key}>
              <div className="role-head">
                <span className="label">
                  <b>{String(i + 1).padStart(2, "0")}</b> Open role
                </span>
                <h2>{role.title}</h2>
                <p>{role.summary}</p>
              </div>
              <div className="role-body">
                <h3 className="label">What you&apos;ll work on</h3>
                <ul>
                  {role.work.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <a className="btn btn-wa" href={applyUrl(role.title)} target="_blank" rel="noopener">
                  <svg aria-hidden="true">
                    <use href="#i-chat" />
                  </svg>
                  Apply on WhatsApp <span className="arr">↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="careers-how wrap" aria-labelledby="how-h">
          <h2 className="label" id="how-h">
            How to apply
          </h2>
          <ol>
            <li>Tap Apply on the role you want. WhatsApp opens with your message ready.</li>
            <li>Add a line about yourself and a link to your work, portfolio or CV, then send.</li>
            <li>We reply on WhatsApp to set up a short call.</li>
          </ol>
        </section>
      </main>
      <Footer />
    </ToastProvider>
  );
}
