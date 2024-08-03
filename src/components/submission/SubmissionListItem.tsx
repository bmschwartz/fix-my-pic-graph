import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { RequestSubmission } from '@/types/submission';
import { getImageUrl } from '@/utils/getImage';
import FMPTypography from '../common/FMPTypography';
import ImageOverlay from '../common/ImageOverlay';

interface SubmissionListItemProps {
  submission: RequestSubmission;
}

const SubmissionListItem: React.FC<SubmissionListItemProps> = ({ submission }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const isFree = submission.price === 0;

  const handleImageClick = () => {
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <Box sx={{ cursor: 'pointer' }}>
        <Image
          src={getImageUrl(submission.watermarkedPictureId || submission.freePictureId!)}
          alt="Submission"
          layout="responsive"
          width={150}
          height={150}
          objectFit="cover"
          onClick={handleImageClick}
        />
      </Box>
      <Box sx={{ padding: 0 }}>
        <FMPTypography variant="body1">{!isFree ? `$${submission.price}` : 'Free'}</FMPTypography>
        {!isFree && (
          <FMPTypography variant="body1">
            {submission.purchases.length} purchase{submission.purchases.length !== 1 && 's'}
          </FMPTypography>
        )}
      </Box>
      {isOverlayOpen && (
        <ImageOverlay
          imageUrl={getImageUrl(submission.watermarkedPictureId || submission.freePictureId!)}
          onClose={handleOverlayClose}
          description={submission.description}
          price={submission.price}
        />
      )}
    </>
  );
};

export default SubmissionListItem;
