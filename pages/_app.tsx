import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import Font Awesome CSS
import Layout from '../components/Layout';
import { SoundCloudPlayerProvider } from '../context/SoundCloudPlayerContext';

export default function App({ Component, pageProps }: AppProps){
  return (
    <SoundCloudPlayerProvider>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </SoundCloudPlayerProvider>
  );
}
