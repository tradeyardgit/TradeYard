import { supabase } from './supabase';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('No session found');
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, html }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send email');
  }

  return response.json();
};

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to TradeYard!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #db2777;">Welcome to TradeYard!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining TradeYard! We're excited to have you as part of our community.</p>
        <p>With your new account, you can:</p>
        <ul>
          <li>Post items for sale</li>
          <li>Browse thousands of listings</li>
          <li>Save your favorite items</li>
          <li>Chat with buyers and sellers</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Happy trading!</p>
        <p>Best regards,<br>The TradeYard Team</p>
      </div>
    `,
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your TradeYard Password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #db2777;">Reset Your Password</h1>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #db2777; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>The TradeYard Team</p>
      </div>
    `,
  }),

  newMessage: (senderName: string, adTitle: string) => ({
    subject: 'New Message on TradeYard',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #db2777;">New Message</h1>
        <p>You have a new message from ${senderName} about your listing:</p>
        <p style="font-weight: bold;">"${adTitle}"</p>
        <p>Log in to your account to view and respond to the message.</p>
        <p>Best regards,<br>The TradeYard Team</p>
      </div>
    `,
  }),
};