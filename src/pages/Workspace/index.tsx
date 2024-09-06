import { type ReactElement } from "react";

import manifests from "../../static/files/manifests";
import { E404 } from "../E404/E404";

import styles from "./Workspace.module.scss";
import { Mirador } from "./Mirador";

export const Workspace = (): ReactElement => {
  if (!manifests[0]) {
    return <E404 />;
  }

  return (
    <div className={styles.WorkspacePageWrapper}>
      <div className={styles.InvalidDevice}>
        <img
          src="/images/cog.svg"
          alt="Rotate device to landscape"
          className={styles.Image}
        />
        <h2>Sorry, this feature is only supported on larger screens.</h2>
      </div>
      <div className={styles.Rotate}>
        <img
          src="/images/rotate.svg"
          alt="Rotate device to landscape"
          className={styles.Image}
        />
        <h2>Rotate your device to landscape</h2>
      </div>
      <div className={styles.MiradorWrapper}>
        <Mirador index={0} manifest={manifests[0]} />
      </div>
      <div className={styles.TranscriptionPanel}></div>
    </div>
  );
};
