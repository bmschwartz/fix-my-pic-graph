import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { getImageUrl } from '@/hooks/useImage';
import { RequestSubmission } from '@/types/submission';

interface SubmissionGalleryProps {
  submissions: RequestSubmission[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const SubmissionGallery: React.FC<SubmissionGalleryProps> = ({
  submissions,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const submission = submissions[currentIndex];
  const imageUrl = getImageUrl(submission.watermarkedPictureId || submission.freePictureId!);
  const isFree = submission.price === 0;

  const handleDownload = () => {
    // Handle download logic here
  };

  const handleBuy = () => {
    // Handle buy logic here
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.overlay) {
      onClose();
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen
      PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
        data-overlay="true"
        onClick={handleOverlayClick}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '80%', md: '60%' },
            height: { xs: '90%', sm: '80%', md: '60%' },
            zIndex: 20,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flex: '1 1 auto',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <Image src={imageUrl} alt="Overlay Image" layout="fill" objectFit="contain" />
          </Box>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {submission.description}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {!isFree ? `$${submission.price}` : 'Free'}
            </Typography>
            <Button variant="contained" color="primary" onClick={isFree ? handleDownload : handleBuy} sx={{ mt: 2 }}>
              {isFree ? 'Download' : 'Buy'}
            </Button>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="primary" onClick={onPrev}>
                Previous
              </Button>
              <Button variant="outlined" color="primary" onClick={onNext}>
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SubmissionGallery;
