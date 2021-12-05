import React, { useEffect, useRef, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import pluralize from 'pluralize';
import evaluateSubmission from './validators.js';
import glosses from '../../../libraries/glosses.js';
import {
  PopoverHeader,
  StyledBadge,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLink,
  StyledCustomPillBadge,
} from '../../../styles.js';

const SingleLine = ({ title, line }) => {
  const [lineContent, setLineContent] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const guesses = useRef(0);

  useEffect(() => {
    if (lineContent.length > 0 && submissionStatus[0]) {
      guesses.current = 0;
      setShowHint(false);
      return;
    }
    /* On the offchance they got all the letters and were seeing the hint,
    * but then deleted a letter, this turns off the hint icon. This also
    * has the effect of re-rendering the hint tooltip when it elibile again.
    */
    if (lineContent.length !== line.length) {
      setShowHint(false);
      return;
    }
    /*
    * To get here, guess must be incorrect but correct length.
    * To get a hint they must have correctly identified the number of letters.
    */
    guesses.current += 1;
    if (!showHint && guesses.current >= 3) {
      setShowHint(true);
    }
  }, [submissionStatus]);

  const handleChange = (event) => {
    event.persist();
    setLineContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionStatus(evaluateSubmission(lineContent, line.text, line.length));
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
            <StyledLink href={`/glossary#${concepts[0]}`} target="_blank">Learn more</StyledLink>
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
        trigger="hover"
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

  const getHint = (guess, answer) => {
    const mismatches = [];
    for (let i = 0; i < guess.length; i += 1) {
      if (guess[i] !== answer[i]) {
        mismatches.push(`${guess[i]}(${i + 1})`);
      }
    }
    return `Incorrect ${pluralize('letter', mismatches.length)}: ${[...mismatches].join(', ')}.`;
  };

  const hint = () => (
    <OverlayTrigger
      key={`hint${line.key}`}
      placement="top-end"
      rootClose
      transition
      trigger="hover"
      overlay={(
        <Popover id="popover-hint">
          <Popover.Body>
            {getHint(lineContent, line.text)}
          </Popover.Body>
        </Popover>
    )}
    >
      <StyledCustomPillBadge background="#3e5276">?</StyledCustomPillBadge>
    </OverlayTrigger>
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor={title ? 'title' : line.key}>
        <StyledLabel>
          {title ? 'Title' : `Line ${line.key}`}
        </StyledLabel>
        <StyledInput id={title ? 'title' : line.key} type="text" value={lineContent} onChange={handleChange} />
      </label>
      <StyledButton type="submit">Check</StyledButton>
      {line.newConcepts && newConcept(line.newConcepts)}
      {submissionStatus && renderIncorrectAnswerMessaging()}
      {showHint && hint()}
    </StyledForm>
  );
};

export default SingleLine;
