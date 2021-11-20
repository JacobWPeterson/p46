import React, { useState } from 'react';
import { StyledForm, StyledInput, StyledLabel, StyledSubmitIcon, StyledSubmitButton } from '../styles.js';


const SingleLine = ({ line }) => {
  const [lineContent, setLineContent] = useState('');
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (event) => {
    event.persist()
    setLineContent(event.target.value)
  }

  const handleSubmit = (event) => {
    if (lineContent === line.text) {
      setSubmitMessage('√')
      event.preventDefault();
      return;
    }
    setSubmitMessage('X')
    event.preventDefault();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        <StyledLabel>
          {`Line ${line.key}`}
        </StyledLabel>
        <StyledInput type="text" value={lineContent} onChange={handleChange} />
      </label>
      <StyledSubmitButton type="submit">Check</StyledSubmitButton>
      {submitMessage && <StyledSubmitIcon submitMessage={submitMessage}>{submitMessage}</StyledSubmitIcon>}
    </StyledForm>
  )
}

export default SingleLine;
