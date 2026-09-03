import { type ReactElement, useEffect } from 'react';
import classNames from 'classnames';
import { viewer } from 'mirador';
import { miradorImageToolsPlugin } from 'mirador-image-tools';

import config from './config';

interface MiradorProps {
  canvasIndex: number;
  isPortrait: boolean;
  manifest: string;
}

interface ViewportState {
  flip?: boolean;
  rotation?: number;
  x?: number;
  y?: number;
  zoom?: number;
}

const viewportKey = (manifest: string, canvasIndex: number): string =>
  `p46:mirador-viewport:${manifest}:${canvasIndex}`;

const getSavedViewport = (manifest: string, canvasIndex: number): ViewportState | undefined => {
  try {
    const savedViewport = window.sessionStorage.getItem(viewportKey(manifest, canvasIndex));
    return savedViewport ? (JSON.parse(savedViewport) as ViewportState) : undefined;
  } catch {
    return undefined;
  }
};

export const Mirador = ({ canvasIndex, isPortrait, manifest }: MiradorProps): ReactElement => {
  useEffect(() => {
    const savedViewport = getSavedViewport(manifest, canvasIndex);
    const viewerConfig = {
      ...config,
      window: {
        ...config.window,
        allowWindowSideBar: !isPortrait,
        hideWindowTitle: isPortrait,
        imageToolsEnabled: !isPortrait
      },
      windows: [
        {
          manifestId: manifest,
          canvasIndex,
          view: 'single',
          ...(savedViewport && { initialViewerConfig: savedViewport })
        }
      ],
      workspace: { ...config.workspace, showZoomControls: !isPortrait }
    };

    const miradorViewer = viewer(viewerConfig, miradorImageToolsPlugin);
    const windowId = miradorViewer.store.getState().workspace.windowIds[0];
    let previousViewport: ViewportState | undefined;

    const unsubscribe = miradorViewer.store.subscribe(() => {
      const nextViewport = miradorViewer.store.getState().viewers[windowId];
      if (!nextViewport || JSON.stringify(nextViewport) === JSON.stringify(previousViewport)) {
        return;
      }

      previousViewport = nextViewport;
      window.sessionStorage.setItem(
        viewportKey(manifest, canvasIndex),
        JSON.stringify(nextViewport)
      );
    });

    return (): void => unsubscribe();
  }, [canvasIndex, isPortrait, manifest]);

  return <div id={config.id} className={classNames({ PortraitViewer: isPortrait })} />;
};
