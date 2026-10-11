"use client";

import { useCallback, useEffect, useState } from "react";

const WORD = "PRISAINTECH";

// The opening mark animation. When it finishes it flips <html> from "pre" to
// "ready", which lets the hero text in and tells the 3D stage to assemble.
export function Intro() {
  const [phase, setPhase] = useState("playing"); // playing -> leaving -> gone

  const finish = useCallback(() => {
    setPhase((p) => (p === "playing" ? "leaving" : p));
  }, []);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(finish, reduce ? 0 : 1100);
    const onKey = (e) => e.key === "Escape" && finish();
    addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      removeEventListener("keydown", onKey);
    };
  }, [finish]);

  useEffect(() => {
    if (phase !== "leaving") return;
    // flipped right away rather than on the next frame: a tab opened in the
    // background gets no frames, and the hero must not stay hidden there
    const root = document.documentElement;
    root.classList.remove("pre");
    root.classList.add("ready");
    dispatchEvent(new Event("pt:ready"));
    const timer = setTimeout(() => setPhase("gone"), 800);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div id="intro" className={phase === "leaving" ? "out" : undefined} aria-hidden="true">
      <div className="intro-inner">
        <svg className="intro-mark" viewBox="0 0 48 48">
          <path className="im-a" fill="url(#chrome-g)" d="M24 5.5L42.5 14.75L24 24L5.5 14.75Z" />
          <g
            className="im-b"
            fill="none"
            stroke="#C9D0E6"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path opacity=".62" d="M7 23.2L24 31.7L41 23.2" />
            <path opacity=".32" d="M7 31.4L24 39.9L41 31.4" />
          </g>
          <g clipPath="url(#ps-clip)">
            <rect
              className="im-shine"
              x="-10"
              y="0"
              width="22"
              height="48"
              fill="url(#shine-g)"
              transform="skewX(-20)"
            />
          </g>
          <path className="im-node" d="M24 11.6L30.3 14.75L24 17.9L17.7 14.75Z" />
        </svg>
        <div className="intro-word">
          {[...WORD].map((letter, i) => (
            <i key={i} className={i > 6 ? "lt" : undefined} style={{ "--i": i }}>
              {letter}
            </i>
          ))}
        </div>
      </div>
      <span className="intro-count label">Websites · Apps · AI automation</span>
      <button className="intro-skip" type="button" onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
