import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ArrowRight, Link as LinkIcon, QrCode, BarChart4, Sparkles} from "lucide-react";
import {toast} from "sonner";
import {Link} from 'react-router-dom';
import {HeroBackground} from './hero/HeroBackground';
import {FloatingElements} from './hero/FloatingElements';
import {UrlShortener} from './hero/UrlShortener';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen pt-20 overflow-hidden">
            {/* Background Elements */}
            <HeroBackground/>

            {/* Floating Elements */}
            <FloatingElements/>

            {/* Main Content */}
            <div
                className="container relative z-10 mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blinkly-blue via-blinkly-violet to-blinkly-mint bg-clip-text text-transparent">
                        Shorten. Track. Convert. Blink-Quick.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                        Powerful smart links, QR codes & link-in-bio pages — all in one intuitive dashboard.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button
                            size="lg"
                            className="btn-primary"
                            asChild
                        >
                            <Link to="/signup">
                                Start for Free
                                <ArrowRight className="ml-2 h-5 w-5"/>
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="btn-secondary">
                            Explore Features
                        </Button>
                    </div>

                    {/* URL Shortener Input */}
                    <UrlShortener/>
                </div>

                {/* Dashboard Image */}
                <div className="relative max-w-5xl mx-auto w-full animate-fade-in">
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent blur-2xl"></div>
                    <img
                        src="/lovable-uploads/737e5a7a-ea9e-42fe-88fe-1802554c6e86.jpeg"
                        alt="Blinkly Dashboard"
                        className="relative z-10 w-full h-[30%] rounded-lg shadow-2xl border border-white/20"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
