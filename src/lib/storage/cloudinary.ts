import { v2 as cloudinary } from 'cloudinary'
import { StorageProvider, StorageResult, UploadOptions } from './index'

// Configure Cloudinary (only if environment variables exist)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export class CloudinaryProvider implements StorageProvider {
  constructor() {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error(
        'Cloudinary configuration missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.',
      )
    }
  }

  async upload(file: File, options?: UploadOptions): Promise<StorageResult> {
    // Convert File to buffer for Cloudinary
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString('base64')}`,
      {
        folder: options?.folder || 'products',
        public_id: options?.filename?.split('.')[0],
        transformation: options?.transformations?.map((t) => ({
          width: t.width,
          height: t.height,
          quality: t.quality || 'auto',
          format: t.format || 'webp',
          crop: 'fill',
        })),
      },
    )

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      size: result.bytes,
    }
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
  }

  getUrl(publicId: string, transformations?: any): string {
    return cloudinary.url(publicId, transformations)
  }
}
