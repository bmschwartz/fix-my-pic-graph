import axios from 'axios';
import { useEffect, useState } from 'react';

const usePrices = () => {
  const [ethToUsd, setEthToUsd] = useState<number | null>(null);
  const [usdToEth, setUsdToEth] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const {
          data: { ethToUsdRate, usdToEthRate },
        } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prices`);
        setEthToUsd(ethToUsdRate);
        setUsdToEth(usdToEthRate);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPrices();
  }, []);

  return {
    ethToUsd,
    usdToEth,
  };
};

export default usePrices;
