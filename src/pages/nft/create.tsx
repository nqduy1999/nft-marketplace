/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable no-constant-condition */
/* eslint-disable @next/next/no-img-element */
import { Switch } from '@headlessui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { Meta } from '@/components/molecules';
import BaseLayout from '@/layouts/layout.comp';

const ATTRIBUTES = ['health', 'attack', 'speed'];

const CreateNFTPage: NextPage = () => {
  const [nftURI, setNftURI] = useState('');
  const [hasURI, setHasURI] = useState(false);

  return (
    <BaseLayout
      meta={
        <Meta
          title="NFT Marketplace - Create NFT"
          description="Page Create NFT"
        />
      }
    >
      <div>
        <div className="py-4">
          {!nftURI && (
            <div className="flex">
              <div className="mr-2 font-bold underline">
                Do you have meta data already?
              </div>
              <Switch
                checked={hasURI}
                onChange={() => setHasURI(!hasURI)}
                className={`${hasURI ? 'bg-indigo-900' : 'bg-indigo-700'}
                  relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${hasURI ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          )}
        </div>
        {nftURI || hasURI ? (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  List NFT
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  {hasURI && (
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div>
                        <label
                          htmlFor="uri"
                          className="block text-sm font-medium text-gray-700"
                        >
                          URI Link
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            onChange={(e) => setNftURI(e.target.value)}
                            type="text"
                            name="uri"
                            id="uri"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="http://link.com/data.json"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {nftURI && (
                    <div className="mb-4 p-4">
                      <div className="font-bold">Your metadata: </div>
                      <div>
                        <Link href={nftURI}>
                          <a className="text-indigo-600 underline">{nftURI}</a>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price (ETH)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0.8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      List
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Create NFT Metadata
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="My Nice NFT"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Some nft description..."
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of NFT
                      </p>
                    </div>
                    {false ? (
                      <img
                        src="https://eincode.mypinata.cloud/ipfs/QmaQYCrX9Fg2kGijqapTYgpMXV7QPPzMwGrSRfV9TvTsfM/Creature_1.png"
                        alt=""
                        className="h-40"
                      />
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cover photo
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      {ATTRIBUTES.map((attribute) => (
                        <div
                          key={attribute}
                          className="col-span-6 sm:col-span-6 lg:col-span-2"
                        >
                          <label
                            htmlFor={attribute}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {attribute}
                          </label>
                          <input
                            type="text"
                            name={attribute}
                            id={attribute}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="!mt-2 text-sm text-gray-500">
                      Choose value from 0 to 100
                    </p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default CreateNFTPage;
