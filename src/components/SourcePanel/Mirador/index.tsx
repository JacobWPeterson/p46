import { type ReactElement, useEffect } from "react";
import mirador from "mirador/dist/mirador.min.js";

// import { miradorImageToolsPlugin } from 'mirador-image-tools'; // currently not available for Mirador v4 alpha; track progress and reinstall https://github.com/ProjectMirador/mirador-image-tools
import config from "./config";

interface MiradorProps {
  canvasIndex: number;
  manifest: string;
}

export const Mirador = ({
  canvasIndex,
  manifest,
}: MiradorProps): ReactElement => {
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex,
      view: "single",
    };

    mirador.viewer(config);

    // mirador.viewer(config, miradorImageToolsPlugin); // See above comment about the plugin
  }, [canvasIndex, manifest]);

  return <div id={config.id} />;
};
