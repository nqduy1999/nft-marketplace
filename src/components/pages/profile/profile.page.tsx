/* eslint-disable no-constant-condition */
/* eslint-disable tailwindcss/no-custom-classname */
import { BaseLayout, Meta } from '@/components/templates';
import type { NftMeta } from '@/types/nft';
import { classNames } from '@/utils';

import nfts from '../../../../contents/meta.json';

const tabs = [{ name: 'Your Collection', href: '#', current: true }];
const ProfilePage = () => {
  return (
    <BaseLayout
      meta={
        <Meta
          title="NFT Marketplace - Create NFT"
          description="Page Create NFT"
        />
      }
    >
      <div className="flex h-full">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">
                    Your NFTs
                  </h1>
                </div>
                <div className="mt-3 sm:mt-2">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-200">
                      <nav
                        className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
                        aria-label="Tabs"
                      >
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                <section
                  className="mt-8 pb-16"
                  aria-labelledby="gallery-heading"
                >
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {(nfts as NftMeta[]).map((nft) => (
                      <li
                        key={nft.name}
                        onClick={() => {}}
                        className="relative"
                      >
                        <div
                          className={classNames(
                            true
                              ? 'ring-2 ring-offset-2 ring-indigo-500'
                              : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                          )}
                        >
                          <img
                            src={nft.image}
                            alt=""
                            className={classNames(
                              true ? '' : 'group-hover:opacity-75',
                              'object-cover pointer-events-none'
                            )}
                          />
                          <button
                            type="button"
                            className="absolute inset-0 focus:outline-none"
                          >
                            <span className="sr-only">
                              View details for {nft.name}
                            </span>
                          </button>
                        </div>
                        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                          {nft.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
              {true && (
                <div className="space-y-6 pb-16">
                  <div>
                    <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
                      <img
                        src={nfts[0] && nfts[0].image}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">
                          <span className="sr-only">Details for </span>
                          {nfts[0] && nfts[0].name}
                        </h2>
                        <p className="text-sm font-medium text-gray-500">
                          {nfts[0] && nfts[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Information</h3>
                    <dl className="mt-2 divide-y divide-gray-200 border-y border-gray-200">
                      {nfts[0] &&
                        nfts[0].attributes.map((attr) => (
                          <div
                            key={attr.trait_type}
                            className="flex justify-between py-3 text-sm font-medium"
                          >
                            <dt className="text-gray-500">
                              {attr.trait_type}:{' '}
                            </dt>
                            <dd className="text-right text-gray-900">
                              {attr.value}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Download Image
                    </button>
                    <button
                      onClick={() => {}}
                      type="button"
                      className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Transfer?
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProfilePage;
