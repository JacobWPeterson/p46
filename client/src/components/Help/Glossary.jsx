import React from 'react';
import GlossaryEntry from './GlossaryEntry.jsx';
import glosses from '../../libraries/glosses.js';
import {
  HelpHeading, HelpSection, PageWrapper,
} from '../../styles.js';

const Glossary = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="glossary">
      <HelpHeading>Glossary</HelpHeading>
      {Object.keys(glosses).map((word) => (
        <GlossaryEntry word={word} gloss={glosses[word]} />
      ))}
    </HelpSection>
  </PageWrapper>
);

export default Glossary;
