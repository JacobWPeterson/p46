import type { ReactElement } from "react";
import classNames from "classnames";

import styles from "./About.module.scss";

export const About = (): ReactElement => (
  <div className="PageWrapper">
    <div className={classNames(styles.Container, styles.Upper)}>
      <h1 className={styles.H1}>Why?</h1>
      <div className={styles.Text}></div>
      <br />
      <div className={classNames(styles.Text, styles.Italic)}>
        Please use the contact form to send questions or suggestions for
        improvement. Also consider{" "}
        <a
          className={styles.Link}
          href="https://www.venmo.com/jacobwpeterson"
          target="_blank"
          rel="noreferrer"
        >
          buying me a coffee
        </a>{" "}
        (or two).
      </div>
    </div>
    <div className={styles.Container}>
      <h2 className={styles.H2}>Special Thanks</h2>
      <div className={classNames(styles.Text, styles.Smaller)}>
        This project would not be possible without the cooperative spirit of the
        following projects and organizations.
      </div>
      <div className={styles.Partners}>
        <div
          role="link"
          className={classNames(styles.Partner)}
          tabIndex={0}
          onClick={() => window.open("https://chesterbeatty.ie/", "_blank")}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              window.open("https://chesterbeatty.ie/", "_blank");
            }
          }}
        >
          <img
            src="/icons/CBL.svg"
            alt="Chester Beatty Library logo"
            height="60"
          />
          <div className={classNames(styles.PartnerText, styles.CBLFont)}>
            Chester Beatty Library
          </div>
        </div>
        <div
          role="link"
          className={classNames(styles.Partner)}
          tabIndex={0}
          onClick={() => window.open("https://projectmirador.org/", "_blank")}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              window.open("https://projectmirador.org/", "_blank");
            }
          }}
        >
          <img src="/icons/mirador.png" alt="mirador logo" />
          <div className={classNames(styles.PartnerText, styles.MiradorFont)}>
            mirador
          </div>
        </div>
        <div
          role="link"
          className={classNames(styles.Partner)}
          tabIndex={0}
          onClick={() => window.open("https://iiif.io/", "_blank")}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              window.open("https://iiif.io/", "_blank");
            }
          }}
        >
          <img src="/icons/iiif.png" height="60" alt="iiif logo" />
          <div className={classNames(styles.PartnerText, styles.IIIFFont)}>
            International Image Interoperability Framework
          </div>
        </div>
      </div>
    </div>
    <div className={classNames(styles.Container, styles.Lower)}>
      <img className={styles.Image} src="/images/me.jpg" alt="creator" />
      <div className={styles.Section}>
        <h2 className={styles.H2}>About Me</h2>
        <div className={styles.Text}>
          I&apos;m a sponsored<sup>*</sup> trail ultrarunner living in Scotland.
          I earned a PhD in textual criticism from the University of Edinburgh
          and spent several years developing and overseeing projects to digitise
          ancient manuscripts in the US, Europe, and Asia with the Center for
          the Study of New Testament Manuscripts (CSNTM). I primarily publish on
          topics within papyrology, paratexts, and New Testament textual
          criticism. Visit my{" "}
          <a
            className={styles.Link}
            href="https://www.jacobwpeterson.com"
            target="_blank"
            rel="noreferrer"
          >
            personal website
          </a>{" "}
          to learn more.
        </div>
        <small className={styles.Small}>
          <sup>*</sup>by my career in software engineering
        </small>
      </div>
    </div>
  </div>
);
