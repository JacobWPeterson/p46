import React from 'react';
import SingleLine from './SingleLine.jsx';
import {
  NavButtonHolder,
  StyledButton,
  StyledLink,
  TranscriptionContainer,
  TranscriptionHeader,
} from '../../../styles.js';

const TranscriptionArea = ({
  changeManuscript, lines, manifestLength, manuscriptId, setPageNumber, showAlert, title,
}) => {
  const handleClick = (type) => {
    showAlert(false);
    setPageNumber(null);
    changeManuscript(type);
  };
  return (
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
        {manuscriptId > 1 ? <StyledButton background="#d3d3d3" color="#3e5276" height={38} padding="6px 12px" onClick={() => handleClick('previous')}>Previous</StyledButton> : <div /> }
        {manuscriptId < manifestLength ? <StyledButton background="#c9ac5f" height={38} padding="6px 26px" onClick={() => handleClick('next')}>Next</StyledButton> : <div /> }
      </NavButtonHolder>
    </TranscriptionContainer>
  );
};

export default TranscriptionArea;
