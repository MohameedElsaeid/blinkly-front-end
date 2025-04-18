
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600">
            Get in touch with our team. We're here to help!
          </p>
          {/* Add contact form or contact information here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
