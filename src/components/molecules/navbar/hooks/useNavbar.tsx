import { useEffect, useRef } from 'react';

import { useNetwork } from '@/hooks/web3';

type UseNavbarProps = {
  isInstaller: boolean;
};

export const useNavbar = ({ isInstaller }: UseNavbarProps) => {
  const networkName = useRef<string>('Install Web3 Wallet');
  const { network } = useNetwork();

  const onGetNetWorkName = (): void => {
    if (!network) networkName.current = 'Install Web3 Wallet';
    if (network.isLoading) networkName.current = 'Loading';
    if (isInstaller && network.data) networkName.current = network.data;
  };

  useEffect(() => {
    onGetNetWorkName();
  }, [network]);

  return {
    loadingNetwork: network.isLoading,
    networkName: networkName.current,
  };
};
