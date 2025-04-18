
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600">
            Blinkly is a cutting-edge link management platform designed to help businesses and individuals optimize their online presence.
          </p>
          {/* Add more about content here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
