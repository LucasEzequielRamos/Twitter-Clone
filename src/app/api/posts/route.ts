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
    const data: any = req.body

    console.log(data, 'APIIIIIIIIIIIIII')
    // if (!data.content || !data.email) {
    //   throw new Error('Contenido del tweet o sesión inválidos')
    // }
    const userFound = await db.users.findUnique({
      where: {
        email_address: data.email
      }
    })

    if (!userFound) throw new Error('user not found')

    const tweet = await db.tweets.create({
      data: {
        user_id: userFound.id,
        content: data.content
      }
    })

    if (!tweet) throw new Error('no se pudo crear el tweet')
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
