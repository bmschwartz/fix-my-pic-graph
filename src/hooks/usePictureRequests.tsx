// src/hooks/usePictureRequests.ts
import { useEffect, useState } from 'react';

import { execute, GetPictureRequestsDocument } from '@/graphql/client';
import { PictureRequest } from '@/types/pictureRequest';
import { mapPictureRequest } from '@/utils/mappers';
import { useEthUsdRate } from './useEthUsdRate';

export const usePictureRequests = () => {
  const { ethToUsdRate } = useEthUsdRate();
  const [pictureRequests, setPictureRequests] = useState<PictureRequest[]>([]);

  useEffect(() => {}, [ethToUsdRate]);

  useEffect(() => {
    if (!ethToUsdRate) {
      return;
    }
    execute(GetPictureRequestsDocument, {}).then((result) => {
      setPictureRequests((result?.data?.pictureRequests || []).map(mapPictureRequest));
    });
  }, [ethToUsdRate, setPictureRequests]);

  return pictureRequests;
};
