import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import evaluateSubmission from './validators.js';
import glosses from '../../../libraries/glosses.js';
import {
  PopoverHeader,
  StyledBadge,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLink,
  StyledCustomPillBadge,
  StyledSubmitButton,
} from '../../../styles.js';

const SingleLine = ({ line }) => {
  const [lineContent, setLineContent] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (event) => {
    event.persist();
    setLineContent(event.target.value);
  };

  const handleSubmit = (event) => {
    setSubmissionStatus(evaluateSubmission(lineContent, line.text, line.length));
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
          <PopoverHeader as="h3">{`New Concept: ${concepts[0]}`}</PopoverHeader>
          <Popover.Body>
            {glosses[concepts[0]].short}
            &nbsp;
            <StyledLink href={`/help#${concepts[0]}`} target="_blank">Learn more</StyledLink>
          </Popover.Body>
        </Popover>
      )}
    >
      <StyledCustomPillBadge background="#c9ac5f">NC</StyledCustomPillBadge>
    </OverlayTrigger>
  );

  const renderIncorrectAnswerMessaging = () => (
    !submissionStatus[0] ? (
      <OverlayTrigger
        key="error-tooltip"
        placement="top-end"
        rootClose
        transition
        trigger={['hover', 'click']}
        overlay={(
          <Popover id="popover-error">
            <Popover.Body>
              {submissionStatus[1]}
            </Popover.Body>
          </Popover>
      )}
      >
        <StyledBadge pill bg="danger">
          X
        </StyledBadge>
      </OverlayTrigger>
    ) : (
      <StyledBadge pill bg="success">
        Correct!
      </StyledBadge>
    )
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
      {submissionStatus && renderIncorrectAnswerMessaging()}
    </StyledForm>
  );
};

export default SingleLine;
