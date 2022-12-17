/* eslint-disable no-console */
import { useEffect } from 'react';
import useSWR from 'swr';

import type { CryptoHookFactory } from '@/types/hook';

const NETWORKS: { [k: string]: string } = {
  1: 'Ethereum Main Network',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  1337: 'Ganache',
};

type UseNetworkResponse = {
  isLoading: boolean;
  isSupported?: boolean;
  targetNetwork?: string;
};

type NetworkHookFactory = CryptoHookFactory<
  string | undefined,
  UseNetworkResponse
>;

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string;
const targetNetwork = NETWORKS[targetId];

export type UseNetworkHook = ReturnType<NetworkHookFactory>;

export const hookFactory: NetworkHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        const { chainId } = await provider!.getNetwork();
        console.log(chainId, 'chainId');
        if (!chainId) {
          throw new Error(
            'Cannot retreive network. Please, refresh browser or connect to other one.'
          );
        }

        return NETWORKS[chainId];
      },
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }
    );

    const handleNetworksChanged = (...args: unknown[]) => {
      const chainId = Number(args[0] as string[]);
      if (NETWORKS[chainId]) {
        mutate(NETWORKS[chainId]);
      } else {
        console.error('Not support for network Id');
      }
    };

    useEffect(() => {
      ethereum?.on('chainChanged', handleNetworksChanged);
      return () => {
        ethereum?.removeListener('chainChanged', handleNetworksChanged);
      };
    });

    return {
      ...swr,
      data,
      isValidating,
      mutate,
      isSupported: data === targetNetwork,
      targetNetwork,
      isLoading: isLoading || isValidating,
    };
  };
