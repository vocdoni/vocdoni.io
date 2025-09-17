# AGENTS.md / CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other coding AI when working with code in this repository.

## Commands

- **Development**: `pnpm dev` - Start Vike development server with hot reload
- **Build**: `pnpm build` - Build for production
- **Preview**: `pnpm preview` - Preview production build locally
- **Lint**: `pnpm lint` - Check code formatting with Prettier
- **Add shadcn components**: `pnpm shadcn add <component-name>` - Add shadcn/ui components

## Architecture

This is a **Vike + React** project with **custom full-page scrolling** implementation for a single-page website with multiple sections. Key architectural patterns:

### Framework Structure

- **Vike**: Full-stack React framework with file-based routing
- **Pages**: Use `+Page.tsx`, `+config.ts`, and `+data.ts` conventions
- **Layout**: Single default layout in `layouts/LayoutDefault.tsx`
- **SSR**: Server-side rendering enabled by default with client hydration

### Custom Full-Page Scrolling

- **Main page**: `pages/index/+Page.tsx` renders all sections in a single scrollable container
- **Sections**: Individual components in `components/sections/` directory
- **SectionScroller**: Custom `components/SectionScroller.tsx` handles scroll/touch/keyboard navigation
- **Navigation**: `components/Navigation.tsx` provides fixed header navigation between sections
- **URL Sync**: Custom `lib/useUrlSync.ts` hook manages browser history with clean URLs
- **SSR Compatibility**: Uses `components/StaticFallback.tsx` for server-side rendering

### Section Management

- **Section Config**: `SECTIONS` array in `lib/useUrlSync.ts` defines all sections with paths, titles, descriptions, and `appearsOnMenu` property
- **URL Routes**: Each section has its own URL - see `lib/useUrlSync.ts` for complete list
- **State Management**: Section index tracked in state, synced with browser history
- **Meta Tags**: Dynamic page titles and descriptions updated per section

### Route Folder Requirements

- **Direct URL Access**: Vike requires actual route folders for each section URL to work via direct access
- **Route Pattern**: Each route folder (e.g., `pages/technology/`, `pages/explore/`) contains `+Page.tsx` with re-export pattern
- **Re-export Pattern**: `export { default } from '../index/+Page.js'` - see existing route folders for examples
- **File Structure**: Main content remains in `pages/index/+Page.tsx`, route folders just provide URL endpoints

### Navigation Implementation

- **Scroll Events**: Mouse wheel, arrow keys, and touch gestures for section navigation
- **CSS Transforms**: Uses `translateY` with cubic-bezier transitions for smooth scrolling
- **Event Prevention**: Prevents default scroll behavior to control navigation
- **Accessibility**: Proper ARIA attributes and keyboard navigation support
- **SEO-Friendly Links**: Uses `components/Link.tsx` with variants for proper navigation
- **Menu Filtering**: Navigation menu items filtered by `appearsOnMenu` property - see `components/Navigation.tsx`

### Component Patterns

- **Link Component**: `components/Link.tsx` - shadcn-style component with `default` and `nav` variants, includes active state handling
- **Button Variants**: `components/ui/button.tsx` - includes custom `hero` variant for CTA buttons
- **Navigation**: `components/Navigation.tsx` - implements Link-based navigation with section filtering
- **Section Components**: `components/sections/` - individual page section components imported by main page

### State Management

- **URL State**: Section navigation synced with browser URLs and history
- **Client Detection**: `lib/useIsClient.ts` hook for SSR/client rendering differences
- **Section Tracking**: Active section index managed by `lib/useUrlSync.ts` hook with enhanced URL change detection

### Styling & Components

- **CSS Framework**: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **UI Library**: shadcn/ui components in `components/ui/`
- **Utility**: `lib/utils.ts` exports `cn()` function for conditional classes
- **Import Alias**: `@/` maps to project root via vite config

### File Structure Patterns

```
pages/
  +config.ts              # Global Vike configuration
  +Head.tsx              # HTML head tags
  index/
    +Page.tsx            # Main landing page with custom scroller
  technology/            # Route folders with re-export pattern
  services/              # Each contains +Page.tsx re-exporting index
  product/               # Enables direct URL access to sections
  contact/
  explore/
components/
  ui/                    # shadcn/ui components
  sections/              # Individual page section components
    Technology.tsx       # Section component definitions
    Services.tsx
    Product.tsx
    Contact.tsx
    Landing.tsx
    Explore.tsx
  Navigation.tsx         # Site navigation
  SectionScroller.tsx    # Custom scrolling container
  StaticFallback.tsx     # SSR fallback component
layouts/
  LayoutDefault.tsx      # Default page layout
lib/
  useUrlSync.ts         # Section navigation and URL management
  useIsClient.ts        # Client-side detection hook
  utils.ts              # Tailwind utility functions
```

### Code Conventions

- **TypeScript**: Strict typing, inline prop types `{ prop: Type }`
- **Components**: Named function exports, PascalCase filenames
- **Imports**: Use `@/` alias for internal imports, group external first
- **Styling**: Use `cn()` utility for conditional Tailwind classes
- **Formatting**: Prettier with 120 char width, single quotes, no semicolons
