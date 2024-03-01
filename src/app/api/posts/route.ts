import { type NextRequest, NextResponse } from 'next/server'
import db from '@/utils/db'

export async function GET (req: NextRequest) {
  try {
    const tweets = await db.tweets.findMany({
      include: {
        user: {
          include: {
            likes: true
          }
        }
      },
      orderBy: {
        tweet_id: 'desc'
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
    const { content, session } = await req.json()

    console.log(content, session, 'APIIIIIIIIIIIIII')

    const userFound = await db.users.findUnique({
      where: {
        email_address: session?.user?.email
      }
    })

    if (!userFound) return
    const tweet = await db.tweets.create({
      data: {
        user_id: userFound.id,
        content
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

export async function DELETE (req: NextRequest) {
  try {
    const { tweet_id, session } = await req.json()

    await db.tweets_likes.deleteMany({
      where: {
        tweet_id
      }
    })

    const tweet = await db.tweets.deleteMany({
      where: {
        tweet_id,
        user: {
          email_address: session?.user?.email
        }
      }
    })

    return NextResponse.json(tweet, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
