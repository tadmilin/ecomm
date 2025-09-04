# PayloadCMS i18n Migration Scripts

This directory contains scripts for migrating from i18next to PayloadCMS native i18n system.

## Scripts Overview

### 1. Migration Script (`migrate-to-payload-i18n.js`)

Migrates existing i18next translation data to PayloadCMS Languages and Translations collections.

**Features:**
- Migrates from `src/dictionaries/` and `public/locales/` directories
- Creates Languages collection entries
- Creates Translations collection entries with proper namespace handling
- Supports dry-run mode for testing
- Supports reset mode to clear existing data
- Comprehensive error handling and logging

**Usage:**
```bash
# Dry run (no changes made)
npm run migrate:i18n:dry

# Full migration
npm run migrate:i18n

# Reset and migrate (clears existing data first)
npm run migrate:i18n:reset
```

### 2. Seed Script (`seed-payload-i18n.js`)

Creates initial language and translation data for PayloadCMS i18n system.

**Features:**
- Creates initial language configurations (Thai, English, Japanese)
- Creates comprehensive translation data for common UI elements
- Supports reset mode to clear existing data
- Organized by namespaces (common, layout, auth, admin)

**Usage:**
```bash
# Create initial data
npm run seed:i18n

# Reset and create initial data
npm run seed:i18n:reset
```

## Migration Process

### Step 1: Prepare Data Sources

The migration script looks for existing translation data in:

1. **Dictionary Files** (`src/dictionaries/`):
   - `th.json` - Thai translations
   - `en.json` - English translations  
   - `ja.json` - Japanese translations

2. **Locale Files** (`public/locales/`):
   - `th/translation.json` - Thai translations
   - `en/translation.json` - English translations
   - `ja/translation.json` - Japanese translations
   - Additional namespace files (e.g., `th/layout.json`)

### Step 2: Run Migration

```bash
# Test the migration first
npm run migrate:i18n:dry

# Run the actual migration
npm run migrate:i18n
```

### Step 3: Verify Results

Check the PayloadCMS admin panel:
1. Go to Collections → Languages
2. Go to Collections → Translations
3. Verify that all translations are properly imported

## Data Structure

### Languages Collection

Each language entry contains:
```json
{
  "code": "th",
  "name": "Thai", 
  "nativeName": "ไทย",
  "isActive": true,
  "isDefault": true,
  "direction": "ltr",
  "dateFormat": "DD/MM/YYYY",
  "timeFormat": "24h",
  "currency": "THB",
  "sortOrder": 1
}
```

### Translations Collection

Each translation entry contains:
```json
{
  "key": "home",
  "namespace": "layout",
  "language": "th",
  "value": "หน้าแรก",
  "isActive": true,
  "autoTranslated": false,
  "needsReview": false,
  "sortOrder": 0
}
```

## Translation Key Format

Translations are stored with full namespace keys:
- `common.meta.title` → "เว็บไซต์ Payload"
- `layout.nav.home` → "หน้าแรก"
- `auth.signin` → "เข้าสู่ระบบ"

## API Endpoints

After migration, translations can be accessed via:

- `GET /api/languages` - Get all active languages
- `GET /api/translations?language=th` - Get all translations for Thai
- `GET /api/translations?language=th&namespace=layout` - Get layout translations for Thai

## Troubleshooting

### Common Issues

1. **"Failed to initialize PayloadCMS"**
   - Ensure the database is running
   - Check PayloadCMS configuration

2. **"Translation already exists"**
   - Use `--reset` flag to clear existing data
   - Or manually delete conflicting entries

3. **"Missing required fields"**
   - Check that source translation files are valid JSON
   - Ensure required language fields are present

### Debug Mode

For detailed logging, check the console output during migration. The scripts provide comprehensive error messages and statistics.

## Post-Migration Steps

1. **Update Components**: Ensure all components use `usePayloadLanguage` hook
2. **Test Language Switching**: Verify the language switcher works correctly
3. **Update API Calls**: Replace i18next API calls with PayloadCMS API calls
4. **Remove Old Files**: Consider removing old i18next configuration files

## Support

For issues or questions:
1. Check the console output for detailed error messages
2. Verify PayloadCMS collections are properly configured
3. Ensure database connectivity
4. Check file permissions for script execution

