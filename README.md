# Nexus: Next.js Admin Dashboard

An admin dashboard built with Next.js (App Router), TypeScript and Tailwind CSS. It has analytics charts, users, products and orders management, authentication with roles, and a responsive, themeable UI.

> This is a learning project. All data is mock data kept in memory, and no real payments or emails are involved.

## Features

- **Dashboard:** KPI cards, revenue chart and recent activity, streamed with Suspense and skeleton loaders
- **Users:** search, status and role filters, sortable columns, pagination, user detail pages, edit and delete actions
- **Products:** grid and table views, categories, stock status, filters, sorting and detail pages
- **Orders:** status tabs with counts, search, sorting, order details with a status timeline
- **Analytics:** line, area, donut and bar charts (Recharts) with a date range selector
- **Global search:** one field in the top bar that finds users, products and orders (`Ctrl + K` to focus)
- **Settings:** profile form with validation, theme preferences (light, dark, system) and notification switches
- **Auth:** login and signup, signed cookie sessions, protected routes and role based access
- **UI building blocks:** modal, dropdown menu, toast notifications, confirm dialog, switch, badges, empty and error states
- Responsive layout with a collapsible sidebar, dark and light mode without a flash on load

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack, Cache Components, `proxy.ts`)
- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Recharts](https://recharts.org/) for charts
- [Lucide](https://lucide.dev/) for icons
- [Zod](https://zod.dev/) for validation and [jose](https://github.com/panva/jose) for signed JWT sessions

## Getting Started

```bash
git clone https://github.com/hyousafdev/nextjs-admin-dashboard.git
cd nextjs-admin-dashboard
npm install
```

Create a `.env.local` file in the project root. You can copy `.env.example` and set a real secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```
SESSION_SECRET=paste-the-generated-value-here
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to the login page.

## Demo Accounts

| Role    | Email                 | Password     |
| ------- | --------------------- | ------------ |
| Admin   | `admin@example.com`   | `Admin123!`  |
| Manager | `manager@example.com` | `Manager123!` |

New sign ups get the **viewer** role. Accounts created through sign up live in server memory only, so they disappear when the server restarts.

## Roles and Permissions

| Feature              | Admin | Manager | Viewer |
| -------------------- | :---: | :-----: | :----: |
| Dashboard, Users, Products, Orders, Settings | Yes | Yes | Yes |
| Analytics page       |  Yes  |   Yes   |   No   |
| Edit users           |  Yes  |   Yes   |   No   |
| Delete users         |  Yes  |   No    |   No   |

Access is checked in several places: `proxy.ts` (routes), the dashboard layout, route handlers and Server Actions.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Project Structure

```
src/
├── actions/            # Server Actions (auth, users)
├── app/
│   ├── (auth)/         # Login and signup (own layout)
│   ├── (dashboard)/    # Dashboard pages (shared shell layout)
│   │   ├── analytics/
│   │   ├── dashboard/
│   │   ├── orders/[id]/
│   │   ├── products/[id]/
│   │   ├── settings/
│   │   └── users/[id]/
│   ├── api/search/     # Search Route Handler
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── not-found.tsx
│   └── layout.tsx
├── components/         # auth, charts, dashboard, layout, orders, products, search, settings, theme, ui, users
├── data/               # Mock data
├── lib/                # Data access, auth, session, helpers
├── proxy.ts            # Route protection
└── types/
```

## Next.js Concepts Practiced

- App Router, nested layouts and route groups
- Dynamic routes, `generateStaticParams` and `generateMetadata`
- Server Components and Client Components, and passing props between them
- `searchParams` for filters, sorting and pagination (state kept in the URL)
- `loading.tsx`, `error.tsx`, `not-found.tsx` and `Suspense` streaming
- Route Handlers, Server Actions, `useActionState` and `useFormStatus`
- Cookies, signed JWT sessions, `proxy.ts` and role based authorization
- Context API, portals, focus management and accessibility
- Dark mode with `useSyncExternalStore` and a no-flash inline script

## Notes

- All data is mock data. Orders, users and products are plain files in `src/data`.
- When deploying (for example on Vercel), set `SESSION_SECRET` in the project environment variables. Accounts created by sign up are kept in server memory, so on serverless hosting they will not persist.

## Author

Hassan Yousaf - [GitHub](https://github.com/hyousafdev)