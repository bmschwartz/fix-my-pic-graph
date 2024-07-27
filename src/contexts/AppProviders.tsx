import React, { ReactNode, useEffect, useState } from 'react';

import FullScreenLoader from '@/components/FullScreenLoader';
import { FixMyPicContractService, getFixMyPicContractService } from '@/services/contractService';
import { EthUsdRateProvider } from './EthUsdRateProvider';
import { WalletProvider } from './WalletProvider';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [contractService, setContractService] = useState<FixMyPicContractService>();

  useEffect(() => {
    async function initContractService() {
      setContractService(await getFixMyPicContractService());
    }

    initContractService();
  }, []);

  if (!contractService) {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }

  return (
    <EthUsdRateProvider>
      <WalletProvider>{children}</WalletProvider>
    </EthUsdRateProvider>
  );
};

export default AppProviders;
