// POST /api/inquiries — "Request a Meeting" form on the landing page.
import { clean, config, deliver, escapeHtml, fail, guard, isEmail, layout, rowsHtml, rowsText } from "./_lib/email.js";

const AUDIENCE = { family: "Parent / Family", community: "Apartment Community / HOA", business: "Business (Gym, Church, Café…)" };

export default async function handler(req, res) {
  if (guard(req, res)) return;
  const f = clean(req.body, ["name", "email", "phone", "audience", "interest", "preferred_date", "message"]);

  if (!f.name) return fail(res, 422, "Please add your name.");
  if (!isEmail(f.email)) return fail(res, 422, "Please enter a valid email address.");
  if (!AUDIENCE[f.audience]) return fail(res, 422, "Please choose who you are.");

  const rows = [
    ["Name", f.name],
    ["Email", f.email],
    ["Phone", f.phone],
    ["I am a…", AUDIENCE[f.audience]],
    ["Reaching out about", f.interest || "Not sure yet / general inquiry"],
    ["Preferred call date", f.preferred_date],
    ["What they're dreaming up", f.message],
  ];
  const first = f.name.split(" ")[0];

  try {
    await deliver({
      notify: {
        to: config.to(),
        replyTo: f.email,
        subject: `New meeting request — ${f.name}`,
        html: layout("New meeting request", `<table style="border-collapse:collapse">${rowsHtml(rows)}</table>
<p style="margin-top:18px;color:#5b6660;font-size:13px">Reply to this email to answer ${escapeHtml(f.name)} directly.</p>`),
        text: `New meeting request\n\n${rowsText(rows)}`,
      },
      confirm: {
        to: [f.email],
        replyTo: config.to()[0],
        subject: "We got your request — World of Explorers",
        html: layout(`Thanks, ${first}!`, `<p style="color:#1E2923;font-size:15px;line-height:1.6">Your meeting request is in. We'll reach out within 1–2 business days to lock in your free 15-minute conversation — no pressure, just possibilities.</p>
<p style="color:#1E2923;font-size:15px;line-height:1.6">Questions in the meantime? Just reply to this email or call <a href="tel:+16617148940" style="color:#0E5E50">(661) 714-8940</a>.</p>
<p style="color:#0E5E50;font-size:15px;font-weight:600;margin-bottom:0">— Brayson &amp; Adazjia<br>World of Explorers</p>`),
        text: `Thanks, ${first}!\n\nYour meeting request is in. We'll reach out within 1–2 business days to lock in your free 15-minute conversation.\n\nQuestions? Reply to this email or call (661) 714-8940.\n\n— Brayson & Adazjia, World of Explorers`,
      },
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("inquiry email failed:", err.message);
    return fail(res, 502, "We couldn't send your request just now. Please try again or call us at (661) 714-8940.");
  }
}
