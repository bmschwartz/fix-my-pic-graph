import { Box } from '@mui/material';
import React from 'react';

import { NewRequestForm } from '@/components';

const NewRequestView: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        paddingTop: '64px',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 700 }}>
        <NewRequestForm />
      </Box>
    </Box>
  );
};

export default NewRequestView;
