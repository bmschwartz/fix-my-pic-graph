import { useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import React from 'react';

import { useRequests } from '@/hooks/useRequests';
import { Request } from '@/types/request';
import RequestListItem from './RequestListItem';

const RequestList: React.FC = () => {
  const requests = useRequests();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const getCols = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    if (isLargeScreen) return 3;
    return 1;
  };

  return (
    <ImageList variant="masonry" cols={getCols()} gap={24}>
      {requests.map((request: Request) => (
        <RequestListItem key={request.id} pictureRequest={request} />
      ))}
    </ImageList>
  );
};

export default RequestList;
