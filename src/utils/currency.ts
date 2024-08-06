import axios from 'axios';
import { ethers, parseUnits } from 'ethers';

import { delay } from './delay';

export const getEthUsdRate = async (): Promise<number> => {
  let ethToUsdRate: number = 0;
  let attempts: number = 0;
  while (!ethToUsdRate) {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prices`);
      ethToUsdRate = data.ethToUsdRate;
    } catch (e: any) {
      console.error(e);
      throw new Error('DEBUG Failed to get ETH to USD rate', e);
    }
    attempts += 1;
    if (attempts > 10) {
      throw new Error('DEBUG Failed to get ETH to USD rate. Too many attempts.');
    }
    await delay(1000);
  }
  return ethToUsdRate;
};

export const convertUsdToEth = (usdAmount: number | string, rate: number): string => {
  if (usdAmount === 0 || usdAmount === '0') {
    return '0';
  }

  const ethAmount = Number(usdAmount) / rate;
  const ethString = String(ethAmount);
  const [integer, fraction] = ethString.split('.');
  console.log('DEBUG >> ', integer, fraction);
  return integer + '.' + fraction.substring(0, 18);
};

export const convertUsdToEthWithoutRate = async (usdAmount: number | string): Promise<string> => {
  const ethUsdRate = await getEthUsdRate();
  return convertUsdToEth(usdAmount, ethUsdRate);
};

export const convertEthToUsd = (ethAmount: number | string, rate: number): string => {
  const usdAmount = Number(ethAmount) * rate;
  return usdAmount.toFixed(2);
};

export const convertUsdCentsToWei = (priceInCents: bigint, ethUsdRate: bigint): bigint => {
  // Calculate the amount of cents in Wei directly to avoid precision loss
  const priceInWei = (priceInCents * 10n ** 18n) / ethUsdRate;

  return priceInWei;
};

export const convertEthToUsdWithoutRate = async (ethAmount: number | string): Promise<string> => {
  const ethUsdRate = await getEthUsdRate();
  return convertEthToUsd(ethAmount, ethUsdRate);
};

export const ethDisplayString = (ethAmount: number): string => {
  const eth = ethAmount.toFixed(6);
  return `${eth} ETH`;
};

export const ethDisplayWithUSDString = (ethAmount: number, rate: number): string => {
  const eth = ethAmount.toFixed(6);
  return `${eth} ETH / $${convertEthToUsd(ethAmount, rate)}`;
};
