import { pool } from '@/../utils/db'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST (req: NextRequest) {
  try {
    const { user_nick, email_address, first_name, last_name, phonenumber, password } = await req.json()

    const [rows] = await pool.query<RowDataPacket[]>('select * from users where email_address = ?', [email_address])
    if (rows.length > 0) {
      return NextResponse.json({ message: 'the user exists' }, { status: 401 })
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const [res] = await pool.query<ResultSetHeader>('INSERT INTO users SET ? ', {
      user_nick, email_address, first_name, last_name, phonenumber, password: hashedPassword
    })

    return NextResponse.json({ user_nick, email_address, first_name, last_name, phonenumber, id: res.insertId }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    })
  }
}
