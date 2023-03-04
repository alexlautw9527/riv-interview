import Head from 'next/head';
// import { Inter } from 'next/font/google';
import Header from '../../components/Header';
import HorizontalScrollSection from '../../components/HorizontalScrollSection';
import SwitchCardSection from '../../components/SwitchCard';
import QuoteSection from '../../components/QuoteSection';
import VideoPlayerSection from '../../components/VideoPlayer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Film Maker</title>
      </Head>
      <Header />
      <SwitchCardSection />
      <QuoteSection>
        We love to visualize stories
        <br />
        because we love people and they inspire us.
      </QuoteSection>
      <VideoPlayerSection
        src="https://drive.google.com/uc?export=download&id=1E2nfoz76EN-u7BXR4ppK8kjcbhKW0sCK"
        entryRatio={0.3}
      />
      <QuoteSection>
        We are a creative agency, film production,
        <br />
        branded & original content creators.
      </QuoteSection>
      <HorizontalScrollSection />
    </>
  );
}
