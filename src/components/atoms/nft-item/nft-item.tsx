import type { FunctionComponent } from 'react';

import { images } from '@/config/images';
import type { Nft } from '@/types/nft';

import ProgressiveImage from '../progress-image/progress-image';

type NftItemProps = {
  item: Nft;
};

const NftItem: FunctionComponent<NftItemProps> = ({ item }) => {
  return (
    <>
      <div className="shrink-0">
        <ProgressiveImage
          className={`h-full w-full object-cover`}
          src={item.meta.image}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">Creatures NFT</p>
          <div className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">
              {item.meta.name}
            </p>
            <p className="my-3 text-base text-gray-500">
              {item.meta.description}
            </p>
          </div>
        </div>
        <div className="mb-4 overflow-hidden">
          <dl className="-mx-4 -mt-4 flex flex-wrap">
            <div className="flex flex-col px-4 pt-4">
              <dt className="order-2 text-sm font-medium text-gray-500">
                Price
              </dt>
              <dd className="order-1 text-xl font-extrabold text-indigo-600">
                <div className="flex items-center justify-center">
                  100
                  <img className="h-6" src={images.smallEth} alt="ether icon" />
                </div>
              </dd>
            </div>
            {item.meta.attributes.map((attribute) => (
              <div
                key={attribute.trait_type}
                className="flex flex-col px-4 pt-4"
              >
                <dt className="order-2 text-sm font-medium text-gray-500">
                  {attribute.trait_type}
                </dt>
                <dd className="order-1 text-xl font-extrabold text-indigo-600">
                  {attribute.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <button
            type="button"
            className="mr-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          >
            Buy
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          >
            Preview
          </button>
        </div>
      </div>
    </>
  );
};

export default NftItem;
