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
    const emailBody = `
New contact form submission from H Remodeling website:

Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : 'Email: Not provided'}
Service: ${service}

Message:
${message}

---
This email was sent from the contact form on hremodeling.com
    `.trim();

    // Gmail SMTP configuration
    const gmailUser = process.env.GMAIL_USER || 'hremodeling05@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      // Fallback: Log to console in development
      console.log('Email would be sent:', {
        to: 'hremodeling05@gmail.com',
        subject: emailSubject,
        body: emailBody,
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
    });

    // Send email
    const info = await transporter.sendMail({
      from: `H Remodeling <${gmailUser}>`,
      to: 'hremodeling05@gmail.com',
      replyTo: email || gmailUser,
      subject: emailSubject,
      text: emailBody,
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

