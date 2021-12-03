import React from 'react';
import {
  HomeTextContainer,
  HomeMiddleWrapper,
  HomeUpperWrapper,
  PageWrapper,
  StyledButton,
  StyledImage,
  StyledLine,
  StyledSpan,
} from '../styles.js';

const Home = () => {
  const handleGetStarted = () => {
    window.location.href = 'workspace';
  };

  return (
    <PageWrapper flexDirection="column">
      <HomeUpperWrapper>
        <StyledImage borderColor="#c9ac5f" maxWidth={500} src="./images/Aristophanes-Critical-Edition.png" alt="Greek printed edition text" />
        <HomeTextContainer>
          <StyledLine>
            <StyledSpan paddingRight={20} color="#3e5276">Heirographa</StyledSpan>
            helps
          </StyledLine>
          <StyledLine paddingLeft={40}>
            you read
            <StyledSpan paddingLeft={20} color="#c9ac5f">manuscripts</StyledSpan>
          </StyledLine>
        </HomeTextContainer>
        <StyledImage borderColor="#3e5276" maxWidth={500} src="./images/Aristophanes-Barocci-127.jpg" alt="Greek manuscript text" />
      </HomeUpperWrapper>
      <HomeMiddleWrapper>
        Go from printed texts to manuscripts of any period in a few lessons
        <StyledButton onClick={handleGetStarted} height={50} fontSize={24} type="button">Get Started</StyledButton>
      </HomeMiddleWrapper>
    </PageWrapper>
  );
};

export default Home;
