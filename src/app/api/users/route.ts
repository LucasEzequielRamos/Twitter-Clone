import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import db from '@/utils/db'
import { authOptions } from '../../../utils/auth-options'

export async function GET (req: Request) {
  try {
    const session: any = await nextAuthGetServerSession(authOptions)
    if (!session) throw new Error('session not found')

    const userFound = await db.users.findUnique({
      where: {
        email_address: session?.user?.email
      },
      include: {
        tweets: true,
        followers: true,
        following: true,
        likes: true
      }
    })

    return NextResponse.json(userFound, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}

export async function PUT (req: NextRequest) {
  try {
    const session: any = await nextAuthGetServerSession(authOptions)
    if (!session) throw new Error('session not found')

    const dataToEdit = await req.json()

    const userFound = await db.users.update({
      where: {
        email_address: session?.user?.email
      },
      data: {
        user_nick: dataToEdit.user_nick,
        phonenumber: dataToEdit.phonenumber,
        avatar_url: dataToEdit.avatar_url,
        description: dataToEdit.description,
        full_name: dataToEdit.full_name,
        birthday: dataToEdit.birthday
      }
    })

    return NextResponse.json(userFound, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
