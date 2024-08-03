import axios from 'axios';
import { parseUnits } from 'ethers';

import { delay } from './delay';

export const getEthUsdRate = async (): Promise<number> => {
  let ethToUsdRate: number = 0;
  let attempts: number = 0;
  while (!ethToUsdRate) {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prices`);
      ethToUsdRate = data.ethToUsdRate;
      console.log('DEBUG ETH to USD rate:', data);
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
  if (usdAmount === 0) {
    return '0';
  }

  const ethAmount = Number(usdAmount) / rate;
  const ethString = String(ethAmount);
  const [integer, fraction] = ethString.split('.');
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

export const centsToWei = async (priceInCents: number): Promise<string> => {
  const ethUsdRate = await getEthUsdRate();
  const usdAmount = BigInt(priceInCents) / 100n;

  const oneUsdInWei = parseUnits((1 / ethUsdRate).toFixed(18), 18);
  const usdAmountInWei = oneUsdInWei * usdAmount;
  console.log('DEBUG Inputs:', priceInCents, usdAmount, ethUsdRate, oneUsdInWei, usdAmountInWei);

  return usdAmountInWei.toString();
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
