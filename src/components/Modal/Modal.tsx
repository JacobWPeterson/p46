import type { KeyboardEvent as ReactKeyboardEvent, PropsWithChildren, ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { Portal } from '../Portal/Portal';

import styles from './Modal.module.scss';

interface ModalProps {
  handleClose: () => void;
  header?: string;
  isCloseDisabled?: boolean;
  isOpen: boolean;
  classes?: string;
}

export const Modal = ({
  children,
  classes,
  handleClose,
  header,
  isCloseDisabled = false,
  isOpen
}: PropsWithChildren<ModalProps>): ReactElement | null => {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const handleCloseRef = useRef(handleClose);
  const isCloseDisabledRef = useRef(isCloseDisabled);

  useEffect(() => {
    handleCloseRef.current = handleClose;
    isCloseDisabledRef.current = isCloseDisabled;
  }, [handleClose, isCloseDisabled]);

  useEffect(() => {
    if (!isOpen) {
      previouslyFocusedElement.current?.focus();
      previouslyFocusedElement.current = null;
      return undefined;
    }

    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const closeOnEscapeKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && !isCloseDisabledRef.current) {
        handleCloseRef.current();
      }
    };
    document.addEventListener('keydown', closeOnEscapeKey, true);
    return (): void => {
      document.removeEventListener('keydown', closeOnEscapeKey, true);
    };
  }, [isOpen]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'Tab' || !contentRef.current) {
      return;
    }

    const focusableElements = contentRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (!firstFocusableElement || !lastFocusableElement) {
      event.preventDefault();
      contentRef.current.focus();
    } else if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={styles.Modal}
        onClick={isCloseDisabled ? (): void => {} : handleClose}
        onKeyDown={(e): void => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isCloseDisabled) {
              handleClose();
            }
          }
        }}
        role="presentation"
        aria-label="Modal backdrop"
      >
        <div
          className={classNames(styles.Content, classes)}
          ref={contentRef}
          onClick={e => e.stopPropagation()}
          onKeyDown={event => {
            event.stopPropagation();
            trapFocus(event);
          }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={header ? 'modal-header' : undefined}
        >
          {header ? (
            <div className={styles.Header}>
              <h2 className={styles.H2} id="modal-header">
                {header}
              </h2>
              <button
                aria-label="close"
                ref={closeButtonRef}
                onClick={handleClose}
                className={styles.CloseButton}
                disabled={isCloseDisabled}
              />
            </div>
          ) : (
            <button
              aria-label="close"
              ref={closeButtonRef}
              onClick={handleClose}
              className={styles.CloseButton}
              disabled={isCloseDisabled}
            />
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
};
