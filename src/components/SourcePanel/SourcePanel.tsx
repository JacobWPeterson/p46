import type { ReactElement } from "react";
import Select from "react-select";

import manifests from "../../static/files/manifests";

import { Mirador } from "./Mirador";
import { PDFViewer } from "./PDFViewer/PDFViewer";
import { Sources } from "./sources.enum";
import styles from "./SourcePanel.module.scss";

const sourceOptions: Option[] = [
  { label: "CBL and UM images", value: Sources.Mirador },
  { label: "Kenyon plates", value: Sources.KenyonPlates },
  { label: "Peterson transcriptions", value: Sources.Peterson },
  { label: "Kenyon transcription", value: Sources.KenyonText },
];

interface SourcePanelProps {
  source: Sources;
  manifestIndex: number;
  onChange: (newSelection: Sources) => void;
  toggleGuideModal: () => void;
}

type Option = {
  label: string;
  value: string;
};

export const SourcePanel = ({
  source,
  manifestIndex,
  onChange,
  toggleGuideModal,
}: SourcePanelProps): ReactElement => {
  const handleSourceChange = (newSource: Option): void => {
    onChange(newSource.value as Sources);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Select
          classNames={{
            control: () => styles.Control,
            menu: () => styles.Menu,
            option: () => styles.Option,
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#65743a",
              primary25: "#a9bb77",
            },
          })}
          value={sourceOptions.find(({ value }) => value === source)}
          onChange={handleSourceChange}
          captureMenuScroll
          menuShouldBlockScroll
          options={sourceOptions}
          isSearchable
        />
        {source === Sources.Peterson && (
          <button
            onClick={toggleGuideModal}
            className={styles.TranscriptionGuideButton}
          >
            Help
          </button>
        )}
      </div>
      <div className={styles.Content}>
        {source === Sources.Mirador && (
          <Mirador
            canvasIndex={manifests[manifestIndex].canvasIndex}
            manifest={manifests[manifestIndex].url}
          />
        )}
        {source === Sources.Peterson && (
          <PDFViewer pageNumber={manifests[manifestIndex].petersonPage} />
        )}
      </div>
    </div>
  );
};
