import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import ConnectWalletDialog from '@/components/wallet/ConnectWalletDialog';
import { useWallet } from '@/hooks/useWallet';
import FMPButton from './FMPButton';

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
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', padding: '15px' }}>
        {' '}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#000000' }}>
            {' '}
            Fix My Pic
          </Typography>
          {selectedWallet && selectedAccount ? (
            <FMPButton
              onClick={disconnectWallet}
              startIcon={
                <Avatar
                  src={selectedWallet.info.icon}
                  alt={selectedWallet.info.name}
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
              }
            >
              Disconnect {selectedWallet.info.name}
            </FMPButton>
          ) : (
            <FMPButton onClick={handleOpenDialog}>Connect Wallet</FMPButton>
          )}
        </Toolbar>
      </AppBar>
      <ConnectWalletDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default Header;
