import { pool } from '@/libs/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const [users] = await pool.query('SELECT * FROM users')
  console.log(users)
  return NextResponse.json({ message: 'hello' }, { status: 200 })
}
export async function POST (req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_nick, email_address, first_name, last_name, phonenumber, password } = await req.json()

    const [res] = await pool.query('INSERT INTO users SET ? ', {
      user_nick, email_address, first_name, last_name, phonenumber, password
    })

    return NextResponse.json({ user_nick, email_address, first_name, last_name, phonenumber, id: res.insertId }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    })
  }
}
