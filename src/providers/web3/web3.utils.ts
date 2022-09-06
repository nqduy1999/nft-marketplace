import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { Contract, providers } from 'ethers';
import { ethers } from 'ethers';

import type { Web3Hooks } from '@/hooks/web3/setupHooks';
import { setupHooks } from '@/hooks/web3/setupHooks';
import type { Web3Dependencies } from '@/types/hook';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const CONTRACT = {
  NftMarket: 'NftMarket',
};

export type Web3State = {
  isLoading: boolean; // true while loading web3State
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>;

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({} as any),
  };
};

export const createWeb3State = ({
  ethereum,
  provider,
  contract,
  isLoading,
}: Web3Dependencies & { isLoading: boolean }) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ ethereum, provider, contract }),
  };
};

export const loadContract = async (
  name: string, // NftMarket
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject(new Error('Network ID is not defined!'));
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  if (Artifact.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi,
      provider
    );

    return contract;
  }
  return Promise.reject(new Error(`Contract: [${name}] cannot be loaded!`));
};
