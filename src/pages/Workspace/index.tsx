import { useEffect, useRef, useState, type ReactElement } from "react";
import { useNavigate, useParams } from "react-router";
import Select, { type SingleValue } from "react-select";
import classNames from "classnames";

import manifests from "../../static/files/manifests";
import { E404 } from "../E404/E404";
import { Modal } from "../../components/Modal/Modal";
import { Guide } from "../Guide/Guide";
import { Sources } from "../../components/SourcePanel/sources.enum";
import { SourcePanel } from "../../components/SourcePanel/SourcePanel";

import styles from "./index.module.scss";

type Option = { label: ReactElement; value: number };

interface SourcePanelState {
  id: number;
  source: Sources | null;
}

type SelectedSourcesState = SourcePanelState[];

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

// Helpers to map between manifest folio labels and URL param tokens
const folioToParam = (folioLabel: string): string =>
  folioLabel.replace("↓", "v").replace("→", "r");

const paramToFolioLabel = (param: string): string =>
  param.replace("v", "↓").replace("r", "→");

export const Workspace = (): ReactElement => {
  const navigate = useNavigate();
  const { folio } = useParams();

  // Derive the current folio label from route param or default to first folio
  const currentFolioLabel = folio
    ? paramToFolioLabel(folio)
    : manifests[0].folio;
  const currentManifest =
    manifests.find((m) => m.folio === currentFolioLabel) || manifests[0];
  const manifestIndex = manifests.indexOf(currentManifest);

  const [selectedSourcePanels, setSelectedSourcePanels] =
    useState<SelectedSourcesState>([
      { id: 0, source: Sources.Mirador },
      { id: 1, source: Sources.Peterson },
    ]);
  const nextPanelId = useRef<number>(2);
  const [portraitSource, setPortraitSource] = useState<Sources>(
    Sources.Mirador,
  );
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const updateOrientation = (): void => setIsPortrait(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);

    return (): void =>
      mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  // Navigate to canonical route when selection changes
  const handleSelectFolio = (newIndex: number): void => {
    const folioParam = folioToParam(manifests[newIndex].folio);
    navigate(`/folio/${folioParam}`);
  };

  if (!manifests[manifestIndex]) {
    return <E404 />;
  }

  const addViewer = (): void => {
    setSelectedSourcePanels((prevState) => {
      const selectedSources = prevState.map((panel) => panel.source);
      const remainingSource = Object.values(Sources).find(
        (source) => !selectedSources.includes(source),
      );

      return [
        ...prevState,
        { id: nextPanelId.current++, source: remainingSource ?? null },
      ];
    });
  };

  const removeViewer = (panelId: number): void => {
    setSelectedSourcePanels((prevState) => {
      return prevState.filter((panel) => panel.id !== panelId);
    });
  };

  const updateSourcePanels = (newSource: Sources, panelId: number): void => {
    setSelectedSourcePanels((prevState) => {
      return prevState.map((panel) =>
        panel.id === panelId ? { ...panel, source: newSource } : panel,
      );
    });
  };

  const handleChange = (selectedOption: SingleValue<Option>): void => {
    if (!selectedOption) {
      return;
    }

    handleSelectFolio(selectedOption.value);
  };

  const toggleGuideModal = (): void => {
    setShowGuideModal((prev) => !prev);
  };

  const sourcePanels = isPortrait
    ? [{ id: -1, source: portraitSource }]
    : selectedSourcePanels;
  const selectedSources = sourcePanels.map((panel) => panel.source);

  return (
    <div className={styles.WorkspacePageWrapper}>
      <div className={styles.ContentWrapper}>
        {!isPortrait && (
          <div className={styles.Header}>
            <button
              aria-label="previous"
              disabled={manifestIndex === 0}
              className={classNames(styles.Button, {
                [styles.Disabled]: manifestIndex === 0,
              })}
              onClick={() => handleSelectFolio(manifestIndex - 1)}
            >
              Prev
            </button>
            <Select
              aria-label="Choose folio"
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
              aria-label="next"
              disabled={manifests.length <= manifestIndex + 1}
              className={classNames(styles.Button, {
                [styles.Disabled]: manifests.length <= manifestIndex + 1,
              })}
              onClick={() => handleSelectFolio(manifestIndex + 1)}
            >
              Next
            </button>
            <button
              aria-label="add viewer"
              disabled={
                selectedSourcePanels.length >= Object.keys(Sources).length
              }
              className={classNames(styles.Button, styles.Add, {
                [styles.Disabled]:
                  selectedSourcePanels.length >= Object.keys(Sources).length,
              })}
              onClick={addViewer}
            >
              Add viewer
            </button>
          </div>
        )}
        <div className={styles.DisplayWrapper}>
          {sourcePanels.map((sourcePanel) => (
            <SourcePanel
              key={sourcePanel.id}
              manifestIndex={manifestIndex}
              source={sourcePanel.source}
              selectedSourcePanels={selectedSources}
              onChange={(newSource) => {
                if (isPortrait) {
                  setPortraitSource(newSource);
                  return;
                }

                updateSourcePanels(newSource, sourcePanel.id);
              }}
              closeViewer={() => removeViewer(sourcePanel.id)}
              currentFolioIndex={manifestIndex}
              isPortrait={isPortrait}
              onSelectFolio={handleSelectFolio}
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
