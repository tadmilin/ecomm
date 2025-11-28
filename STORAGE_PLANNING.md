# Storage Capacity Planning for 3,000 Products

## Current Free Tier Resources

### MongoDB Atlas Free Tier
- **Capacity**: 512 MB
- **Collections**: Shared storage for all data
- **Best for**: Structured data (product info, prices, descriptions)

### Vercel Blob Free Tier
- **Capacity**: 5 GB
- **Best for**: Media files (images, videos, documents)
- **Bandwidth**: 100 GB/month downloads

---

## Storage Breakdown for 3,000 Products

### 1. MongoDB Storage (Product Data)

#### Per Product Data Size:
```json
{
  "name": "Product Name",           // ~50 bytes
  "sku": "PROD-001",                // ~20 bytes
  "description": "...",             // ~500 bytes
  "price": 1000,                    // ~8 bytes
  "compareAtPrice": 1500,           // ~8 bytes
  "cost": 700,                      // ~8 bytes
  "stock": 100,                     // ~8 bytes
  "category": ["id"],               // ~50 bytes
  "tags": ["tag1", "tag2"],        // ~100 bytes
  "images": [{"image": "id"}],     // ~50 bytes (references only)
  "status": "active",              // ~10 bytes
  "slug": "product-name",          // ~50 bytes
  "metadata": {...}                // ~150 bytes
}
```

**Total per product: ~1,000 bytes (1 KB)**

#### 3,000 Products:
- Product documents: 3,000 × 1 KB = **3 MB**
- Indexes (SKU, slug, status, category): ~**6 MB**
- MongoDB overhead: ~**1 MB**

**Total Products Collection: ~10 MB** ✅

#### Other Collections (estimate):
- Categories: ~0.5 MB
- Users: ~1 MB
- Pages: ~5 MB
- Posts: ~5 MB
- Media metadata: ~10 MB

**Total MongoDB Usage: ~32 MB / 512 MB** ✅
**Remaining: ~480 MB (94% free)**

### 2. Vercel Blob Storage (Images)

#### Image Size Guidelines:

| Optimization Level | Size per Image | 3 images/product | 3,000 products |
|-------------------|---------------|------------------|----------------|
| **Unoptimized** (Original) | 2 MB | 6 MB | 18 GB ❌ |
| **Standard Quality** | 500 KB | 1.5 MB | 4.5 GB ⚠️ |
| **Recommended** | 300 KB | 900 KB | 2.7 GB ✅ |
| **Aggressive** | 150 KB | 450 KB | 1.35 GB ✅ |

#### ✅ Recommended Strategy:
- **Product images**: 800×800px, 85% quality, WebP format
- **Target size**: 300 KB per image
- **Images per product**: 3 images
- **Total**: 3,000 products × 3 images × 300 KB = **2.7 GB / 5 GB** ✅
- **Remaining**: 2.3 GB (46% free)

---

## Image Optimization Workflow

### Before Upload:
```bash
# Install Sharp CLI (for batch optimization)
npm install -g sharp-cli

# Optimize all images
sharp-cli resize 800 800 \
  --format webp \
  --quality 85 \
  --input ./original-images/*.jpg \
  --output ./optimized-images/

# Or use online tools:
# - TinyPNG.com (lossy compression)
# - Squoosh.app (manual optimization)
# - Cloudinary (auto-optimization)
```

### Image Requirements:
```javascript
{
  format: 'webp',           // Modern format with 25-35% smaller size
  maxWidth: 1200,           // Max resolution
  maxHeight: 1200,
  quality: 85,              // Good balance of quality/size
  targetSize: 300,          // KB per image
  thumbnail: {
    width: 400,
    height: 400,
    quality: 75,
  }
}
```

---

## Import Performance Estimates

### Time to Import 3,000 Products:

| Batch Size | Delay | With Images | Without Images |
|-----------|-------|-------------|----------------|
| 10 | 500ms | ~90 min | ~15 min |
| 25 | 1000ms | ~80 min | ~20 min |
| 50 | 1000ms | ~60 min | ~15 min |
| 100 | 2000ms | ~90 min | ~30 min |

**Recommended**: Batch size 50, 1000ms delay = **~60 minutes**

### Rate Limits to Consider:
- **MongoDB Atlas Free**: No hard limit, but throttled at high request rates
- **Vercel Blob**: 10 GB bandwidth/month (upload + download)
- **API calls**: Payload has no hard limits, but be reasonable

---

## Capacity Planning Scenarios

### Scenario 1: Basic Store (Current Setup)
- **Products**: 3,000
- **Images**: 3 per product @ 300KB = 2.7 GB
- **MongoDB**: ~32 MB
- **Status**: ✅ Fits in free tier
- **Cost**: $0/month

