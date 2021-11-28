import React from 'react';
import SingleLine from './SingleLine.jsx';
import { TranscriptionContainer, TranscriptionHeader, StyledLink } from '../../../styles.js';

/* 'heading' prop is available; it is a bool referring to whether or not the
image has a decorative header, which we can create a special form for?
Or just use what's already written, but change the downstream "NC" emblem to one for headers?
*/
const TranscriptionArea = ({ lines }) => (
  <TranscriptionContainer>
    <TranscriptionHeader>
      Transcription Workspace
    </TranscriptionHeader>
    <StyledLink href="/guide" marginBottom={10} target="_blank">
      See transcription guide
    </StyledLink>
    {lines.map((line) => (
      <SingleLine key={line.key} line={line} />
    ))}
  </TranscriptionContainer>
);

export default TranscriptionArea;
