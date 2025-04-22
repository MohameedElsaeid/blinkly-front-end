import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';

const Pricing = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="pt-16">
                <PricingSection/>
            </main>
            <Footer/>
        </div>
    );
};

export default Pricing;
