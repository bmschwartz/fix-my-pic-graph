import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ConnectWalletDialog, FMPButton } from '@/components';
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
        padding: '24px',
      }}
    >
      <Box sx={{ maxWidth: '700px', width: '100%', padding: '24px', borderRadius: '8px', boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          You need to connect your Web3 wallet to access this content.
        </Typography>
        <FMPButton onClick={handleOpenDialog} sx={{ marginTop: '16px' }}>
          Connect Wallet
        </FMPButton>
      </Box>
      <ConnectWalletDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};

export default RequireWallet;
