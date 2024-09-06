import { type ReactElement, useEffect } from "react";
import mirador from "mirador/dist/mirador.min.js";

// import { miradorImageToolsPlugin } from 'mirador-image-tools'; // currently not available for Mirador v4 alpha; track progress and reinstall https://github.com/ProjectMirador/mirador-image-tools
import config from "./config";

interface MiradorProps {
  manifest: string;
  index: number;
}

export const Mirador = ({ manifest, index }: MiradorProps): ReactElement => {
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: 0,
      view: "single",
    };

    mirador.viewer(config);

    // mirador.viewer(config, miradorImageToolsPlugin); // See above comment about the plugin
  }, [manifest, index]);

  return <div id={config.id} />;
};
