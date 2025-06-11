import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>User Registration Platform</title>
        <meta name="description" content="An epic new dimension is about to unfold. Pre-register now!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Link to Google Fonts is now handled by globals.css with @import */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;