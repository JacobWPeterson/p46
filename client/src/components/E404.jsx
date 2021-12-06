import React from 'react';
import {
  E404Wrapper,
  E404Section,
  StyledButton,
  StyledLine,
  StyledP,
} from '../styles.js';

const E404 = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <E404Wrapper>
      <E404Section left={25} z={-1}>
        <StyledLine color="#3e5276" fontSize="40px">
          Οοπς, παγε νοτ φουνδ!
        </StyledLine>
        <StyledP fontSize="18px" textAlign="center" width="40vw">
          {/* eslint-disable-next-line max-len */}
          You have reached a page that&apos;s not extant. If you believe this is an error, please report it using the contact form. Alternatively, check the address you have entered or just click below to go back home.
        </StyledP>
        <StyledButton onClick={handleGoHome} height={40} fontSize={20} marginTop="25px" padding="5px 12px" type="button">Back Home</StyledButton>
      </E404Section>
      <E404Section left={65} z={-2}>
        <img src="./images/E404.svg" alt="Error 404 Drawing" width="1200" />
      </E404Section>
    </E404Wrapper>
  );
};

export default E404;
