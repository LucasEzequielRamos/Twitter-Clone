import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import db from '@/utils/db'
import { authOptions } from '../../../utils/auth-options'
import { processImage } from '@/lib/processImage'
import cloudinary from '@/utils/cloudinary'

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

    const data = await req.formData()
    const image = data.get('image')

    const buffer = await processImage(image)

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' },
        async (err, result) => {
          if (err) {
            console.log(err)
            reject(err)
          }

          resolve(result)
        })
        .end(buffer)
    })

    const userFound = await db.users.findUnique({
      where: {
        email_address: session?.user?.email
      }
    })

    const dataToEdit = {
      user_nick: data.get('user_nick') === '' ? userFound.user_nick : data.get('user_nick'),
      phonenumber: data.get('phonenumber') === '' ? userFound.phonenumber : data.get('phonenumber'),
      avatar_url: res.secure_url === '' ? userFound.avatar_url : res.secure_url,
      description: data.get('description') === '' ? userFound.description : data.get('description'),
      full_name: data.get('full_name') === '' ? userFound.full_name : data.get('full_name'),
      birthday: data.get('birthday') === '' ? userFound.birthday : data.get('birthday')
    }

    await db.users.updateMany({
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
