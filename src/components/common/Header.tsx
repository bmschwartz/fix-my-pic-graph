import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ConnectWalletDialog } from '@/components';
import { useWallet } from '@/hooks/useWallet';

const Header: React.FC = () => {
  const { selectedWallet, selectedAccount } = useWallet();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fix My Pic
          </Typography>
          {selectedWallet && selectedAccount ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {selectedWallet.info.name}
              </Typography>
              <Typography variant="body1">{selectedAccount}</Typography>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleOpenDialog}>
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
