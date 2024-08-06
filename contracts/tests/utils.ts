import { Contract, ContractTransactionReceipt, EventLog, Log, Signer } from 'ethers';
import { ethers } from 'hardhat';

import FixMyPicFactorySchema from '../../public/artifacts/FixMyPicFactory.json';
import { deployContract, getWallet } from '../utils';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

interface Account {
  address: string;
  key: string;
}

interface CreatePictureRequestProps {
  account: Account;
  factoryAddress: string;
  title: string;
  description: string;
  imageId: string;
  budget: number;
  expiresAt: number;
}

interface CreateRequestSubmissionProps {
  account: Account;
  factoryAddress: string;
  requestAddress: string;
  description: string;
  price: number;
  freeImageId: string;
  watermarkedImageId: string;
  encryptedImageId: string;
}

interface PurchaseSubmissionProps {
  account: Account;
  submissionAddress: string;
}

export async function deployPriceOracle(account: Account): Promise<Contract> {
  const wallet = getWallet(account.key);

  const contractName = 'PriceOracle';

  return deployContract(contractName, [], { wallet, asProxy: true });
}

export async function deployFixMyPicFactory(account: Account, priceOracleAddress: string): Promise<Contract> {
  const wallet = getWallet(account.key);

  const contractName = 'FixMyPicFactory';

  return deployContract(contractName, [], {
    wallet,
    asProxy: true,
    proxyConstructorArgs: [priceOracleAddress],
  });
}

export async function _getSigner({ address, key }: Account): Promise<Signer> {
  try {
    const wallet = getWallet(key);
    // Check if the address matches the wallet's address
    if (wallet.address.toLowerCase() !== address.toLowerCase()) {
      throw new Error(`⛔️ The provided address does not match the wallet's address: ${wallet.address}`);
    }

    return wallet;
  } catch (error) {
    console.error('Error in _getSigner:', error);
    throw error;
  }
}

export async function _createPictureRequest({
  account,
  title,
  description,
  imageId,
  budget,
  expiresAt,
  factoryAddress,
}: CreatePictureRequestProps): Promise<Contract> {
  const factoryContract = new Contract(factoryAddress, FixMyPicFactorySchema.abi, await _getSigner(account));

  const tx = await factoryContract.createPictureRequest(title, description, imageId, budget, expiresAt);
  const receipt: ContractTransactionReceipt = await tx.wait();

  if (receipt.status !== 1) {
    throw new Error('Failed to create picture request');
  }

  const event = receipt.logs.find(
    (log: EventLog | Log) =>
      log.address === factoryAddress &&
      log.topics[0] === ethers.id('PictureRequestCreated(address,string,string,string,uint256,address,uint256,uint256)')
  );

  if (!event) {
    throw new Error('PictureRequestCreated event not found');
  }

  const decodedEvent = factoryContract.interface.parseLog(event);
  const pictureRequestAddress: string | null = decodedEvent?.args.request;

  if (!pictureRequestAddress) throw new Error('PictureRequestCreated event not found');

  return ethers.getContractAt('PictureRequest', pictureRequestAddress);
}

export async function _createRequestSubmission({
  account,
  factoryAddress,
  requestAddress,
  description,
  price,
  freeImageId,
  watermarkedImageId,
  encryptedImageId,
}: CreateRequestSubmissionProps): Promise<Contract> {
  const factoryContract = new Contract(factoryAddress, FixMyPicFactorySchema.abi, await _getSigner(account));

  const tx = await factoryContract.createRequestSubmission(
    requestAddress,
    description,
    price,
    freeImageId,
    watermarkedImageId,
    encryptedImageId
  );
  const receipt: ContractTransactionReceipt = await tx.wait();

  if (receipt.status !== 1) {
    throw new Error('Failed to create request submission');
  }

  const event = receipt.logs.find(
    (log: EventLog | Log) =>
      log.address === factoryAddress &&
      log.topics[0] ===
        ethers.id('RequestSubmissionCreated(address,address,string,uint256,string,string,string,address,uint256)')
  );

  if (!event) {
    console.error('Event logs:', receipt.logs);
    throw new Error('RequestSubmissionCreated event not found. Missing event.');
  }

  const decodedEvent = factoryContract.interface.parseLog(event);
  const submissionAddress: string | null = decodedEvent?.args.submission;

  if (!submissionAddress) throw new Error('RequestSubmissionCreated address missing from event.');

  return ethers.getContractAt('RequestSubmission', submissionAddress);
}

export async function purchaseSubmission({}: PurchaseSubmissionProps): Promise<boolean> {
  return true;
}
