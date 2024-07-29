import { Box } from '@mui/material';
import React from 'react';

import { BackButton, NewRequestForm } from '@/components';

const NewRequestView: React.FC = () => {
  return (
    <Box sx={{ padding: 2, margin: '32px' }}>
      <BackButton href="/" />
      <NewRequestForm />
    </Box>
  );
};

export default NewRequestView;
