import { Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { Request } from '@/types/request';
import RequestDetailCommentTab from './RequestDetailCommentTab';
import RequestDetailSubmissionTab from './RequestDetailSubmissionTab';

interface RequestDetailTabSectionProps {
  request: Request;
}

const RequestDetailTabSection: React.FC<RequestDetailTabSectionProps> = ({ request }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: '#000', // Black underline for the selected tab
          },
        }}
      >
        <Tab
          label="Submissions"
          sx={{
            color: tabIndex === 0 ? '#000' : '#999',
            backgroundColor: tabIndex === 0 ? '#fff' : '#f0f0f0',
            fontWeight: tabIndex === 0 ? 'bold' : 'normal',
            borderBottom: '2px solid #000',
          }}
        />
        <Tab
          label="Comments"
          sx={{
            color: tabIndex === 1 ? '#000' : '#999',
            backgroundColor: tabIndex === 1 ? '#fff' : '#f0f0f0',
            fontWeight: tabIndex === 1 ? 'bold' : 'normal',
            borderBottom: '2px solid #000',
          }}
        />
      </Tabs>
      {tabIndex === 0 && <RequestDetailSubmissionTab request={request} />}
      {tabIndex === 1 && <RequestDetailCommentTab request={request} />}
    </Paper>
  );
};

export default RequestDetailTabSection;
