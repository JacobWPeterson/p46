import React from 'react';
import { HelpText, Word } from '../../styles.js';

const GlossaryEntry = ({ word, gloss }) => (
  <>
    <Word id={word}>{word}</Word>
    {!gloss.long && <HelpText>{gloss.short}</HelpText>}
    {gloss.long && <HelpText>{gloss.long}</HelpText>}
  </>
);

export default GlossaryEntry;
