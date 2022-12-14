import type { NextPage } from 'next';

import { Meta, NftList } from '@/components/molecules';
import { useListedNfts } from '@/hooks/web3';
import BaseLayout from '@/layouts/layout.comp';
import type { Nft } from '@/types/nft';

const HomePage: NextPage = () => {
  const { nfts } = useListedNfts();
  return (
    <BaseLayout
      meta={
        <Meta title="NFT Marketplace - Home" description="Home page NFT " />
      }
    >
      <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Amazing Creatures NFTs
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <NftList nfts={nfts.data as Nft[]} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
