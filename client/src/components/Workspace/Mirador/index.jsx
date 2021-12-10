import React, { useEffect } from 'react';
import mirador from 'mirador';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import config from './config.js';

const Mirador = ({
  manifest, index, setPageNumber,
}) => {
  let miradorInstance;
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: 'single',
    };

    miradorInstance = mirador.viewer(config, miradorImageToolsPlugin);

    miradorInstance.store.subscribe(() => {
      const state = miradorInstance.store.getState();
      const canvasIndex = state.windows[state.workspace.windowIds].canvasId;
      if (canvasIndex) {
        setPageNumber(Number(canvasIndex.slice(canvasIndex.lastIndexOf('/') + 1)));
      }
    });
  }, [manifest]);

  return <div id={config.id} />;
};

export default Mirador;
