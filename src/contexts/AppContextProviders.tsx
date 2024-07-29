import React, { ReactNode, useEffect, useState } from 'react';

import { FullScreenLoader } from '@/components';
import { FixMyPicContractService, getFixMyPicContractService } from '@/services/contractService';
import { EthUsdRateProvider } from './EthUsdRateContext';
import { WalletProvider } from './WalletContext';

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
