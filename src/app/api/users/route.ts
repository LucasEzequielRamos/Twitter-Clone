import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import db from '@/utils/db'
import { authOptions } from '../../../utils/auth-options'
// import { processImage } from '@/lib/processImage'
// import cloudinary from '@/utils/cloudinary'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

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
    const image: any = data.get('image') as File
    const email: any = data.get('email')

    const bytes = await image?.arrayBuffer()
    const mime = image?.type
    const encoding = 'base64'
    const base64Data = Buffer.from(bytes).toString('base64')
    const fileUri = image && 'data:' + mime + ';' + encoding + ',' + base64Data

    console.log(mime, 'mime from route')
    console.log(base64Data, ' base64data from route')
    console.log(fileUri, 'buffer from route')

    const userFound = await db.users.findUnique({
      where: {
        email_address: email
      }
    })
    if (userFound === null) throw new Error('user not found')

    const uploadToCloudinary: any = async () => {
      if (image) {
        return await new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const result = cloudinary.uploader.upload(fileUri, {
            invalidate: true
          })
            .then((result) => {
              console.log(result)
              resolve(result)
            })
            .catch((error) => {
              console.log(error)
              reject(error)
            })
        })
      }
    }

    const res: any = await uploadToCloudinary()
    console.log(res, ' uploaded to cloudinary')

    const userNick = data.get('user_nick')?.toString()
    const userNickOrDefault = userNick === 'undefined' || !userNick ? userFound.user_nick : userNick

    const phoneNumber = data.get('phonenumber')?.toString()
    const phoneNumberOrDefault = phoneNumber === 'undefined' || !phoneNumber ? userFound.phonenumber : phoneNumber

    const description = data.get('description')?.toString()
    const descriptionOrDefault = description === 'undefined' || !description ? userFound.description : description

    const fullName = data.get('full_name')?.toString()
    const fullNameOrDefault = fullName === 'undefined' || !fullName ? userFound.full_name : fullName

    const birthday = data.get('birthday')?.toString()
    const birthdayOrDefault = birthday === 'undefined' || !birthday ? userFound.birthday : birthday

    const dataToEdit = {
      user_nick: userNickOrDefault,
      phonenumber: phoneNumberOrDefault,
      avatar_url: res?.secure_url ? res.secure_url : userFound.avatar_url,
      description: descriptionOrDefault,
      full_name: fullNameOrDefault,
      birthday: birthdayOrDefault
    }

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

    return NextResponse.json(dataToEdit, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}
