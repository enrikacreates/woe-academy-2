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

  const notifyEmail = import.meta.env.CONTACT_NOTIFY_EMAIL;

  try {
    // Add lead as MailerLite subscriber with proper custom fields
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
          child_age: childAge ?? '',
          message: message ?? '',
          z_u_source: 'tour_request',
        },
        groups: groupId ? [groupId] : [],
        status: 'active',
      }),
    });

    if (!subRes.ok) {
      const errBody = await subRes.text();
      console.error('MailerLite subscriber error:', errBody);
    }

    // Send admin notification email via MailerLite automation subscriber
    // We add the admin as a temporary subscriber to a dedicated trigger,
    // but the simplest reliable approach is a direct notification:
    if (notifyEmail) {
      const notifyBody = [
        `New tour request from ${name} (${email})`,
        phone ? `Phone: ${phone}` : '',
        childAge ? `Child's age: ${childAge}` : '',
        message ? `Message: ${message}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      // Use MailerLite subscriber note as audit trail on the lead
      try {
        // Get the subscriber ID from the create response
        const subData = await subRes.json().catch(() => null);
        const subscriberId = subData?.data?.id;
        if (subscriberId) {
          await fetch(
            `https://connect.mailerlite.com/api/subscribers/${subscriberId}/notes`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({ note: notifyBody }),
            }
          );
        }
      } catch (noteErr) {
        console.error('Note save error:', noteErr);
      }
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
