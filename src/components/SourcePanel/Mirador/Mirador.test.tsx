import { render } from '@testing-library/react';
import { vi } from 'vitest';

import { Mirador } from './index';

vi.mock('mirador');
vi.mock('mirador-image-tools');

describe('Mirador', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the mirador container div', () => {
    const { container } = render(
      <Mirador manifest="https://example.com/manifest" canvasIndex={0} />
    );

    // Check that a div element is rendered
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('should accept manifest and canvasIndex props', () => {
    const manifest = 'https://example.com/manifest';
    const canvasIndex = 1;

    const { rerender } = render(<Mirador manifest={manifest} canvasIndex={canvasIndex} />);

    // Component should render without errors
    expect(rerender).toBeDefined();

    // Test with different props
    rerender(<Mirador manifest="https://example.com/manifest2" canvasIndex={0} />);
    expect(rerender).toBeDefined();
  });

  it('should handle prop changes', () => {
    const { rerender, container } = render(
      <Mirador manifest="https://example.com/manifest1" canvasIndex={0} />
    );

    // Initial render
    expect(container.querySelector('div')).toBeInTheDocument();

    // Rerender with new props
    rerender(<Mirador manifest="https://example.com/manifest2" canvasIndex={1} />);

    // Element should still exist
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
