/* eslint-disable unused-imports/no-unused-vars */
import { ethers } from 'ethers';
import type { FunctionComponent } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { Web3State } from './web3.utils';
import { createDefaultState } from './web3.utils';

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<any> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    function initWeb3() {
      setWeb3Api({
        ethereum: window.ethereum,
        provider,
        contract: null,
        isLoading: false,
      });
    }

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
