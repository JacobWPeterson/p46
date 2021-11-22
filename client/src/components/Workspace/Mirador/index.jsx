import React, { useEffect } from 'react';
import mirador from 'mirador';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import config from './config.js';

const Mirador = ({ manifest, index }) => {
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: 'single',
    };
    mirador.viewer(config, miradorImageToolsPlugin);
  }, [manifest]);

  return <div id={config.id} />;
};

export default Mirador;
