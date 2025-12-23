import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Email content
    const emailSubject = `New Contact Form Submission - ${service}`;

    // HTML Email Template
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
                  ${service}
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
                      ${name}
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
                      <a href="tel:${phone}" style="color: #b3936b; text-decoration: none;">${phone}</a>
                    </p>
                  </td>
                </tr>

                <!-- Email -->
                ${email ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0; color: #715845; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                      Email
                    </p>
                    <p style="margin: 4px 0 0 0; color: #31261e; font-size: 16px; font-weight: 600;">
                      <a href="mailto:${email}" style="color: #b3936b; text-decoration: none;">${email}</a>
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
${message}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 25px 30px; border-top: 1px solid #e5dccb; text-align: center;">
              <p style="margin: 0; color: #715845; font-size: 13px; line-height: 1.5;">
                This email was sent from the contact form on<br>
                <a href="https://h-remodeling.com" style="color: #b3936b; text-decoration: none; font-weight: 600;">h-remodeling.com</a>
              </p>
              <p style="margin: 12px 0 0 0; color: #8a6a50; font-size: 11px;">
                © ${new Date().getFullYear()} H Remodeling. All rights reserved.
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

Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : 'Email: Not provided'}
Service: ${service}

Message:
${message}

---
This email was sent from the contact form on h-remodeling.com
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
      // Add connection timeout
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });

    // Send email
    const info = await transporter.sendMail({
      from: `H Remodeling <${gmailUser}>`,
      to: 'hremodeling05@gmail.com',
      replyTo: email || gmailUser,
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
    
    // Provide more detailed error message in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error instanceof Error ? error.message : 'Unknown error occurred'
      : 'Failed to send email. Please try again later.';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' && error instanceof Error 
          ? error.stack 
          : undefined
      },
      { status: 500 }
    );
  }
}

