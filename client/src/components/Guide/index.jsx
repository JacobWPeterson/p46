import React from 'react';
import DictionaryEntry from './DictionaryEntry.jsx';
import { definitions } from '../../libraries/definitions.js';
;

const Guide = () => (
  <div>
    <h1>Definitions</h1>
    {Object.keys(definitions).map((word) => (
      <DictionaryEntry word={word} definition={definitions[word]}/>
    ))}
  </div>
)

export default Guide;
