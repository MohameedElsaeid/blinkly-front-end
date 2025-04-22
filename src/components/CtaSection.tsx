import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowRight, Sparkles} from "lucide-react";

const companies = [
    "Acme Inc", "TechCorp", "Startup Hub", "Marketing Pro", "Media Group", "Brand Solutions"
];

const CtaSection = () => {
    return (
        <section className="relative overflow-hidden py-20 bg-gradient-to-r from-blinkly-blue to-blinkly-violet">
            {/* Background sparkles */}
            <div className="absolute top-10 left-10 animate-sparkle opacity-30">
                <Sparkles size={24} className="text-white"/>
            </div>
            <div className="absolute bottom-10 right-10 animate-sparkle opacity-30" style={{animationDelay: '1s'}}>
                <Sparkles size={24} className="text-white"/>
            </div>
            <div className="absolute top-1/2 right-1/4 animate-sparkle opacity-30" style={{animationDelay: '0.5s'}}>
                <Sparkles size={24} className="text-white"/>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Make Every Link Count.
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands who already trust Blinkly for smart link sharing.
                    </p>

                    <Button size="lg" className="bg-white text-blinkly-blue hover:bg-gray-100">
                        Get Started – It's Free
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </div>

                {/* Ticker with logos */}
                <div className="mt-16 overflow-hidden">
                    <div className="inline-flex animate-[spin-slow_30s_linear_infinite]">
                        {companies.map((company, index) => (
                            <span
                                key={index}
                                className="mx-8 text-white/70 whitespace-nowrap"
                                style={{animationDelay: `${index * 0.5}s`}}
                            >
                {company}
              </span>
                        ))}
                        {companies.map((company, index) => (
                            <span
                                key={`repeat-${index}`}
                                className="mx-8 text-white/70 whitespace-nowrap"
                                style={{animationDelay: `${index * 0.5}s`}}
                            >
                {company}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
