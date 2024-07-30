import { Box } from '@mui/material';
import React from 'react';

import { CreateRequestButton, RequestList } from '@/components';

const HomeView: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <CreateRequestButton
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 6,
        }}
      />
      <RequestList />
    </Box>
  );
};

export default HomeView;
