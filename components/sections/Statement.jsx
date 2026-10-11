export function Statement() {
  return (
    <section className="statement wrap" id="statement" data-bg="#070B18" aria-labelledby="st-h">
      <h2 className="display" id="st-h">
        <span className="row r1" data-x="-6">
          <span className="w">We</span> <span className="w">build</span> <span className="w">websites</span>
        </span>
        <span className="row r2" data-x="5">
          <span className="w">that</span> <span className="w">sell.</span>
        </span>
        <span className="row r3" data-x="-3">
          <span className="w">And</span> <span className="w">AI</span> <span className="w">that</span>{" "}
          <span className="w">works</span>
        </span>
        <span className="row r4" data-x="8">
          <em>
            <span className="w">around</span> <span className="w">the</span> <span className="w">clock.</span>
          </em>
        </span>
      </h2>
      <div className="statement-body">
        <span className="label">
          <b>02</b>
          {" — What we do"}
        </span>
        <p className="lede">
          A beautiful website is only the start. We pair high-performance design with AI agents that answer
          calls, reply on WhatsApp, follow up on leads and produce your ads, so your business keeps moving
          while your team focuses on the work only people can do.
        </p>
      </div>
    </section>
  );
}
