/* eslint-disable import/no-unassigned-import */
import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { MinusCircle, PlusCircle } from 'react-feather';

import { Sources } from '../sources.enum';

import styles from './PDFViewer.module.scss';

// eslint-disable-next-line compat/compat
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const options = { wasmUrl: '/wasm/' };

type KenyonTextPageType = Record<'start' | 'range', number>;
interface PdfPosition {
  scale: number;
  scrollTop: number;
  scrollLeft: number;
}

const MIN_SCALE = 0.8;
const MAX_SCALE = 3;

const positionKey = (source: Sources, pageNumber: number | KenyonTextPageType): string =>
  `p46:pdf-position:${source}:${JSON.stringify(pageNumber)}`;

const getSavedPosition = (
  source: Sources,
  pageNumber: number | KenyonTextPageType
): PdfPosition | undefined => {
  try {
    const savedPosition = window.sessionStorage.getItem(positionKey(source, pageNumber));
    return savedPosition ? (JSON.parse(savedPosition) as PdfPosition) : undefined;
  } catch {
    return undefined;
  }
};

const getTouchDistance = (touches: TouchList): number => {
  const [firstTouch, secondTouch] = [touches[0], touches[1]];
  return Math.hypot(
    firstTouch.clientX - secondTouch.clientX,
    firstTouch.clientY - secondTouch.clientY
  );
};

export const PDFViewer = ({
  isPortrait = false,
  pageNumber,
  source
}: {
  isPortrait?: boolean;
  pageNumber: number | KenyonTextPageType;
  source: Sources;
}): ReactElement => {
  const [savedPosition, setSavedPosition] = useState<PdfPosition | undefined>(() =>
    getSavedPosition(source, pageNumber)
  );
  const [containerWidth, setContainerWidth] = useState<number>();
  const [scale, setScale] = useState<number>(savedPosition?.scale ?? 1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartScale = useRef<number>(1);
  const scaleRef = useRef<number>(scale);

  const isMinZoom = scale <= MIN_SCALE;
  const isMaxZoom = scale >= MAX_SCALE;

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

  useEffect(() => {
    if (!containerRef.current || !('ResizeObserver' in window)) {
      return undefined;
    }

    // eslint-disable-next-line compat/compat
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);

    return (): void => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    const nextPosition = getSavedPosition(source, pageNumber);
    setSavedPosition(nextPosition);
    setScale(nextPosition?.scale ?? 1);
    containerRef.current?.scrollTo(nextPosition?.scrollLeft ?? 0, nextPosition?.scrollTop ?? 0);
  }, [pageNumber, source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPortrait) {
      return undefined;
    }

    const handleTouchStart = (event: TouchEvent): void => {
      if (event.touches.length !== 2) {
        return;
      }

      pinchStartDistance.current = getTouchDistance(event.touches);
      pinchStartScale.current = scaleRef.current;
    };

    const handleTouchMove = (event: TouchEvent): void => {
      if (event.touches.length !== 2 || !pinchStartDistance.current) {
        return;
      }

      event.preventDefault();
      const pinchRatio = getTouchDistance(event.touches) / pinchStartDistance.current;
      setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchStartScale.current * pinchRatio)));
    };

    const handleTouchEnd = (): void => {
      pinchStartDistance.current = null;
    };

    const handleWheel = (event: WheelEvent): void => {
      if (!event.ctrlKey) {
        return;
      }

      event.preventDefault();
      const pinchRatio = Math.exp(-event.deltaY * 0.01);
      setScale(currentScale => Math.min(MAX_SCALE, Math.max(MIN_SCALE, currentScale * pinchRatio)));
    };

    const preventViewportZoom = (event: Event): void => {
      if (event.target instanceof Node && container.contains(event.target)) {
        event.preventDefault();
      }
    };

    container.addEventListener('touchstart', handleTouchStart, {
      passive: true
    });
    container.addEventListener('touchmove', handleTouchMove, {
      passive: false
    });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('gesturestart', preventViewportZoom, {
      capture: true,
      passive: false
    });
    document.addEventListener('gesturechange', preventViewportZoom, {
      capture: true,
      passive: false
    });
    document.addEventListener('gestureend', preventViewportZoom, {
      capture: true,
      passive: false
    });

    return (): void => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('gesturestart', preventViewportZoom, true);
      document.removeEventListener('gesturechange', preventViewportZoom, true);
      document.removeEventListener('gestureend', preventViewportZoom, true);
    };
  }, [isPortrait]);

  const onDocumentLoadSuccess = (): void => {
    setIsLoading(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || !savedPosition) {
      return;
    }

    container.scrollTo(savedPosition.scrollLeft, savedPosition.scrollTop);
  }, [isLoading, savedPosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const savePosition = (): void => {
      try {
        window.sessionStorage.setItem(
          positionKey(source, pageNumber),
          JSON.stringify({
            scale: scaleRef.current,
            scrollLeft: container.scrollLeft,
            scrollTop: container.scrollTop
          })
        );
      } catch {
        // Session storage can be unavailable in private browsing.
      }
    };

    container.addEventListener('scroll', savePosition, { passive: true });
    return (): void => container.removeEventListener('scroll', savePosition);
  }, [pageNumber, source]);

  return (
    <div ref={containerRef} className={styles.Container}>
      {isLoading && <div className={styles.Loading}>Loading...</div>}
      {source === Sources.KenyonPlates ? (
        <Document
          file={(pageNumber as number) <= 83 ? `/files/${source}1.pdf` : `/files/${source}2.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={
              (pageNumber as number) <= 83 ? (pageNumber as number) : (pageNumber as number) - 83
            }
            scale={scale}
          />
        </Document>
      ) : (
        <Document
          file={`/files/${source}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {source === Sources.KenyonText ? (
            Array.from(
              { length: (pageNumber as KenyonTextPageType).range },
              (_, index) => (pageNumber as KenyonTextPageType).start + index
            ).map(pageNumber => <Page key={pageNumber} pageNumber={pageNumber} scale={scale} />)
          ) : (
            <Page pageNumber={pageNumber as number} scale={scale} />
          )}
        </Document>
      )}
      {!isPortrait && (
        <div className={styles.Controls} style={{ width: containerWidth }}>
          <button
            aria-label="zoom out"
            className={styles.Button}
            disabled={isMinZoom}
            onClick={zoomOut}
          >
            <MinusCircle size={20} />
          </button>
          <button
            aria-label="zoom in"
            className={styles.Button}
            disabled={isMaxZoom}
            onClick={zoomIn}
          >
            <PlusCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
