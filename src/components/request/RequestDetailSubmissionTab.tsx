import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Request } from '@/types/request';
import { getImageUrl } from '@/utils/getImage';
import LinkButton from '../common/LinkButton';
import SubmissionGallery from '../common/SubmissionGallery';
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
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState<number | null>(null);

  const handleSubmissionClick = (index: number) => {
    setSelectedSubmissionIndex(index);
  };

  const handleCloseGallery = () => {
    setSelectedSubmissionIndex(null);
  };

  return (
    <Box sx={{ mt: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <LinkButton text="New Submission" href={`/submission/new?request=${request.id}`} />
      </Box>
      {request.submissions.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid container spacing={2} sx={{ mt: 5 }}>
          {request.submissions.map((submission, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={submission.id}
              onClick={() => handleSubmissionClick(index)}
              sx={{ cursor: 'pointer' }}
            >
              <SubmissionListItem submission={submission} />
            </Grid>
          ))}
        </Grid>
      )}
      {selectedSubmissionIndex !== null && (
        <SubmissionGallery
          submissions={request.submissions}
          currentIndex={selectedSubmissionIndex}
          onClose={handleCloseGallery}
          onNext={() => setSelectedSubmissionIndex((selectedSubmissionIndex + 1) % request.submissions.length)}
          onPrev={() =>
            setSelectedSubmissionIndex(
              (selectedSubmissionIndex - 1 + request.submissions.length) % request.submissions.length
            )
          }
        />
      )}
    </Box>
  );
};

export default RequestDetailSubmissionTab;
