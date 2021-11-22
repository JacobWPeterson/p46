import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {
  PopoverHeader,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLink,
  StyledNCButton,
  StyledSubmitButton,
  StyledSubmitIcon,
} from '../../../styles.js';
import definitions from '../../../libraries/definitions.js';

const SingleLine = ({ line }) => {
  const [lineContent, setLineContent] = useState('');
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (event) => {
    event.persist();
    setLineContent(event.target.value);
  };

  const handleSubmit = (event) => {
    if (lineContent === line.text) {
      setSubmitMessage('√');
      event.preventDefault();
      return;
    }
    setSubmitMessage('X');
    event.preventDefault();
  };

  const newConcept = (concepts) => (
    <OverlayTrigger
      key={concepts}
      placement="top-end"
      rootClose
      transition
      trigger="click"
      overlay={(
        <Popover id="popover-concepts">
          <PopoverHeader as="h3">{concepts[0]}</PopoverHeader>
          <Popover.Body>
            {definitions[concepts[0]].short}
            &nbsp;
            <StyledLink href={`/guide#${concepts[0]}`} target="_blank">Learn more</StyledLink>
          </Popover.Body>
        </Popover>
      )}
    >
      <StyledNCButton variant="secondary">NC</StyledNCButton>
    </OverlayTrigger>
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor={line.key}>
        <StyledLabel>
          {`Line ${line.key}`}
        </StyledLabel>
        <StyledInput id={line.key} type="text" value={lineContent} onChange={handleChange} />
      </label>
      <StyledSubmitButton type="submit">Check</StyledSubmitButton>
      {line.newConcepts && newConcept(line.newConcepts)}
      {submitMessage && (
        <StyledSubmitIcon submitMessage={submitMessage}>{submitMessage}</StyledSubmitIcon>
      )}
    </StyledForm>
  );
};

export default SingleLine;
