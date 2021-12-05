import React from 'react';
import {
  HomeTextContainer,
  HomeFeatureWrapper,
  SectionHalf,
  HomeLowerWrapper,
  HomeMiddleWrapper,
  HomeUpperWrapper,
  PageWrapper,
  StyledButton,
  StyledH2,
  StyledImage,
  StyledLine,
  StyledP,
  StyledSpan,
  UnorderedList,
  ListItem,
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
            <StyledSpan paddingRight={20} color="#3e5276">Learn</StyledSpan>
            to read
          </StyledLine>
          <StyledLine paddingLeft={40}>
            from
            <StyledSpan paddingLeft={20} color="#c9ac5f">manuscripts</StyledSpan>
          </StyledLine>
        </HomeTextContainer>
        <StyledImage borderColor="#3e5276" maxWidth={450} src="./images/Aristophanes-Barocci-127.jpg" alt="Greek manuscript text" />
      </HomeUpperWrapper>
      <HomeMiddleWrapper>
        Go from printed texts to manuscripts of any period in a few lessons
        <StyledButton onClick={handleGetStarted} height={50} fontSize={24} padding="5px 12px" type="button">Get Started</StyledButton>
      </HomeMiddleWrapper>
      <HomeLowerWrapper>
        <StyledP textAlign="center" width="50vw">
          {/* eslint-disable-next-line max-len */}
          Heirographa currently offers several different features for learners to ease the transition from reading printed Greek texts to manuscripts of any period. Although in development, there are numerous planned features for instructors, such as creating custom lessons and tracking student progress.
        </StyledP>
        <HomeFeatureWrapper>
          <SectionHalf background="#d3d3d3">
            <StyledH2 color="#c9ac5f">For Learners</StyledH2>
            <UnorderedList>
              <ListItem><span>increasingly difficult-to-read manuscripts</span></ListItem>
              <ListItem><span>answers checked line-by-line</span></ListItem>
              <ListItem><span>helpful information when you meet new concepts</span></ListItem>
              <ListItem><span>tips and clues to help you resolve incorrect answers</span></ListItem>
              <ListItem><span>a glossary of relevant terms</span></ListItem>
              <ListItem><span>a modern viewer featuring hi-res color images</span></ListItem>
              <ListItem>
                <span>codicological and bibliographic info about each manuscript</span>
              </ListItem>
              <ListItem><span>suggestions for further study</span></ListItem>
              <ListItem><span>links to other relevant online resources</span></ListItem>
            </UnorderedList>
          </SectionHalf>
          <SectionHalf background="#3e5276" color="#fff">
            <StyledH2 color="#c9ac5f">For Instructors (forthcoming)</StyledH2>
            <UnorderedList>
              <ListItem color="#fff"><span>a prebuilt set of lessons (available now)</span></ListItem>
              <ListItem color="#fff"><span>ability to create your own set of lessons using any International Image Interoperability Framework (IIIF) accessible manuscripts and upload answer sets without needing any technical know-how</span></ListItem>
              <ListItem color="#fff"><span>invite students to your custom built sets</span></ListItem>
              <ListItem color="#fff"><span>receive reports of completed student work</span></ListItem>
            </UnorderedList>
          </SectionHalf>
        </HomeFeatureWrapper>
      </HomeLowerWrapper>
    </PageWrapper>
  );
};

export default Home;
