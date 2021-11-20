import React from 'react';
import Mirador from './Mirador.jsx';
import TranscriptionArea from './TranscriptionArea.jsx';

import { MiradorWrapper, PageWrapper, TranscriptionContainer } from '../styles.js';

const Learn = () => {

  return (
    <PageWrapper>
      <MiradorWrapper>
        <Mirador config={{ id: "mirador" }} plugins={[]} />
      </MiradorWrapper>
      <TranscriptionContainer>
        <TranscriptionArea />
      </TranscriptionContainer>
    </PageWrapper>
  );
};

export default Learn;
