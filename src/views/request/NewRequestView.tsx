import { Box } from '@mui/material';
import React from 'react';

import { BackButton, NewRequestForm } from '@/components';

const NewRequestView: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.default',
        paddingTop: '64px',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 700 }}>
        <BackButton href="/" />
        <NewRequestForm />
      </Box>
    </Box>
  );
};

export default NewRequestView;
