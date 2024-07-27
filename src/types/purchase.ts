export interface SubmissionPurchase {
  id: string;
  buyer: string;
  price: string;
  submissionAddress: string;
}

export type PartialSubmissionPurchase = Partial<SubmissionPurchase>;
