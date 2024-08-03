import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { FMPButton } from '@/components';
import { useImageStore } from '@/hooks/useImageStore';
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
  const { getFreeImageUrl } = useImageStore();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const submission = submissions[currentIndex];
  const imageUrl = getFreeImageUrl(submission);
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

  const handleLoadingComplete = ({ naturalWidth, naturalHeight }: { naturalWidth: number; naturalHeight: number }) => {
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const { width, height } = imageDimensions;

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
        <IconButton
          onClick={onPrev}
          sx={{
            position: 'absolute',
            left: 16,
            color: 'white',
            zIndex: 10,
            fontSize: '48px', // Increase size
          }}
        >
          <ChevronLeftIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 16,
            color: 'white',
            zIndex: 10,
            fontSize: '48px', // Increase size
          }}
        >
          <ChevronRightIcon fontSize="inherit" />
        </IconButton>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '80%', md: '60%' },
            height: 'auto',
            maxHeight: '80%',
            zIndex: 20,
            bgcolor: 'background.default', // Match the background color of the website
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingBottom: `${(height / width) * 100}%`,
              height: 0,
            }}
          >
            <Image
              src={imageUrl}
              alt="Overlay Image"
              layout="fill"
              objectFit="contain"
              onLoadingComplete={handleLoadingComplete}
            />
          </Box>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {submission.description}
            </Typography>
            <FMPButton onClick={isFree ? handleDownload : handleBuy} sx={{ mt: 2 }}>
              {isFree ? 'Download' : `Buy for $${submission.price}`}
            </FMPButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SubmissionGallery;
