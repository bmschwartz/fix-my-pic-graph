import { Description, MonetizationOn } from '@mui/icons-material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { Request } from '@/types/request';
import { getImageUrl } from '@/utils/getImage';

interface RequestDetailInfoSectionProps {
  request: Request;
}

const RequestDetailInfoSection: React.FC<RequestDetailInfoSectionProps> = ({ request }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
      <Paper
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 400,
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            minHeight: 300,
          }}
        >
          <Image
            src={getImageUrl(request.imageId)}
            alt={request.title}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: '8px' }}
          />
        </Box>
      </Paper>
      <Paper
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 3,
          textAlign: 'left',
          bgcolor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          {request.title}
        </Typography>
        <Divider sx={{ width: '100%', mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Description sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body1">{request.description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <MonetizationOn sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body1">${request.budget}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RequestDetailInfoSection;
