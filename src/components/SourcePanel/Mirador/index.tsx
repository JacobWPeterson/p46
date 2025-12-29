import { type ReactElement, useEffect } from 'react';
import { viewer } from 'mirador';
import { miradorImageToolsPlugin } from 'mirador-image-tools';

import config from './config';

interface MiradorProps {
  canvasIndex: number;
  manifest: string;
}

export const Mirador = ({ canvasIndex, manifest }: MiradorProps): ReactElement => {
  useEffect(() => {
    config.windows[0] = { manifestId: manifest, canvasIndex, view: 'single' };

    viewer(config, miradorImageToolsPlugin);
  }, [canvasIndex, manifest]);

  return <div id={config.id} />;
};
