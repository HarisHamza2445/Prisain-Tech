"use client";

import { useEffect, useRef, useState } from "react";
import { AGREEMENT_VERSION, agreementSections, newAgreementRef } from "@/lib/contract";
import { waUrl } from "@/lib/site";

const formatDate = (d) =>
  d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }) + " IST";

// Signature pad: dark ink on a light card, sized for the screen's pixel density.
function useSignaturePad(canvasRef) {
  const [hasInk, setHasInk] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fit = () => {
      const ratio = devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0A0E1A";
      setHasInk(false);
    };
    fit();
    let drawing = false;
    const point = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const down = (e) => {
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      ctx.beginPath();
      ctx.moveTo(...point(e));
    };
    const move = (e) => {
      if (!drawing) return;
      ctx.lineTo(...point(e));
      ctx.stroke();
      setHasInk(true);
    };
    const up = () => (drawing = false);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, [canvasRef]);

  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };
  return { hasInk, clear };
}

async function buildPdf({ pkg, client, ref, signedAt, signature }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 56,
    width = 483,
    bottom = 780;
  let y = 64;
  const ensure = (h) => {
    if (y + h > bottom) {
      doc.addPage();
      y = 64;
    }
  };
  const para = (text, size = 10, gap = 6) => {
    doc.setFontSize(size);
    for (const line of doc.splitTextToSize(text, width)) {
      ensure(size + 4);
      doc.text(line, left, y);
      y += size + 4;
    }
    y += gap;
  };
  doc.setFont("helvetica", "bold");
  para("PRISAINTECH", 11, 2);
  para("Client Service Agreement", 18, 4);
  doc.setFont("helvetica", "normal");
  para(`Reference ${ref} · Version ${AGREEMENT_VERSION}`, 9, 14);
  for (const s of agreementSections(pkg, client)) {
    doc.setFont("helvetica", "bold");
    para(s.heading, 10.5, 2);
    doc.setFont("helvetica", "normal");
    para(s.body);
    if (s.list) for (const item of s.list) para("•  " + item, 10, 2);
    y += 4;
  }
  ensure(170);
  y += 8;
  doc.setFont("helvetica", "bold");
  para("Signed by the Client", 10.5, 6);
  doc.addImage(signature, "PNG", left, y, 200, 70);
  y += 78;
  doc.setDrawColor(150);
  doc.line(left, y, left + 220, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  para(`Name: ${client.name}`, 10, 0);
  if (client.business) para(`Business: ${client.business}`, 10, 0);
  para(`Signed electronically on ${formatDate(signedAt)}`, 10, 0);
  para(`Package: ${pkg.name}`, 10, 0);
  doc.save(`PrisainTech-Agreement-${ref}.pdf`);
}

export function AgreementStep({ pkg, defaultName, defaultBusiness, locked }) {
  const canvasRef = useRef(null);
  const { hasInk, clear } = useSignaturePad(canvasRef);
  const [name, setName] = useState(defaultName);
  const [business, setBusiness] = useState(defaultBusiness);
  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(null); // { ref, signedAt, signature }
  const [error, setError] = useState("");

  useEffect(() => setName((n) => n || defaultName), [defaultName]);
  useEffect(() => setBusiness((b) => b || defaultBusiness), [defaultBusiness]);

  const client = { name: name.trim(), business: business.trim() };
  const ready = client.name.length > 1 && agreed && hasInk;

  const sign = async () => {
    if (!ready) {
      setError(
        !client.name
          ? "Add your full name."
          : !hasInk
            ? "Draw your signature in the box."
            : "Tick the box to agree.",
      );
      return;
    }
    setError("");
    const record = {
      ref: newAgreementRef(),
      signedAt: new Date(),
      signature: canvasRef.current.toDataURL("image/png"),
    };
    setSigned(record);
    await buildPdf({ pkg, client, ...record });
  };

  const confirmText = signed
    ? [
        "Hi PrisainTech! I've signed the client agreement.",
        "",
        "Reference: " + signed.ref,
        "Package: " + pkg.name,
        "Name: " + client.name,
        ...(client.business ? ["Business: " + client.business] : []),
        "Signed: " + formatDate(signed.signedAt),
        "",
        "I'm attaching the signed PDF here.",
      ].join("\n")
    : "";

  return (
    <div className={signed ? "bk-step done" : locked ? "bk-step locked" : "bk-step"}>
      <span className="num">3</span>
      <div className="agree" inert={locked}>
        <h3>Sign the client agreement</h3>
        <p>Read the terms for this package, then sign below. You&apos;ll get a signed PDF copy.</p>

        <div className="agree-doc" tabIndex={0} aria-label="Client agreement">
          {agreementSections(pkg, client).map((s) => (
            <section key={s.heading}>
              <h4>{s.heading}</h4>
              <p>{s.body}</p>
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {!signed ? (
          <>
            <div className="bk-fields">
              <label htmlFor="agName">
                Full name
                <input
                  id="agName"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="agBiz">
                Business
                <input
                  id="agBiz"
                  autoComplete="organization"
                  placeholder="Optional"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                />
              </label>
            </div>
            <div className="sig">
              <div className="sig-head">
                <span className="label">Signature</span>
                <button type="button" className="linkish" onClick={clear}>
                  Clear
                </button>
              </div>
              <canvas ref={canvasRef} className="sig-pad" aria-label="Draw your signature" />
            </div>
            <label className="agree-check">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />I have
              read and agree to the PrisainTech client agreement.
            </label>
            {error && (
              <p className="agree-err" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              className={ready ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
              onClick={sign}
            >
              Sign agreement <span className="arr">→</span>
            </button>
          </>
        ) : (
          <div className="agree-done" role="status">
            <p>
              Signed by <b>{client.name}</b> on {formatDate(signed.signedAt)}. Reference <b>{signed.ref}</b>.
              Your PDF copy has downloaded.
            </p>
            <div className="agree-actions">
              <a className="btn btn-wa btn-sm" href={waUrl(confirmText)} target="_blank" rel="noopener">
                <svg aria-hidden="true">
                  <use href="#i-chat" />
                </svg>
                Send signed copy on WhatsApp <span className="arr">↗</span>
              </a>
              <button type="button" className="linkish" onClick={() => buildPdf({ pkg, client, ...signed })}>
                Download PDF again
              </button>
            </div>
            <p className="agree-note">
              WhatsApp opens with the details filled in. Attach the PDF there and press send.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
