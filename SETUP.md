# Portfolio — React, TypeScript, Tailwind, shadcn-style layout

This repository is a **Vite + React + TypeScript** app with **Tailwind CSS** and a **`components/ui`** folder compatible with the [shadcn/ui](https://ui.shadcn.com/) CLI conventions (`components.json`, `@/` alias, `cn()` helper).

## Default paths

| Purpose | Path |
|--------|------|
| UI primitives (shadcn components) | `src/components/ui` |
| Shared utilities (`cn`) | `src/lib/utils.ts` |
| Global styles + CSS variables | `src/index.css` |
| Tailwind config | `tailwind.config.ts` |
| shadcn config | `components.json` |

### Why `src/components/ui` matters

The shadcn CLI **defaults to `components/ui`**. Keeping that folder lets you run `npx shadcn@latest add button` (or any component) without retargeting paths. Your custom `shader-lines.tsx` lives beside generated primitives.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Optional: shadcn CLI from scratch (new project)

If you start empty next time:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
```

Then add path alias in `vite.config.ts` (`@` → `./src`) and run:

```bash
npx shadcn@latest init
```

Follow prompts; point CSS to `src/index.css`, Tailwind to `tailwind.config.ts`, and aliases to `@/components`, `@/lib/utils`.

## Three.js note

`ShaderAnimation` uses the **`three`** package from npm (recommended for Vite + TypeScript). The original snippet loaded **r89** from a CDN; the installed version uses the same shader logic with `THREE` imports and proper disposal on unmount.

## Content

Editable copy lives in `src/data/portfolio.json` (also mirrored at repo root as `portfolio-content.json` if you keep both in sync).
