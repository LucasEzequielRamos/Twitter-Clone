import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import db from '@/../utils/db'

export async function GET (req: NextRequest) {
  try {
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
      },
      select: {
        tweet_id: true,
        content: true,
        num_likes: true,
        user: {
          select: {
            user_nick: true,
            first_name: true
          }
        }
      }

    })

    return NextResponse.json(tweets, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}

export async function POST (req: NextRequest) {
  try {
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
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
