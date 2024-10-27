import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { NearContext } from '../context';
import { Navigation } from '../components/Navigation';

import { Wallet } from '../wallets/near';
import { NetworkId } from '../config';

const wallet = new Wallet({ networkId: NetworkId });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  
  useEffect(() => {
    wallet.startUp(setSignedAccountId).then(() => {
      setIsLoading(false);
    });
  }, []);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Navigation />
      <Component {...pageProps} />
    </NearContext.Provider>
  );
}
