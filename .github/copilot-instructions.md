# Copilot / AI Agent Instructions for FeaturePaneltwo

Quick, actionable info to get an AI coding agent productive in this repo.

## Project snapshot (big picture) ✅
- Small single-page React + TypeScript app built with Vite (entry: `index.html`, app boot: `src/main.tsx` → `src/App.tsx`).
- Modern ESM + strict TypeScript settings: see `tsconfig.app.json` (strict, `noEmit`, `moduleResolution: "bundler"`).
- Bundler: `vite` (overridden in `package.json` to `rolldown-vite` via `overrides`).
- Linting: ESLint configured in `eslint.config.js`.

## Important files & locations 🔧
- `src/main.tsx`, `src/App.tsx` — app bootstrap and main component.
- `index.html` — Vite entry HTML.
- `src/assets/`, `public/` — static assets.
- `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.json` — TypeScript project references (build uses `tsc -b`).
- `eslint.config.js` — linting rules and plugins.
- `src/vite.config.ts` — Vite config (includes `test` block with `setupFiles: './src/setupTests.ts'`).

## Developer workflows / commands (explicit) ▶️
- Start dev server (HMR): `npm run dev` → `vite`.
- Build: `npm run build` → runs `tsc -b && vite build` (note: tsc uses project references in `tsconfig.json`).
- Lint: `npm run lint` → `eslint .` (useful for autofixes / CI checks).
- Preview production build: `npm run preview` → `vite preview`.

## Tests (what to know) 🧪
- `vite.config.ts` contains a `test` block (globals, `jsdom`, `setupFiles: './src/setupTests.ts'`).
- There is a reference to `setupTests.ts` (should import testing helpers like `@testing-library/jest-dom`). Confirm `vitest` is present in `devDependencies` or in a subpackage; if not present, add `vitest` and a `test` script (e.g. `vitest` / `vitest run --coverage`).
- If you add tests, follow the `jsdom`/`globals` setup and put shared test setup in `src/setupTests.ts`.

## Patterns & conventions to follow ✨
- TypeScript is strict and errs on no-unused/strict rules — prefer type-safe changes and add/adjust types in `tsconfig` only when necessary.
- Imports often include explicit extensions (project uses `allowImportingTsExtensions` / `verbatimModuleSyntax`); follow existing import style (e.g., `import App from './App.tsx'`).
- Non-null assertions are used at app bootstrap (`document.getElementById('root')!`) — keep consistent where DOM access is guaranteed.
- Use the configured ESLint rules (`eslint.config.js`) when fixing lint failures; prefer to run `npm run lint` locally or in CI.

## Integration points / gotchas ⚠️
- `package.json` overrides `vite` to `rolldown-vite` — plugin/behavior differences may appear vs. upstream Vite; verify plugin compatibility when upgrading or adding Vite plugins.
- Build runs `tsc -b` first — if you add TypeScript references you must update `tsconfig.json` references and ensure `tsc -b` passes in CI.
- Tests are referenced in `vite.config.ts` but `vitest` may not be installed at the root; search for nested package.json or add `vitest` to devDeps if intended.

## Useful quick examples (copy-paste) 📋
- Run dev: `npm run dev`
- Run build (local): `npm run build`
- Run lint: `npm run lint`
- Run tests (if `vitest` installed): `npx vitest` or add script: `{ "test": "vitest" }` to `package.json`.

## When you’re making larger changes 💡
- Update `tsconfig` references and run `npm run build` to ensure `tsc -b` and `vite build` succeed.
- Add tests under `src/` and register setup in `src/setupTests.ts` (matching `vite.config.ts`).
- If adding new Vite plugins, validate against `rolldown-vite` override.

---
If anything above looks incomplete or you want agent guidance for a specific task (e.g., add testing, upgrade Vite, add CI steps), please tell me which area to expand. 👇