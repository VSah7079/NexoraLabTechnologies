const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create email transporter
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  if (process.env.EMAIL_HOST === 'smtp.gmail.com' || (user && user.endsWith('@gmail.com'))) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: port,
    secure: port === 465,
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Send verification email
const sendVerificationEmail = async (email, name, token) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email - NexoraLab Technologies',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 10px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to NexoraLab Technologies!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for registering with NexoraLab Technologies. To complete your registration and activate your account, please verify your email address.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account with NexoraLab Technologies, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} NexoraLab Technologies. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Send welcome email after verification
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to NexoraLab Technologies!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 30px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 10px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to NexoraLab Technologies!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Your email has been successfully verified! Your account is now active.</p>
            <p>You can now:</p>
            <ul>
              <li>Access your dashboard</li>
              <li>Apply for jobs</li>
              <li>Build your profile</li>
              <li>Connect with recruiters</li>
            </ul>
            <a href="${process.env.FRONTEND_URL}/login" class="button">Login to Your Account</a>
            <p>If you have any questions, feel free to contact us.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} NexoraLab Technologies. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, name, token) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset Your Password - NexoraLab Technologies',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #00D2FF 0%, #0066FF 50%, #7C3AED 100%);
              border-radius: 12px;
              padding: 30px;
              color: white;
              text-align: center;
            }
            .content {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 30px;
              margin-top: 20px;
              color: #1e293b;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #00D2FF 0%, #0066FF 100%);
              color: white !important;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 50px;
              margin: 24px 0;
              font-weight: bold;
              font-size: 15px;
            }
            .footer {
              text-align: center;
              margin-top: 25px;
              font-size: 12px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body style="background-color: #f8fafc;">
          <div class="container">
            <h1 style="margin: 0; font-size: 24px;">NexoraLab Technologies</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Password Reset Request</p>
          </div>
          <div class="content">
            <h2 style="color: #0f172a; margin-top: 0;">Hello ${name || 'User'},</h2>
            <p>We received a request to reset the password for your NexoraLab Technologies account.</p>
            <p>Click the button below to choose a new secure password:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button" target="_blank">Reset My Password</a>
            </div>
            <p style="font-size: 13px; color: #64748b;">Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; font-size: 12px; color: #0284c7; background: #f0f9ff; padding: 10px; border-radius: 8px;">${resetUrl}</p>
            <p style="color: #e11d48; font-size: 13px;"><strong>⏱ This reset link will expire in 1 hour.</strong></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b; margin: 0;">If you did not request this password reset, please ignore this email or contact support immediately if you suspect unauthorized access.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} NexoraLab Technologies. All rights reserved.</p>
            <p>Siwan, Bihar, India • nexoralabtechnologies@gmail.com</p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

module.exports = {
  createTransporter,
  generateVerificationToken,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};

