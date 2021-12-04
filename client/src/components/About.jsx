import React from 'react';

import { PageWrapper, StyledH1 } from '../styles.js';

const About = () => (
  <PageWrapper flexDirection="column">
    <StyledH1>About Heirographa</StyledH1>
    <div>Some sentences about why Heirographa exists</div>
    <div>Future Plans</div>
    <div>Special Thanks</div>
    <StyledH1>About Me</StyledH1>
    {/* eslint-disable-next-line max-len */}
    <div>I am a software engineer in San Francisco, California. Prior to software engineering, I earned a PhD in textual criticism from the University of Edinburgh and spent several years developing and overseeing projects to digitize ancient manuscripts in the US, Europe, and Asia with the Center for the Study of New Testament Manuscripts (CSNTM).</div>
  </PageWrapper>
);

export default About;
