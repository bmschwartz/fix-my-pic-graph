import { Box, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import RequestList from '@/components/request/RequestList';

const HomeView: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', padding: 2 }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, padding: 2 }}>
        <Link href="/request/new" passHref>
          <Button variant="contained" color="primary">
            Create Request
          </Button>
        </Link>
      </Box>
      <RequestList />
    </Box>
  );
};

export default HomeView;
