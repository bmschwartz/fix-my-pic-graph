import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { ConnectWalletDialog } from '@/components';
import { useCommentStore } from '@/hooks/useCommentStore';
import { useWallet } from '@/hooks/useWallet';
import { Request } from '@/types/request';
import FMPButton from '../common/FMPButton';

interface RequestDetailCommentTabProps {
  request: Request;
}

const RequestDetailCommentTab: React.FC<RequestDetailCommentTabProps> = ({ request }) => {
  const { selectedAccount } = useWallet();
  const { uploadComment } = useCommentStore();
  const [commentText, setCommentText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const connectWallet = () => {
    setDialogOpen(true);
  };

  const submitComment = async () => {
    if (!selectedAccount) {
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    try {
      await uploadComment({ text: commentText, request });
      // Clear the comment text field
      setCommentText('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment.');
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      {request.comments.map((comment) => (
        <Box key={comment.id} sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight="bold">
            {comment.commenter} - {new Date(comment.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2">{comment.text}</Typography>
        </Box>
      ))}
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Add a comment"
        sx={{ mb: 2 }}
        value={commentText}
        onChange={handleCommentChange}
      />
      <FMPButton variant="contained" color="primary" onClick={selectedAccount ? submitComment : connectWallet}>
        {selectedAccount ? 'Submit' : 'Connect Wallet'}
      </FMPButton>
      <ConnectWalletDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
};

export default RequestDetailCommentTab;
