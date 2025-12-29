import type { ReactElement } from 'react';

import styles from './Guide.module.scss';

export const Guide = (): ReactElement => (
  <div className={styles.Container} id="guide">
    <h1 className={styles.H1}>Guide</h1>
    <div className={styles.GuideBody}>
      <h2 className={styles.H2}>Introduction</h2>
      <p className={styles.GuideText}>
        The &quot;Peterson transcription&quot; of 𝔓<sup>46</sup> was created as part of my doctoral
        thesis (
        <a
          href="http://dx.doi.org/10.7488/era/528"
          target="_blank"
          rel="noreferrer"
          className={styles.Link}
        >
          doi.org/10.7488/era/528
        </a>
        ). It is based on the 2013–14 images produced by the Center for the Study of New Testament
        Manuscripts and personal visits to the Chester Beatty Library. There are a few different
        features needing explanation to facilitate ease of use. The reading marks and few rough
        breathing marks present in the manuscript have not been replicated. Since the transcription
        contains a reconstruction of lacunose and damaged texts, characters that would be a blank
        space with an underdot in a diplomatic edition have been moved to inside the square brackets
        where the letter is presented with an underdot. This allows for distinguishing between a
        character that is able to be partially identified but has an underdot and a blank space with
        an underdot. Below each transcribed page is a list of corrections, if applicable. The number
        before the correction refers to the line, not the scripture reference. Any{' '}
        <i>in scribendo</i> corrections have been recorded here, with the main text of the
        transcription reading the corrected text. If the original scribe made what appears to be a
        subsequent correction, the uncorrected text is in the main text block. The correction list
        and hand ascriptions are based upon my article “An Updated Correction List for Chester
        Beatty BP II + P.Mich. Inv. 6238 (Gregory-Aland Papyrus 46 [𝔓
        <sup>46</sup>]).” <i>Bulletin of the American Society of Papyrologists</i> 56 (2019):
        173–195. (
        <a
          href="http://doi.org/10.2143/BASP.56.0.3286655"
          target="_blank"
          rel="noreferrer"
          className={styles.Link}
        >
          doi.org/10.2143/BASP.56.0.3286655
        </a>
        ).
      </p>
      <h2 className={styles.H2}>Sigla</h2>
      <p className={styles.GuideText}>The sigla and abbreviations used are:</p>
      <table>
        <tbody>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>f.</td>
            <td>folio</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>{'\u2192'}</td>
            <td>writing on the side of the papyrus with horizontal fibers</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>{'\u2193'}</td>
            <td>writing on the side of the papyrus with vertical fibers</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>[]</td>
            <td>Text inside square brackets is lacunose (see discussion above).</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>]α̣[</td>
            <td>The letter is partially identifiable (see discussion above).</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>[α̣]</td>
            <td>
              Traces of ink remain, but no letter is identifiable. For the reconstructed
              transcription, these are moved inside brackets and the expected letter is provided
              with an underdot to distinguish it from a fully lacunose portion of the page (see
              discussion above).
            </td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>¦</td>
            <td>separates readings within a correction unit</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>|</td>
            <td>represents a line break</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>om.</td>
            <td>The stated text is originally omitted.</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>-</td>
            <td>The original text has been deleted (always in relation to a corrector).</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>(ν)</td>
            <td>stands in place of a nu-bar at the end of lines</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>*</td>
            <td>the original reading of the manuscript</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>
              <sup>M1–M5</sup>
            </td>
            <td>
              the identifiable hands of the manuscript, with M1 being the original scribe and all
              others being correctors
            </td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>
              <sup>M</sup>
            </td>
            <td>unidentified corrector</td>
          </tr>
          <tr className={styles.Row}>
            <td className={styles.SymbolCell}>
              <sup>vid.</sup>
            </td>
            <td>(=ut videtur) The reading or letter(s) in question are not certain.</td>
          </tr>
        </tbody>
      </table>
      <h2 className={styles.H2}>Image viewer</h2>
      <p className={styles.GuideText}>
        The image viewer loads with the image of the page for that lesson. Basic controls for
        zooming in (+) and out (-) on the image are located at the bottom. You can also click the
        image or use swipe actions to zoom in and out. There you will also find left (◀) and right
        (▶) arrow buttons that will take you to different pages of the manuscript, which can be
        useful for getting a better idea of that particular scribe&apos;s letter formations. If you
        navigate away from the target image, a message will pop up to remind you which image the
        lesson covers so you can navigate back.
      </p>
      <p className={styles.GuideText}>
        At the top right is a circular button. Clicking this opens a menu of options for altering
        the appearance of the image, such as adjusting the brightness or contrast. <br />
      </p>
      <p className={styles.GuideText}>
        In the top left next to the name of the manuscript is another button you can click to learn
        all about the manuscript. Each one has different information, but you can often learn about
        contents, current and historical owners, location, scripts, and find a bibliography of
        resources about that manuscript.
      </p>
    </div>
  </div>
);
