// import Head from 'next/head';
// import { Inter } from 'next/font/google';
import Header from '../../components/Header';
import HorizontalScrollSection from '../../components/HorizontalScrollSection';
import SwitchCard from '../../components/SwitchCard';
import QuoteSection from '../../components/QuoteSection';
import VideoPlayer from '../../components/VideoPlayer';

export default function Home() {
  return (
    <>
      <Header />
      <SwitchCard />
      <QuoteSection>
        We love to visualize stories
        <br />
        because we love people and they inspire us.
      </QuoteSection>
      <VideoPlayer
        src="https://drive.google.com/uc?export=download&id=1E2nfoz76EN-u7BXR4ppK8kjcbhKW0sCK"
        entryRatio={0.3}
      />
      <QuoteSection>
        We are a creative agency, film production,
        <br />
        branded & original content creators.
      </QuoteSection>
      {/* <HorizontalScrollSection /> */}
    </>
  );
}
