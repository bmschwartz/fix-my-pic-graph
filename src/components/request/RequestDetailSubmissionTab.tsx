import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { Request } from '@/types/request';
import LinkButton from '../common/LinkButton';
import SubmissionListItem from '../submission/SubmissionListItem';

interface RequestDetailSubmissionTabProps {
  request: Request;
}

const EmptyState: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        No Submissions Yet
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Be the first to submit your work!
      </Typography>
    </Box>
  );
};

const RequestDetailSubmissionTab: React.FC<RequestDetailSubmissionTabProps> = ({ request }) => {
  return (
    <Box sx={{ mt: 3, position: 'relative' }}>
      <Box sx={{ textAlign: 'right', mb: 3 }}>
        <LinkButton text="New Submission" href={`/submission/new?request=${request.id}`} />
      </Box>
      {request.submissions.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {request.submissions.map((submission) => (
            <Grid item xs={12} sm={6} md={4} key={submission.id}>
              <SubmissionListItem submission={submission} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RequestDetailSubmissionTab;
