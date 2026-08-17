# Webkonic - Digital Agency Website

A modern, responsive website built with Next.js, featuring advanced animations, 3D effects, and mobile-optimized interactions.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **3D Effects**: WebGL-powered visual effects using Three.js
- **Mobile Optimized**: Touch-friendly interactions and responsive design
- **Performance**: Static export for fast loading and SEO optimization
- **Accessibility**: WCAG compliant with proper semantic markup

## 🛠️ Tech Stack

- **Next.js 16.3.0** - React framework with static export
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first styling
- **Three.js** - 3D graphics and WebGL effects
- **GSAP** - High-performance animations
- **Framer Motion** - React animation library

## 📦 Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
```

## 🚀 Deployment

This project is configured for static deployment and works with:

- **Hostinger** (or any shared hosting)
- **Vercel**
- **Netlify** 
- **GitHub Pages**

### Hostinger Deployment

1. Run `npm run build`
2. Upload contents of `out/` folder to `public_html`
3. Ensure `.htaccess` file is uploaded for routing

### GitHub Pages

Automatic deployment via GitHub Actions on push to `main` branch.

## 🎮 Key Components

- **FeaturedWork**: Interactive 3D carousel with touch/swipe support
- **HeroSection**: Video background with optimized loading
- **FluidEffect**: WebGL liquid distortion effects
- **CustomCursor**: Interactive cursor animations

## 🔧 Configuration

- **Static Export**: Configured for shared hosting compatibility
- **Image Optimization**: Disabled for static hosting
- **Node.js**: Minimum version 18.17.0
- **TypeScript**: Strict mode enabled

## 📱 Mobile Features

- Touch-optimized carousel navigation
- Responsive breakpoints for all screen sizes  
- Gesture-based interactions
- Optimized performance for mobile devices

## 🔒 Security

- Content Security Policy headers
- XSS protection
- Secure asset loading
- HTTPS-ready configuration

## 📄 License

MIT License - see LICENSE file for details.