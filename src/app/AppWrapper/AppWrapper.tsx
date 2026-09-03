import type { PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';

import { ContactModal } from '../../components/ContactModal/ContactModal';

import styles from './AppWrapper.module.scss';

export const AppWrapper = ({ children }: PropsWithChildren): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.AppWrapper}>
      <div className={styles.Navbar}>
        <a className={styles.Brand} href="/">
          𝔓<sup>46</sup>
        </a>
        <div className={styles.NavButtons}>
          <a className={styles.NavLink} href="/bibliography">
            Bibliography
          </a>
          <a className={styles.NavLink} href="/about">
            About
          </a>
        </div>
      </div>
      {children}
      <footer className={styles.Footer}>
        <button type="button" className={styles.Link} onClick={() => setShowModal(true)}>
          Contact
        </button>
        <div className={styles.VerticalDivider} />
        <div className={styles.CopyrightText}>
          © {new Date().getFullYear()}{' '}
          <a
            className={styles.Link}
            href="https://www.jacobwpeterson.com"
            target="_blank"
            rel="noreferrer"
          >
            Jacob W. Peterson
          </a>
        </div>
      </footer>
      <ContactModal onHide={() => setShowModal(false)} show={showModal} />
    </div>
  );
};
