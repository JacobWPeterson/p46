import React, { useState } from 'react';
import Mirador from './Mirador/index.jsx';
import TranscriptionArea from './TranscriptionArea/index.jsx';

import {
  MiradorWrapper, PageWrapper, StyledAlert, TranscriptionPanel,
} from '../../styles.js';
import manifests from '../../libraries/manifests.js';

const Workspace = () => {
  const manifestLength = Object.keys(manifests).length;
  const [manuscript, setManuscript] = useState(1);
  const [showWrongPageAlert, setShowWrongPageAlert] = useState(false);

  const handleManifestChange = (type) => {
    switch (type) {
      case 'next':
        return setManuscript(manuscript + 1);
      case 'previous':
        return setManuscript(manuscript - 1);
      default:
        throw new Error();
    }
  };

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
          changeManuscript={handleManifestChange}
          manifestLength={manifestLength}
          manuscriptId={manuscript}
        />
      </TranscriptionPanel>
    </PageWrapper>
  );
};

export default Workspace;
