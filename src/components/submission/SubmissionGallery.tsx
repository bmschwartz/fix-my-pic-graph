import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface SubmissionGalleryProps {
  imageUrls: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const SubmissionGallery: React.FC<SubmissionGalleryProps> = ({ imageUrls, currentIndex, onClose, onNext, onPrev }) => {
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
        <IconButton
          onClick={onPrev}
          sx={{
            position: 'absolute',
            left: 16,
            color: 'white',
            zIndex: 10,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '80%', md: '60%' },
            height: { xs: '90%', sm: '80%', md: '60%' },
            zIndex: 20,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Image
            src={imageUrls[currentIndex]}
            alt={`Overlay Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
            style={{ borderRadius: '8px' }}
          />
        </Box>
        <IconButton
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 16,
            color: 'white',
            zIndex: 10,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default SubmissionGallery;
