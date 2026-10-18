export function About() {
  return (
    <section className="sec wrap" id="about" data-bg="#0C1226" aria-labelledby="about-h">
      <div className="story-grid">
        <span className="label" style={{ gridColumn: "1/-1", marginBottom: "24px" }}>
          <b>08</b>
          {" — Our story"}
        </span>
        <h2 className="display" id="about-h" data-reveal>
          <span className="ln">
            <span>Born from</span>
          </span>
          <span className="ln">
            <span>curiosity about</span>
          </span>
          <span className="ln">
            <span>
              <em>AI agents.</em>
            </span>
          </span>
        </h2>
        <div className="story-copy">
          <p className="first">
            PrisainTech was born out of a deep passion and curiosity about technology and AI agents.
          </p>
          <p>
            Saina, an aspiring cricketer who wanted a tech side hustle, teamed up with Priyanka, a web
            designer. Haris joined later as CTO and lead software developer.
          </p>
          <p>
            Together they grew from building custom websites to advanced AI automations, ads and complete
            digital engines for businesses.
          </p>
        </div>
        <div className="path" aria-label="How we grew">
          <span>Custom websites</span>
          <i></i>
          <span>Apps</span>
          <i></i>
          <span>AI automations</span>
          <i></i>
          <span>AI ads</span>
          <i></i>
          <span>Digital engines</span>
        </div>
      </div>
      <div className="team">
        <article className="person">
          <div className="portrait" aria-hidden="true">
            <span className="grid"></span>
            <span className="ini">S</span>
            <span className="px" style={{ right: "16%", top: "22%" }}></span>
            <span className="role-v">
              <span className="label">SH</span>
              <span className="label">01</span>
            </span>
          </div>
          <div>
            <h3>Saina Harjwani</h3>
            <span className="label role">{"Co-founder & CEO"}</span>
            <p>
              {
                "Saina leads PrisainTech's vision and growth, bringing a cricketer's discipline and competitive drive to every client launch."
              }
            </p>
          </div>
        </article>
        <article className="person">
          <div className="portrait" aria-hidden="true">
            <span className="grid"></span>
            <span className="ini">P</span>
            <span className="px" style={{ left: "18%", bottom: "20%" }}></span>
            <span className="role-v">
              <span className="label">PB</span>
              <span className="label">02</span>
            </span>
          </div>
          <div>
            <h3>Priyanka Beniwal</h3>
            <span className="label role">{"Co-founder & Web Designer"}</span>
            <p>
              Priyanka shapes how every PrisainTech site looks and feels, with a focus on user-centered design
              and interfaces that convert.
            </p>
          </div>
        </article>
        <article className="person">
          <div className="portrait" aria-hidden="true">
            <span className="grid"></span>
            <span className="ini">H</span>
            <span className="px" style={{ right: "22%", bottom: "26%" }}></span>
            <span className="role-v">
              <span className="label">HHA</span>
              <span className="label">03</span>
            </span>
          </div>
          <div>
            <h3>Haris Hamza Ali</h3>
            <span className="label role">{"CTO & Lead Software Developer"}</span>
            <p>
              Haris turns designs into fast, responsive websites and apps, and wires up the AI automations
              that run behind them.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
