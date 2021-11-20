import React, { useState } from 'react';
import SingleLine from './SingleLine.jsx';
import { TranscriptionContainer, TranscriptionHeader, TranscriptionSubtitle } from '../styles.js';

const TranscriptionArea = ({ heading, lines }) => (
  <TranscriptionContainer>
    <TranscriptionHeader>
      Transcription Workspace
    </TranscriptionHeader>
    <TranscriptionSubtitle href='/guide'>
      See transcription guide and rules
    </TranscriptionSubtitle>
    {lines.map((line) => (
      <SingleLine key={line.key} line={line} />
    ))}
  </TranscriptionContainer>
)

export default TranscriptionArea;
