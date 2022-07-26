import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Main, Head, NextScript, DocumentInitialProps } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet: ServerStyleSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const enhanceApp = (App: any) => (props: any) => sheet.collectStyles(<App {...props} />);

    try {
      ctx.renderPage = () => originalRenderPage({ enhanceApp });

      const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (initialProps.styles, sheet.getStyleElement()),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon-32x32.ico" />
          <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon-16x16.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#202763" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap" rel="stylesheet" />
          <noscript>
            <link href="/styles/aos-noscript.css" rel="stylesheet" />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
