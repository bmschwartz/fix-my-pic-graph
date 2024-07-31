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
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Image
          src={getImageUrl(request.imageId)}
          alt={request.title}
          layout="responsive"
          width={700}
          height={400}
          objectFit="cover"
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        {request.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {request.description}
      </Typography>
      <Typography variant="h6">${request.budget}</Typography>
    </Paper>
  );
};

export default RequestDetailInfoSection;
