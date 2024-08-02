import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface ImageOverlayProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl, onClose }) => {
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
          }}
        >
          <Image src={imageUrl} alt="Overlay Image" layout="fill" objectFit="contain" style={{ borderRadius: '8px' }} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ImageOverlay;
