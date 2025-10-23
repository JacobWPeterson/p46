import type { ReactElement } from "react";
import Select from "react-select";
import { Info, X } from "react-feather";

import manifests from "../../static/files/manifests";

import { Mirador } from "./Mirador";
import { PDFViewer } from "./PDFViewer/PDFViewer";
import { Sources } from "./sources.enum";
import styles from "./SourcePanel.module.scss";

const sourceOptions: Option[] = [
  { label: "CBL and UM images", value: Sources.Mirador },
  { label: "Kenyon plates", value: Sources.KenyonPlates },
  { label: "Peterson transcription", value: Sources.Peterson },
  { label: "Kenyon transcription", value: Sources.KenyonText },
];

interface SourcePanelProps {
  closeViewer: () => void;
  manifestIndex: number;
  onChange: (newSelection: Sources) => void;
  selectedSourcePanels: Sources[];
  source: Sources;
  toggleGuideModal: () => void;
}

type Option = { label: string; value: string };

export const SourcePanel = ({
  closeViewer,
  manifestIndex,
  onChange,
  selectedSourcePanels,
  source,
  toggleGuideModal,
}: SourcePanelProps): ReactElement => {
  const handleSourceChange = (newSource: Option): void => {
    onChange(newSource.value as Sources);
  };

  const getContent = (): ReactElement | string => {
    if (!source) {
      return "Select a source from the dropdown above";
    }
    return source === Sources.Mirador ? (
      <Mirador
        canvasIndex={manifests[manifestIndex].canvasIndex}
        manifest={manifests[manifestIndex].url}
      />
    ) : (
      <PDFViewer
        source={source}
        pageNumber={manifests[manifestIndex][`${source}Page`]}
      />
    );
  };

  const getHelpText = (): ReactElement => {
    if (source === Sources.Peterson) {
      return (
        <p className={styles.Item}>
          Peterson, Jacob W. &quot;GA 1739: A Monk, His Manuscript, and the Text
          of Paul&apos;s Letters.&quot; PhD Thesis, University of Edinburgh,
          2020. (
          <a
            href="http://dx.doi.org/10.7488/era/528"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            doi.org/10.7488/era/528
          </a>
          )
        </p>
      );
    } else if (source === Sources.KenyonText) {
      return (
        <p className={styles.Item}>
          Kenyon, Frederic G., ed.{" "}
          <i>
            The Chester Beatty Biblical Papyri, Fasciculus III, Supplement:
            Pauline Epistles, Text.
          </i>{" "}
          London: Emery Walker, 1936.
        </p>
      );
    } else if (source === Sources.KenyonPlates) {
      return (
        <p className={styles.Item}>
          Kenyon, Frederic G., ed.{" "}
          <i>
            The Chester Beatty Biblical Papyri, Fasciculus III, Supplement:
            Pauline Epistles, Plates.
          </i>{" "}
          London: Emery Walker, 1937.
        </p>
      );
    } else {
      return (
        <p className={styles.Item}>
          Images from both the Chester Beatty Library and University of Michigan
          Library are provided under a Creative Commons license. For more
          information, see{" "}
          <a
            href="https://chesterbeatty.ie/about/copyright-2/"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            Chester Beatty Library
          </a>{" "}
          and{" "}
          <a
            href="https://quod.lib.umich.edu/a/apis/x-3553/6238_30.TIF?lasttype=boolean;lastview=reslist;resnum=1;size=50;sort=apis_inv;start=1;subview=detail;view=entry;rgn1=apis_inv;select1=phrase;q1=P.Mich.inv.+6238#rights-permissions"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            University of Michigan Library
          </a>
        </p>
      );
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Select
          aria-label="Choose viewer source"
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
          value={sourceOptions.find(({ value }) => value === source) || null}
          onChange={handleSourceChange}
          captureMenuScroll
          menuShouldBlockScroll
          options={sourceOptions.filter(
            (option) => !selectedSourcePanels.includes(option.value as Sources),
          )}
          isSearchable
        />
        <div className={styles.EndButtons}>
          {source === Sources.Peterson && (
            <button
              aria-label="Help"
              onClick={toggleGuideModal}
              className={styles.TranscriptionGuideButton}
            >
              Help
            </button>
          )}
          <div
            aria-label="info tooltip"
            className={styles.Tooltip}
            tabIndex={0}
            role="button"
          >
            <Info size={18} />
            <span className={styles.TooltipText}>{getHelpText()}</span>
          </div>
          <button
            aria-label="Close viewer"
            onClick={closeViewer}
            className={styles.IconButton}
            disabled={selectedSourcePanels.length < 2}
          >
            <X />
          </button>
        </div>
      </div>
      <div className={styles.Content}>{getContent()}</div>
    </div>
  );
};
