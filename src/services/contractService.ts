import { ContractTransactionReceipt, ethers } from 'ethers';
import { BrowserProvider, Contract, Signer } from 'zksync-ethers';

import FixMyPicFactorySchema from '@/public/artifacts/FixMyPicFactory.json';
import RequestSubmissionSchema from '@/public/artifacts/RequestSubmission.json';
import { EIP6963ProviderDetail } from '@/types/eip6963';
import { convertUsdCentsToWei, getEthPrice } from '@/utils/currency';

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

export interface FixMyPicContractService {
  createPictureRequest(params: CreatePictureRequestParams): Promise<string | null>;
  createSubmission(params: CreateSubmissionsParams): Promise<boolean>;
  createRequestComment(params: CreateRequestCommentParams): Promise<boolean>;

  purchaseSubmission(params: PurchaseSubmissionParams): Promise<boolean>;
}

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || '';
const FIX_MY_PIC_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FIX_MY_PIC_FACTORY_ADDRESS || '';

if (!RPC_URL) {
  process.exit('No RPC URL provided');
}
if (!FIX_MY_PIC_FACTORY_ADDRESS) {
  process.exit('No picture factory address provided');
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
  }: CreatePictureRequestParams): Promise<string | null> => {
    const fixMyPicFactory = new Contract(factoryAddress, FixMyPicFactorySchema.abi, await _getSigner(wallet, account));

    const tx = await fixMyPicFactory.createPictureRequest(
      title,
      description,
      imageId,
      budget * 100, // convert to cents
      expiresAt || 1822865505
    );
    const receipt: ContractTransactionReceipt = await tx.wait();

    if (receipt.status !== 1) {
      throw new Error('Failed to create image request');
    }

    const event = receipt.logs.find(
      (log) =>
        log.address === factoryAddress &&
        log.topics[0] ===
          ethers.id('PictureRequestCreated(address,string,string,string,uint256,address,uint256,uint256)')
    );

    if (!event) {
      return null;
    }

    const decodedEvent = fixMyPicFactory.interface.parseLog(event);
    const pictureRequestAddress: string | null = decodedEvent?.args.request;

    return pictureRequestAddress;
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
    const fixMyPicFactory = new Contract(factoryAddress, FixMyPicFactorySchema.abi, await _getSigner(wallet, account));

    const tx = await fixMyPicFactory.createRequestSubmission(
      requestAddress,
      description,
      (price || 0) * 100, // convert to cents
      freePictureId || '',
      watermarkedPictureId || '',
      encryptedPictureId || ''
    );
    const receipt: ContractTransactionReceipt = await tx.wait();

    if (receipt.status !== 1 || !receipt.contractAddress) {
      throw new Error(`Failed to create submission on picture request ${requestAddress}`);
    }

    return true;
  };

  const purchaseSubmission = async ({
    address: submissionAddress,
    wallet,
    account,
  }: PurchaseSubmissionParams): Promise<boolean> => {
    const submissionContract = new ethers.Contract(
      submissionAddress,
      RequestSubmissionSchema.abi,
      await _getSigner(wallet, account)
    );
    const priceInCents = await submissionContract.price();
    const ethPrice = await getEthPrice();
    const priceInWei = convertUsdCentsToWei(priceInCents, ethPrice);

    const fixMyPicFactory = new Contract(factoryAddress, FixMyPicFactorySchema.abi, await _getSigner(wallet, account));

    const tx = await fixMyPicFactory.purchaseSubmission(submissionAddress, { value: priceInWei });
    const receipt: ContractTransactionReceipt = await tx.wait();

    const event = receipt.logs
      .map((log) => fixMyPicFactory.interface.parseLog(log))
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
