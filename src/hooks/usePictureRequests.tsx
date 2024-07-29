// src/hooks/usePictureRequests.ts
import { useEffect, useState } from 'react';

import { execute, GetPictureRequestsDocument } from '@/graphql/client';
import { PictureRequest } from '@/types/pictureRequest';
import { mapPictureRequest } from '@/utils/mappers';

export const usePictureRequests = () => {
  const [pictureRequests, setPictureRequests] = useState<PictureRequest[]>([]);

  useEffect(() => {
    execute(GetPictureRequestsDocument, {}).then((result) => {
      setPictureRequests((result?.data?.pictureRequests || []).map(mapPictureRequest));
    });
  }, [setPictureRequests]);

  return pictureRequests;
};
