import { RequestComment } from '@/types/comment';
import { SubmissionPurchase } from '@/types/purchase';
import { PartialRequest } from '@/types/request';
import { RequestSubmission } from '@/types/submission';
import { removeNullishValues } from './object';

import type {
  PictureRequest as GqlRequest,
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

export const mapPictureRequest = (request: GqlRequest): PartialRequest => {
  return removeNullishValues({
    id: request.id,
    title: request.title,
    budget: request.budget,
    creator: request.creator,
    imageId: request.imageId,
    createdAt: request.createdAt,
    expiresAt: request.expiresAt,
    description: request.description,
    comments: (request.comments ?? []).map(mapRequestComment),
    submissions: (request.submissions ?? []).map(mapRequestSubmission),
  });
};
