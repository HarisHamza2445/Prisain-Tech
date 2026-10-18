"use client";

import { useEffect, useRef, useState } from "react";
import { AGREEMENT_VERSION, agreementSections, newAgreementRef } from "@/lib/contract";
import { signatureFont } from "@/lib/fonts";
import { POLICY_PDF } from "@/lib/policy";
import { waUrl } from "@/lib/site";

const formatDate = (d) =>
  d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }) + " IST";

// Writes a name in the signature face onto a transparent image.
async function typedSignature(text, fontFamily) {
  await document.fonts.load(`96px ${fontFamily}`);
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 260;
  const ctx = canvas.getContext("2d");
  let size = 150;
  do {
    ctx.font = `${size}px ${fontFamily}`;
    size -= 6;
  } while (ctx.measureText(text).width > 840 && size > 40);
  ctx.fillStyle = "#0A0E1A";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 450, 140);
  return canvas.toDataURL("image/png");
}

// Draw-with-finger pad: dark ink on a light card, sized for the screen's pixel density.
function useSignaturePad(canvasRef, active) {
  const [hasInk, setHasInk] = useState(false);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ratio = devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    Object.assign(ctx, { lineWidth: 2.2, lineCap: "round", lineJoin: "round", strokeStyle: "#0A0E1A" });
    setHasInk(false);
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
  }, [canvasRef, active]);

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
  para("Company Policy, Pricing Terms & Service Agreement", 15, 4);
  doc.setFont("helvetica", "normal");
  para(`Reference ${ref} · Version ${AGREEMENT_VERSION}`, 9, 14);
  for (const s of agreementSections(pkg, client)) {
    doc.setFont("helvetica", "bold");
    para(s.heading, 10.5, 2);
    doc.setFont("helvetica", "normal");
    if (s.body) para(s.body);
    if (s.parts)
      for (const part of s.parts) {
        doc.setFont("helvetica", "bold");
        para(part.title, 9.5, 1);
        doc.setFont("helvetica", "normal");
        para(part.text, 9.5, 4);
      }
    if (s.list) for (const item of s.list) para("•  " + item, 10, 2);
    y += 4;
  }

  // the client's signature block
  ensure(190);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Signed by the Client", left, y);
  y += 10;
  doc.addImage(signature, "PNG", left, y, 210, 61);
  y += 66;
  doc.setDrawColor(150);
  doc.line(left, y, left + 240, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  for (const line of [
    client.name,
    ...(client.business ? [client.business] : []),
    ...(client.phone ? [`WhatsApp: ${client.phone}`] : []),
    `Signed electronically on ${formatDate(signedAt)}`,
  ]) {
    doc.text(line, left, y);
    y += 13;
  }
  y += 10;
  para(`Package: ${pkg.name} · Reference ${ref}`, 9, 0);
  return doc;
}

const download = (doc, ref) => doc.save(`PrisainTech-Agreement-${ref}.pdf`);

export function AgreementStep({ pkg, defaultName, defaultBusiness, locked }) {
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const [mode, setMode] = useState("type");
  const { hasInk, clear } = useSignaturePad(canvasRef, mode === "draw" && !locked);
  const [name, setName] = useState(defaultName);
  const [business, setBusiness] = useState(defaultBusiness);
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [signed, setSigned] = useState(null); // { ref, signedAt, doc }
  const [error, setError] = useState("");

  useEffect(() => setName((n) => n || defaultName), [defaultName]);
  useEffect(() => setBusiness((b) => b || defaultBusiness), [defaultBusiness]);

  const client = { name: name.trim(), business: business.trim(), phone: phone.trim() };
  const phoneOk = client.phone.replace(/\D/g, "").length >= 10;
  const hasSignature = mode === "type" ? client.name.length > 1 : hasInk;
  const ready = client.name.length > 1 && phoneOk && agreed && hasSignature;

  const sign = async () => {
    if (!ready) {
      setError(
        client.name.length < 2
          ? "Add your full name."
          : !phoneOk
            ? "Add your WhatsApp number so we can reach you."
            : !hasSignature
              ? "Draw your signature in the box."
              : "Tick the box to agree.",
      );
      return;
    }
    setError("");
    setBusy(true);
    try {
      const family = getComputedStyle(previewRef.current).fontFamily;
      const signature =
        mode === "type"
          ? await typedSignature(client.name, family)
          : canvasRef.current.toDataURL("image/png");
      const record = { ref: newAgreementRef(), signedAt: new Date() };
      const doc = await buildPdf({ pkg, client, ...record, signature });
      download(doc, record.ref);
      setSigned({ ...record, doc });
    } catch {
      setError("Something went wrong while creating the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
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
        <p>
          Read the PrisainTech company policy and service agreement, then sign below. You&apos;ll get a signed
          PDF copy.{" "}
          <a className="linkish" href={POLICY_PDF} target="_blank" rel="noopener">
            Original policy (PDF)
          </a>
        </p>

        <div className="agree-doc" tabIndex={0} aria-label="Client agreement">
          {agreementSections(pkg, client).map((s) => (
            <section key={s.heading}>
              <h4>{s.heading}</h4>
              {s.body && <p>{s.body}</p>}
              {s.parts &&
                s.parts.map((part) => (
                  <div className="agree-part" key={part.title}>
                    <h5>{part.title}</h5>
                    <p>{part.text}</p>
                  </div>
                ))}
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
              <label htmlFor="agPhone">
                WhatsApp number
                <input
                  id="agPhone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>

            <div className="sig">
              <div className="sig-head">
                <div className="sig-modes" role="group" aria-label="How to sign">
                  <button type="button" aria-pressed={mode === "type"} onClick={() => setMode("type")}>
                    Type
                  </button>
                  <button type="button" aria-pressed={mode === "draw"} onClick={() => setMode("draw")}>
                    Draw
                  </button>
                </div>
                {mode === "draw" && (
                  <button type="button" className="linkish" onClick={clear}>
                    Clear
                  </button>
                )}
              </div>
              <div
                ref={previewRef}
                className={`sig-pad sig-typed ${signatureFont.className}`}
                hidden={mode !== "type"}
                aria-label="Your signature"
              >
                {client.name || <span className="sig-placeholder">Your signature appears here</span>}
              </div>
              {mode === "draw" && (
                <canvas ref={canvasRef} className="sig-pad" aria-label="Draw your signature" />
              )}
            </div>

            <label className="agree-check">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />I have
              read and agree to the PrisainTech company policy and service agreement, and I&apos;m signing it
              electronically.
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
              disabled={busy}
            >
              {busy ? "Signing…" : "Sign agreement"} <span className="arr">→</span>
            </button>
          </>
        ) : (
          <div className="agree-done" role="status">
            <p>
              Signed by <b>{client.name}</b> on {formatDate(signed.signedAt)}. Reference <b>{signed.ref}</b>.
              Your PDF copy has downloaded.
            </p>
            <p className="agree-note">
              Send it to PrisainTech on WhatsApp to complete your booking: tap the button, attach the PDF and
              press send.
            </p>
            <div className="agree-actions">
              <a className="btn btn-wa btn-sm" href={waUrl(confirmText)} target="_blank" rel="noopener">
                <svg aria-hidden="true">
                  <use href="#i-chat" />
                </svg>
                Send signed copy on WhatsApp <span className="arr">↗</span>
              </a>
              <button type="button" className="linkish" onClick={() => download(signed.doc, signed.ref)}>
                Download PDF again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
