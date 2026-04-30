# DevForge Studio Portfolio

DevForge Studio is a Next.js portfolio and service website for a software development agency. It presents service lines, engagement models, case studies, process details, legal pages, and a project inquiry form.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI and shadcn-style UI components
- Formspree contact form integration
- Vercel Analytics in production

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

- `pnpm dev` starts the local Next.js development server.
- `pnpm build` creates a production build.
- `pnpm start` serves the production build.
- `pnpm lint` runs ESLint across the project.

## Project Structure

```text
app/                    Next.js routes, metadata, sitemap, robots, and icon routes
components/             Shared layout, marketing, form, and UI components
hooks/                  Shared React hooks
lib/                    Site configuration, static content, and utilities
public/                 Logos, icons, avatars, and project images
styles/                 Global style assets
```

## Main Routes

- `/` - home page with services, metrics, process, case studies, and FAQ preview
- `/services` - service lines and engagement models
- `/projects` - case study overview
- `/process` - delivery process
- `/about` - company positioning
- `/faq` - frequently asked questions
- `/contact` - project inquiry form
- `/privacy`, `/terms`, `/cookies`, `/disclaimer` - legal pages

## Configuration

Most site-level settings live in `lib/config.ts`:

- site name, title, description, and canonical URL
- contact email and social links
- Formspree form ID
- legal document update date

Static marketing content lives in `lib/site-data.ts`, including navigation, services, engagement models, case studies, process steps, proof metrics, FAQs, and form options.

The app uses `NEXT_PUBLIC_SITE_URL` when available for metadata base URL generation. If it is not set, the value from `SITE_CONFIG.url` is used.

## Contact Form

The contact form is implemented in `components/project-inquiry-form.tsx` and submits through Formspree using the `formspreeId` value in `lib/config.ts`.

The form validates required identity, company, service, budget, timeline, project summary, goals, contact preference, and consent fields before submitting.

## Assets

Project imagery is stored in `public/images/projects/`. The logo and icons are stored in `public/`.

Next.js image optimization is disabled in `next.config.mjs`, which keeps static image output simple for deployment targets that do not use the built-in optimizer.

## Deployment

The project is ready for Vercel deployment. Vercel Analytics is only rendered when `process.env.VERCEL === '1'`.

For other static-friendly hosts, confirm that the selected deployment target supports Next.js App Router routes and route handlers used by the icon and Open Graph image routes.
