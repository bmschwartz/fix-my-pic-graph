import { useEffect, useState } from 'react';

import { execute, GetPictureRequestsDocument } from '@/graphql/client';
import { PictureRequest } from '@/types/pictureRequest';
import { mapPictureRequest } from '@/utils/mappers';

export const useRequests = () => {
  const [requests, setRequests] = useState<PictureRequest[]>([]);

  useEffect(() => {
    execute(GetPictureRequestsDocument, {}).then((result: any) => {
      setRequests((result?.data?.pictureRequests || []).map(mapPictureRequest));
    });
  }, [setRequests]);

  return requests;
};
