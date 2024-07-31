import { PictureRequest } from '@/types/pictureRequest';

interface RequestDetailViewProps {
  request: PictureRequest;
}

const RequestDetailView: React.FC<RequestDetailViewProps> = ({ request }) => {
  return (
    <div>
      <h1>{request.title}</h1>
    </div>
  );
};

export default RequestDetailView;
