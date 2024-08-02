import { Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { Request } from '@/types/request';
import { getImageUrl } from '@/utils/getImage';

interface RequestDetailInfoSectionProps {
  request: Request;
}

const RequestDetailInfoSection: React.FC<RequestDetailInfoSectionProps> = ({ request }) => {
  return (
    <Paper sx={{ p: 0, mb: 3, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={getImageUrl(request.imageId)}
          alt={request.title}
          layout="fill"
          objectFit="cover"
          style={{ opacity: 0.5 }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
          }}
        >
          <Typography variant="h4" gutterBottom>
            {request.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {request.description}
          </Typography>
          <Typography variant="h6">${request.budget}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RequestDetailInfoSection;
