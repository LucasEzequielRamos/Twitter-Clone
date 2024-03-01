export async function processImage (image: any) {
  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return buffer
  } catch (error) {
    console.log(error)
  }
}
