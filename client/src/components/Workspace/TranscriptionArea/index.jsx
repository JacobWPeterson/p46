import React, { useState } from 'react';
import SingleLine from './SingleLine.jsx';
import { TranscriptionContainer, TranscriptionHeader, StyledLink } from '../../../styles.js';

const TranscriptionArea = ({ heading, lines }) => (
  <TranscriptionContainer>
    <TranscriptionHeader>
      Transcription Workspace
    </TranscriptionHeader>
    <StyledLink href='/guide' marginBottom={10} target='_blank'>
      See transcription guide and rules
    </StyledLink>
    {lines.map((line) => (
      <SingleLine key={line.key} line={line} />
    ))}
  </TranscriptionContainer>
)

export default TranscriptionArea;
