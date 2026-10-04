// POST /api/quotes — the /quote questionnaire.
import { clean, config, deliver, escapeHtml, fail, guard, isEmail, layout, rowsHtml, rowsText } from "./_lib/email.js";

const CONTACT = { email: "Email", text: "Text", call: "Phone call" };
const CONTACT_PHRASE = { email: "by email", text: "by text", call: "with a phone call" };
const AUDIENCE = { family: "My family / my child", community: "Our apartment community / HOA", business: "Our business, school or organization" };

export default async function handler(req, res) {
  if (guard(req, res)) return;
  const f = clean(req.body, [
    "name", "email", "phone", "contact_pref", "program", "audience",
    "group_size", "ages", "location_type", "frequency", "timeline", "budget", "notes",
  ]);

  if (!f.name) return fail(res, 422, "Please add your name.");
  if (!isEmail(f.email)) return fail(res, 422, "Please enter a valid email address.");
  if (!CONTACT[f.contact_pref]) return fail(res, 422, "Pick email, text or call so we know how to reach you.");
  if (f.contact_pref !== "email" && !f.phone) return fail(res, 422, "Please add a phone number so we can reach you.");
  if (!f.program) return fail(res, 422, "Please choose a program.");

  const rows = [
    ["Name", f.name],
    ["Email", f.email],
    ["Phone", f.phone],
    ["Prefers", CONTACT[f.contact_pref]],
    ["Program", f.program],
    ["This is for", AUDIENCE[f.audience] || f.audience],
    ["Group size", f.group_size],
    ["Ages", f.ages],
    ["Location", f.location_type],
    ["Frequency", f.frequency],
    ["Timeline", f.timeline],
    ["Budget", f.budget],
    ["What matters most", f.notes],
  ];
  const first = f.name.split(" ")[0];
  const how = CONTACT_PHRASE[f.contact_pref];

  try {
    await deliver({
      notify: {
        to: config.to(),
        replyTo: f.email,
        subject: `New quote request — ${f.program} — ${f.name}`,
        html: layout("New quote request", `<p style="margin:0 0 14px;color:#1E2923;font-size:14px"><strong>${escapeHtml(f.name)}</strong> wants pricing and prefers to hear back <strong>${how}</strong>.</p>
<table style="border-collapse:collapse">${rowsHtml(rows)}</table>`),
        text: `New quote request (prefers ${how})\n\n${rowsText(rows)}`,
      },
      confirm: {
        to: [f.email],
        replyTo: config.to()[0],
        subject: "Your quote request is in — World of Explorers",
        html: layout(`Thanks, ${first}!`, `<p style="color:#1E2923;font-size:15px;line-height:1.6">We received your quote request for <strong>${escapeHtml(f.program)}</strong>. We'll review your answers and get back to you ${how} within 1–2 business days with real pricing.</p>
<p style="color:#1E2923;font-size:15px;line-height:1.6">Questions in the meantime? Just reply to this email or call <a href="tel:+16617148940" style="color:#0E5E50">(661) 714-8940</a>.</p>
<p style="color:#0E5E50;font-size:15px;font-weight:600;margin-bottom:0">— Brayson &amp; Adazjia<br>World of Explorers</p>`),
        text: `Thanks, ${first}!\n\nWe received your quote request for ${f.program}. We'll get back to you ${how} within 1–2 business days with real pricing.\n\nQuestions? Reply to this email or call (661) 714-8940.\n\n— Brayson & Adazjia, World of Explorers`,
      },
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("quote email failed:", err.message);
    return fail(res, 502, "We couldn't send your request just now. Please try again or call us at (661) 714-8940.");
  }
}
