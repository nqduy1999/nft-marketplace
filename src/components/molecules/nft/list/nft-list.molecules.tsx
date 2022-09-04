import type { FunctionComponent } from 'react';

import NftItem from '../item/nft-item.molecules';

const NftList: FunctionComponent = () => {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
        <NftItem />
      </div>
    </div>
  );
};

export default NftList;
