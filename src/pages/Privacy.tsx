
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600">
            Your privacy is important to us. This policy outlines how we collect and use your data.
          </p>
          {/* Add privacy policy content here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
