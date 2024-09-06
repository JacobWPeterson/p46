import type { PropsWithChildren, ReactElement } from "react";
import { useEffect } from "react";
import classNames from "classnames";

import { Portal } from "../Portal/Portal";

import styles from "./Modal.module.scss";

interface ModalProps {
  handleClose: () => void;
  header?: string;
  isCloseDisabled: boolean;
  isOpen: boolean;
  classes?: string;
}

export const Modal = ({
  children,
  classes,
  handleClose,
  header,
  isCloseDisabled,
  isOpen,
}: PropsWithChildren<ModalProps>): ReactElement => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent): void =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return (): void => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={styles.Modal}
        onClick={isCloseDisabled ? (): void => {} : handleClose}
        aria-modal="true"
        aria-hidden
      >
        <div
          className={classNames(styles.Content, classes)}
          onClick={(e) => e.stopPropagation()}
          aria-hidden
        >
          <div className={styles.Header}>
            {header && <h2 className={styles.H2}>{header}</h2>}
            <button
              onClick={handleClose}
              className={styles.CloseButton}
              disabled={isCloseDisabled}
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
