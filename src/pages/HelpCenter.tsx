import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HelpCenter = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-4xl font-bold mb-8">Help Center</h1>
                <div className="prose max-w-none">
                    <p className="text-lg text-gray-600">
                        Welcome to our Help Center. Here you'll find guides, tutorials, and answers to frequently asked
                        questions.
                    </p>
                    {/* Add more help content here */}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default HelpCenter;
