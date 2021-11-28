import React from 'react';
import {
  HelpHeading, HelpSection, HelpText, PageWrapper,
} from '../../styles.js';

const Guide = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="guide" marginTop>
      <HelpHeading>Guide</HelpHeading>
      <HelpText>
        Here will be a how-to
      </HelpText>
    </HelpSection>
  </PageWrapper>
);

export default Guide;
