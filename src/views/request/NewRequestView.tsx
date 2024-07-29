import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

import { NewRequestForm } from '@/components';
import { useWallet } from '@/hooks/useWallet';

const NewRequestView: React.FC = () => {
  const { wallets, selectedWallet, selectedAccount, connectWallet } = useWallet();

  const handleConnectWallet = async (walletUuid: string) => {
    await connectWallet(walletUuid);
  };

  console.log('wallets', wallets);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {selectedAccount && selectedWallet ? (
        <div>
          {selectedWallet.info.name}
          <NewRequestForm />
        </div>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Connect Your Wallet
          </Typography>
          <Typography variant="body1" gutterBottom>
            You need to connect your Web3 wallet to create a new picture request.
          </Typography>
          {Object.keys(wallets).length > 0 ? (
            <List>
              {Object.keys(wallets).map((walletUuid) => (
                <ListItem key={walletUuid} button onClick={() => handleConnectWallet(walletUuid)}>
                  <ListItemText primary={wallets[walletUuid].info.name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No wallets available. Please install a Web3 wallet.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NewRequestView;
