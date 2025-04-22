import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';

const Features = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="pt-16">
                <FeaturesSection/>
            </main>
            <Footer/>
        </div>
    );
};

export default Features;
