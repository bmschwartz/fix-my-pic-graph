import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import React, { useState } from 'react';

import { ConnectWalletDialog } from '@/components';
import { useWallet } from '@/hooks/useWallet';
import FMPButton from './FMPButton';

const Header: React.FC = () => {
  const theme = useTheme();
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
      <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default, padding: '15px' }}>
        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#000000' }}>
              <Link href="/" passHref>
                <Box component="a" sx={{ color: '#000', textDecoration: 'none' }}>
                  Fix My Pic
                </Box>
              </Link>
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
        </Box>
      </AppBar>
      <ConnectWalletDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default Header;
