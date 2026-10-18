"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll choreography and pointer effects for the server-rendered sections.
// Everything is created inside one gsap context so it can be undone together.
export function ScrollFX() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stRows = [...document.querySelectorAll(".statement .row")];
    const stWords = [...document.querySelectorAll(".statement .w")];

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      document.querySelectorAll("[data-bg]").forEach((sec) =>
        ScrollTrigger.create({
          trigger: sec,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive)
              gsap.to(document.body, {
                backgroundColor: sec.dataset.bg,
                duration: reduce ? 0 : 0.9,
                ease: "power2.out",
              });
          },
        }),
      );
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.querySelectorAll("[data-reveal]").forEach((el) =>
          gsap.from(el.querySelectorAll(".ln>span"), {
            yPercent: 105,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }),
        );
        stRows.forEach((r) =>
          gsap.fromTo(
            r,
            { xPercent: +r.dataset.x },
            {
              xPercent: -r.dataset.x * 0.4,
              ease: "none",
              scrollTrigger: { trigger: ".statement", start: "top bottom", end: "bottom top", scrub: true },
            },
          ),
        );
        ScrollTrigger.create({
          trigger: ".statement h2",
          start: "top 80%",
          end: "bottom 45%",
          scrub: true,
          onUpdate: (s) => {
            const n = stWords.length;
            stWords.forEach((w, i) => {
              const p = Math.min(1, Math.max(0, s.progress * n * 1.15 - i));
              w.style.opacity = (0.18 + 0.82 * p).toFixed(3);
            });
          },
        });
        document.querySelectorAll("[data-par]").forEach((el) =>
          gsap.fromTo(
            el,
            { yPercent: +el.dataset.par },
            {
              yPercent: -el.dataset.par,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          ),
        );
        const steps = [...document.querySelectorAll(".step")];
        steps.forEach((s) => s.classList.remove("lit"));
        gsap.fromTo(
          "#stepFill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#steps",
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
              onUpdate: (s) =>
                steps.forEach((st, i) =>
                  st.classList.toggle("lit", s.progress >= i / (steps.length - 1) - 0.02),
                ),
            },
          },
        );
        steps.forEach((st) =>
          gsap.from(st.children, {
            x: 30,
            opacity: 0.15,
            duration: 1,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: { trigger: st, start: "top 80%", once: true },
          }),
        );
        gsap.from(".person", {
          y: 80,
          opacity: 0.2,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".team", start: "top 80%", once: true },
        });
        gsap.from(".seven .num", {
          yPercent: 30,
          opacity: 0.2,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".mission", start: "top 75%", once: true },
        });
        gsap.fromTo(
          ".cta-ring",
          { scale: 0.7, opacity: 0 },
          {
            scale: 1.15,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: ".cta", start: "top bottom", end: "center center", scrub: true },
          },
        );
        document.querySelectorAll(".proj-info").forEach((p) =>
          gsap.from(p.children, {
            y: 30,
            opacity: 0.15,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.07,
            scrollTrigger: { trigger: p, start: "top 82%", once: true },
          }),
        );
        gsap.utils
          .toArray(".sec-head .label, main .lede, .pk-intro p, .statement-body .label")
          .forEach((el) =>
            gsap.from(el, {
              y: 18,
              opacity: 0.2,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }),
          );
        document.querySelectorAll(".mock").forEach((m) =>
          gsap.from(m, {
            scale: 0.94,
            opacity: 0.3,
            duration: 1.3,
            ease: "expo.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: m, start: "top 85%", once: true },
          }),
        );
        gsap.from(".path > *", {
          x: -12,
          opacity: 0.1,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".path", start: "top 90%", once: true },
        });
        gsap.from(".ch", {
          y: 40,
          opacity: 0.2,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".channels", start: "top 84%", once: true },
        });
        gsap.from(".pr-step", {
          y: 24,
          opacity: 0.15,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".pr-flow", start: "top 85%", once: true },
        });
        gsap.from(".pr-value", {
          y: 28,
          opacity: 0.15,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".pr-values", start: "top 85%", once: true },
        });
        gsap.from(".foot-brand, .foot-col", {
          y: 24,
          opacity: 0.2,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "footer", start: "top 88%", once: true },
        });
        gsap.from(".foot-giant", {
          yPercent: 35,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: ".foot-giant", start: "top 98%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        stWords.forEach((w) => (w.style.opacity = 1));
      });
    });

    const refresh = () => {
      ScrollTrigger.refresh();
      dispatchEvent(new Event("pt:refresh"));
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    addEventListener("load", refresh);

    // portraits tilt towards the pointer; cards get a spotlight under it
    const hover = !reduce && matchMedia("(hover:hover)").matches;
    const onMove = (e) => {
      const el = e.target.closest ? e.target : null;
      if (!el) return;
      const portrait = el.closest(".portrait");
      if (portrait) {
        const r = portrait.getBoundingClientRect();
        portrait.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 14 + "deg");
        portrait.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 12 + "deg");
      }
      const card = el.closest(".pk,.ch");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      }
    };
    const onLeave = (e) => {
      if (e.target.classList && e.target.classList.contains("portrait")) {
        e.target.style.setProperty("--ry", "0deg");
        e.target.style.setProperty("--rx", "0deg");
      }
    };
    if (hover) {
      addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave, true);
    }

    return () => {
      removeEventListener("load", refresh);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave, true);
      ctx.revert();
    };
  }, []);

  return null;
}
