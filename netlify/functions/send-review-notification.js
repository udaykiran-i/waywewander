import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]));
}

export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (!process.env.REVIEW_WEBHOOK_SECRET || request.headers.get('x-review-webhook-secret') !== process.env.REVIEW_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (!process.env.RESEND_API_KEY) return new Response('Email service is not configured', { status: 500 });

  try {
    const payload = await request.json();
    if (payload.type !== 'INSERT' || payload.table !== 'reviews' || !payload.record) {
      return new Response('Ignored', { status: 200 });
    }

    const review = payload.record;
    const ratingRows = [
      ['Travel arrangements', review.trip_planning],
      ['Driver and transport', review.driver_transport],
      ['Stays and rooms', review.stays_rooms],
      ['Budget-friendly value', review.value_for_money],
      ['Overall experience', review.overall_rating],
    ].map(([label, value]) => `<tr><td>${label}</td><td>${escapeHtml(value)}/5</td></tr>`).join('');

    await resend.emails.send({
      from: 'WayWeWander <noreply@wearewaywewander.com>',
      to: [process.env.REVIEW_NOTIFICATION_EMAIL || 'wearewaywewander@gmail.com'],
      replyTo: review.email,
      subject: `New traveler review from ${escapeHtml(review.full_name)}`,
      html: `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1f2937"><h2>New traveler review awaiting approval</h2><p><strong>${escapeHtml(review.full_name)}</strong> reviewed <strong>${escapeHtml(review.trip_name)}</strong>.</p><p>Email: <a href="mailto:${escapeHtml(review.email)}">${escapeHtml(review.email)}</a></p><table style="border-collapse:collapse"><tbody>${ratingRows}</tbody></table><p style="white-space:pre-wrap">${escapeHtml(review.review)}</p><p><a href="${process.env.SITE_URL || 'https://waywewander.com'}/admin/reviews">Open review moderation</a></p></body></html>`,
    });

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Review notification email failed:', error);
    return new Response('Failed to send notification', { status: 500 });
  }
};