### Scenario 2: Medium Store
- **Products**: 6,000
- **Images**: 3 per product @ 300KB = 5.4 GB
- **MongoDB**: ~60 MB
- **Status**: ⚠️ Need paid Vercel Blob ($0.15/GB)
- **Cost**: ~$1/month for extra 0.4 GB

### Scenario 3: Large Store
- **Products**: 10,000+
- **Images**: 3 per product
- **Status**: ❌ Must migrate to Cloudinary or S3
- **Cost**: Cloudinary free tier (25 GB) or AWS S3 (~$0.023/GB)

---

## Migration Path to Cloudinary (When Needed)

### Cloudinary Free Tier:
- **Storage**: 25 GB (5× Vercel Blob)
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Can fit**: ~16,000 products (3 images @ 500KB each)

### When to Migrate:
1. **Trigger**: Vercel Blob usage > 4 GB (80%)
2. **Preparation**: 
   - Sign up for Cloudinary
   - Add credentials to environment
   - Change `STORAGE_PROVIDER=cloudinary`
3. **Migration**: Use `src/lib/storage/migration.ts`
4. **Time**: ~2-4 hours for 3,000 products

### Migration Command:
```javascript
// Run migration script
import { StorageMigration } from '@/lib/storage/migration'
import { VercelBlobProvider } from '@/lib/storage/vercel-blob'
import { CloudinaryProvider } from '@/lib/storage/cloudinary'

const migration = new StorageMigration(
  new VercelBlobProvider(),
  new CloudinaryProvider()
)

await migration.migrateCollection('media', {
  batchSize: 50,
  delayMs: 1000
})
```

---

## Monitoring & Alerts

### Check Storage Usage:

#### MongoDB Atlas:
1. Login to https://cloud.mongodb.com
2. Clusters → Your Cluster → Metrics
3. Check "Data Size" graph

#### Vercel Blob:
1. Login to Vercel Dashboard
2. Storage → Blob
3. Check usage percentage

### Setup Alerts:
```javascript
// Add to cron job or monitoring service
async function checkStorageUsage() {
  const mongoUsage = await getMongoSize() // Custom function
  const blobUsage = await getBlobSize()   // Custom function
  
  if (mongoUsage > 400) { // MB
    sendAlert('MongoDB approaching limit')
  }
  
  if (blobUsage > 4) { // GB
    sendAlert('Vercel Blob approaching limit - prepare Cloudinary migration')
  }
}
```

---

## Cost Projections

### Free Tier (0-3,000 products):
- **MongoDB Atlas**: Free (512 MB)
- **Vercel Blob**: Free (5 GB)
- **Total**: $0/month ✅

### Paid Tier 1 (3,000-6,000 products):
- **MongoDB Atlas**: Free (still under 512 MB)
- **Vercel Blob**: $0.15/GB × 5 GB extra = $0.75/month
- **Total**: ~$1/month

### Paid Tier 2 (6,000-10,000 products):
- **MongoDB Atlas**: Free (still under 512 MB)
- **Cloudinary**: Free (25 GB tier)
- **Total**: $0/month ✅

### Paid Tier 3 (10,000+ products):
- **MongoDB Atlas**: Upgrade to M10 ($0.08/hour = ~$57/month)
- **Cloudinary**: Free tier (25 GB)
- **Total**: ~$57/month

---

## Recommendations

### ✅ DO:
1. **Optimize images** before import (target 300 KB)
2. **Use WebP format** (25-35% smaller than JPEG)
3. **Lazy load images** on frontend
4. **Use thumbnails** for product listings
5. **Monitor usage** monthly
6. **Plan migration** when reaching 80% capacity

### ❌ DON'T:
1. **Don't upload RAW** or unoptimized images
2. **Don't use PNG** for photos (use for logos only)
3. **Don't exceed 1200×1200px** resolution
4. **Don't store videos** in Vercel Blob (use YouTube/Vimeo)
5. **Don't wait** until 100% full to migrate

---

## Summary: Can You Import 3,000 Products?

### ✅ YES! Here's the plan:

| Resource | Free Limit | Your Usage | Status |
|---------|-----------|------------|--------|
| **MongoDB** | 512 MB | ~32 MB | ✅ 6% used |
| **Vercel Blob** | 5 GB | ~2.7 GB | ✅ 54% used |
| **Bandwidth** | 100 GB/month | ~20 GB/month | ✅ 20% used |

### Next Steps:
1. ✅ Products Collection created
2. ✅ Import script ready
3. ✅ Excel template provided
4. ⏳ Optimize your product images
5. ⏳ Install xlsx package: `npm install xlsx`
6. ⏳ Run import: `node scripts/import-products.js --file products.xlsx`
7. ⏳ Monitor storage usage
8. ⏳ Prepare Cloudinary migration when needed

**You're ready to go! 🚀**
