import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import { FMPButton, FMPTypography } from '@/components';
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      onNext();
    } else if (event.key === 'ArrowLeft') {
      onPrev();
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const imageRef = useRef<HTMLImageElement>(null);

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
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            zIndex: 10,
            fontSize: 40,
          }}
        >
          {'<'}
        </IconButton>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '80%', md: '60%' },
            height: 'auto',
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
            <Image src={imageUrl} alt="Overlay Image" layout="fill" objectFit="contain" ref={imageRef} />
          </Box>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FMPTypography variant="h6" sx={{ fontWeight: 600 }}>
              {submission.description}
            </FMPTypography>
            <FMPButton variant="contained" color="primary" onClick={isFree ? handleDownload : handleBuy} sx={{ mt: 2 }}>
              {isFree ? 'Download' : `Buy for $${submission.price}`}
            </FMPButton>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <IconButton onClick={onPrev} sx={{ color: 'white', fontSize: 40 }}>
                {'<'}
              </IconButton>
              <IconButton
                onClick={onNext}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  zIndex: 10,
                  fontSize: 40,
                }}
              >
                {'>'}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default SubmissionGallery;
