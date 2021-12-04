import React from 'react';
import {
  StyledH1, HelpSection, HelpText, PageWrapper,
} from '../../styles.js';

const Guide = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="guide" marginTop>
      <StyledH1>Guide</StyledH1>
      <HelpText>
        Here will be a how-to
      </HelpText>
    </HelpSection>
  </PageWrapper>
);

export default Guide;
