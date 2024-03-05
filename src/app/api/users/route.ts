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
    const data = await req.formData()
    const image = data.get('image')
    const email: any = data.get('email')
    console.log(email)

    const buffer = image && await processImage(image)

    const res: any = await new Promise((resolve, reject) => {
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
    console.log(res, 'res cloudinary upload')

    const userFound = await db.users.findUnique({
      where: {
        email_address: email
      }
    })
    if (userFound === null) return

    console.log(userFound, 'user found desde el route')

    const userNick = data.get('user_nick')?.toString()
    const userNickOrDefault = userNick !== 'undefined' ? userNick : userFound.user_nick

    const phoneNumber = data.get('phonenumber')?.toString()
    const phoneNumberOrDefault = phoneNumber !== 'undefined' ? phoneNumber : userFound.phonenumber

    const description = data.get('description')?.toString()
    const descriptionOrDefault = description !== 'undefined' ? description : userFound.description

    const fullName = data.get('full_name')?.toString()
    const fullNameOrDefault = fullName !== 'undefined' ? fullName : userFound.full_name

    const birthday = data.get('birthday')?.toString()
    const birthdayOrDefault = birthday !== 'undefined' ? birthday : userFound.birthday

    const dataToEdit = {
      user_nick: userNickOrDefault,
      phonenumber: phoneNumberOrDefault,
      avatar_url: res?.secure_url ? res.secure_url : userFound.avatar_url,
      description: descriptionOrDefault,
      full_name: fullNameOrDefault,
      birthday: birthdayOrDefault
    }

    console.log(dataToEdit, 'data to edit desde el router')

    if (!dataToEdit) return
    await db.users.updateMany({
      where: {
        email_address: email
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
