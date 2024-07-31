import React from 'react';

import { execute } from '@/graphql/client';
import { PictureRequest } from '@/types/pictureRequest';
import RequestDetailView from '@/views/request/RequestDetailView';

interface RequestDetailsPageProps {
  request: PictureRequest;
}

const RequestDetailsPage: React.FC<RequestDetailsPageProps> = ({ request }) => {
  return <RequestDetailView request={request} />;
};

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const request = await execute(GetPictureRequestDocument, { id });
}

export default RequestDetailsPage;
