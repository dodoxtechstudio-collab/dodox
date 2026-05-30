import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  details: string;
}

// Server function for sending email via Gmail App Password
export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: ContactFormData) => data)
  .handler(async ({ data }) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dodoxtechstudio@gmail.com",
          pass: "vrraxynamvyxjqwm", // Gmail App Password provided by the user
        },
      });

      const mailOptions = {
        from: `"DodoX Tech Contact" <dodoxtechstudio@gmail.com>`,
        to: "dodoxtechstudio@gmail.com",
        replyTo: data.email, // Allows replying directly to the client's email
        subject: `💼 New Project Inquiry from ${data.name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                  background-color: #030712;
                  color: #f8fafc;
                  padding: 20px;
                  margin: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #0b0f19;
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  border-top: 3px solid #67e8f9;
                  border-radius: 16px;
                  padding: 30px;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .logo {
                  font-weight: 800;
                  font-size: 20px;
                  color: #ffffff;
                  margin-bottom: 25px;
                  text-align: center;
                  letter-spacing: 0.05em;
                }
                .logo span {
                  color: #67e8f9;
                }
                .title {
                  font-size: 22px;
                  font-weight: 700;
                  color: #ffffff;
                  margin-bottom: 20px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                  padding-bottom: 12px;
                }
                .field-group {
                  margin-bottom: 18px;
                }
                .label {
                  font-size: 10px;
                  text-transform: uppercase;
                  letter-spacing: 0.15em;
                  color: #67e8f9;
                  font-weight: bold;
                  margin-bottom: 6px;
                }
                .value {
                  font-size: 14px;
                  color: #cbd5e1;
                  line-height: 1.6;
                  background-color: rgba(255, 255, 255, 0.01);
                  border: 1px solid rgba(255, 255, 255, 0.03);
                  padding: 10px 14px;
                  border-radius: 8px;
                }
                .details-box {
                  background-color: rgba(255, 255, 255, 0.02);
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  padding: 15px;
                  border-radius: 10px;
                  font-size: 14px;
                  color: #e2e8f0;
                  line-height: 1.6;
                  white-space: pre-wrap;
                }
                .footer {
                  margin-top: 30px;
                  text-align: center;
                  font-size: 11px;
                  color: rgba(255, 255, 255, 0.3);
                  border-top: 1px solid rgba(255, 255, 255, 0.05);
                  padding-top: 15px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo">DodoX <span>Tech</span></div>
                <div class="title">New Inquiry Received</div>
                
                <div class="field-group">
                  <div class="label">Name</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="field-group">
                  <div class="label">Email Address</div>
                  <div class="value">${data.email}</div>
                </div>

                <div class="field-group">
                  <div class="label">Company</div>
                  <div class="value">${data.company || "Not specified"}</div>
                </div>

                <div class="field-group">
                  <div class="label">Estimated Budget</div>
                  <div class="value">${data.budget || "Not specified"}</div>
                </div>

                <div class="field-group" style="margin-top: 25px;">
                  <div class="label">Project Details</div>
                  <div class="details-box">${data.details}</div>
                </div>

                <div class="footer">
                  Received automatically via DodoX website contact form.
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Failed to send contact email:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to send email");
    }
  });
