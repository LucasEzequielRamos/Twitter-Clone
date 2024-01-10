import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/../utils/db'
import bcrypt from 'bcryptjs'

interface User {
  user_nick?: string
  email_address?: string
  first_name?: string
  last_name?: string
  phonenumber?: number
  password?: string
}

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email_address: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials: any): Promise<User | any> {
        try {
          const userFound = await db.users.findUnique({
            where: {
              email_address: credentials.email_address
            }
          })
          if (!userFound) throw new Error('User not found')

          const validPass = await bcrypt.compare(credentials.password, userFound.password)
          if (!validPass) throw new Error('Email or password invalid')
          return {
            id: userFound.id,
            name: userFound.user_nick,
            email: userFound.email_address
          }
        } catch (error: any) {
          console.error('error in query', error)
          throw new Error(error.message)
        }
      }
    })
  ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
