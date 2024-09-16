import { useState, type ReactElement } from "react";
import Select from "react-select";
import classNames from "classnames";

import manifests from "../../static/files/manifests";
import { E404 } from "../E404/E404";

import styles from "./index.module.scss";
import { Mirador } from "./Mirador";
import { PDFViewer } from "./PDFViewer/PDFViewer";

type Option = {
  label: string;
  value: number;
};

const manifestsToOptionsMap = manifests.map((manifest, index) => {
  return {
    label: `${manifest.folio}: ${manifest.content}`,
    value: index,
  };
});

export const Workspace = (): ReactElement => {
  const [manifestIndex, setManifestIndex] = useState<number>(0);
  if (!manifests[manifestIndex]) {
    return <E404 />;
  }

  const handleChange = (selectedOption: Option): void => {
    setManifestIndex(selectedOption.value);
  };

  return (
    <div className={styles.WorkspacePageWrapper}>
      <div className={styles.Rotate}>
        <img
          src="/images/rotate.svg"
          alt="Rotate device to landscape"
          className={styles.Image}
        />
        <h2>Rotate your device to landscape</h2>
      </div>
      <div className={styles.ContentWrapper}>
        <div className={styles.Header}>
          <button
            disabled={manifestIndex === 0}
            className={classNames(styles.Button, {
              [styles.Disabled]: manifestIndex === 0,
            })}
            onClick={() => setManifestIndex((prev) => prev - 1)}
          >
            Prev
          </button>
          <Select
            classNames={{
              control: () => styles.Control,
              menu: () => styles.Menu,
            }}
            value={manifestsToOptionsMap[manifestIndex]}
            onChange={handleChange}
            options={manifestsToOptionsMap}
            isSearchable
          />
          <button
            disabled={manifests.length <= manifestIndex + 1}
            className={classNames(styles.Button, {
              [styles.Disabled]: manifests.length <= manifestIndex + 1,
            })}
            onClick={() => setManifestIndex((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
        <div className={styles.DisplayWrapper}>
          <div className={styles.MiradorWrapper}>
            <Mirador
              canvasIndex={manifests[manifestIndex].canvasIndex}
              manifest={manifests[manifestIndex].url}
            />
          </div>
          <div className={styles.PDFViewer}>
            <PDFViewer
              pageNumber={manifests[manifestIndex].transcriptionPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
