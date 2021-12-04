import React from 'react';
import GlossaryEntry from './GlossaryEntry.jsx';
import glosses from '../../libraries/glosses.js';
import {
  StyledH1, HelpSection, PageWrapper,
} from '../../styles.js';

const Glossary = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="glossary">
      <StyledH1>Glossary</StyledH1>
      {Object.keys(glosses).map((word) => (
        <GlossaryEntry word={word} gloss={glosses[word]} />
      ))}
    </HelpSection>
  </PageWrapper>
);

export default Glossary;
