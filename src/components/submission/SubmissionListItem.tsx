import { Typography } from '@mui/material';
import Image from 'next/image';

import { RequestSubmission } from '@/types/submission';
import { getImageUrl } from '@/utils/getImage';

interface SubmissionListItemProps {
  submission: RequestSubmission;
}

const SubmissionListItem: React.FC<SubmissionListItemProps> = ({ submission }) => {
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
      <Typography variant="body2">${submission.price}</Typography>
      <Typography variant="body2">{submission.description}</Typography>
      <Typography variant="body2">
        {submission.purchases.length} purchase{submission.purchases.length !== 1 && 's'}
      </Typography>
    </>
  );
};

export default SubmissionListItem;
