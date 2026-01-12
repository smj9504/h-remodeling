# H Remodeling Website

다국어 지원 리모델링 회사 웹사이트 (English, 中文, 한국어)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Animation:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **CMS:** Sanity.io (Headless CMS)
- **Email:** Nodemailer

## Getting Started

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

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── layout.tsx         # Root layout with header/footer
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── services/          # Services page
│   │   ├── projects/          # Portfolio pages
│   │   │   └── [slug]/        # Project detail pages
│   │   └── contact/           # Contact page with form
│   ├── studio/                # Sanity Studio (CMS)
│   │   └── [[...tool]]/       # Studio pages
│   └── api/
│       └── contact/           # Contact form API
├── sanity/
│   ├── schemas/               # Sanity content schemas
│   │   ├── project.ts         # Project schema (multilingual)
│   │   └── projectCategory.ts
│   └── lib/
│       ├── client.ts          # Sanity client
│       ├── queries.ts         # GROQ queries
│       └── fetch.ts           # Data fetching utilities
├── components/
│   ├── Header.tsx             # Navigation header
│   └── Footer.tsx             # Site footer
├── messages/                  # Translation files
│   ├── en.json               # English
│   ├── zh.json               # Chinese
│   └── ko.json               # Korean
├── i18n/
│   ├── routing.ts            # i18n routing config
│   └── request.ts            # i18n request config
└── middleware.ts             # Locale routing middleware
```

## Multi-language Support

The site supports three languages:
- English (default): `/en/`
- Chinese: `/zh/`
- Korean: `/ko/`

To add/modify translations, edit files in `src/messages/`.

## Content Management (Sanity CMS)

Portfolio content is managed through Sanity Studio.

### Accessing the Studio

1. Navigate to `/studio` (e.g., `http://localhost:3000/studio`)
2. Log in with your Sanity account
3. Only invited project members can access

### Features

- **Multilingual Content:** Each field supports en/ko/zh
- **Image Management:** Automatic CDN delivery and optimization
- **Real-time Editing:** Changes sync across team members
- **Version Control:** Built-in content versioning

### Setup Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy Project ID
3. Add to `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```
4. Add CORS origin: `http://localhost:3000` (and production URL)
5. Invite team members via Sanity dashboard

## Customization

### Colors
Edit `tailwind.config.ts` to modify the color palette:
- `primary` - Main accent color (warm beige/gold)
- `neutral` - Text and background colors

### Images
Images are managed through Sanity CMS:
1. Upload images in Sanity Studio
2. Images are automatically served via Sanity CDN
3. Supports hotspot/crop for responsive images

Legacy static images can be placed in `public/images/`.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
4. Deploy

### Environment Variables

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Email (Contact Form)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Multi-language (EN, ZH, KO)
- ✅ SEO optimized (meta tags, sitemap, hreflang, structured data)
- ✅ Portfolio gallery with filtering
- ✅ Sanity CMS for content management
- ✅ Contact form with email notification
- ✅ Social media integration
- ✅ Fast loading (Next.js optimization, image CDN)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contact Information

- **Phone:** (703) 585-9517
- **Email:** hremodeling05@gmail.com
- **Service Area:** Maryland, Virginia, Washington D.C.

## License

Private - H Remodeling © 2025
