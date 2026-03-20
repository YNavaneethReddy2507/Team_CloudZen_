import React from 'react';
import './HomePage.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

const HomePage = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Features />
      <Faq />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default HomePage;
