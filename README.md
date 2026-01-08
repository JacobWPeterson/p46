# P46 Papyrus Transcription Viewer

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node CI](https://github.com/JacobWPeterson/p46/actions/workflows/node.js.yml/badge.svg)](https://github.com/JacobWPeterson/p46/actions/workflows/node.js.yml)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

An open, education-focused viewer for the P46 papyrus that pairs IIIF manuscript images displayed in a [ProjectMirador](https://github.com/ProjectMirador) viewer with multiple published transcriptions. Built with React + TypeScript + Vite.

## Features

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

## License

This project is licensed under the GNU General Public License v3.0 or later. See [LICENSE.md](LICENSE.md) for full terms.

## Contributing

Issues and PRs are welcome!

Before opening a PR, ensure `npm test` and `npm run lint` pass (pre-commit hooks will auto-fix most issues).
