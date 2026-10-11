"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { SERVICE_VISUALS } from "./ServiceVisuals";

export function Services() {
  const [active, setActive] = useState(0);
  const items = useRef([]);

  // on scroll, the service nearest the middle of the screen becomes active
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActive(items.current.indexOf(entry.target))),
      { rootMargin: innerWidth < 900 ? "-55% 0px -40% 0px" : "-48% 0px -48% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const onHover = (i) => matchMedia("(hover:hover)").matches && setActive(i);

  return (
    <section className="sec wrap" id="services" data-bg="#060913" aria-labelledby="svc-h">
      <div className="sec-head">
        <span className="label">
          <b>03</b> — Services
        </span>
        <h2 className="display d-l" id="svc-h" data-reveal>
          <span className="ln">
            <span>One studio.</span>
          </span>
          <span className="ln">
            <span>
              Your whole <em>digital engine.</em>
            </span>
          </span>
        </h2>
      </div>
      <div className="svc">
        <div className="svc-stage" aria-hidden="true">
          {SERVICE_VISUALS.map((visual, i) => (
            <div key={i} className={i === active ? "svc-vis on" : "svc-vis"}>
              {visual}
            </div>
          ))}
          <div className="svc-cap">
            <span className="label">{String(active + 1).padStart(2, "0")} / 06</span>
            <span className="label">{SERVICES[active].title}</span>
          </div>
        </div>
        <ul className="svc-list">
          {SERVICES.map((service, i) => (
            <li
              key={service.title}
              className={i === active ? "svc-item on" : "svc-item"}
              ref={(el) => {
                items.current[i] = el;
              }}
            >
              <button
                type="button"
                aria-expanded={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => onHover(i)}
                onFocus={() => setActive(i)}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
