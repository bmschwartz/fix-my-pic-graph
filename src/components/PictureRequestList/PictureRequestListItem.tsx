import { PictureRequest } from '@/types/pictureRequest';

interface PictureRequestListCardProps {
  pictureRequest: PictureRequest;
}

const PictureRequestListCard = ({ pictureRequest }: PictureRequestListCardProps) => {
  return (
    <div>
      <h3>{pictureRequest.title}</h3>
      <p>{pictureRequest.description}</p>
      <p>Budget: {pictureRequest.budget}</p>
      <img src={pictureRequest.imageId} alt={pictureRequest.title} />
    </div>
  );
};

export default PictureRequestListCard;
