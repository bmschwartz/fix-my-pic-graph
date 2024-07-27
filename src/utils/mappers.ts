import { RequestComment } from '@/types/comment';
import { PartialPictureRequest } from '@/types/pictureRequest';
import { SubmissionPurchase } from '@/types/purchase';
import { RequestSubmission } from '@/types/submission';
import { removeNullishValues } from './object';

import type {
  PictureRequest as GqlPictureRequest,
  RequestComment as GqlRequestComment,
  RequestSubmission as GqlRequestSubmission,
  SubmissionPurchase as GqlSubmissionPurchase,
} from '@/graphql/client';

const mapSubmissionPurchase = (
  purchase: GqlSubmissionPurchase,
  submissionAddress: string,
  price: string
): SubmissionPurchase => {
  return {
    id: purchase.id,
    buyer: purchase.purchaser,
    price,
    submissionAddress,
  };
};

const mapRequestComment = (comment: GqlRequestComment): RequestComment => {
  return {
    id: comment.id,
    text: comment.text,
    commenter: comment.commenter,
    createdAt: comment.createdAt,
  };
};

const mapRequestSubmission = (submission: GqlRequestSubmission): RequestSubmission => {
  return {
    id: submission.id,
    price: submission.price,
    submitter: submission.submitter,
    description: submission.description,
    freePictureId: submission.freeImageId,
    encryptedPictureId: submission.encryptedImageId,
    watermarkedPictureId: submission.watermarkedImageId,
    purchases: (submission.purchases ?? []).map((purchase: GqlSubmissionPurchase) =>
      mapSubmissionPurchase(purchase, submission.id, submission.price)
    ),
  };
};

export const mapPictureRequest = (pictureRequest: GqlPictureRequest, ethToUsdRate: number): PartialPictureRequest => {
  return removeNullishValues({
    id: pictureRequest.id,
    title: pictureRequest.title,
    budget: pictureRequest.budget,
    imageId: pictureRequest.imageId,
    description: pictureRequest.description,
    comments: (pictureRequest.comments ?? []).map(mapRequestComment),
    submissions: (pictureRequest.submissions ?? []).map(mapRequestSubmission),
  });
};
