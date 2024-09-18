import type { ReactElement } from "react";

import styles from "./Bibliography.module.scss";

export const Bibliography = (): ReactElement => (
  <div className="PageWrapper">
    <h1 className={styles.H1}>Bibliography</h1>
    <div className={styles.Container}>
      <h2 className={styles.H2}>more to come</h2>
      <div className={styles.Section}>
        <p className={styles.Item}>
          Peterson, Jacob W. “See With What Variable Letter Sizes I Write–A
          Response to Varner on Gal 6.11 in Papyrus 46.”{" "}
          <i>TC: A Journal of Biblical Textual Criticism</i> 29 (
          <i>forthcoming</i>, 2024).
        </p>
        <p className={styles.Item}>
          Peterson, Jacob W. &quot;GA 1739: A Monk, His Manuscript, and the Text
          of Paul&apos;s Letters.&quot; PhD Thesis, University of Edinburgh,
          2020 (
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
        <p className={styles.Item}>
          Peterson, Jacob W. “An Updated Correction List for Chester Beatty BP
          II + P.Mich. Inv. 6238 (Gregory-Aland Papyrus 46 [𝔓<sup>46</sup>]).”{" "}
          <i>Bulletin of the American Society of Papyrologists</i> 56 (2019):
          173–195. (
          <a
            href="http://doi.org/10.2143/BASP.56.0.3286655"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            doi.org/10.2143/BASP.56.0.3286655
          </a>
          )
        </p>
        <p className={styles.Item}>
          Peterson, Jacob W. “Patterns of Correction as Paratext: A New Approach
          with Papyrus 46 as a Test Case” in{" "}
          <i>
            The Future of New Testament Textual Scholarship: From H. C. Hoskier
            to the Editio Critica Maior and Beyond
          </i>
          , edited by Garrick V. Allen. WUNT I 417. Tübingen: Mohr Siebeck,
          2019. (ISBN: 9783161566622;{" "}
          <a
            href="https://doi.org/10.1628/978-3-16-156663-9"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            doi.org/10.1628/978-3-16-156663-9
          </a>
          )
        </p>
        <p className={styles.Item}>
          Peterson, Jacob W. “Reevaluating the Corrections and Later Hands in
          Papyrus 46.” Paper delivered at the Herman Hoskier and the Future of
          Textual Scholarship on the Bible Conference at Dublin City University,
          Dublin, Ireland, August 2017.
        </p>
        <p className={styles.Item}>
          Peterson, Jacob W. “New Readings in Papyrus 46.” Paper delivered in
          the Working with Biblical Manuscripts program unit, Society of
          Biblical Literature International Meeting, Seoul, South Korea, 5 July
          2016.
        </p>
        <p className={styles.Item}>
          Peterson, Jacob W. “New Readings in Colossians in Papyrus 46.” ThM
          Thesis, Dallas Theological Seminary, 2015.
        </p>
      </div>
    </div>
  </div>
);
