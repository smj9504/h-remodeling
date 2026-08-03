import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const VALID_SERVICES = ['kitchen', 'bathroom', 'flooring', 'decking'];
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Type and length validation
    if (typeof name !== 'string' || typeof phone !== 'string' || typeof service !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid field types' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';

    if (trimmedName.length === 0 || trimmedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be between 1 and ${MAX_NAME_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (!PHONE_PATTERN.test(trimmedPhone) || trimmedPhone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (!VALID_SERVICES.includes(service)) {
      return NextResponse.json(
        { error: 'Invalid service selection' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length === 0 || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (trimmedEmail && (trimmedEmail.length > MAX_EMAIL_LENGTH || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail))) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize all values for email template
    const safeName = escapeHtml(trimmedName);
    const safePhone = escapeHtml(trimmedPhone);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(trimmedMessage);

    // Email content
    const emailSubject = `New Contact Form Submission - ${service}`;

    // HTML Email Template (sanitized)
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #b3936b 0%, #a6825f 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                H Remodeling
              </h1>
              <p style="margin: 8px 0 0 0; color: #faf8f5; font-size: 14px; opacity: 0.95;">
                New Contact Form Submission
              </p>
            </td>
          </tr>

          <!-- Service Badge -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <div style="background-color: #f2ede5; border-left: 4px solid #b3936b; padding: 16px 20px; border-radius: 8px;">
                <p style="margin: 0; color: #715845; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Service Requested
                </p>
                <p style="margin: 6px 0 0 0; color: #31261e; font-size: 18px; font-weight: 600;">
                  ${safeService}
                </p>
              </div>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- Name -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0; color: #715845; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                      Name
                    </p>
                    <p style="margin: 4px 0 0 0; color: #31261e; font-size: 16px; font-weight: 600;">
                      ${safeName}
                    </p>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0; color: #715845; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                      Phone
                    </p>
                    <p style="margin: 4px 0 0 0; color: #31261e; font-size: 16px; font-weight: 600;">
                      <a href="tel:${safePhone}" style="color: #b3936b; text-decoration: none;">${safePhone}</a>
                    </p>
                  </td>
                </tr>

                <!-- Email -->
                ${trimmedEmail ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0; color: #715845; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                      Email
                    </p>
                    <p style="margin: 4px 0 0 0; color: #31261e; font-size: 16px; font-weight: 600;">
                      <a href="mailto:${safeEmail}" style="color: #b3936b; text-decoration: none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                ` : ''}

              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #faf8f5; border-radius: 8px; padding: 20px;">
                <p style="margin: 0 0 10px 0; color: #715845; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Message
                </p>
                <p style="margin: 0; color: #31261e; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${safeMessage}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 25px 30px; border-top: 1px solid #e5dccb; text-align: center;">
              <p style="margin: 0; color: #715845; font-size: 13px; line-height: 1.5;">
                This email was sent from the contact form on<br>
                <a href="https://www.h-remodeling.com" style="color: #b3936b; text-decoration: none; font-weight: 600;">www.h-remodeling.com</a>
              </p>
              <p style="margin: 12px 0 0 0; color: #8a6a50; font-size: 11px;">
                &copy; ${new Date().getFullYear()} H Remodeling. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // Plain text fallback
    const emailText = `
New contact form submission from H Remodeling website:

Name: ${trimmedName}
Phone: ${trimmedPhone}
${trimmedEmail ? `Email: ${trimmedEmail}` : 'Email: Not provided'}
Service: ${service}

Message:
${trimmedMessage}

---
This email was sent from the contact form on www.h-remodeling.com
    `.trim();

    // Gmail SMTP configuration
    const gmailUser = process.env.GMAIL_USER || 'hremodeling05@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      // Fallback: Log to console in development
      console.log('Email would be sent:', {
        to: 'hremodeling05@gmail.com',
        subject: emailSubject,
        body: emailText,
      });

      return NextResponse.json(
        {
          error: 'Email service not configured. Please set GMAIL_APP_PASSWORD environment variable.',
          success: false
        },
        { status: 500 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });

    // Send email
    const info = await transporter.sendMail({
      from: `H Remodeling <${gmailUser}>`,
      to: 'hremodeling05@gmail.com',
      replyTo: trimmedEmail || gmailUser,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
