/* eslint-disable unused-imports/no-unused-vars */
import useSWR from 'swr';

import type { CryptoHookFactory } from '@/types/hook';

type AccountHookFactory = CryptoHookFactory<string>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider }) =>
  () => {
    const swrRes = useSWR(provider ? 'web3/useAccount' : null, () => {
      return 'Test User';
    });

    return swrRes;
  };
