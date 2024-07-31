import { GetServerSideProps } from 'next';
import React from 'react';

import { getBuiltGraphSDK } from '@/graphql/client';
import { Request } from '@/types/request';
import { getLogger } from '@/utils/logging';
import RequestDetailView from '@/views/request/RequestDetailView';

interface RequestDetailsPageProps {
  request: Request | null;
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

const sdk = getBuiltGraphSDK();
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params as { id: string };

    const result = await sdk.GetPictureRequest({ id });

    if (!result.pictureRequest) {
      return {
        props: {
          request: null,
          error: 'Request not found',
        },
      };
    }

    return {
      props: {
        request: result.pictureRequest,
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
};

export default RequestDetailsPage;
