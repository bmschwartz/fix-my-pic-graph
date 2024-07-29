import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import { useWallet } from '@/hooks/useWallet';
import { EIP6963ProviderDetail } from '@/types/eip6963';

interface ConnectWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({ open, onClose }) => {
  const { wallets, connectWallet } = useWallet();

  const handleConnectWallet = async (walletRdns: string) => {
    await connectWallet(walletRdns);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Connect Wallet</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(wallets).length > 0 ? (
            Object.values(wallets).map((provider: EIP6963ProviderDetail) => (
              <Grid item xs={12} sm={6} md={4} key={provider.info.uuid}>
                <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleConnectWallet(provider.info.rdns)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Avatar src={provider.info.icon} alt={provider.info.name} style={{ marginBottom: '8px' }} />
                    <Typography variant="h6">{provider.info.name}</Typography>
                  </Button>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1">There are no Announced Providers</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectWalletDialog;
