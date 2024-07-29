import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ConnectWalletDialog } from '@/components';
import { useWallet } from '@/hooks/useWallet';

interface RequireWalletProps {
  children: React.ReactNode;
}

const RequireWallet: React.FC<RequireWalletProps> = ({ children }) => {
  const { selectedWallet, selectedAccount } = useWallet();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (selectedAccount && selectedWallet) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Connect Your Wallet
        </Typography>
        <Typography variant="body1" gutterBottom>
          You need to connect your Web3 wallet to access this content.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Connect Wallet
        </Button>
      </Box>
      <ConnectWalletDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};

export default RequireWallet;
