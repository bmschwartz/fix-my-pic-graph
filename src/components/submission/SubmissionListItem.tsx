import Image from 'next/image';

import { RequestSubmission } from '@/types/submission';
import { getImageUrl } from '@/utils/getImage';
import FMPTypography from '../common/FMPTypography';

interface SubmissionListItemProps {
  submission: RequestSubmission;
}

const SubmissionListItem: React.FC<SubmissionListItemProps> = ({ submission }) => {
  const isFree = submission.price === 0;
  console.log('isFree', isFree, typeof submission.price);

  return (
    <>
      <Image
        src={getImageUrl(submission.watermarkedPictureId || submission.freePictureId!)}
        alt="Submission"
        layout="responsive"
        width={150}
        height={150}
        objectFit="cover"
      />
      <FMPTypography variant="h6" sx={{ fontWeight: 600 }}>
        {submission.description}
      </FMPTypography>
      <FMPTypography variant="body1">{!isFree ? `$${submission.price}` : 'Free'}</FMPTypography>
      {!isFree && (
        <FMPTypography variant="body1">
          {submission.purchases.length} purchase{submission.purchases.length !== 1 && 's'}
        </FMPTypography>
      )}
    </>
  );
};

export default SubmissionListItem;
