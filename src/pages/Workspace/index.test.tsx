import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { vi } from 'vitest';

import { Workspace } from './index';

// Mock Mirador and react-pdf to avoid canvas errors
vi.mock('mirador', () => ({
  viewer: vi.fn()
}));

vi.mock('mirador-image-tools', () => ({
  miradorImageToolsPlugin: vi.fn()
}));

vi.mock('react-pdf', () => ({
  Document: vi.fn(() => null),
  Page: vi.fn(() => null),
  pdfjs: { GlobalWorkerOptions: { workerSrc: '' } }
}));

describe('Workspace', () => {
  it('should render the workspace with default folio', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Workspace />} />
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: 'previous' });
    const nextButton = screen.getByRole('button', { name: 'next' });
    const addViewerButton = screen.getByRole('button', { name: 'add viewer' });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(addViewerButton).toBeInTheDocument();
  });

  it('should initialize from prettified URL /folio/:folio', () => {
    render(
      // Use a non-first folio token so Prev is enabled (e.g., '11↓' => 11v)
      <MemoryRouter initialEntries={['/folio/11v']}>
        <Routes>
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: 'previous' });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
  });

  it('should default to folio 0 when route parameter is invalid', () => {
    render(
      <MemoryRouter initialEntries={['/folio/invalid']}>
        <Routes>
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: 'previous' });
    expect(prevButton).toBeDisabled();
  });

  it('should default to folio 0 when route parameter does not match any folio', () => {
    render(
      <MemoryRouter initialEntries={['/folio/9999r']}>
        <Routes>
          <Route path="/folio/:folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: 'previous' });
    expect(prevButton).toBeDisabled();
  });

  it('should render the first folio when visiting /folio', () => {
    render(
      <MemoryRouter initialEntries={['/folio']}>
        <Routes>
          <Route path="/folio" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: 'previous' });
    expect(prevButton).toBeDisabled();
  });

  it('should add and remove a viewer panel', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'add viewer' }));

    expect(screen.getAllByRole('combobox', { name: 'Choose viewer source' })).toHaveLength(3);

    await user.click(screen.getAllByRole('button', { name: 'Close viewer' })[1]);

    expect(screen.getAllByRole('combobox', { name: 'Choose viewer source' })).toHaveLength(2);
  });

  it('should restore ordered sources from the share link', () => {
    render(
      <MemoryRouter initialEntries={['/?sources=peterson,kenyonText']}>
        <Routes>
          <Route path="/" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Peterson transcription')).toBeInTheDocument();
    expect(screen.getByText('Kenyon transcription')).toBeInTheDocument();
  });

  it('should fall back to default sources for invalid share links', () => {
    render(
      <MemoryRouter initialEntries={['/?sources=peterson,peterson']}>
        <Routes>
          <Route path="/" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('CBL and UM images')).toBeInTheDocument();
    expect(screen.getByText('Peterson transcription')).toBeInTheDocument();
  });

  it('should offer hidden landscape sources in portrait mode', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));

    render(
      <MemoryRouter initialEntries={['/?sources=mirador,peterson,kenyonText']}>
        <Routes>
          <Route path="/" element={<Workspace />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByRole('combobox', { name: 'Choose viewer source' })).toHaveLength(1);
    expect(screen.getByText('CBL and UM images')).toBeInTheDocument();

    await user.click(screen.getByRole('combobox', { name: 'Choose viewer source' }));
    expect(screen.getByText('Kenyon transcription')).toBeInTheDocument();
  });
});
