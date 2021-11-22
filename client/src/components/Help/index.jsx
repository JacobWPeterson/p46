import React from 'react';
import GlossaryEntry from './GlossaryEntry.jsx';
import glosses from '../../libraries/glosses.js';
import {
  HelpHeading, HelpSection, HelpText, PageWrapper,
} from '../../styles.js';

const Help = () => (
  <PageWrapper flexDirection="column">
    <HelpSection marginTop>
      <HelpHeading>Guide</HelpHeading>
      <HelpText>
        Here will be a how-to
      </HelpText>
    </HelpSection>
    <HelpSection>
      <HelpHeading>Glossary</HelpHeading>
      {Object.keys(glosses).map((word) => (
        <GlossaryEntry word={word} gloss={glosses[word]} />
      ))}
    </HelpSection>
  </PageWrapper>
);

export default Help;
