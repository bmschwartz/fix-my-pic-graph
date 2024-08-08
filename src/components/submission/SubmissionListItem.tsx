import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { useContractService } from '@/hooks/useContractService';
import { useImageStore } from '@/hooks/useImageStore';
import { useWallet } from '@/hooks/useWallet';
import { RequestSubmission } from '@/types/submission';
import FMPTypography from '../common/FMPTypography';
import ImageOverlay from '../common/ImageOverlay';
import LoadingOverlay from '../common/LoadingOverlay';

interface SubmissionListItemProps {
  submission: RequestSubmission;
  imageUrlToShow: string;
}

const SubmissionListItem: React.FC<SubmissionListItemProps> = ({ submission, imageUrlToShow }) => {
  const { contractService } = useContractService();
  const { getDecryptedImageUrl } = useImageStore();
  const { selectedWallet, selectedAccount } = useWallet();

  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const isFree = submission.price === 0;
  const purchasedSubmission = submission.purchases.find((purchase) => purchase.buyer === selectedAccount);

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
          src={imageUrlToShow}
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
          imageUrl={imageUrlToShow}
          onClose={handleOverlayClose}
          description={submission.description}
          price={purchasedSubmission ? 0 : submission.price}
          onDownload={async () => {
            if (!submission.price || purchasedSubmission) {
              window.open(imageUrlToShow, '_blank');
              return;
            }

            if (!selectedWallet || !selectedAccount) return;

            setLoading(true);
            setIsOverlayOpen(false);
            setLoadingLabel('Purchasing image...');

            try {
              await contractService.purchaseSubmission({
                account: selectedAccount,
                wallet: selectedWallet,
                address: submission.id,
              });

              const decryptedImageUrl = await getDecryptedImageUrl(submission);
              window.open(decryptedImageUrl, '_blank');
            } catch (error) {
              console.error('Error purchasing image:', error);
            } finally {
              setLoadingLabel('');
              setIsOverlayOpen(false);
              setLoading(false);
            }
          }}
        />
      )}
      <LoadingOverlay loading={loading} label={loadingLabel} />
    </>
  );
};

export default SubmissionListItem;
