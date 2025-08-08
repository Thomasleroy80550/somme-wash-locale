
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Comparison from '../components/Comparison';
import Offers from '../components/Offers';
import DeliveryZones from '../components/DeliveryZones';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import StickyContactBar from '../components/StickyContactBar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Comparison />
      <Process />
      <Testimonials />
      <Offers />
      <DeliveryZones />
      <FAQ />
      <About />
      <Contact />
      <StickyContactBar />
      <Footer />
    </div>
  );
};

export default Index;
