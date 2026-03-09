import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const apiKey = import.meta.env.MAILERLITE_API_KEY;
  const groupId = import.meta.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
  }

  try {
    // Add subscriber to MailerLite
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          z_u_source: 'hero_signup',
        },
        groups: groupId ? [groupId] : [],
        status: 'active',
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('MailerLite error:', body);
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
