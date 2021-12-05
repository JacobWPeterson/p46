import React, { useState } from 'react';
import Mirador from './Mirador/index.jsx';
import TranscriptionArea from './TranscriptionArea/index.jsx';

import {
  MiradorWrapper, PageWrapper, StyledAlert, TranscriptionPanel,
} from '../../styles.js';
import manifests from '../../libraries/manifests.js';

const Workspace = () => {
  const manuscript = '01';
  const [showWrongPageAlert, setShowWrongPageAlert] = useState(false);

  return (
    <PageWrapper height="85vh">
      {showWrongPageAlert && (
        <StyledAlert variant="warning" onClose={() => setShowWrongPageAlert(false)}>
          Feel free to explore, but you have left the target image (
          {manifests[manuscript].canvasIndex + 1}
          ).
        </StyledAlert>
      )}
      <MiradorWrapper>
        <Mirador
          alertIsShowing={showWrongPageAlert}
          manifest={manifests[manuscript].manifestId}
          index={manifests[manuscript].canvasIndex}
          showAlert={setShowWrongPageAlert}
        />
      </MiradorWrapper>
      <TranscriptionPanel>
        <TranscriptionArea
          title={manifests[manuscript].title}
          lines={manifests[manuscript].lines}
        />
      </TranscriptionPanel>
    </PageWrapper>
  );
};

export default Workspace;
