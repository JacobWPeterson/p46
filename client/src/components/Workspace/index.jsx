import React from 'react';
import Mirador from './Mirador/index.jsx';
import TranscriptionArea from './TranscriptionArea/index.jsx';

import { MiradorWrapper, PageWrapper, TranscriptionPanel } from '../../styles.js';
import forms from '../../libraries/forms.js';

const Workspace = () => {
  const manuscript = '01';
  return (
    <PageWrapper>
      <MiradorWrapper>
        <Mirador manifest={forms[manuscript].manifestId} index={forms[manuscript].canvasIndex} />
      </MiradorWrapper>
      <TranscriptionPanel>
        <TranscriptionArea heading lines={forms[manuscript].lines} />
      </TranscriptionPanel>
    </PageWrapper>
  );
};

export default Workspace;
