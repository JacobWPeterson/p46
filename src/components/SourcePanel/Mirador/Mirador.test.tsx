import { render } from '@testing-library/react';
import { vi } from 'vitest';

import { Mirador } from './index';

const { viewer, store } = vi.hoisted(() => {
  const state: {
    workspace: { windowIds: string[] };
    viewers: Record<string, unknown>;
  } = {
    workspace: { windowIds: ['window-1'] },
    viewers: {}
  };
  const subscriptions: Array<() => void> = [];
  const mockedStore = {
    getState: (): typeof state => state,
    subscribe: (listener: () => void): (() => void) => {
      subscriptions.push(listener);
      return () => subscriptions.splice(subscriptions.indexOf(listener), 1);
    },
    notify: (): void => subscriptions.forEach(listener => listener())
  };

  return { viewer: vi.fn(() => ({ store: mockedStore })), store: mockedStore };
});

vi.mock('mirador', () => ({ viewer }));
vi.mock('mirador-image-tools');

describe('Mirador', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    store.getState().viewers = {};
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

  it('should save and restore a viewport for a folio canvas', () => {
    const manifest = 'https://example.com/manifest1';
    const viewport = { x: 12, y: 24, zoom: 1.8, rotation: 0, flip: false };

    render(<Mirador manifest={manifest} canvasIndex={0} />);
    store.getState().viewers['window-1'] = viewport;
    store.notify();

    expect(sessionStorage.getItem(`p46:mirador-viewport:${manifest}:0`)).toBe(
      JSON.stringify(viewport)
    );

    render(<Mirador manifest={manifest} canvasIndex={0} />);

    expect(viewer).toHaveBeenLastCalledWith(
      expect.objectContaining({
        windows: [expect.objectContaining({ initialViewerConfig: viewport })]
      }),
      expect.anything()
    );
  });
});
