/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import { useEffect } from 'react';
import useSWR from 'swr';

import type { CryptoHookFactory } from '@/types/hook';

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;
export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? 'web3/useAccount' : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];

        if (!account) {
          throw new Error(
            'Cannot retreive account! Please, connect to web3 wallet.'
          );
        }

        return account;
      },
      {
        revalidateOnFocus: false,
      }
    );
    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        console.error('Please, connect to Web3 wallet');
      } else if (accounts[0] !== data) {
        mutate(accounts[0]);
      }
    };

    useEffect(() => {
      ethereum?.on('accountsChanged', handleAccountsChanged);
      return () => {
        ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    });

    const connect = async () => {
      try {
        ethereum?.request({ method: 'eth_requestAccounts' });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      ...swr,
      data,
      mutate,
      isValidating,
      isLoading: isLoading || isValidating,
      isInstalled: ethereum?.isMetaMask || false,
      connect,
    };
  };
