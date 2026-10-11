export function Mission() {
  return (
    <section className="sec wrap mission" id="mission" aria-labelledby="ms-h">
      <div className="mission-grid">
        <div className="seven" aria-hidden="true">
          <span className="num">7</span>
          <span className="cap">
            Day
            <br />
            delivery
            <br />
            policy
          </span>
        </div>
        <div className="mission-copy">
          <span className="label">
            <b>08</b>
            {" — Mission & vision"}
          </span>
          <h2 className="display" id="ms-h">
            {"Technology that takes the "}
            <em>routine</em>
            {" off your plate."}
          </h2>
          <div className="mv">
            <div>
              <h3>Mission</h3>
              <p>
                To give businesses a reliable, dedicated technology platform that eases human workflows, from
                websites that sell to AI receptionists that never miss a call.
              </p>
            </div>
            <div>
              <h3>Vision</h3>
              <p>
                Online operations that feel effortless for every business we work with, delivered fast through
                our signature 7-day delivery policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
