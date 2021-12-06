import React from 'react';
import {
  StyledH1, HelpSection, HelpText, PageWrapper,
} from '../../styles.js';

const Guide = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="guide">
      <StyledH1 textAlign="center">Guide</StyledH1>
      <HelpText>
        Here will be a how-to
      </HelpText>
    </HelpSection>
  </PageWrapper>
);

export default Guide;
