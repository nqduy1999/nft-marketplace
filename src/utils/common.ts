export function pageReload() {
  window.location.reload();
}

export const minifyLengthAddress = (address: string): string => {
  return `${address.slice(3)}...${address.slice(-4)}`;
};
