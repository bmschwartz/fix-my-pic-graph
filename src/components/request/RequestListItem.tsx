import { Box, ImageListItem, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { PictureRequest } from '@/types/pictureRequest';
import { getImageUrl } from '@/utils/getImage';

interface RequestListItemProps {
  pictureRequest: PictureRequest;
}

const RequestListItem: React.FC<RequestListItemProps> = ({ pictureRequest }) => {
  const imageUrl = getImageUrl(pictureRequest.imageId);

  return (
    <ImageListItem
      sx={{
        position: 'relative',
        '&:hover .overlay': {
          opacity: 1,
        },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
        <Image
          src={imageUrl}
          alt={pictureRequest.title}
          layout="responsive"
          width={248}
          height={248}
          objectFit="contain"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          padding: '10px',
        }}
      >
        <Typography variant="h6">{pictureRequest.title}</Typography>
        <Typography variant="subtitle1">${pictureRequest.budget}</Typography>
      </Box>
    </ImageListItem>
  );
};

export default RequestListItem;
