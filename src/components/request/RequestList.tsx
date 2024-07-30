import ImageList from '@mui/material/ImageList';
import React from 'react';

import { useRequests } from '@/hooks/useRequests';
import { PictureRequest } from '@/types/pictureRequest';
import RequestListItem from './RequestListItem';

const RequestList: React.FC = () => {
  const requests = useRequests();

  return (
    <ImageList variant="masonry" cols={3} gap={16}>
      {requests.map((request: PictureRequest) => (
        <RequestListItem key={request.id} pictureRequest={request} />
      ))}
    </ImageList>
  );
};

export default RequestList;
