import { useNetwork } from '@/hooks/web3';

export const useNavbar = () => {
  const { network } = useNetwork();

  return { loadingNetwork: network.isLoading };
};
