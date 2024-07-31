import { Box } from '@mui/material';
import React from 'react';

import { BackButton, RequestDetailInfoSection, RequestDetailTabSection } from '@/components';
import { Request } from '@/types/request';

interface RequestDetailViewProps {
  request: Request;
}

const RequestDetailView: React.FC<RequestDetailViewProps> = ({ request }) => {
  return (
    <Box sx={{ my: 4 }}>
      <BackButton href="/" sx={{ mb: 4 }} />
      {/* </Box> */}
      {/* // <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}> */}
      <RequestDetailInfoSection request={request} />
      <RequestDetailTabSection request={request} />
    </Box>
  );
};

export default RequestDetailView;
