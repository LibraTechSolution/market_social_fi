import Head from 'next/head';

const HeadApp = () => (
  <Head>
    <title>SocialFi - Web3 - GoDatingFi - Blockchain - A decentralized Global Platform for Dating.</title>
    <meta
      name="description"
      content="We are a team of SocialFi blockchain in ASIA, We bring experience dating with blockchain apps. GoDatingFi converges all the functions of blockchain such as Web3, NFT, SocialFi"
    />
    <meta name="keywords" content="SocialFi , Web3, GoDatingFi, Polygon, Dating App" />
    <meta name="author" content="Socialfi for dating app" />
    <meta name="copyright" content="Socialfi for dating app" />

    <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} key="ogurl" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="SocialFi - Web - Dating app using blockchain technology" key="ogtitle" />
    <meta
      property="og:description"
      content="SocialFi stands for Social Finance, it is a combination of social networking and finance on Blockchain. GoDatingFi also is a future of SocialFi"
    />
    <meta property="og:image" content={process.env.NEXT_PUBLIC_DOMAIN + '/logo.png'} key="ogimage" />
  </Head>
);

export default HeadApp;
