import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { Contract, providers } from 'ethers';
import type { SWRResponse } from 'swr';

export type Web3Dependencies = {
  provider: providers.Web3Provider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
};

export type CryptoHookFactory<D = any, P = any> = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, P>;
};

export type CryptoHandlerHook<D = any, P = any> = (
  params?: P
) => CryptoSWRResponse<D>;

export type CryptoSWRResponse<D = any> = SWRResponse<D>;
