import React from 'react';
import {
  HomeTextContainer, HomeUpperWrapper, PageWrapper, StyledImage, StyledSpan,
} from '../styles.js';

const Home = () => (
  <PageWrapper flexDirection="column">
    <HomeUpperWrapper>
      <StyledImage borderColor="#c9ac5f" width={500} src="./images/Aristophanes-Critical-Edition.png" alt="Greek printed edition text" />
      <HomeTextContainer>
        Learn to read
        <StyledSpan paddingLeft={20} paddingRight={20} color="#c9ac5f">manuscripts</StyledSpan>
        <br />
        with
        <StyledSpan paddingLeft={20} color="#3e5276">Heirographa</StyledSpan>
      </HomeTextContainer>
      <StyledImage borderColor="#3e5276" width={500} src="./images/Aristophanes-Barocci-127.jpg" alt="Greek manuscript text" />
    </HomeUpperWrapper>
  </PageWrapper>
);

export default Home;
