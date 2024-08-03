import { Box, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { RequestSubmission } from '@/types/submission';
import { getImageUrl } from '@/utils/getImage';
import FMPTypography from '../common/FMPTypography';

interface SubmissionListItemProps {
  submission: RequestSubmission;
  onClick: () => void;
}

const SubmissionListItem: React.FC<SubmissionListItemProps> = ({ submission, onClick }) => {
  const isFree = submission.price === 0;

  const handleDownload = () => {
    // Handle download logic here
  };

  const handleBuy = () => {
    // Handle buy logic here
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
          onClick={onClick}
        />
      </Box>
      <Box sx={{ padding: 2 }}>
        <FMPTypography variant="h6" sx={{ fontWeight: 600 }}>
          {submission.description}
        </FMPTypography>
        <FMPTypography variant="body1">{!isFree ? `$${submission.price}` : 'Free'}</FMPTypography>
        {!isFree && (
          <FMPTypography variant="body1">
            {submission.purchases.length} purchase{submission.purchases.length !== 1 && 's'}
          </FMPTypography>
        )}
        <Button variant="contained" color="primary" onClick={isFree ? handleDownload : handleBuy} sx={{ mt: 2 }}>
          {isFree ? 'Download' : 'Buy'}
        </Button>
      </Box>
    </>
  );
};

export default SubmissionListItem;
