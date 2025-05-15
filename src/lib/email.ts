import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  debug: process.env.NODE_ENV === "development", // Enable debug output in development
})

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, from } = options

  try {
    const fromEmail = from || process.env.EMAIL_FROM || "noreply@blackstone-security.com"

    // Validate attachments to ensure they're not Promises

    // Log what we're about to send
    console.log("Sending email to:", to)
    console.log("Subject:", subject)

    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    })

    console.log("Email sent:", info.messageId)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}
