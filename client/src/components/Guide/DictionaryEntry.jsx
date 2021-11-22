import React from 'react';
import { Definition, Word } from '../../styles.js';

const DictionaryEntry = ({ word, definition }) => (
  <>
    <Word id={word}>{word}</Word>
    {!definition.long && <Definition>{definition.short}</Definition>}
    {definition.long && <Definition>{definition.long}</Definition>}
  </>
);

export default DictionaryEntry;
