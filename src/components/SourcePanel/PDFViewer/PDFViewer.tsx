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

const savePositionToStorage = (
  source: Sources,
  pageNumber: number | KenyonTextPageType,
  position: PdfPosition
): void => {
  try {
    window.sessionStorage.setItem(positionKey(source, pageNumber), JSON.stringify(position));
  } catch {
    // Session storage can be unavailable in private browsing.
  }
};

const getScrollContainer = (container: HTMLElement): HTMLElement => {
  const candidates = [container, ...Array.from(container.querySelectorAll<HTMLElement>('*'))];
  return (
    candidates.find(
      element =>
        element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
    ) || container
  );
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
  const [loadError, setLoadError] = useState<boolean>(false);
  const [documentKey, setDocumentKey] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartScale = useRef<number>(1);
  const scaleRef = useRef<number>(scale);
  const hasLoadedPosition = useRef<boolean>(false);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const currentPosition = useRef<PdfPosition>({
    scale,
    scrollLeft: 0,
    scrollTop: 0
  });

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
    currentPosition.current.scale = scale;
  }, [scale]);

  useEffect(() => {
    const nextPosition = getSavedPosition(source, pageNumber);
    hasLoadedPosition.current = false;
    setSavedPosition(nextPosition);
    setScale(nextPosition?.scale ?? 1);
    scrollContainerRef.current = null;
  }, [pageNumber, source]);

  useEffect(() => {
    if (!hasLoadedPosition.current) {
      hasLoadedPosition.current = true;
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    try {
      window.sessionStorage.setItem(
        positionKey(source, pageNumber),
        JSON.stringify({
          scale,
          scrollLeft: container.scrollLeft,
          scrollTop: container.scrollTop
        })
      );
    } catch {
      // Session storage can be unavailable in private browsing.
    }
  }, [pageNumber, scale, source]);

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
    setLoadError(false);
  };

  const onDocumentLoadError = (): void => {
    setIsLoading(false);
    setLoadError(true);
  };

  const retryDocument = (): void => {
    setLoadError(false);
    setIsLoading(true);
    setDocumentKey(previousKey => previousKey + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || !savedPosition) {
      return;
    }

    const restorePosition = (): void => {
      const scrollContainer = getScrollContainer(container);
      scrollContainerRef.current = scrollContainer;
      scrollContainer.scrollTo(savedPosition.scrollLeft, savedPosition.scrollTop);
    };

    // eslint-disable-next-line compat/compat
    requestAnimationFrame(restorePosition);
  }, [isLoading, savedPosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const savePosition = (event?: Event): void => {
      const eventTarget = event?.target;
      const scrollContainer =
        eventTarget instanceof HTMLElement && container.contains(eventTarget)
          ? eventTarget
          : scrollContainerRef.current || getScrollContainer(container);
      scrollContainerRef.current = scrollContainer;
      currentPosition.current = {
        scale: scaleRef.current,
        scrollLeft: scrollContainer.scrollLeft,
        scrollTop: scrollContainer.scrollTop
      };

      savePositionToStorage(source, pageNumber, currentPosition.current);
    };

    let saveFrame: number | undefined;
    const savePositionAfterScroll = (event: Event): void => {
      const eventTarget = event.target;
      const scrollContainer =
        eventTarget instanceof HTMLElement && container.contains(eventTarget)
          ? eventTarget
          : scrollContainerRef.current || getScrollContainer(container);
      scrollContainerRef.current = scrollContainer;
      currentPosition.current = {
        scale: scaleRef.current,
        scrollLeft: scrollContainer.scrollLeft,
        scrollTop: scrollContainer.scrollTop
      };
      savePositionToStorage(source, pageNumber, currentPosition.current);

      if (saveFrame !== undefined) {
        cancelAnimationFrame(saveFrame);
      }

      // eslint-disable-next-line compat/compat
      saveFrame = requestAnimationFrame(() => savePosition(event));
    };

    container.addEventListener('scroll', savePositionAfterScroll, { capture: true, passive: true });
    window.addEventListener('pagehide', savePosition);
    return (): void => {
      if (saveFrame !== undefined) {
        cancelAnimationFrame(saveFrame);
      }
      savePositionToStorage(source, pageNumber, currentPosition.current);
      window.removeEventListener('pagehide', savePosition);
      container.removeEventListener('scroll', savePositionAfterScroll, true);
    };
  }, [pageNumber, source]);

  return (
    <div ref={containerRef} className={styles.Container}>
      {isLoading && !loadError && <div className={styles.Loading}>Loading...</div>}
      {loadError && (
        <div className={styles.Error} role="alert">
          <p>Unable to load this file.</p>
          <button type="button" onClick={retryDocument}>
            Retry
          </button>
        </div>
      )}
      {!loadError &&
        (source === Sources.KenyonPlates ? (
          <Document
            key={documentKey}
            file={(pageNumber as number) <= 83 ? `/files/${source}1.pdf` : `/files/${source}2.pdf`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
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
            key={documentKey}
            file={`/files/${source}.pdf`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
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
        ))}
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
