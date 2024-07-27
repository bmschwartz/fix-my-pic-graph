import { ContractTransactionReceipt, ethers } from 'ethers';
import { BrowserProvider, Contract, Signer } from 'zksync-ethers';

import FixMyPicFactorySchema from '@/public/artifacts/FixMyPicFactory.json';
import RequestSubmissionSchema from '@/public/artifacts/RequestSubmission.json';
import { EIP6963ProviderDetail } from '@/types/eip6963';
import { convertUsdToEthWithoutRate } from '@/utils/currency';

interface WalletParams {
  account: string;
  wallet: EIP6963ProviderDetail;
}

interface CreatePictureRequestParams extends WalletParams {
  title: string;
  budget: number;
  imageId: string;
  expiresAt?: number;
  description: string;
}

interface CreateSubmissionsParams extends WalletParams {
  price: number;
  description: string;
  requestAddress: string;
  freePictureId?: string;
  encryptedPictureId?: string;
  watermarkedPictureId?: string;
}

interface PurchaseSubmissionParams extends WalletParams {
  address: string;
}

interface CreateRequestCommentParams extends WalletParams {
  requestAddress: string;
  comment: string;
}

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || '';
const FIX_MY_PIC_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FIX_MY_PIC_FACTORY_ADDRESS || '';

if (!RPC_URL) {
  process.exit('No RPC URL provided');
}
if (!FIX_MY_PIC_FACTORY_ADDRESS) {
  process.exit('No picture factory address provided');
}

export interface FixMyPicContractService {
  createSubmission(params: CreateSubmissionsParams): Promise<boolean>;
  purchaseSubmission(params: PurchaseSubmissionParams): Promise<boolean>;
  createPictureRequest(params: CreatePictureRequestParams): Promise<boolean>;
  createRequestComment(params: CreateRequestCommentParams): Promise<boolean>;
}

async function createFixMyPicContractService(factoryAddress: string): Promise<FixMyPicContractService> {
  const _getSigner = (wallet: EIP6963ProviderDetail, account: string): Promise<Signer> => {
    const provider = new BrowserProvider(wallet.provider);
    return provider.getSigner(account);
  };

  const createPictureRequest = async ({
    title,
    description,
    imageId,
    budget,
    expiresAt,
    wallet,
    account,
  }: CreatePictureRequestParams): Promise<boolean> => {
    const fixMyPicFactory = new Contract(factoryAddress, FixMyPicFactorySchema.abi, await _getSigner(wallet, account));

    const budgetEth = await convertUsdToEthWithoutRate(budget);
    const budgetInWei = ethers.parseEther(budgetEth);

    try {
      const tx = await fixMyPicFactory.createPictureRequest(title, description, imageId, budgetInWei, expiresAt || 0);
      const receipt: ContractTransactionReceipt = await tx.wait();

      if (receipt.status !== 1 || !receipt.contractAddress) {
        throw new Error('Failed to create image request');
      }
      return true;
    } catch (error) {
      console.error('Unable to create the image request:', error, typeof error);
      throw error;
    }
  };

  const createSubmission = async ({
    price,
    wallet,
    account,
    description,
    requestAddress,
    freePictureId,
    encryptedPictureId,
    watermarkedPictureId,
  }: CreateSubmissionsParams): Promise<boolean> => {
    try {
      const fixMyPicFactory = new Contract(
        factoryAddress,
        FixMyPicFactorySchema.abi,
        await _getSigner(wallet, account)
      );

      const priceEth = await convertUsdToEthWithoutRate(price);
      const priceInWei = ethers.parseEther(priceEth);

      const tx = await fixMyPicFactory.createSubmission(
        requestAddress,
        description,
        priceInWei,
        freePictureId || '',
        watermarkedPictureId || '',
        encryptedPictureId || ''
      );
      const receipt: ContractTransactionReceipt = await tx.wait();

      if (receipt.status !== 1 || !receipt.contractAddress) {
        throw new Error(`Failed to create submission on picture request ${requestAddress}`);
      }

      return true;
    } catch (error) {
      console.error('Unable to create the submission:', error);
      throw error;
    }
  };

  const purchaseSubmission = async ({ address, wallet, account }: PurchaseSubmissionParams): Promise<boolean> => {
    const submissionContract = new ethers.Contract(
      address,
      RequestSubmissionSchema.abi,
      await _getSigner(wallet, account)
    );
    const price = await submissionContract.price();

    const tx = await submissionContract.purchaseSubmission({ value: price });
    const receipt: ContractTransactionReceipt = await tx.wait();

    const event = receipt.logs
      .map((log) => submissionContract.interface.parseLog(log))
      .find((log) => log && log.name === 'SubmissionPurchased');
    if (!event) {
      throw new Error('SubmissionPurchased event not found');
    }

    return true;
  };

  const createRequestComment = async ({
    requestAddress,
    comment,
    wallet,
    account,
  }: CreateRequestCommentParams): Promise<boolean> => {
    const fixMyPicFactory = new ethers.Contract(
      factoryAddress,
      FixMyPicFactorySchema.abi,
      await _getSigner(wallet, account)
    );

    const tx = await fixMyPicFactory.createRequestComment(requestAddress, comment);
    const receipt: ContractTransactionReceipt = await tx.wait();

    if (receipt.status !== 1) {
      throw new Error('Failed to create a comment');
    }

    return true;
  };

  return { createPictureRequest, createSubmission, purchaseSubmission, createRequestComment };
}

let contractServicePromise: Promise<FixMyPicContractService> | null = null;

const getFixMyPicContractService = async (): Promise<FixMyPicContractService> => {
  if (!contractServicePromise) {
    contractServicePromise = createFixMyPicContractService(FIX_MY_PIC_FACTORY_ADDRESS);
  }
  return contractServicePromise;
};

export { getFixMyPicContractService };
