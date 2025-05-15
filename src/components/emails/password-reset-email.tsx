import { ReactElement } from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface PasswordResetEmailProps {
  resetLink: string
  username?: string
}

export const PasswordResetEmail = ({
  resetLink,
  username,
}: PasswordResetEmailProps): ReactElement => {
  const previewText = "Reset your password"

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            Someone recently requested a password change for your Draint account. If this was you,
            you can set a new password here:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Reset password
            </Button>
          </Section>
          <Hr style={hr} />

          <Text style={footer}>
            If you don&#39;t want to change your password or didn&#39;t request this, just ignore
            and delete this message.
          </Text>
          <Text style={footer}>
            This password reset link will expire in 1 hour for security reasons.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "580px",
  borderRadius: "5px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
}

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  margin: "30px 0",
  padding: "0 48px",
  textAlign: "center" as const,
}

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
  padding: "0 48px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const button = {
  backgroundColor: "#6366f1",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 48px",
}

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 48px",
  textAlign: "center" as const,
}
