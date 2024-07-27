import React, { useEffect } from 'react';

import {
  execute,
  GetPictureRequestsDocument,
  GetPictureRequestsQuery,
  PictureRequest as GqlPictureRequest,
} from '@/graphql/client';

const HomeView = () => {
  const [pictureRequestData, setPictureRequestData] = React.useState<GetPictureRequestsQuery>();
  const [pictureRequests, setPictureRequests] = React.useState<GqlPictureRequest[]>([]);

  useEffect(() => {
    execute(GetPictureRequestsDocument, {}).then((result) => {
      setPictureRequests(result?.data?.pictureRequests || []);
    });
  }, [setPictureRequestData]);

  return (
    <div>
      {pictureRequests && (
        <ul>
          {pictureRequests.map((pictureRequest) => (
            <li key={pictureRequest.id}>{pictureRequest.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeView;
