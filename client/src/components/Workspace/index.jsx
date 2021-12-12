import React, { useEffect, useState } from 'react';
import Mirador from './Mirador/index.jsx';
import TranscriptionArea from './TranscriptionArea/index.jsx';

import {
  MiradorWrapper, PageWrapper, StyledAlert, TranscriptionPanel,
} from '../../styles.js';
import manifests from '../../libraries/manifests.js';

const Workspace = () => {
  const [manuscript, setManuscript] = useState(1);
  const [pageNumber, setPageNumber] = useState(null);
  const [showWrongPageAlert, setShowWrongPageAlert] = useState(false);
  const { canvasIndex } = manifests[manuscript];
  const manifestLength = Object.keys(manifests).length;

  useEffect(() => {
    if (pageNumber && pageNumber !== (canvasIndex + 1)) {
      setShowWrongPageAlert(true);
    }
    if (showWrongPageAlert && pageNumber === (canvasIndex + 1)) {
      setShowWrongPageAlert(false);
    }
  }, [pageNumber, canvasIndex, manuscript]);

  const handleManifestChange = (type) => {
    switch (type) {
      case 'next':
        setManuscript(manuscript + 1);
        setPageNumber(manifests[manuscript + 1].canvasIndex + 1);
        return;
      case 'previous':
        setManuscript(manuscript - 1);
        setPageNumber(manifests[manuscript - 1].canvasIndex + 1);
        return;
      default:
        throw new Error();
    }
  };

  return (
    <PageWrapper height="85vh">
      {showWrongPageAlert && (
        <StyledAlert variant="warning" onClose={() => setShowWrongPageAlert(false)}>
          Feel free to explore, but you have left the target image (
          {canvasIndex + 1}
          ).
        </StyledAlert>
      )}
      <MiradorWrapper>
        <Mirador
          setPageNumber={setPageNumber}
          manifest={manifests[manuscript].manifestId}
          index={canvasIndex}
        />
      </MiradorWrapper>
      <TranscriptionPanel>
        <TranscriptionArea
          changeManuscript={handleManifestChange}
          manifest={manifests[manuscript]}
          manifestLength={manifestLength}
          manuscriptId={manuscript}
        />
      </TranscriptionPanel>
    </PageWrapper>
  );
};

export default Workspace;
