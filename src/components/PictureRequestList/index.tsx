import React from 'react';

import { usePictureRequests } from '@/hooks/usePictureRequests';
import { PictureRequest } from '@/types/pictureRequest';
import PictureRequestListCard from './PictureRequestListItem';

const PictureRequestList = () => {
  const pictureRequests = usePictureRequests();

  return (
    <div>
      {pictureRequests && (
        <ul>
          {pictureRequests.map((pictureRequest: PictureRequest) => (
            <PictureRequestListCard key={pictureRequest.id} pictureRequest={pictureRequest} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PictureRequestList;
