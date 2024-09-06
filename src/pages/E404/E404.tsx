import type { ReactElement } from "react";

import styles from "./E404.module.scss";

export const E404 = (): ReactElement => {
  const handleGoHome = (): void => {
    window.location.href = "/";
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.LeftSection}>
        <h1 className={styles.H1}>Οοπς, παγε νοτ φουνδ!</h1>
        <p className={styles.Text}>
          You have reached a page that&apos;s not extant. If you believe this is
          an error, please report it using the contact form. Alternatively,
          check the address you have entered or just click below to go back
          home.
        </p>
        <button className={styles.Button} onClick={handleGoHome} type="button">
          Home
        </button>
      </div>
      <div className={styles.RightSection}>
        <img
          src="/images/E404.svg"
          alt="Error 404 Drawing"
          className={styles.Image}
        />
      </div>
    </div>
  );
};
