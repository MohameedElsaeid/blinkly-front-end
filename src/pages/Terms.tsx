
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600">
            Please read these terms of service carefully before using Blinkly.
          </p>
          {/* Add terms content here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
