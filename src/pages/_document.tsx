import { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

export default function MyDocument() {
  return (
    <Html>
      <Head lang={AppConfig.locale} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
