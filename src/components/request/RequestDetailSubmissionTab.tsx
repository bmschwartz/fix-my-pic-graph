import { Box, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { Request } from '@/types/request';
import SubmissionListItem from '../submission/SubmissionListItem';

interface RequestDetailSubmissionTabProps {
  request: Request;
}

const RequestDetailSubmissionTab: React.FC<RequestDetailSubmissionTabProps> = ({ request }) => {
  const router = useRouter();

  const handleNewSubmissionClick = () => {
    router.push(`/submission/new?request=${request.id}`);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={handleNewSubmissionClick}>
        New Submission
      </Button>
      <Grid container spacing={2}>
        {request.submissions.map((submission) => (
          <Grid item xs={12} sm={6} md={4} key={submission.id}>
            <SubmissionListItem submission={submission} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RequestDetailSubmissionTab;
