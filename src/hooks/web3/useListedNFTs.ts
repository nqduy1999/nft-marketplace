import useSWR from 'swr';

import type { CryptoHookFactory } from '@/types/hook';

type UseListedNftsResponse = {};
type ListedNftsHookFactory = CryptoHookFactory<any, UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useListedNFTs' : null,
      async () => {
        const nfts = [] as any;
        return nfts;
      }
    );
    return {
      ...swr,
      data: data || [],
    };
  };
