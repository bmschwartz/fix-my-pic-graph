import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { FMPButton, FMPTypography } from '@/components';

interface ImageOverlayProps {
  imageUrl: string;
  onClose: () => void;
  description?: string;
  price?: number;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl, onClose, description, price }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.overlay) {
      onClose();
    }
  };

  const handleDownload = () => {
    // Handle download logic here
  };

  const handleBuy = () => {
    // Handle buy logic here
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
          flexDirection: 'column',
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
        {description && (
          <FMPTypography variant="h6" sx={{ mt: 1, color: 'white', textAlign: 'center' }}>
            {description}
          </FMPTypography>
        )}
        <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
          {price === undefined || price === 0 ? (
            <FMPButton variant="contained" color="primary" onClick={handleDownload}>
              Download
            </FMPButton>
          ) : (
            <FMPButton variant="contained" color="primary" onClick={handleBuy}>
              Buy for ${price}
            </FMPButton>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ImageOverlay;
