// Shared helpers for the form endpoints: validation, HTML escaping and
// sending through Resend's REST API.
//
// Environment variables (set in the Vercel project):
//   RESEND_API_KEY   Resend API key (required)
//   FORM_TO_EMAIL    Where submissions go; comma-separate several addresses
//                    (default connect@worldofexplorers.com)
//   FORM_FROM_EMAIL  Sender, on a domain verified in Resend
//                    (default "World of Explorers <hello@worldofexplorers.com>")

const RESEND_URL = "https://api.resend.com/emails";

export const config = {
  to: () => (process.env.FORM_TO_EMAIL || "connect@worldofexplorers.com").split(",").map((s) => s.trim()).filter(Boolean),
  from: () => process.env.FORM_FROM_EMAIL || "World of Explorers <hello@worldofexplorers.com>",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 2000;

// Errors use the { detail: [{ msg }] } shape the forms already read.
export function fail(res, status, msg) {
  return res.status(status).json({ detail: [{ msg }] });
}

// Trims every string field, caps its length and turns blanks into null.
export function clean(body, fields) {
  const out = {};
  for (const f of fields) {
    const v = body?.[f];
    out[f] = typeof v === "string" && v.trim() ? v.trim().slice(0, MAX_FIELD) : null;
  }
  return out;
}

export const isEmail = (v) => typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v);

export function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Renders label/value rows as a simple table, skipping empty values.
export function rowsHtml(rows) {
  return rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#5b6660;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;color:#1E2923;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
}

export function rowsText(rows) {
  return rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
}

// Wraps body HTML in a minimal branded layout.
export function layout(title, inner) {
  return `<!doctype html><html><body style="margin:0;background:#FAF6EC;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
<div style="background:#ffffff;border-radius:20px;padding:28px;border:1px solid rgba(14,94,80,0.1)">
<h1 style="margin:0 0 16px;font-size:20px;color:#0E5E50">${escapeHtml(title)}</h1>
${inner}
</div>
<p style="text-align:center;color:#8a948f;font-size:12px;margin-top:18px">World of Explorers — Fitness &amp; Play</p>
</div></body></html>`;
}

export async function sendEmail({ to, subject, html, text, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  const r = await fetch(RESEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: config.from(), to, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  return r.json();
}

// Sends the owner notification (must succeed), then the visitor's
// confirmation (best effort, so a bounce never fails the submission).
export async function deliver({ notify, confirm }) {
  await sendEmail(notify);
  try {
    await sendEmail(confirm);
  } catch (err) {
    console.error("confirmation email failed:", err.message);
  }
}

// Shared request guard: POST only, JSON body, honeypot check.
// Returns true when the handler should stop.
export function guard(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    fail(res, 405, "Method not allowed");
    return true;
  }
  if (!req.body || typeof req.body !== "object") {
    fail(res, 400, "Invalid request.");
    return true;
  }
  // Bots fill the hidden "company_website" field; pretend success.
  if (req.body.company_website) {
    res.status(200).json({ ok: true });
    return true;
  }
  return false;
}
