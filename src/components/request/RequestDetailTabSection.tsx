import { Box, Divider, Paper } from '@mui/material';
import React, { useState } from 'react';

import { Request } from '@/types/request';
import TabButton from '../common/TabButton';
import RequestDetailCommentSection from './RequestDetailCommentTab';
import RequestDetailSubmissionSection from './RequestDetailSubmissionTab';

interface RequestDetailTabSectionProps {
  request: Request;
}

enum RequestDetailTab {
  Submissions = 'submissions',
  Comments = 'comments',
}

const RequestDetailTabSection: React.FC<RequestDetailTabSectionProps> = ({ request }) => {
  const [selectedTab, setSelectedTab] = useState<RequestDetailTab>(RequestDetailTab.Submissions);

  const handleTabChange = (tab: RequestDetailTab) => {
    setSelectedTab(tab);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
        <TabButton
          text="Submissions"
          selected={selectedTab === RequestDetailTab.Submissions}
          onClick={() => handleTabChange(RequestDetailTab.Submissions)}
          badgeContent={String(request.submissions.length)}
        />
        <TabButton
          text="Comments"
          selected={selectedTab === RequestDetailTab.Comments}
          onClick={() => handleTabChange(RequestDetailTab.Comments)}
          badgeContent={String(request.comments.length)}
        />
      </Box>
      <Divider sx={{ my: 3 }} />
      {selectedTab === RequestDetailTab.Submissions && <RequestDetailSubmissionSection request={request} />}
      {selectedTab === RequestDetailTab.Comments && <RequestDetailCommentSection request={request} />}
    </Paper>
  );
};

export default RequestDetailTabSection;
