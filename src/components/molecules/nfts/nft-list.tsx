import type { FunctionComponent } from 'react';

import { NftItem } from '@/components/atoms';
import type { Nft } from '@/types/nft';

type NftListProps = {
  nfts: Nft[];
};

const NftList: FunctionComponent<NftListProps> = ({ nfts }) => {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {nfts.map((nft) => (
        <div
          key={nft.meta.image}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg"
        >
          <NftItem item={nft} />
        </div>
      ))}
    </div>
  );
};

export default NftList;
