import { CopyButton } from "@/components/CopyButton";
import { WA_GENERAL } from "@/lib/site";

export function Contact() {
  return (
    <section className="sec wrap" id="contact" data-bg="#060913" aria-labelledby="ct-h">
      <div className="sec-head">
        <span className="label">
          <b>11</b>
          {" — Contact"}
        </span>
        <h2 className="display d-m" id="ct-h">
          {"Talk to a person. "}
          <em>Or our AI.</em>
          {" We answer both."}
        </h2>
      </div>
      <div className="channels">
        <div className="ch wa">
          <span className="label">WhatsApp</span>
          <span className="val">+91 89757 66680</span>
          <p>The fastest way to reach us. Ask about a package, share your idea or book a call.</p>
          <div className="row">
            <a href={WA_GENERAL} className="btn btn-wa" target="_blank" rel="noopener">
              <svg aria-hidden="true">
                <use href="#i-chat" />
              </svg>
              {" Open WhatsApp chat "}
              <span className="arr">↗</span>
            </a>
            <CopyButton value="+918975766680" className="btn btn-ghost btn-sm">
              Copy number
            </CopyButton>
          </div>
        </div>
        <div className="ch">
          <span className="label">Email</span>
          <span className="val">
            prisaintech@
            <wbr />
            prisaintech.com
          </span>
          <p>For detailed briefs, documents and partnership enquiries.</p>
          <div className="row">
            <a
              className="btn btn-primary"
              href="mailto:prisaintech@prisaintech.com?subject=Project%20enquiry"
            >
              {"Write an email "}
              <span className="arr">→</span>
            </a>
            <CopyButton value="prisaintech@prisaintech.com" className="btn btn-ghost btn-sm">
              Copy address
            </CopyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
