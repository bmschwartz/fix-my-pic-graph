import React from 'react';

import { execute, GetPictureRequestDocument } from '@/graphql/client';
import { PictureRequest } from '@/types/pictureRequest';
import { getLogger } from '@/utils/logging';
import RequestDetailView from '@/views/request/RequestDetailView';

interface RequestDetailsPageProps {
  request: PictureRequest | null;
  error?: string;
}

const logger = getLogger('RequestDetailsPage');

const RequestDetailsPage: React.FC<RequestDetailsPageProps> = ({ request, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!request) {
    return <div>Loading...</div>;
  }

  return <RequestDetailView request={request} />;
};

export async function getServerSideProps(context: any) {
  try {
    const { id } = context.params;

    const result = await execute(GetPictureRequestDocument, { id });

    if (!result?.data?.request) {
      logger.error('Request not found', Object.keys(result?.data));
      return {
        props: {
          request: null,
          error: 'Request not found',
        },
      };
    }

    return {
      props: {
        request: result.data.request,
      },
    };
  } catch (error) {
    logger.error('Failed to fetch picture request:', error);
    return {
      props: {
        request: null,
        error: 'Failed to fetch picture request',
      },
    };
  }
}

export default RequestDetailsPage;
