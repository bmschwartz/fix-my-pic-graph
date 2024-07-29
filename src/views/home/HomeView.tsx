import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { FMPButton, RequestList } from '@/components';

const HomeView: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', padding: 2 }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, padding: 2 }}>
        <Link href="/request/new" passHref>
          <FMPButton type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Create Request
          </FMPButton>
        </Link>
      </Box>
      <RequestList />
    </Box>
  );
};

export default HomeView;
