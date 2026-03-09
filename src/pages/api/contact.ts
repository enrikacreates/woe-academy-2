import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, phone, childAge, message } = data;

  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Name and email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.MAILERLITE_API_KEY;
  const groupId = import.meta.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build a note from all form fields for the subscriber record
  const note = [
    `Tour request submitted ${new Date().toISOString().split('T')[0]}`,
    phone ? `Phone: ${phone}` : null,
    childAge ? `Child's age: ${childAge}` : null,
    message ? `Message: ${message}` : null,
  ]
    .filter(Boolean)
    .join(' | ');

  try {
    // Add lead as MailerLite subscriber with tour request data
    // Admin notifications should be configured as a MailerLite automation
    // (Subscribers → Automations → "When subscriber joins group" → Send email)
    const subRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name,
          last_name: '',
          phone: phone ?? '',
          company: childAge ? `Age: ${childAge}` : '',
          z_u_source: 'tour_request',
        },
        groups: groupId ? [groupId] : [],
        status: 'active',
      }),
    });

    if (!subRes.ok) {
      const errBody = await subRes.text();
      console.error('MailerLite subscriber error:', errBody);
      // Still return success to user — their form was received
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
