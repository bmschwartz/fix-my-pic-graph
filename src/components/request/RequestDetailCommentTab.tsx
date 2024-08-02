import { Box, TextField, Typography } from '@mui/material';

import { Request } from '@/types/request';
import FMPButton from '../common/FMPButton';

interface RequestDetailCommentTabProps {
  request: Request;
}

const RequestDetailCommentTab: React.FC<RequestDetailCommentTabProps> = ({ request }) => {
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
      <TextField fullWidth multiline rows={4} variant="outlined" placeholder="Add a comment" sx={{ mb: 2 }} />
      <FMPButton variant="contained" color="primary">
        Submit
      </FMPButton>
    </Box>
  );
};

export default RequestDetailCommentTab;
