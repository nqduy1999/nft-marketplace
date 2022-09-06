import type { Web3Dependencies } from '@/types/hook';

import type { UseAccountHook } from './useAccount';
import { hookFactory as createAccountHook } from './useAccount';

export type Web3Hooks = {
  useAccount: UseAccountHook;
};

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks;
};

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
  };
};
