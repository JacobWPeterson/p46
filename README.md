# P46 Papyrus Transcription Viewer

[![Node CI](https://github.com/JacobWPeterson/p46/actions/workflows/node.js.yml/badge.svg)](https://github.com/JacobWPeterson/p46/actions/workflows/node.js.yml)

An open, education-focused viewer for the P46 papyrus that pairs IIIF manuscript images displayed in a [ProjectMirador](https://github.com/ProjectMirador) viewer with multiple published transcriptions. Built with React + TypeScript + Vite.

## Features

- **Side-by-side viewing**: Mix and match IIIF images with PDF transcriptions (Peterson thesis, Kenyon plates, Kenyon text).
- **Mirador v4 IIIF viewer**: Image tools (zoom, rotate, brightness) with loading states and error boundaries for resilient manifest handling.
- **PDF viewer**: Zoom controls and multi-page support for Kenyon text ranges.
- **Manifest-driven data**: Single source of truth for folio metadata and page mappings.
- **Error boundaries**: Graceful degradation when viewers fail to load—no more full app crashes.
- **Accessible UI**: Modal/portal pattern with keyboard navigation (Escape to close).
- **Code quality enforcement**: Pre-commit hooks automatically lint and format code before commits.

## Quick start

```bash
npm install
npm start           # dev server with HMR (http://localhost:3000)
# or
npm run start:dev   # dev server + TypeScript watch
```

### Useful scripts

- `npm run build` – production build to `dist/`
- `npm test` – run Vitest suite
- `npm run lint` – prettier, eslint, stylelint checks (use `npm run lint-fix` to auto-fix)

## Key files

- Workspace UI shell: [Workspace](src/pages/Workspace/index.tsx)
- Source panels + source switcher: [SourcePanel](src/components/SourcePanel/SourcePanel.tsx)
- Mirador viewer wrapper: [Mirador](src/components/SourcePanel/Mirador/index.tsx)
- PDF viewer: [PDFViewer](src/components/SourcePanel/PDFViewer/PDFViewer.tsx)
- Error boundary (wraps viewers): [ErrorBoundary](src/components/ErrorBoundary/ErrorBoundary.tsx)

## Data sources

- IIIF manifests: Chester Beatty Library and University of Michigan (URLs stored per folio in [`manifests.ts`](src/static/files/manifests.ts)).
- PDFs: Peterson transcription, Kenyon plates (split at page 83), Kenyon critical text with page ranges.

## Architecture notes

- **Lazy-loaded routes**: Pages are code-split in [`Routes.tsx`](src/app/Routes.tsx) for smaller initial bundle.
- **Error boundaries**: Viewers wrapped in [`ErrorBoundary`](src/components/ErrorBoundary/ErrorBoundary.tsx) to catch IIIF/PDF failures without crashing the app.
- **Source switching**: `SourcePanel` renders Mirador or PDFViewer based on `Sources` enum; all page mappings flow from the manifests file.
- **Portal-based modals**: Accessibility-first modals with keyboard escape support.
- **SCSS modules**: Component-scoped styles with theme variables in [`theme.scss`](src/styles/theme.scss).

## Testing

- Component and page tests are written with Vitest + React Testing Library. See examples in [Workspace](src/pages/Workspace/index.test.tsx) and [Modal](src/components/ContactModal/ContactModal.test.tsx).
- Run the suite with `npm test`

## Code quality

- **Pre-commit hooks**: Husky + lint-staged automatically run ESLint, Prettier, and Stylelint on staged files before each commit.
- **Comprehensive linting**: ESLint (TypeScript, React, a11y, deprecation checks), Prettier (formatting), Stylelint (SCSS).

## Contributing

Issues and PRs are welcome!

Before opening a PR, ensure `npm test` and `npm run lint` pass (pre-commit hooks will auto-fix most issues).
