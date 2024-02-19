import { type NextRequest, NextResponse } from 'next/server'
import db from '@/utils/db'

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    const tweets = await db.tweets.findMany({
      where: {
        OR: [
          { user_id: Number(userId) },
          { likes: { some: { user_id: Number(userId) } } }
        ]
      },
      include: {
        user: true,
        likes: true
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
