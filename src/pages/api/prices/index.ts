import { getEthUsdRate } from '@/services/priceService';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ethUsdRate = getEthUsdRate();

  res.status(200).json({
    ethToUsdRate: ethUsdRate.ethToUsd,
    usdToEthRate: ethUsdRate.usdToEth,
  });
}
