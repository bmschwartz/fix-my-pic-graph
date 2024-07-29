import { useContext } from 'react';

import { EthUsdRateContext, EthUsdRateContextType } from '@/contexts/EthUsdRateContext';

export const useEthUsdRate = (): EthUsdRateContextType => {
  const context = useContext(EthUsdRateContext);
  if (!context) {
    throw new Error('useEthUsdRate must be used within an EthUsdRateProvider');
  }
  return context;
};
