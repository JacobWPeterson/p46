/* eslint-disable import/no-unassigned-import */
import type { ReactElement } from "react";
import { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import useResizeObserver from "../../../utils/useResizeObserver";

import styles from "./PDFViewer.module.scss";

// eslint-disable-next-line compat/compat
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const resizeObserverOptions = {};

export const PDFViewer = ({
  pageNumber = 1,
}: {
  pageNumber: number;
}): ReactElement => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [scale, setScale] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const containerRef = useRef();

  const isMinZoom = scale < 0.8;
  const isMaxZoom = scale >= 3.0;

  const zoomOut = (): void => {
    if (!isMinZoom) {
      setScale(scale - 0.1);
    }
  };

  const zoomIn = (): void => {
    if (!isMaxZoom) {
      setScale(scale + 0.1);
    }
  };

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef.current, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = (): void => {
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className={styles.Container}>
      {isLoading && <div className={styles.Loading}>Loading...</div>}
      <Document
        file="/files/transcriptions.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
      <div className={styles.Controls} style={{ width: containerWidth }}>
        <button
          className={styles.Button}
          disabled={isMinZoom}
          onClick={zoomOut}
        >
          -
        </button>
        <button className={styles.Button} disabled={isMaxZoom} onClick={zoomIn}>
          +
        </button>
      </div>
    </div>
  );
};
