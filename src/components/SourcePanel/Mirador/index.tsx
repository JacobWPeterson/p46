import { type ReactElement, useEffect } from "react";
import classNames from "classnames";
import { viewer } from "mirador";
import { miradorImageToolsPlugin } from "mirador-image-tools";

import config from "./config";

interface MiradorProps {
  canvasIndex: number;
  isPortrait: boolean;
  manifest: string;
}

export const Mirador = ({
  canvasIndex,
  isPortrait,
  manifest,
}: MiradorProps): ReactElement => {
  useEffect(() => {
    const viewerConfig = {
      ...config,
      window: {
        ...config.window,
        allowWindowSideBar: !isPortrait,
        hideWindowTitle: isPortrait,
        imageToolsEnabled: !isPortrait,
      },
      windows: [{ manifestId: manifest, canvasIndex, view: "single" }],
      workspace: { ...config.workspace, showZoomControls: !isPortrait },
    };

    viewer(viewerConfig, miradorImageToolsPlugin);
  }, [canvasIndex, isPortrait, manifest]);

  return (
    <div
      id={config.id}
      className={classNames({ PortraitViewer: isPortrait })}
    />
  );
};
