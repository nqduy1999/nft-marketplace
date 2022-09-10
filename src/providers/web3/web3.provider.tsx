/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import { ethers } from 'ethers';
import type { FunctionComponent } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { NftMarketContract } from '@/types/nftMarketContract';

import type { Web3State } from './web3.utils';
import {
  createDefaultState,
  createWeb3State,
  loadContract,
} from './web3.utils';

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<any> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  async function initWeb3() {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = await loadContract('NftMarket', provider);

      setWeb3Api(
        createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract: contract as unknown as NftMarketContract,
          isLoading: false,
        })
      );
    } catch (e: any) {
      console.error('Please, install web3 wallet');
      setWeb3Api((api) =>
        createWeb3State({
          ...(api as any),
          isLoading: false,
        })
      );
    }
  }

  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useHooks() {
  const { hooks } = useContext(Web3Context);
  return hooks;
}

export default Web3Provider;
