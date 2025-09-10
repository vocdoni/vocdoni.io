# AI Agent Guidelines for vocdoni.io

## Framework - IMPORTANT

This is a **Vike project** (full-stack React framework) with **fullPage.js** integration. Understanding both is essential:

### Vike Conventions:

- **File-based routing**: Pages use `+Page.tsx`, data fetching with `+data.ts`, config with `+config.ts`
- **Route parameters**: Use `@id` folders for dynamic routes
- **Page context**: Use `usePageContext()` from vike-react for routing data
- **SSR**: Server-side rendering enabled by default

### FullPage.js Integration:

- **Main page**: `pages/index/+Page.tsx` contains all sections using `@fullpage/react-fullpage`
- **Sections**: Individual section components in `pages/index/sections/`
- **Navigation**: Controlled via Navigation component with fullpage API integration
- **SSR Support**: Uses dynamic import and static fallback for server-side rendering compatibility
- **URL Sync**: Browser History API integration with clean URLs (`/technology`, `/services`, etc.)

### URL Management:

- **Clean URLs**: Each section has its own route (no hash-based URLs)
- **Browser Navigation**: Back/forward buttons work correctly
- **Deep Linking**: Direct URL access navigates to specific sections
- **Dynamic Meta Tags**: SEO-optimized titles and descriptions per section

## Build/Test Commands

- **Dev**: `pnpm dev` (runs Vike development server)
- **Build**: `pnpm build` (builds for production)
- **Preview**: `pnpm preview` (previews production build)
- **No lint/test commands** - project currently lacks linting/testing setup

## Code Style & Conventions

- **Formatting**: Prettier with 120 character line width
- **Imports**: Named imports preferred, group external libs first
- **Types**: Strict TypeScript, inline type annotations for props `{ prop: Type }`
- **Components**: Named function exports, PascalCase filenames (e.g. `Counter.tsx`)
- **Styling**: Tailwind CSS with shadcn/ui design system
- **UI Components**: Use shadcn components from `@/components/ui/` (Button, Input, etc.)
- **Utilities**: Use `cn()` from `lib/utils.ts` for conditional classes
- **Aliases**: Use `@/` for root imports (configured in tsconfig/vite)

## Error Handling

- Async operations use try/catch or error boundaries
- Form submissions prevent default and handle optimistic updates
- Type safety enforced with strict TypeScript configuration
