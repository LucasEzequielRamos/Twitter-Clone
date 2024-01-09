import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { pool } from '@/../utils/db'
import { type RowDataPacket } from 'mysql2/promise'
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
          const [rows] = await pool.query<RowDataPacket[]>('select * from users where email_address = ?', [credentials.email_address])

          if (rows.length > 0) {
            const user = rows[0]
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
            console.log(user)
            if (isPasswordCorrect) {
              return user
            }
          } else {
            return null
          }
        } catch (error: any) {
          console.error('error in query', error)
          throw new Error('error in server')
        }
      }
    })
  ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
