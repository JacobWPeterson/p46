# P46 Papyrus Transcription Viewer - AI Coding Agent Instructions

## Project Overview

This is a React + TypeScript + Vite application for viewing and comparing images of the P46 papyrus manuscript (containing Pauline epistles) alongside various transcriptions. The app enables side-by-side comparison of manuscript images via IIIF viewers and PDF transcriptions.

**Purpose**: Free online educational resource for viewing P46 images with transcriptions from Peterson, Kenyon plates, and Kenyon text editions.

## Architecture

### Core Components Structure

- **Workspace page** ([src/pages/Workspace/index.tsx](src/pages/Workspace/index.tsx)): Main interface with dynamic source panel management. Users can add/remove viewers and select which source to display in each panel.
- **SourcePanel** ([src/components/SourcePanel/SourcePanel.tsx](src/components/SourcePanel/SourcePanel.tsx)): Renders either Mirador IIIF viewer or PDFViewer based on selected source type (4 options via `Sources` enum).
- **Mirador component** ([src/components/SourcePanel/Mirador/index.tsx](src/components/SourcePanel/Mirador/index.tsx)): Integrates Mirador v4 with image-tools plugin, configured via custom config object.
- **Modal system**: Uses React Portal pattern ([src/components/Portal/Portal.tsx](src/components/Portal/Portal.tsx)) for overlays, with keyboard escape support.

### Data Model

The manifest data ([src/static/files/manifests.ts](src/static/files/manifests.ts)) is the **single source of truth** for all folio metadata:

```typescript
{
  folio: '8↓',           // Display name (↓ = recto, → = verso)
  content: 'Rom 5.17–6.4', // Biblical content
  kenyonPlatesPage: 1,   // Page number in Kenyon plates PDF
  kenyonTextPage: {start: 1, range: 1}, // For multi-page ranges
  petersonPage: 1,       // Page in Peterson transcription
  canvasIndex: 0,        // IIIF manifest canvas index
  url: 'https://...'     // IIIF manifest URL (CBL or UM)
}
```

**Critical**: When adding new folios, all page mappings must be included for each source type.

### Source Types (enum pattern)

Defined in [src/components/SourcePanel/sources.enum.ts](src/components/SourcePanel/sources.enum.ts):

- `Mirador`: IIIF image viewer for CBL/UM digitized manuscripts
- `Peterson`: PDF transcription from Jacob Peterson's thesis
- `KenyonPlates`: Facsimile images (split across 2 PDFs at page 83)
- `KenyonText`: Critical edition transcription

## Development Workflows

### Commands (all via npm)

```bash
npm start              # Dev server on port 3000 with HMR
npm run start:dev      # Dev server + TypeScript watch mode (parallel)
npm run build          # Production build to dist/
npm test               # Run Vitest tests once
npm run test-u         # Update test snapshots
npm run lint           # Run all linters (prettier, eslint, stylelint)
npm run lint-fix       # Auto-fix all linting issues
```

### Testing Approach

- **Vitest** with jsdom, setup in [vitestSetup.ts](vitestSetup.ts)
- Tests colocated with components: `ComponentName.test.tsx`
- Focus on rendering and user interactions (see [src/pages/About/About.test.tsx](src/pages/About/About.test.tsx))
- Use `screen.getByRole` for accessibility-first queries

### Styling Conventions

- **CSS Modules** for all components: import as `styles` from `*.module.scss`
- Naming: `ComponentName.module.scss` in same directory as component
- Global styles: [src/styles/index.scss](src/styles/index.scss), variables in [src/styles/variables.scss](src/styles/variables.scss)
- Modern SCSS API: `scss: { api: "modern" }` in Vite config
- Scoped class names in production (hash-based), readable in dev

### TypeScript Patterns

- **strictNullChecks disabled** (`tsconfig.json`): no need for extensive null checks
- Explicit return types on component functions: `(): ReactElement =>`
- Props interfaces defined inline above component
- Type imports: `import type { ReactElement } from "react"`

### PDF Integration (react-pdf + pdfjs-dist)

- Worker URL configured via `import.meta.url` pattern in [PDFViewer.tsx](src/components/SourcePanel/PDFViewer/PDFViewer.tsx)
- Vite static copy plugin handles PDF.js assets (cmaps, wasm, standard_fonts) to dist root
- Kenyon Plates split across 2 files: conditional logic at page 83 boundary
- Kenyon Text uses page ranges: `{start: 1, range: 2}` renders multiple pages

### Linting & Code Quality

- ESLint with TypeScript, React, accessibility, and deprecation plugins
- Inline exceptions used sparingly (see [src/app/App.tsx](src/app/App.tsx) for `import/no-unassigned-import`)
- `compat/compat` exceptions for `ResizeObserver` and `URL` (newer APIs)
- Prettier + Stylelint enforce formatting; all have caching enabled

## Key Integration Points

### IIIF Manifests

- **Chester Beatty Library (CBL)**: Primary source, uses viewer.cbl.ie
- **University of Michigan (UM)**: Secondary source, uses quod.lib.umich.edu
- Canvas indices vary: CBL folios may have canvasIndex 0 or 1, UM typically 0

### Third-Party Libraries

- `mirador` + `mirador-image-tools`: IIIF viewer with zoom/rotate/brightness tools
- `react-pdf`: PDF rendering with text layer and annotations
- `react-select`: Dropdown for folio/source selection
- `react-feather`: Icon library (X, Info, PlusCircle, MinusCircle)
- `react-hook-form`: Form handling in ContactModal
- `@emailjs/browser`: Contact form email integration

## Project-Specific Conventions

### Component Organization

- Page components: [src/pages/](src/pages/) with colocated `.module.scss` and `.test.tsx`
- Reusable components: [src/components/](src/components/) following same pattern
- No default exports except for page routing

### State Management

- Local useState for UI state (no global state library)
- Workspace manages array of selected sources: `SelectedSourcesState = Sources[]`
- Source panel updates via callback: `onChange: (newSelection: Sources) => void`

### Build Configuration

- Base path: `/` for root deployment
- Public directory: `src/static/` (includes PDFs in `files/`, images, icons)
- Alias: `@styles` → `src/styles` for style imports
- SWC for React Fast Refresh (faster than Babel)

### Accessibility

- ARIA labels on icon-only buttons
- Modal keyboard navigation (Escape to close)
- `react-feather` icons with proper `aria-label` attributes

## Common Patterns

### Adding a New Source Type

1. Add enum value to [sources.enum.ts](src/components/SourcePanel/sources.enum.ts)
2. Update all manifests with new page mapping field
3. Add option to `sourceOptions` in SourcePanel
4. Add conditional rendering logic in `getContent()` and `getHelpText()`
5. Update TypeScript types if using special page format (like KenyonTextPageType)

### Adding a New Page Component

1. Create folder: `src/pages/ComponentName/`
2. Files: `ComponentName.tsx`, `ComponentName.module.scss`, `ComponentName.test.tsx`
3. Add route in [src/app/Routes.tsx](src/app/Routes.tsx)
4. Export component with explicit ReactElement return type

### Modal Usage

Wrap content in `<Modal>` component with `isOpen`, `handleClose`, and optional `header` props. Uses Portal for DOM insertion.
