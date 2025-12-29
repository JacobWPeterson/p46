import { useState, type ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import classNames from 'classnames';

import manifests from '../../static/files/manifests';
import { E404 } from '../E404/E404';
import { Modal } from '../../components/Modal/Modal';
import { Guide } from '../Guide/Guide';
import { Sources } from '../../components/SourcePanel/sources.enum';
import { SourcePanel } from '../../components/SourcePanel/SourcePanel';

import styles from './index.module.scss';

type Option = { label: ReactElement; value: number };

type SelectedSourcesState = Sources[];

const manifestsToOptionsMap: Option[] = manifests.map((manifest, index) => {
  return {
    label: (
      <div className={styles.Label}>
        <div className={styles.Folio}>{manifest.folio}</div>
        <div>{manifest.content}</div>
      </div>
    ),
    value: index
  };
});

// Helpers to map between manifest folio labels and URL param tokens
const folioToParam = (folioLabel: string): string => folioLabel.replace('↓', 'v').replace('→', 'r');

const paramToFolioLabel = (param: string): string => param.replace('v', '↓').replace('r', '→');

export const Workspace = (): ReactElement => {
  const navigate = useNavigate();
  const { folio } = useParams();

  // Derive the current folio label from route param or default to first folio
  const currentFolioLabel = folio ? paramToFolioLabel(folio) : manifests[0].folio;
  const currentManifest = manifests.find(m => m.folio === currentFolioLabel) || manifests[0];
  const manifestIndex = manifests.indexOf(currentManifest);

  const [numberOfViewers, setNumberOfViewers] = useState<number>(2);
  const [selectedSourcePanels, setSelectedSourcePanels] = useState<SelectedSourcesState>([
    Sources.Mirador,
    Sources.Peterson
  ]);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Navigate to canonical route when selection changes
  const handleSelectFolio = (newIndex: number): void => {
    const folioParam = folioToParam(manifests[newIndex].folio);
    navigate(`/folio/${folioParam}`);
  };

  if (!manifests[manifestIndex]) {
    return <E404 />;
  }

  const addViewer = (): void => {
    setNumberOfViewers(prev => prev + 1);
    if (numberOfViewers === Object.values(Sources).length - 1) {
      const remaining = Object.values(Sources).filter(
        source => !selectedSourcePanels.includes(source)
      );
      setSelectedSourcePanels(prevState => {
        const prevSourcesToUpdate = [...prevState];
        prevSourcesToUpdate.push(remaining[0]);
        return prevSourcesToUpdate;
      });
      return;
    }
    setSelectedSourcePanels(prevState => {
      const prevSourcesToUpdate = [...prevState];
      prevSourcesToUpdate.push(null);
      return prevSourcesToUpdate;
    });
  };

  const removeViewer = (index: number): void => {
    setNumberOfViewers(prev => prev - 1);
    setSelectedSourcePanels(prevState => {
      const prevSourcesToUpdate = [...prevState];
      prevSourcesToUpdate.splice(index, 1);
      return prevSourcesToUpdate;
    });
  };

  const updateSourcePanels = (newSource: Sources, index: number): void => {
    setSelectedSourcePanels(prevState => {
      const prevSourcesToUpdate = [...prevState];
      prevSourcesToUpdate[index] = newSource;
      return prevSourcesToUpdate;
    });
  };

  const handleChange = (selectedOption: Option): void => {
    handleSelectFolio(selectedOption.value);
  };

  const toggleGuideModal = (): void => {
    setShowGuideModal(prev => !prev);
  };

  return (
    <div className={styles.WorkspacePageWrapper}>
      <div className={styles.Rotate}>
        <img src="/images/rotate.svg" alt="Rotate device to landscape" className={styles.Image} />
        <h2>Rotate your device to landscape</h2>
      </div>
      <div className={styles.ContentWrapper}>
        <div className={styles.Header} style={{ right: window.innerWidth / 2 }}>
          <button
            aria-label="previous"
            disabled={manifestIndex === 0}
            className={classNames(styles.Button, {
              [styles.Disabled]: manifestIndex === 0
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
              option: () => styles.Option
            }}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#00333d',
                primary25: '#dbf5fb',
                primary50: '#00667a'
              }
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
              [styles.Disabled]: manifests.length <= manifestIndex + 1
            })}
            onClick={() => handleSelectFolio(manifestIndex + 1)}
          >
            Next
          </button>
          <button
            aria-label="add viewer"
            disabled={numberOfViewers >= Object.keys(Sources).length}
            className={classNames(styles.Button, styles.Add, {
              [styles.Disabled]: numberOfViewers >= Object.keys(Sources).length
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
              onChange={newSource => updateSourcePanels(newSource, index)}
              closeViewer={() => removeViewer(index)}
              toggleGuideModal={toggleGuideModal}
            />
          ))}
        </div>
      </div>
      {showGuideModal && (
        <Modal handleClose={toggleGuideModal} isOpen classes={styles.GuideModal}>
          <Guide />
        </Modal>
      )}
    </div>
  );
};
