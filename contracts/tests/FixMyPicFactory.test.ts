import { expect } from 'chai';
import { Contract, ContractTransactionReceipt, ethers } from 'ethers';

import RequestSubmissionSchema from '../../public/artifacts/RequestSubmission.json';
import { convertUsdToEth } from '../../src/utils/currency';
import { fetchEthUsdPrice } from '../../src/utils/fetchEthUsdPrice';
import { _createPictureRequest, _createRequestSubmission, _getSigner, deployFixMyPicFactory } from './utils';

// Set a longer timeout for this test file
jest.setTimeout(300000); // 300 seconds or 5 minutes

interface Account {
  address: string;
  key: string;
}

const ACCOUNTS: { [key: string]: Account } = {
  DEPLOYER: {
    address: '0x36615Cf349d7F6344891B1e7CA7C72883F5dc049',
    key: '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  ONE: {
    address: '0xa61464658AfeAf65CccaaFD3a512b69A83B77618',
    key: '0xac1e735be8536c6534bb4f17f06f6afc73b2b5ba84ac2cfb12f7461b20c0bbe3',
  },
  TWO: {
    address: '0x0D43eB5B8a47bA8900d84AA36656c92024e9772e',
    key: '0xd293c684d884d56f8d6abd64fc76757d3664904e309a0645baf8522ab6366d9e',
  },
  THREE: {
    address: '0xA13c10C0D5bd6f79041B9835c63f91de35A15883',
    key: '0x850683b40d4a740aa6e745f889a6fdc8327be76e122f5aba645a5b02d0248db8',
  },
};

describe('FixMyPicFactory', function () {
  let fixMyPicFactory: Contract;
  let pictureRequest: Contract;
  let requestSubmission: Contract;
  let fixMyPicFactoryAddress: string;
  let ethToUsd: number;

  beforeAll(async function () {
    const ethUsdRates = await fetchEthUsdPrice();
    ethToUsd = ethUsdRates.ethToUsd;

    fixMyPicFactory = await deployFixMyPicFactory(ACCOUNTS.DEPLOYER);
    fixMyPicFactoryAddress = await fixMyPicFactory.getAddress();
  });

  it('should initialize the factory contract', async function () {
    expect(fixMyPicFactoryAddress).to.not.be.undefined;
  });

  it('should create a new picture request', async function () {
    const title = 'Request Title';
    const description = 'Request Description';
    const imageId = 'Image123';
    const budget = 500; // 500 cents = $5
    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 1 day from now

    pictureRequest = await _createPictureRequest({
      account: ACCOUNTS.ONE,
      title,
      description,
      imageId,
      budget,
      expiresAt,
      factoryAddress: fixMyPicFactoryAddress,
    });

    expect(await pictureRequest.title()).to.equal(title);
    expect(await pictureRequest.description()).to.equal(description);
    expect(await pictureRequest.imageId()).to.equal(imageId);
    expect(await pictureRequest.budget()).to.equal(budget);
    expect(await pictureRequest.expiresAt()).to.equal(expiresAt);
  });

  it('should create a new request submission', async function () {
    const requestAddress = await pictureRequest.getAddress();
    const description = 'Submission Description';
    const price = 500; // 500 cents = $5
    const freeImageId = 'FreeImage123';
    const watermarkedImageId = 'WatermarkedImage123';
    const encryptedImageId = 'EncryptedImage123';

    requestSubmission = await _createRequestSubmission({
      account: ACCOUNTS.TWO,
      factoryAddress: fixMyPicFactoryAddress,
      requestAddress,
      description,
      price,
      freeImageId,
      watermarkedImageId,
      encryptedImageId,
    });

    expect(await requestSubmission.description()).to.equal(description);
    expect(await requestSubmission.price()).to.equal(price);
    expect(await requestSubmission.freeImageId()).to.equal(freeImageId);
    expect(await requestSubmission.watermarkedImageId()).to.equal(watermarkedImageId);
    expect(await requestSubmission.encryptedImageId()).to.equal(encryptedImageId);
  });

  describe('Purchase Request Submission', function () {
    it('should purchase a request submission', async function () {
      const priceInCents = await requestSubmission.price();

      const priceEth = convertUsdToEth(Number(priceInCents / 100n), ethToUsd);
      const priceInWei = ethers.parseEther(priceEth);

      const signer = await _getSigner(ACCOUNTS.THREE);

      const submissionContract = new ethers.Contract(
        await requestSubmission.getAddress(),
        RequestSubmissionSchema.abi,
        signer
      );

      try {
        console.log('calling getEthUsdPrice');
        const ethPrice = await submissionContract.getEthUsdPrice();
        console.log('ethPrice:', ethPrice);
        // Assuming `tx` contains the price in wei
        const ethPriceInUsd = ethers.formatUnits(ethPrice, 18); // Convert from wei to ether

        console.log('Latest ETH price in USD:', ethPriceInUsd);
      } catch (error) {
        console.error('Error during getLatestETHPrice:', error);
        throw error;
      }

      // try {
      //   console.log('DEBUG price', priceInCents, priceEth, priceInWei);
      //   const tx = await submissionContract.purchaseSubmission({ value: priceInWei });
      //   // const tx = await submissionContract.purchaseSubmission();
      //   console.log('DEBUG tx:', tx);
      //   const receipt: ContractTransactionReceipt = await tx.wait();
      //   console.log('DEBUG receipt:', receipt);

      //   if (receipt.status !== 1) {
      //     console.error('Transaction failed with status:', receipt.status);
      //     console.error('Transaction receipt:', receipt);
      //     throw new Error('Failed to purchase request submission');
      //   }

      //   const hasPurchased = await requestSubmission.hasPurchased(await signer.getAddress());
      //   expect(hasPurchased).to.be.true;
      // } catch (error) {
      //   console.error('Error during purchase submission:', error);
      //   throw error;
      // }
    });
  });

  // it('should create a new request comment', async function () {
  //   const requestAddress = await pictureRequest.getAddress();
  //   const text = 'This is a comment';

  //   // @ts-expect-error createRequestComment does not exist on FixMyPicFactory
  //   const tx = await fixMyPicFactory.connect(addr2).createRequestComment(requestAddress, text);
  //   const receipt: ContractTransactionReceipt = await tx.wait();

  //   if (receipt.status !== 1) {
  //     throw new Error('Failed to create request comment');
  //   }

  //   const event = receipt.logs.find(
  //     (log: EventLog | Log) =>
  //       log.address === fixMyPicFactoryAddress &&
  //       log.topics[0] === ethers.id('RequestCommentCreated(address,address,string,address,uint256)')
  //   );

  //   if (!event) {
  //     throw new Error('RequestCommentCreated event not found');
  //   }

  //   const decodedEvent = fixMyPicFactory.interface.parseLog(event);
  //   const commentAddress: string | null = decodedEvent?.args.comment;

  //   if (!commentAddress) throw new Error('RequestCommentCreated event not found');

  //   requestComment = await ethers.getContractAt('RequestComment', commentAddress);
  //   expect(await requestComment.text()).to.equal(text);
  //   expect(await requestComment.request()).to.equal(requestAddress);
  // });
});
