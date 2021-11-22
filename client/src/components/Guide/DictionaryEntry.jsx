import React from 'react';
import { Definition, Word } from '../../styles.js';

const DictionaryEntry = ({ word, definition }) => (
  <>
    <Word id={word}>{word}</Word>
    <Definition>{definition.short}</Definition>
    <Definition>{definition.long}</Definition>
  </>
);

export default DictionaryEntry;
