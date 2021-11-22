import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { PopoverHeader, StyledNCButton, StyledForm, StyledInput, StyledLabel, StyledLink, StyledSubmitIcon, StyledSubmitButton } from '../../../styles.js';
import { definitions } from '../../../libraries/definitions.js';


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

  const newConcept = (concepts) => (
    <OverlayTrigger
      trigger="click"
      key={concepts}
      placement="left"
      overlay={
        <Popover id={`popover-concepts`}>
          <PopoverHeader as="h3">{concepts[0]}</PopoverHeader>
          <Popover.Body>
            {definitions[concepts[0]].short}
            &nbsp;
            <StyledLink href={`/guide#${concepts[0]}`} target='_blank'>See examples</StyledLink>
          </Popover.Body>
        </Popover>
      }
    >
      <StyledNCButton variant="secondary">NC</StyledNCButton>
    </OverlayTrigger>
  )

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        <StyledLabel>
          {`Line ${line.key}`}
        </StyledLabel>
        <StyledInput type="text" value={lineContent} onChange={handleChange} />
      </label>
      <StyledSubmitButton type="submit">Check</StyledSubmitButton>
      {line.newConcepts && newConcept(line.newConcepts)}
      {submitMessage && <StyledSubmitIcon submitMessage={submitMessage}>{submitMessage}</StyledSubmitIcon>}
    </StyledForm>
  )
}

export default SingleLine;
