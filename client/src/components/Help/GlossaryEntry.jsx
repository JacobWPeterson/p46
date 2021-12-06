import React from 'react';
import { HelpText, Word } from '../../styles.js';

const GlossaryEntry = ({ word, gloss }) => (
  <div style={{ margin: '0 0 0 30px' }}>
    <Word id={word}>{word}</Word>
    {!gloss.long && <HelpText>{gloss.short}</HelpText>}
    {gloss.long && <HelpText>{gloss.long}</HelpText>}
  </div>
);

export default GlossaryEntry;
