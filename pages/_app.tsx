import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Luke Okagha | AI Systems Engineer</title>
        <meta name="description" content="Luke Okagha builds AI systems, backend infrastructure and agentic automation that connect LLMs to real-world products and workflows." />
        <meta name="keywords" content="AI Systems Engineer, AI Engineer, Backend Engineer, Agentic AI, LLM, MCP, Python, TypeScript, Node.js, Cloud, Software Architecture" />
        <meta property="og:title" content="Luke Okagha | AI Systems Engineer" />
        <meta property="og:description" content="AI systems, backend engineering and agentic automation." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/avatar.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
