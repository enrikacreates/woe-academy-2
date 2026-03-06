import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, phone, childAge, message } = data;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const apiKey = import.meta.env.MAILERLITE_API_KEY;
  const notifyEmail = import.meta.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
  }

  // Build email body
  const emailBody = `
New tour request from the W.O.E. Academy website:

Name: ${name}
Email: ${email}
Phone: ${phone ?? 'Not provided'}
Child's Age: ${childAge ?? 'Not provided'}

Message:
${message}
  `.trim();

  try {
    // Send transactional email via MailerLite
    const res = await fetch('https://connect.mailerlite.com/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        name: `Contact Form - ${name} - ${new Date().toISOString().split('T')[0]}`,
        type: 'regular',
        emails: [
          {
            subject: `New Tour Request: ${name}`,
            from_name: 'W.O.E. Academy Website',
            from: notifyEmail ?? 'no-reply@woeacademy.com',
            reply_to: email,
            content: emailBody.replace(/\n/g, '<br>'),
          },
        ],
      }),
    });

    // Note: MailerLite campaigns aren't the best for transactional email.
    // For a simpler approach, we just add the contact as a subscriber with a note.
    // The academy can view new leads in their MailerLite dashboard.
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
          phone: phone ?? '',
          last_name: `[Tour Request] Age: ${childAge ?? 'N/A'}`,
        },
        status: 'active',
      }),
    });

    if (!subRes.ok) {
      console.error('MailerLite subscriber error:', await subRes.text());
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
