import React from 'react';

import {
  AboutPageLower,
  AboutPageMiddle,
  AboutPageUpper,
  AboutPageLowerSection,
  PageWrapper,
  Partner,
  Partners,
  PartnerText,
  StyledH1,
  StyledLine,
  StyledP,
} from '../styles.js';

const About = () => (
  <PageWrapper flexDirection="column">
    <AboutPageUpper>
      <StyledH1 textAlign="center">Why Heirographa</StyledH1>
      {/* eslint-disable-next-line max-len */}
      <StyledP fontSize={20} textAlign="justify" width="90%">Heirographa was created to bridge the skill gap between being able to read a print edition and struggling to read original source material, whether for research purposes or personal interest. One of the major barriers to reading from manuscripts is that for most classical works the majority of surviving manuscripts are relatively late and these are often the most difficult manuscripts to read. The script in them is replete with cursive letters and ligatures that can bewilder newcomers. Accordingly, Heirographa eases the learner into manuscripts by starting with relatively easy-to-read uncial scripts and slowly introduces new and more complex concepts over a series of lessons that accumulate into an ability to work with more difficult minuscule texts. The original idea for this was aimed at producing a physical workbook for students, although I am now pleased it exists in digital format.</StyledP>
      <br />
      {/* eslint-disable-next-line max-len */}
      <StyledP fontSize={20} fontStyle="italic" textAlign="center" width="90%">Please use the contact form to send questions or suggestions for improvement. Also consider buying me a coffee (or two).</StyledP>
    </AboutPageUpper>
    <AboutPageMiddle>
      <StyledH1 color="#3e5276" textAlign="center">Special Thanks</StyledH1>
      <StyledLine>
        {/* eslint-disable-next-line max-len */}
        This project would not be possible without the cooperative spirit of the following projects and organizations.
      </StyledLine>
      <Partners>
        <Partner>
          <img src="./images/mirador.png" alt="mirador logo" />
          <PartnerText color="#3c444d" fontFamily="'Yanone Kaffeesatz', sans-serif" fontSize="48px" letterSpacing=".05em">
            mirador
          </PartnerText>
        </Partner>
        <Partner>
          <img src="./images/library.svg" height="60" alt="library logo" />
          <PartnerText color="#3e5276" fontSize="18px" fontStyle="italic" padding="20px 0 0 0">
            Holding Institutions
          </PartnerText>
          <PartnerText color="#3e5276" fontSize="12px" padding="2px 0">
            Biblioteca Apostolica Vaticana
            <br />
            Cambridge University Library
          </PartnerText>
        </Partner>
        <Partner>
          <img src="./images/iiif.png" height="60" alt="iiif logo" />
          <PartnerText color="#006eb0" fontFamily="Playfair Display" fontSize="18px">
            International Image Interoperability Framework
          </PartnerText>
        </Partner>
      </Partners>
    </AboutPageMiddle>
    <AboutPageLower>
      <img style={{ 'border-radius': '50%' }} height="325" width="325" src="./images/me.jpg" alt="creator" />
      <AboutPageLowerSection>
        <StyledH1 textAlign="center">About Me</StyledH1>
        {/* eslint-disable-next-line max-len */}
        <StyledP fontSize={18} textAlign="center" width="50vw">I&apos;m a software engineer living in Silicon Valley developing cloud products for Splunk. Prior to this, I earned a PhD in textual criticism from the University of Edinburgh and spent several years developing and overseeing projects to digitize ancient manuscripts in the US, Europe, and Asia with the Center for the Study of New Testament Manuscripts (CSNTM).</StyledP>
      </AboutPageLowerSection>
    </AboutPageLower>
  </PageWrapper>
);

export default About;
