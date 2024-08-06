import axios from 'axios';
import { useEffect, useState } from 'react';

const usePrices = () => {
  const [ethPrice, setEthPrice] = useState<bigint>(0n);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const {
          data: { fetchedEthPrice },
        } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prices`);
        setEthPrice(fetchedEthPrice);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPrices();
  }, []);

  return {
    ethPrice,
  };
};

export default usePrices;
