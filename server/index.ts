import express, { Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email transporter configuration
// Using explicit SMTP settings for reliability in serverless environments
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use port 465 for secure connection (SMTPS)
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

// Alternative: Using a generic SMTP server
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || "587"),
//   secure: process.env.SMTP_SECURE === "true",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // API Routes
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const {
        fullName,
        companyName,
        email,
        phone,
        industry,
        jobTitle,
        services,
        description,
        hearAbout,
        contactMethod,
        conflictScreening,
      } = req.body;

      // Validate required fields
      if (!fullName || !companyName || !email) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: fullName, companyName, email",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

      // Create email content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
              .header { background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #a855f7; }
              .value { color: #555; margin-top: 5px; }
              .services-list { list-style: none; padding-left: 0; }
              .services-list li { padding: 5px 0; color: #555; }
              .services-list li:before { content: "✓ "; color: #06b6d4; font-weight: bold; margin-right: 5px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${fullName}</div>
                </div>
                
                <div class="field">
                  <div class="label">Company Name:</div>
                  <div class="value">${companyName}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                
                ${industry ? `
                <div class="field">
                  <div class="label">Industry:</div>
                  <div class="value">${industry}</div>
                </div>
                ` : ''}
                
                ${jobTitle ? `
                <div class="field">
                  <div class="label">Job Title:</div>
                  <div class="value">${jobTitle}</div>
                </div>
                ` : ''}
                
                ${services && services.length > 0 ? `
                <div class="field">
                  <div class="label">Services Interested In:</div>
                  <ul class="services-list">
                    ${services.map((service: string) => `<li>${service}</li>`).join('')}
                  </ul>
                </div>
                ` : ''}
                
                ${description ? `
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${description.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
                
                ${hearAbout ? `
                <div class="field">
                  <div class="label">How did you hear about us?</div>
                  <div class="value">${hearAbout}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Preferred Contact Method:</div>
                  <div class="value">${contactMethod}</div>
                </div>
                
                <div class="field">
                  <div class="label">Conflict of Interest Screening Consent:</div>
                  <div class="value">${conflictScreening ? 'Yes' : 'No'}</div>
                </div>
                
                <div class="footer">
                  <p>This is an automated email from the Compliance AI website contact form.</p>
                  <p>Submission received on: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "noreply@complianceai.com",
        to: "f.mohemam85@gmail.com",
        subject: `New Contact Form Submission from ${fullName} - ${companyName}`,
        html: htmlContent,
        replyTo: email,
      });

      // Send confirmation email to user
      const confirmationEmail = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
              .header { background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
              .message { color: #555; margin: 20px 0; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Contacting Compliance AI</h2>
              </div>
              <div class="content">
                <p>Dear ${fullName},</p>
                
                <div class="message">
                  <p>Thank you for reaching out to Compliance AI. We have received your inquiry and appreciate your interest in our services.</p>
                  
                  <p>Our team will review your submission and get back to you as soon as possible, typically within 24-48 business hours.</p>
                  
                  <p>If you have any urgent matters, please feel free to contact us directly through our YouTube channel or LinkedIn profile.</p>
                </div>
                
                <p>Best regards,<br>
                <strong>Compliance AI Team</strong></p>
                
                <div class="footer">
                  <p>This is an automated confirmation email. Please do not reply to this email.</p>
                  <p>&copy; 2025 Compliance AI. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER || "noreply@complianceai.com",
        to: email,
        subject: "Thank You for Your Inquiry - Compliance AI",
        html: confirmationEmail,
      });

      return res.status(200).json({
        success: true,
        message: "Your inquiry has been sent successfully. We will contact you soon!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send inquiry. Please try again later or contact us directly.",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Contact form API available at http://localhost:${port}/api/contact`);
  });
}

startServer().catch(console.error);
