import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { Sources } from './sources.enum';
import { SourcePanel } from './SourcePanel';

vi.mock('./Mirador', () => ({
  Mirador: (): JSX.Element => <div>Mirador loaded</div>
}));

vi.mock('./PDFViewer/PDFViewer', () => ({
  PDFViewer: (): JSX.Element => <div>PDF loaded</div>
}));

describe('SourcePanel', () => {
  const props = {
    closeViewer: vi.fn(),
    currentFolioIndex: 0,
    manifestIndex: 0,
    onChange: vi.fn(),
    onSelectFolio: vi.fn(),
    selectedSourcePanels: [Sources.Mirador],
    toggleGuideModal: vi.fn()
  };

  it('should show a fallback while a lazy viewer loads', async () => {
    render(<SourcePanel {...props} source={Sources.Mirador} />);

    expect(screen.getByText('Loading viewer...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Mirador loaded')).toBeInTheDocument());
  });
});
