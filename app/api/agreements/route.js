// Keeps a record of every signed agreement: the PDF goes to private Supabase storage,
// a row goes to the `agreements` table, and the studio gets an email with the PDF attached.
// Each part runs only if its environment variables are set; see README.

const text = (v, max) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

async function saveToSupabase(row, pdf) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "not-configured";
  const auth = { apikey: key, Authorization: `Bearer ${key}` };
  const upload = await fetch(`${url}/storage/v1/object/agreements/${row.ref}.pdf`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/pdf", "x-upsert": "false" },
    body: pdf,
  });
  if (!upload.ok) throw new Error("storage " + upload.status + " " + (await upload.text()));
  const insert = await fetch(`${url}/rest/v1/agreements`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ ...row, pdf_path: `agreements/${row.ref}.pdf` }),
  });
  if (!insert.ok) throw new Error("insert " + insert.status + " " + (await insert.text()));
  return "saved";
}

async function emailStudio(row, pdfBase64) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.AGREEMENT_NOTIFY_EMAIL;
  if (!key || !to) return "not-configured";
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "PrisainTech <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      subject: `Signed agreement ${row.ref} — ${row.client_name} (${row.package_name})`,
      html: `<p><b>${esc(row.client_name)}</b>${row.business ? ` (${esc(row.business)})` : ""} signed the client agreement.</p>
<p>Package: ${esc(row.package_name)}<br>Price: ${esc(row.price)}<br>Reference: ${esc(row.ref)}<br>Signed: ${esc(row.signed_at)}<br>Signature: ${esc(row.signature_type)}</p>
<p>The signed PDF is attached.</p>`,
      attachments: [{ filename: `PrisainTech-Agreement-${row.ref}.pdf`, content: pdfBase64 }],
    }),
  });
  if (!res.ok) throw new Error("email " + res.status + " " + (await res.text()));
  return "sent";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }
  const ref = text(body.ref, 40);
  const pdfBase64 = String(body.pdf || "");
  if (!/^PT-\d{6}-[A-Z0-9]{4}$/.test(ref))
    return Response.json({ ok: false, reason: "ref" }, { status: 400 });
  if (!pdfBase64 || pdfBase64.length > 3_000_000)
    return Response.json({ ok: false, reason: "pdf" }, { status: 400 });
  const pdf = Buffer.from(pdfBase64, "base64");
  if (pdf.subarray(0, 4).toString() !== "%PDF")
    return Response.json({ ok: false, reason: "pdf" }, { status: 400 });

  const row = {
    ref,
    signed_at: text(body.signedAt, 40),
    version: text(body.version, 20),
    signature_type: body.signatureType === "draw" ? "drawn" : "typed",
    client_name: text(body.client?.name, 120),
    business: text(body.client?.business, 160) || null,
    phone: text(body.client?.phone, 30).replace(/[^\d+ ]/g, "") || null,
    package_name: text(body.pkg?.name, 120),
    price: [text(body.pkg?.inr, 40), text(body.pkg?.usd, 40), text(body.pkg?.recurring, 60)]
      .filter(Boolean)
      .join(" / "),
    ip: (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null,
    user_agent: text(request.headers.get("user-agent"), 300) || null,
  };
  if (row.client_name.length < 2 || !row.package_name) {
    return Response.json({ ok: false, reason: "fields" }, { status: 400 });
  }

  const result = {};
  try {
    result.stored = await saveToSupabase(row, pdf);
  } catch (e) {
    console.error("agreement storage failed:", e.message);
    result.stored = "failed";
  }
  try {
    result.emailed = await emailStudio(row, pdfBase64);
  } catch (e) {
    console.error("agreement email failed:", e.message);
    result.emailed = "failed";
  }
  const ok = result.stored === "saved" || result.emailed === "sent";
  return Response.json({ ok, ...result }, { status: ok ? 200 : 503 });
}
