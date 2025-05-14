import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email
        token.image = user.image
        token.email = user.email
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email
        session.user.image = token.image
        session.user.name = token.name
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
