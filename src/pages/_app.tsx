import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import GlobalSetting from '../config/GlobalSetting';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(
    <>
      <GlobalSetting />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>,
  );
}