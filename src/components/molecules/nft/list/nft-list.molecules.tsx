import type { FunctionComponent } from 'react';

import type { NftMeta } from '@/types/nft';

import NftItem from '../item/nft-item.molecules';

type NftListProps = {
  nfts: NftMeta[];
};

const NftList: FunctionComponent<NftListProps> = ({ nfts }) => {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {nfts.map((nft) => (
        <div
          key={nft.image}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg"
        >
          <NftItem item={nft} />
        </div>
      ))}
    </div>
  );
};

export default NftList;
