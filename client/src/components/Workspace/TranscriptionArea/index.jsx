import React from 'react';
import SingleLine from './SingleLine.jsx';
import {
  NavButtonHolder,
  StyledButton,
  StyledLink,
  TranscriptionContainer,
  TranscriptionHeader,
} from '../../../styles.js';

/* 'title' prop is available; it is a bool referring to whether or not the
image has a decorative header, which we can create a special form for?
Or just use what's already written, but change the downstream "NC" emblem to one for headers?
*/
const TranscriptionArea = ({
  changeManuscript, lines, manifestLength, manuscriptId, title,
}) => (
  <TranscriptionContainer>
    <TranscriptionHeader>
      Transcription Workspace
    </TranscriptionHeader>
    <StyledLink href="/guide" marginBottom={10} target="_blank">
      See transcription guide
    </StyledLink>
    {title && <SingleLine title={title} line={title} />}
    {lines.map((line) => (
      <SingleLine key={line.key} line={line} />
    ))}
    <NavButtonHolder>
      {manuscriptId > 1 ? <StyledButton background="#d3d3d3" color="#3e5276" height={38} padding="6px 12px" onClick={() => changeManuscript('previous')}>Previous</StyledButton> : <div /> }
      {manuscriptId < manifestLength ? <StyledButton background="#c9ac5f" height={38} padding="6px 26px" onClick={() => changeManuscript('next')}>Next</StyledButton> : <div /> }
    </NavButtonHolder>
  </TranscriptionContainer>
);

export default TranscriptionArea;
