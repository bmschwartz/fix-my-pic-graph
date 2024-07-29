import ImageList from '@mui/material/ImageList';
import React from 'react';

import { usePictureRequests } from '@/hooks/usePictureRequests';
import { PictureRequest } from '@/types/pictureRequest';
import RequestListItem from './RequestListItem';

const RequestList: React.FC = () => {
  const pictureRequests = usePictureRequests();

  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {pictureRequests.map((pictureRequest: PictureRequest) => (
        <RequestListItem key={pictureRequest.id} pictureRequest={pictureRequest} />
      ))}
    </ImageList>
  );
};

export default RequestList;
