import { put, del } from '@vercel/blob'
import { StorageProvider, StorageResult, UploadOptions } from './index'

export class VercelBlobProvider implements StorageProvider {
  async upload(file: File, options?: UploadOptions): Promise<StorageResult> {
    const filename = options?.filename || `${Date.now()}-${file.name}`
    const folder = options?.folder || 'uploads'
    const pathname = `${folder}/${filename}`

    const blob = await put(pathname, file, {
      access: 'public',
    })

    return {
      url: blob.url,
      publicId: pathname,
      size: file.size,
    }
  }

  async delete(url: string): Promise<void> {
    // Extract pathname from Vercel blob URL
    const urlObj = new URL(url)
    const pathname = urlObj.pathname.substring(1) // Remove leading slash

    await del(pathname)
  }

  getUrl(path: string): string {
    // Vercel blob URLs are already full URLs
    return path
  }
}
