import { Request } from '@/types/request';
import { useWallet } from './useWallet';

interface UploadCommentProps {
  text: string;
  request: Request;
}

const IMAGE_URL_ROOT = process.env.NEXT_PUBLIC_PINATA_GATEWAY || '';
if (!IMAGE_URL_ROOT) {
  process.exit('No image url root provided');
}

export const useCommentStore = () => {
  const { selectedAccount: account } = useWallet();

  const uploadComment = async ({ text, request }: UploadCommentProps): Promise<string> => {
    if (!request) {
      throw new Error('No request provided');
    }
    if (!text) {
      throw new Error('No text provided');
    }
    if (!account) {
      throw new Error('No account selected');
    }

    try {
      const jwtRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pinata/jwt`, {
        method: 'POST',
      });
      const JWT = await jwtRes.text();

      const formData = new FormData();
      formData.append('comment', text);
      formData.append('requestId', request.id);
      formData.append('commenter', account);

      const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      });

      const json = await res.json();

      // TODO: You would typically dispatch this IPFS hash to your backend or smart contract
      console.log('Comment added to IPFS with hash:', json.IpfsHash);
      return json.IpfsHash;
    } catch (e) {
      throw new Error(`Could not upload image file ${e}`);
    }
  };

  return { uploadComment };
};
