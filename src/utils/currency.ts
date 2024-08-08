import axios from 'axios';

import { delay } from './delay';

export const getEthPrice = async (): Promise<bigint> => {
  let ethPrice: bigint = 0n;
  let attempts: number = 0;
  while (!ethPrice) {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prices`);
      ethPrice = BigInt(data.ethPrice);
    } catch (e: any) {
      console.error(e);
      throw new Error('DEBUG Failed to get ETH price', e);
    }
    attempts += 1;
    if (attempts > 10) {
      throw new Error('DEBUG Failed to get ETH price. Too many attempts.');
    }
    await delay(1000);
  }
  return ethPrice;
};

export const convertUsdCentsToWei = (priceInCents: bigint, ethUsdRate: bigint): bigint => {
  // Calculate the amount of USD in cents to Wei
  const priceInWei = (priceInCents * 10n ** 26n) / ethUsdRate; // 10^18 for wei and 10^8 for USD rate

  return priceInWei;
};
