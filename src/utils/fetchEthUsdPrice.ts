import { ethers } from 'ethers';

const ethUsdPriceFeedAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
const provider = new ethers.JsonRpcProvider(process.env.CHAINSTACK_API_ENDPOINT);

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

interface EthUsdRate {
  ethToUsd: number;
  usdToEth: number;
}

export let ethUsdRate = {
  ethToUsd: 0,
  usdToEth: 0,
};

export async function fetchEthUsdPrice(): Promise<EthUsdRate> {
  try {
    const priceFeed = new ethers.Contract(ethUsdPriceFeedAddress, aggregatorV3InterfaceABI, provider);
    const roundData = await priceFeed.latestRoundData();
    const ethUsdPrice = Number(roundData.answer) / 1e8;
    ethUsdRate = {
      ethToUsd: ethUsdPrice,
      usdToEth: 1 / ethUsdPrice,
    };

    return ethUsdRate;
  } catch (error: any) {
    throw new Error(`Error fetching ETH/USD price ${error}`);
  }
}
