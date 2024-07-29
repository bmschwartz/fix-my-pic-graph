import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import ConnectWalletDialog from '@/components/wallet/ConnectWalletDialog';
import { useWallet } from '@/hooks/useWallet';

const Header: React.FC = () => {
  const { selectedWallet, selectedAccount, disconnectWallet } = useWallet();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        {' '}
        {/* Black background */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
            {' '}
            {/* White text color */}
            Fix My Pic
          </Typography>
          {selectedWallet && selectedAccount ? (
            <Button
              onClick={disconnectWallet}
              sx={{
                color: '#000000', // Black text color
                backgroundColor: '#FFFFFF', // White background
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Slightly darker white on hover
                },
                display: 'flex',
                alignItems: 'center',
              }}
              startIcon={
                <Avatar
                  src={selectedWallet.info.icon}
                  alt={selectedWallet.info.name}
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
              }
            >
              Disconnect {selectedWallet.info.name}
            </Button>
          ) : (
            <Button
              onClick={handleOpenDialog}
              sx={{
                color: '#000000', // Black text color
                backgroundColor: '#FFFFFF', // White background
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Slightly darker white on hover
                },
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <ConnectWalletDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default Header;
