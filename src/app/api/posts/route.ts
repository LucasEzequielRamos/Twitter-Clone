import { pool } from '@/../utils/db'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'
import { type NextApiResponse, type NextApiRequest } from 'next'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function GET (req: NextApiRequest, res: NextApiRequest) {
  const session = await getServerSession(req, authOptions)
  NextResponse.json({ session })
}

export async function POST (req: NextRequest) {

}
