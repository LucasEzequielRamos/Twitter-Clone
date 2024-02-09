import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/navbar'
import { getServerSession } from 'next-auth'
import SessionProvider from '../utils/session-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'The best twitter clone from my house'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  // console.log(session)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar/>
          <div className=''>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
