import { StorageProvider } from './index'
import { VercelBlobProvider } from './vercel-blob'
import { CloudinaryProvider } from './cloudinary'

export type StorageProviderType = 'vercel-blob' | 'cloudinary'

export function createStorageProvider(type: StorageProviderType): StorageProvider {
  switch (type) {
    case 'vercel-blob':
      return new VercelBlobProvider()
    case 'cloudinary':
      try {
        return new CloudinaryProvider()
      } catch (_error) {
        console.warn('Cloudinary not configured, falling back to Vercel Blob')
        return new VercelBlobProvider()
      }
    default:
      throw new Error(`Unknown storage provider: ${type}`)
  }
}

// Default provider (ใช้ environment variable)
export function getDefaultStorageProvider(): StorageProvider {
  const providerType = (process.env.STORAGE_PROVIDER as StorageProviderType) || 'vercel-blob'
  return createStorageProvider(providerType)
}
