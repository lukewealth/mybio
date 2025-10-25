import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import Font Awesome CSS
import Layout from '../components/Layout';
import { SoundCloudPlayerProvider } from '../context/SoundCloudPlayerContext';

export default function App({ Component, pageProps }: AppProps){
  return (
    <SoundCloudPlayerProvider>
      <Head>
        <title>Luke Wealth</title>
        <meta name="description" content="Luke Wealth's Immersive Biography" />
        <link rel="icon" href="/avatar.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </SoundCloudPlayerProvider>
  );
}
