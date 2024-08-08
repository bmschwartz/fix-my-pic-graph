export interface SubmissionPurchase {
  id: string;
  buyer: string;
  price: number;
  submissionAddress: string;
}

export type PartialSubmissionPurchase = Partial<SubmissionPurchase>;
