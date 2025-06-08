import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    // Get SMTP configuration from environment variables
    const smtpHost = Deno.env.get('mail.myurl.ng');
    const smtpPort = parseInt(Deno.env.get('465') || '465');
    const smtpUsername = Deno.env.get('tradeyard@myurl.ng');
    const smtpPassword = Deno.env.get('TNpc~sNvqPbV');
    const smtpFromEmail = Deno.env.get('noreply@tradeyard.xyz');

    // Validate required environment variables
    if (!smtpHost || !smtpUsername || !smtpPassword || !smtpFromEmail) {
      throw new Error('Missing required SMTP configuration. Please check environment variables.');
    }

    // Parse request body
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Create SMTP client with SSL configuration for port 465
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true, // Use SSL for port 465
        auth: {
          username: smtpUsername,
          password: smtpPassword,
        },
      },
    });

    // Connect to SMTP server
    await client.connect();

    // Send email
    await client.send({
      from: smtpFromEmail,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      content: html,
      html: html,
    });

    // Close connection
    await client.close();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        data: { to, subject }
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('SMTP Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email',
        details: error.toString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});