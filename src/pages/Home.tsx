import Hero from '../components/Hero';
import About from '../components/About';
import Academics from '../components/Academics';
import Facilities from '../components/Facilities';
import Achievements from '../components/Achievements';
import Admissions from '../components/Admissions';
import Contact from '../components/Contact';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Academics />
      <Facilities />
      <Achievements />
      <Admissions />
      <Contact />
      <ScrollToTop />
    </>
  );
}

