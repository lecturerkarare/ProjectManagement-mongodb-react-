import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import { Footer } from './Footer';

export const Landing: React.FC = () => {
  return (
    <div>
      <Navbar />

      <Hero />
      <Footer />
    </div>
  );
};
