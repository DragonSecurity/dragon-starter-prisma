import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string
    email: string
    image: string | null
    name: string
  }

  interface Session extends DefaultSession {
    user: User & {
      id: string
      email: string
      image: string | null
      name: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    email: string
    image: string | null
    name: string
  }
}
