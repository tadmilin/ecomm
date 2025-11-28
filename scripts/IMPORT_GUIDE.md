# Excel Import Template for Products

## Required Columns

| Column Name | Required | Type | Example | Description |
|------------|----------|------|---------|-------------|
| SKU | ✅ Yes | Text | `PROD-001` | Unique product code |
| Product Name | ✅ Yes | Text | `iPhone 15 Pro Max` | Product name |
| Description | ⚪ No | Text | `Latest iPhone with...` | Product description |
| Price | ✅ Yes | Number | `45900` | Selling price (THB) |
| Compare At Price | ⚪ No | Number | `49900` | Original price for discount display |
| Cost | ⚪ No | Number | `35000` | Cost per item |
| Stock | ✅ Yes | Number | `100` | Available quantity |
| Weight | ⚪ No | Number | `0.5` | Weight in kg |
| Category | ⚪ No | Text | `Electronics` | Category name (will be created if not exists) |
| Tags | ⚪ No | Text | `smartphone,apple,5g` | Tags separated by comma |
| Status | ⚪ No | Text | `active` | `draft`, `active`, `out_of_stock`, `discontinued` |
| Featured | ⚪ No | Text | `yes` | `yes` or `no` |
| Image URLs | ⚪ No | Text | `https://example.com/img1.jpg\|https://example.com/img2.jpg` | URLs separated by `\|` |
| Image Files | ⚪ No | Text | `product1.jpg\|product2.jpg` | Local filenames separated by `\|` |
| External ID | ⚪ No | Text | `OLD-123` | ID from old system |

## Example Data

```
SKU          | Product Name        | Price  | Stock | Category    | Image URLs
-------------|---------------------|--------|-------|-------------|----------------------------------
IPHONE-15PM  | iPhone 15 Pro Max   | 45900  | 50    | Smartphones | https://example.com/iphone.jpg
MACBOOK-M3   | MacBook Pro M3      | 89900  | 30    | Laptops     | https://example.com/macbook.jpg
AIRPODS-PRO  | AirPods Pro (2nd)   | 8990   | 200   | Audio       | https://example.com/airpods.jpg
```

## Image Handling

### Option 1: URLs (Recommended for initial import)
```
Image URLs: https://example.com/img1.jpg|https://example.com/img2.jpg|https://example.com/img3.jpg
```

### Option 2: Local Files
1. Place all images in `./product-images/` folder
2. In Excel, use filenames:
```
Image Files: iphone-front.jpg|iphone-back.jpg
```

## Import Instructions

### 1. Install dependencies
```bash
pnpm install xlsx
```

### 2. Prepare your data
- Create Excel file with columns above
- Add your 3,000 products
- Save as `products.xlsx`

### 3. Test import (Dry Run)
```bash
node scripts/import-products.js --file products.xlsx --dry-run
```

### 4. Actual import
```bash
node scripts/import-products.js --file products.xlsx
```

### 5. Batch import (50 items at a time)
```bash
node scripts/import-products.js --file products.xlsx --batch-size 50
```

### 6. With custom image folder
```bash
IMAGE_PATH=./my-images node scripts/import-products.js --file products.xlsx
```

## Performance Tips

### For 3,000 Products:

1. **Batch Size**: 50-100 products per batch
2. **Delay**: 1000ms between batches (to avoid rate limits)
3. **Time Estimate**: ~30-60 minutes for 3,000 products with images

### Resource Usage:

- **MongoDB Free (512MB)**: 
  - Product data: ~100KB per product = ~300MB for 3,000 products ✅
  - Space remaining: ~200MB for Pages/Posts/Users ✅

- **Vercel Blob Free (5GB)**:
  - 3 images per product × 500KB = 1.5MB per product
  - 3,000 products = ~4.5GB ✅ (ใกล้เต็ม!)
  - **Recommendation**: Optimize images to 300KB each = ~2.7GB

## Storage Optimization

### Before Import:
```bash
# Install image optimization tool
pnpm install sharp-cli -g

# Optimize all images
sharp-cli resize 800 800 --input ./product-images/*.jpg --output ./optimized-images/
```

### Image Guidelines:
- Max resolution: 1200×1200px
- Format: WebP or JPEG
- Quality: 85%
- Target size: 200-400KB per image
- 3-5 images per product

## Troubleshooting

### Issue: "File not found"
- Check that Excel file path is correct
- Use absolute path: `--file C:\Users\...\products.xlsx`

### Issue: "Category not found"
- Categories will be auto-created
- Or create them manually in Admin Panel first

### Issue: "Image upload failed"
- Check image URLs are accessible
- Verify local images exist in `./product-images/`
- Check file extensions (.jpg, .png, .webp)

### Issue: "Out of memory"
- Reduce batch size: `--batch-size 25`
- Increase delay: `BATCH_DELAY=2000`

## After Import

1. **Verify in Admin Panel**: http://localhost:3000/admin/collections/products
2. **Check storage usage**: Vercel Dashboard → Storage
3. **Test product display**: Create product listing page
4. **Setup search**: Use existing search plugin for products

## Next Steps

1. Create product listing page
2. Add product detail page
3. Implement cart functionality
4. Setup payment gateway
5. Monitor storage usage → Migrate to Cloudinary when needed

## Contact & Support

If you encounter issues:
1. Check logs for detailed error messages
2. Verify Excel format matches template
3. Test with small batch first (10 products)
4. Ensure all required environment variables are set
