import type { ReactElement } from "react";

import styles from "./Guide.module.scss";

export const Guide = (): ReactElement => (
  <div className="PageWrapper">
    <div className={styles.Container} id="guide">
      <h1 className={styles.H1}>Guide</h1>
      <h2 className={styles.H2}>Introduction</h2>
      <p className={styles.GuideText}>
        The home page features two main areas: the image viewer and the
        transcription.
      </p>
      <h2 className={styles.H2}>Sigla</h2>
      <table>
        <tbody>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>{"\u2E06"}</td>
            <td>Addition</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>{"\u2E0B"}</td>
            <td>Omission</td>
          </tr>
        </tbody>
      </table>
      <h2 className={styles.H2}>Image viewer</h2>
      <p className={styles.GuideText}>
        The image viewer loads with the image of the page for that lesson. Basic
        controls for zooming in (+) and out (-) on the image are located at the
        bottom. You can also click the image or use swipe actions to zoom in and
        out. There you will also find left (◀) and right (▶) arrow buttons
        that will take you to different pages of the manuscript, which can be
        useful for getting a better idea of that particular scribe&apos;s letter
        formations. If you navigate away from the target image, a message will
        pop up to remind you which image the lesson covers so you can navigate
        back.
      </p>
      <p className={styles.GuideText}>
        At the top right is a circular button. Clicking this opens a menu of
        options for altering the appearance of the image, such as adjusting the
        brightness or contrast. <br />
      </p>
      <p className={styles.GuideText}>
        In the top left next to the name of the manuscript is another button you
        can click to learn all about the manuscript. Each one has different
        information, but you can often learn about contents, current and
        historical owners, location, scripts, and find a bibliography of
        resources about that manuscript.
      </p>
      <h3 className={styles.H3}>Found an issue?</h3>
      <p className={styles.GuideText}>
        Please use the contact form linked in the footer below to report any
        errors or bugs you have found. For errors, please indicate the
        manuscript and line number. For bugs, please provide detailed
        replication steps.
      </p>
    </div>
  </div>
);
