# H Remodeling Website

다국어 지원 리모델링 회사 웹사이트 (English, 中文, 한국어)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Animation:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd h-remodeling

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/           # Locale-based routing
│       ├── layout.tsx      # Root layout with header/footer
│       ├── page.tsx        # Homepage
│       ├── about/          # About page
│       ├── services/       # Services page
│       ├── projects/       # Portfolio pages
│       │   └── [slug]/     # Project detail pages
│       └── contact/        # Contact page with form
├── components/
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Site footer
├── messages/               # Translation files
│   ├── en.json            # English
│   ├── zh.json            # Chinese
│   └── ko.json            # Korean
├── i18n.ts                # i18n configuration
└── middleware.ts          # Locale routing middleware
```

## 🌐 Multi-language Support

The site supports three languages:
- English (default): `/en/`
- Chinese: `/zh/`
- Korean: `/ko/`

To add/modify translations, edit files in `src/messages/`.

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to modify the color palette:
- `primary` - Main accent color (warm beige/gold)
- `neutral` - Text and background colors

### Images
Replace Unsplash images with actual project photos:
1. Add images to `public/images/`
2. Update image paths in page components

### Contact Form
The contact form currently logs to console. To enable email:
1. Set up EmailJS, Resend, or similar service
2. Update `src/app/[locale]/contact/page.tsx`

## 📦 Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔧 Environment Variables

Create `.env.local` for local development:

```env
# Add any API keys here
# NEXT_PUBLIC_EMAILJS_KEY=your_key
```

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Multi-language (EN, ZH, KO)
- ✅ SEO optimized (meta tags, sitemap, hreflang)
- ✅ Portfolio gallery with filtering
- ✅ Contact form
- ✅ Social media integration
- ✅ Fast loading (Next.js optimization)

## 📞 Contact Information

- **Phone:** (703) 585-9517
- **Email:** hremodeling05@gmail.com
- **Service Area:** Maryland, Virginia, Washington D.C.

## 📄 License

Private - H Remodeling © 2024
