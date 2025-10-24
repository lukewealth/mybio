import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import ScrollTriggerProvider from '../components/ScrollTriggerProvider'; // Import the ScrollTriggerProvider

export default function App({ Component, pageProps }: AppProps){
  return (
    <ScrollTriggerProvider> {/* Wrap the Layout with ScrollTriggerProvider */}
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </ScrollTriggerProvider>
  );
}
