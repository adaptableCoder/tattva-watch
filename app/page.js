import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TattvaPicks from '@/components/TattvaPicks';
import FeaturesSection from '@/components/FeaturesSection';
import CinematicMoments from '@/components/CinematicMoments';
import BehindTheScenes from '@/components/BehindTheScenes';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>TattvaWatch | Home</title>
        <meta name="description" content="Your ultimate movie discovery platform. Find, curate, and explore the best films with personalized recommendations and watchlists." />
      </Head>
      <main className="bg-[#0B0B0F] text-white">
        <Navbar />
        <HeroBanner />
        <TattvaPicks />
        <FeaturesSection />
        <CinematicMoments />
        <BehindTheScenes />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
