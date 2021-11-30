import React, { useEffect, useState } from 'react';
import mirador from 'mirador';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import config from './config.js';

const Mirador = ({
  alertIsShowing, manifest, index, showAlert,
}) => {
  let miradorInstance;
  const [pageNumber, setPageNumber] = useState(index + 1);
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: 'single',
    };
    miradorInstance = mirador.viewer(config, miradorImageToolsPlugin);
    // Example of subscribing to state
    miradorInstance.store.subscribe(() => {
      const state = miradorInstance.store.getState();
      const canvasIndex = state.windows[state.workspace.windowIds].canvasId;
      if (canvasIndex) {
        setPageNumber(Number(canvasIndex.slice(canvasIndex.lastIndexOf('/') + 1)));
      }
    });
  }, [manifest]);

  useEffect(() => {
    if (pageNumber && pageNumber !== (index + 1)) {
      showAlert(true);
    }
    if (alertIsShowing && pageNumber === (index + 1)) {
      showAlert(false);
    }
  }, [pageNumber]);

  return <div id={config.id} />;
};

export default Mirador;
