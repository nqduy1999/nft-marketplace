/* eslint-disable no-debugger */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { ethers } from 'ethers';
import useSWR from 'swr';

import type { CryptoHookFactory } from '@/types/hook';
import type { Nft } from '@/types/nft';

type UseListedNftsResponse = {};
type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useListedNfts' : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getAllNftsOnSale();
        for (let i = 0; i < coreNfts.length; i++) {
          const item: any = coreNfts[i];
          const tokenURI = await contract!.tokenURI(item.tokenId);
          const metaRes = await fetch(tokenURI);
          const meta = await metaRes.json();
          nfts.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            meta,
          });
        }
        return nfts;
      }
    );
    return {
      ...swr,
      data: data || [],
    };
  };
