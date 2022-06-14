import type { AppProps } from 'next/app';
import 'assets/styles/godatingfi.scss';
import { reload } from 'utils/functions';
import ErrorBoundary from 'components/error-boundary';
import { Slide, ToastContainer } from 'react-toastify';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Layout from 'layouts';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ErrorBoundary onReset={reload}>
      <ToastContainer hideProgressBar={true} position={'top-right'} transition={Slide} limit={1} />
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
}

export default MyApp;
