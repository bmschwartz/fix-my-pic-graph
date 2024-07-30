import { Box } from '@mui/material';
import React from 'react';

import Header from '@/components/common/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', p: 2 }}>
        <Box sx={{ width: '100%', maxWidth: '1200px', px: 3 }}>{children}</Box>
      </Box>
      {/* Optionally include a footer here */}
    </Box>
  );
};

export default MainLayout;
