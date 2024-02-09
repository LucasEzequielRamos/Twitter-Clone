import { type NextRequest, NextResponse } from 'next/server'
import db from '@/utils/db'
import bcrypt from 'bcryptjs'

export async function POST (req: NextRequest) {
  try {
    const data = await req.json()

    const userFound = await db.users.findUnique({
      where: {
        email_address: data.email_address
      }
    })

    if (userFound) {
      return NextResponse.json({ message: 'The user already exists' }, { status: 404 })
    }

    const hashedPass = await bcrypt.hash(data.password, 5)

    const newUser = await db.users.create({
      data: {
        ...data,
        password: hashedPass
      }
    })

    return NextResponse.json({ User: newUser }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
