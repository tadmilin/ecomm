// Storage abstraction layer for easy migration
export interface StorageProvider {
  upload(file: File, options?: UploadOptions): Promise<StorageResult>
  delete(url: string): Promise<void>
  getUrl(path: string): string
}

export interface UploadOptions {
  folder?: string
  filename?: string
  transformations?: ImageTransformation[]
}

export interface StorageResult {
  url: string
  publicId?: string
  width?: number
  height?: number
  size?: number
}

export interface ImageTransformation {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpg' | 'png'
}

// Storage factory to switch between providers
export class StorageManager {
  private provider: StorageProvider

  constructor(provider: StorageProvider) {
    this.provider = provider
  }

  async uploadProductImage(file: File, productId: string): Promise<StorageResult> {
    return this.provider.upload(file, {
      folder: `products/${productId}`,
      transformations: [{ width: 800, height: 800, quality: 85, format: 'webp' }],
    })
  }

  async deleteProductImage(url: string): Promise<void> {
    return this.provider.delete(url)
  }

  // Easy provider switching
  switchProvider(newProvider: StorageProvider) {
    this.provider = newProvider
  }
}
