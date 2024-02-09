import { NextResponse, type NextRequest } from 'next/server'
import db from '@/utils/db'

export async function PUT (req: NextRequest) {
  try {
    const { tweet_id, session } = await req.json()

    const userFound = await db.users.findUnique({
      where: {
        email_address: session?.user?.email
      },
      include: {
        likes: true
      }
    })

    const tweet_liked = await db.tweets_likes.findMany({
      where: {
        tweet_id,
        user_id: userFound.id
      }
    })

    if (tweet_liked.length === 0) {
      await db.tweets_likes.create({
        data: {
          user_id: userFound.id,
          tweet_id
        }
      })
      await db.tweets.update({
        where: {
          tweet_id
        },
        data: {
          num_likes: { increment: 1 }
        }
      })
    } else {
      await db.tweets_likes.deleteMany({
        where: {
          tweet_id,
          user_id: userFound.id
        }
      })
      await db.tweets.update({
        where: {
          tweet_id
        },
        data: {
          num_likes: { decrement: 1 }
        }
      })
    }

    // const tweet_original = await db.tweets.update({
    //   where: {
    //     tweet_id
    //   },
    //   data: {
    //     num_likes: +1
    //   }
    // })

    // console.log(tweet_original)

    return NextResponse.json({ tweet_liked }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
