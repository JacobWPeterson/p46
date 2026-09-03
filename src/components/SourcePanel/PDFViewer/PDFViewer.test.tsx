import { createElement } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { Sources } from '../sources.enum';

import { PDFViewer } from './PDFViewer';

const { Document, Page } = vi.hoisted(() => ({
  Document: vi.fn(({ children }: { children?: unknown }) =>
    createElement('div', { 'data-testid': 'pdf-document' }, children)
  ),
  Page: vi.fn(({ scale }: { scale?: number }) =>
    createElement('div', { 'data-testid': 'pdf-page', 'data-scale': scale })
  )
}));

vi.mock('react-pdf', () => ({
  Document,
  Page,
  pdfjs: { GlobalWorkerOptions: { workerSrc: '' } }
}));

describe('PDFViewer', () => {
  beforeEach(() => {
    sessionStorage.clear();
    Document.mockClear();
    Page.mockClear();
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: vi.fn()
    });
  });

  it('should zoom the PDF for a trackpad pinch gesture', () => {
    const { container } = render(<PDFViewer source={Sources.Peterson} pageNumber={1} isPortrait />);
    const viewer = container.firstElementChild as HTMLElement;

    fireEvent.wheel(viewer, { ctrlKey: true, deltaY: -100 });

    expect(screen.getByTestId('pdf-page')).toHaveAttribute('data-scale', '2.718281828459045');
  });

  it('should show a retry action when the document fails to load', async () => {
    render(<PDFViewer source={Sources.Peterson} pageNumber={1} />);
    const onLoadError = Document.mock.calls[0][0].onLoadError as () => void;

    onLoadError();

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load this file.');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('should retry loading the document', async () => {
    render(<PDFViewer source={Sources.Peterson} pageNumber={1} />);
    const onLoadError = Document.mock.calls[0][0].onLoadError as () => void;

    onLoadError();
    await screen.findByRole('button', { name: 'Retry' });
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => expect(Document).toHaveBeenCalledTimes(2));
  });

  it('should restore saved scroll position', async () => {
    const scrollTo = vi
      .spyOn(HTMLElement.prototype, 'scrollTo')
      .mockImplementation(() => undefined);
    sessionStorage.setItem(
      'p46:pdf-position:peterson:1',
      JSON.stringify({ scale: 1, scrollLeft: 12, scrollTop: 34 })
    );

    render(<PDFViewer source={Sources.Peterson} pageNumber={1} />);
    const onLoadSuccess = Document.mock.calls[0][0].onLoadSuccess as () => void;
    onLoadSuccess();

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith(12, 34));
    scrollTo.mockRestore();
  });

  it('should zoom from a two-finger pinch', () => {
    const { container } = render(<PDFViewer source={Sources.Peterson} pageNumber={1} isPortrait />);
    const viewer = container.firstElementChild as HTMLElement;

    fireEvent.touchStart(viewer, {
      touches: [
        { clientX: 80, clientY: 100 },
        { clientX: 180, clientY: 100 }
      ]
    });
    fireEvent.touchMove(viewer, {
      touches: [
        { clientX: 40, clientY: 100 },
        { clientX: 220, clientY: 100 }
      ]
    });

    expect(screen.getByTestId('pdf-page')).toHaveAttribute('data-scale', '1.8');
  });
});
