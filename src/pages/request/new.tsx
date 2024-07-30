import React from 'react';

import { RequireWallet } from '@/components';
import NewRequestView from '@/views/Request/NewRequestView';

const NewRequestPage: React.FC = () => {
  return (
    <RequireWallet>
      <NewRequestView />
    </RequireWallet>
  );
};

export default NewRequestPage;
