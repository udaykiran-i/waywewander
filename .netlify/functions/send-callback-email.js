import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (request, context) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const {
      fullName,
      travelStartDate,
      travelEndDate,
      email,
      mobile,
      whatsapp,
      message,
      trip,
      sourcePage,
    } = body;

    const travelDatesText = travelEndDate
      ? `${travelStartDate} to ${travelEndDate}`
      : travelStartDate;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: Arial, Helvetica, sans-serif; }
            .container { max-width: 640px; margin: 0 auto; }
            .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); }
            .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #ffffff; padding: 28px 32px; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
            .header p { margin: 6px 0 0; opacity: 0.92; font-size: 14px; }
            .body { padding: 24px 32px; }
            .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
            .row:last-child { border-bottom: none; }
            .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
            .value { font-size: 15px; font-weight: 600; color: #0f172a; text-align: right; max-width: 60%; }
            .message-box { margin-top: 18px; padding: 16px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; }
            .message-box .label { margin-bottom: 8px; }
            .message-box .value { text-align: left; max-width: 100%; font-weight: 500; color: #334155; white-space: pre-wrap; }
            .footer { padding: 16px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #e0f2fe; color: #0369a1; font-size: 12px; font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>New Callback Request</h1>
                <p>You have a new travel inquiry from your website.</p>
              </div>
              <div class="body">
                <div class="row">
                  <div>
                    <div class="label">Full Name</div>
                  </div>
                  <div class="value">${fullName}</div>
                </div>
                <div class="row">
                  <div>
                    <div class="label">Travel Dates</div>
                  </div>
                  <div class="value">${travelDatesText}</div>
                </div>
                <div class="row">
                  <div>
                    <div class="label">Email</div>
                  </div>
                  <div class="value">${email}</div>
                </div>
                <div class="row">
                  <div>
                    <div class="label">Mobile</div>
                  </div>
                  <div class="value">${mobile}</div>
                </div>
                ${whatsapp !== mobile ? `
                <div class="row">
                  <div>
                    <div class="label">WhatsApp</div>
                  </div>
                  <div class="value">${whatsapp}</div>
                </div>
                ` : ''}
                <div class="row">
                  <div>
                    <div class="label">Trip / Enquiry</div>
                  </div>
                  <div class="value"><span class="badge">${trip || 'General enquiry'}</span></div>
                </div>
                <div class="row">
                  <div>
                    <div class="label">Source Page</div>
                  </div>
                  <div class="value">${sourcePage || 'Website'}</div>
                </div>
                <div class="message-box">
                  <div class="label">Message</div>
                  <div class="value">${message}</div>
                </div>
              </div>
              <div class="footer">
                Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} · WayWeWander
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'WayWeWander <noreply@wearewaywewander.com>',
      to: ['wearewaywewander@gmail.com'],
      subject: `Callback Request from ${fullName}`,
      html,
      replyTo: email,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error?.message || 'Failed to send email';
    console.error('Email send error:', errorMessage, error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
