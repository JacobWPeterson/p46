import { useState, type ReactElement } from "react";
import Select from "react-select";
import classNames from "classnames";

import manifests from "../../static/files/manifests";
import { E404 } from "../E404/E404";
import { Modal } from "../../components/Modal/Modal";
import { Guide } from "../Guide/Guide";
import { Sources } from "../../components/SourcePanel/sources.enum";
import { SourcePanel } from "../../components/SourcePanel/SourcePanel";

import styles from "./index.module.scss";

type Option = {
  label: ReactElement;
  value: number;
};

type SelectedSourcesState = Sources[];

const manifestsToOptionsMap: Option[] = manifests.map((manifest, index) => {
  return {
    label: (
      <div className={styles.Label}>
        <div className={styles.Folio}>{manifest.folio}</div>
        <div>{manifest.content}</div>
      </div>
    ),
    value: index,
  };
});

export const Workspace = (): ReactElement => {
  const [manifestIndex, setManifestIndex] = useState<number>(0);
  const [numberOfViewers, setNumberOfViewers] = useState<number>(2);
  const [selectedSourcePanels, setSelectedSourcePanels] =
    useState<SelectedSourcesState>([Sources.Mirador, Sources.Peterson]);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  if (!manifests[manifestIndex]) {
    return <E404 />;
  }

  const addViewer = (): void => {
    setNumberOfViewers((prev) => prev + 1);
    if (numberOfViewers === Object.values(Sources).length - 1) {
      const remaining = Object.values(Sources).filter(
        (source) => !selectedSourcePanels.includes(source)
      );
      setSelectedSourcePanels((prevState) => {
        const prevSourcesToUpdate = [...prevState];
        prevSourcesToUpdate.push(remaining[0]);
        return prevSourcesToUpdate;
      });
      return;
    }
    setSelectedSourcePanels((prevState) => {
      const prevSourcesToUpdate = [...prevState];
      prevSourcesToUpdate.push(null);
      return prevSourcesToUpdate;
    });
  };

  const removeViewer = (index: number): void => {
    setNumberOfViewers((prev) => prev - 1);
    setSelectedSourcePanels((prevState) => {
      const prevSourcesToUpdate = [...prevState];
      prevSourcesToUpdate.splice(index, 1);
      return prevSourcesToUpdate;
    });
  };

  const updateSourcePanels = (newSource: Sources, index: number): void => {
    setSelectedSourcePanels((prevState) => {
      const prevSourcesToUpdate = [...prevState];
      prevSourcesToUpdate[index] = newSource;
      return prevSourcesToUpdate;
    });
  };

  const handleChange = (selectedOption: Option): void => {
    setManifestIndex(selectedOption.value);
  };

  const toggleGuideModal = (): void => {
    setShowGuideModal((prev) => !prev);
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
        <div className={styles.Header} style={{ right: window.innerWidth / 2 }}>
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
              option: () => styles.Option,
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#00333d",
                primary25: "#dbf5fb",
                primary50: "#00667a",
              },
            })}
            value={manifestsToOptionsMap[manifestIndex]}
            onChange={handleChange}
            captureMenuScroll
            menuShouldBlockScroll
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
          <button
            disabled={numberOfViewers >= Object.keys(Sources).length}
            className={classNames(styles.Button, styles.Add, {
              [styles.Disabled]: numberOfViewers >= Object.keys(Sources).length,
            })}
            onClick={addViewer}
          >
            Add viewer
          </button>
        </div>
        <div className={styles.DisplayWrapper}>
          {selectedSourcePanels.map((sourcePanel, index) => (
            <SourcePanel
              key={`sourcepanel-${index}`}
              manifestIndex={manifestIndex}
              source={sourcePanel}
              selectedSourcePanels={selectedSourcePanels}
              onChange={(newSource) => updateSourcePanels(newSource, index)}
              closeViewer={() => removeViewer(index)}
              toggleGuideModal={toggleGuideModal}
            />
          ))}
        </div>
      </div>
      {showGuideModal && (
        <Modal
          handleClose={toggleGuideModal}
          isOpen
          classes={styles.GuideModal}
        >
          <Guide />
        </Modal>
      )}
    </div>
  );
};
