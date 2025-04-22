import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    CtaSection,
    FeaturesSection,
    HeroSection,
    PricingSection,
    TestimonialsSection,
    UseCasesSection
} from '@/components/home';

const Index = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main>
                <HeroSection/>
                <FeaturesSection/>
                <UseCasesSection/>
                <TestimonialsSection/>
                <PricingSection/>
                <CtaSection/>
            </main>
            <Footer/>
        </div>
    );
};

export default Index;
