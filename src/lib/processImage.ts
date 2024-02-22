export async function processImage (image: any) {
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  return buffer
}
