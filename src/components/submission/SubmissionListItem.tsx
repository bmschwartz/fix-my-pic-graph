import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { useContractService } from '@/hooks/useContractService';
import { useImageStore } from '@/hooks/useImageStore';
import { useWallet } from '@/hooks/useWallet';
import { RequestSubmission } from '@/types/submission';
import { getImageUrl } from '@/utils/getImage';
import FMPTypography from '../common/FMPTypography';
import ImageOverlay from '../common/ImageOverlay';
import LoadingOverlay from '../common/LoadingOverlay';

interface SubmissionListItemProps {
  submission: RequestSubmission;
}

const SubmissionListItem: React.FC<SubmissionListItemProps> = ({ submission }) => {
  const { getDecryptedImageUrl } = useImageStore();
  const { contractService } = useContractService();
  const { selectedWallet, selectedAccount } = useWallet();

  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('');
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
          onDownload={async () => {
            if (!submission.price) {
              window.open(getImageUrl(submission.freePictureId!), '_blank');
            }

            const url = await getDecryptedImageUrl(submission);
            if (!url) return;

            if (!selectedWallet || !selectedAccount) return;

            setLoading(true);
            setIsOverlayOpen(false);
            setLoadingLabel('Purchasing image...');
            await contractService.purchaseSubmission({
              account: selectedAccount,
              wallet: selectedWallet,
              address: submission.id,
            });
          }}
        />
      )}
      <LoadingOverlay loading={loading} label={loadingLabel} />
    </>
  );
};

export default SubmissionListItem;
