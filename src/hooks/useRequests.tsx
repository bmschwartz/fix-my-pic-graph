import { useEffect, useState } from 'react';

import { execute, GetPictureRequestsDocument } from '@/graphql/client';
import { Request } from '@/types/request';
import { mapPictureRequest } from '@/utils/mappers';

export const useRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    execute(GetPictureRequestsDocument, {}).then((result: any) => {
      setRequests((result?.data?.pictureRequests || []).map(mapPictureRequest));
    });
  }, [setRequests]);

  return requests;
};
