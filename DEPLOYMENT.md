# Deployment Guide for Hostinger

## Build Process
The project is now configured for static export, making it compatible with shared hosting providers like Hostinger.

## Files to Upload
After running `npm run build`, upload the contents of the `out` folder to your Hostinger public_html directory.

## Steps:
1. Run `npm run build` locally
2. Navigate to the `out` folder created after build
3. Upload ALL contents of the `out` folder to your Hostinger `public_html` directory
4. Make sure the `.htaccess` file is uploaded for proper routing

## Important Notes:
- The site is now a static export (no Node.js server required)
- All images are unoptimized for compatibility with static hosting
- Routing is handled via `.htaccess` for Apache servers
- Node version requirement lowered to >=18.17.0 for better hosting compatibility

## Troubleshooting:
- If routes don't work, ensure `.htaccess` is in the root directory
- If images don't load, check file paths are correct
- If CSS doesn't apply, clear browser cache and check file uploads

## Build Configuration Changes Made:
- Changed `output: "standalone"` to `output: "export"`
- Added `images: { unoptimized: true }`
- Added `trailingSlash: true` for better static hosting
- Lowered Node.js version requirement from 24 to 18.17.0
- Fixed TypeScript type issues
- Added proper .htaccess for Apache routing