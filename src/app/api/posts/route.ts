import { type NextRequest, NextResponse } from 'next/server'
// import { getSession } from 'next-auth/react'
import { type NextApiResponse, type NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import db from '@/../utils/db'

export async function GET (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession()
  if (!session) throw new Error('session not found')

  const userFound = await db.users.findUnique({
    where: {
      email_address: session?.user?.email
    }
  })

  const tweets = await db.tweets.findMany({
    where: {
      user_id: userFound.id
    }
  })

  return NextResponse.json(tweets, { status: 200 })
}

export async function POST (req: NextRequest) {
  const session = await getServerSession()
  if (!session) throw new Error('session not found')
  const data = await req.json()

  const userFound = await db.users.findUnique({
    where: {
      email_address: session?.user?.email
    }
  })

  const tweet = await db.tweets.create({
    data: {
      user_id: userFound.id,
      content: data
    }
  })

  return NextResponse.json({ tweet }, { status: 200 })
}
