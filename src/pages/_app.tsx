import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Navbar } from '@/components';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
