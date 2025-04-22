import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ArrowRight, Link as LinkIcon, QrCode, BarChart4, Sparkles} from "lucide-react";
import {toast} from "sonner";
import {Link} from 'react-router-dom';

const HeroSection = () => {
    const [url, setUrl] = useState('');

    const handleShortenUrl = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) {
            toast.error("Please enter a URL");
            return;
        }
        toast.success("URL shortened successfully! This is a demo.");
        setUrl('');
    };

    return (
        <section className="relative min-h-screen pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50 to-white"></div>
            <div
                className="absolute -top-10 -right-10 w-72 h-72 bg-blinkly-mint/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div
                className="absolute bottom-10 -left-10 w-80 h-80 bg-blinkly-blue/10 rounded-full filter blur-3xl animate-pulse-slow"></div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 right-10 md:right-1/4 w-16 h-16 animate-float">
                <QrCode size={64} className="text-blinkly-violet opacity-40"/>
            </div>
            <div className="absolute bottom-1/4 left-10 md:left-1/3 w-12 h-12 animate-float"
                 style={{animationDelay: '1s'}}>
                <LinkIcon size={48} className="text-blinkly-blue opacity-40"/>
            </div>
            <div className="absolute top-1/3 left-20 w-10 h-10 animate-float" style={{animationDelay: '0.5s'}}>
                <BarChart4 size={40} className="text-blinkly-mint opacity-40"/>
            </div>
            <div className="absolute bottom-1/3 right-20 animate-sparkle">
                <Sparkles size={28} className="text-yellow-400"/>
            </div>

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
                    <div className="glass-card bg-white/40 p-6 max-w-2xl mx-auto mb-16">
                        <form onSubmit={handleShortenUrl} className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-grow">
                                <Input
                                    type="url"
                                    placeholder="Enter your long URL"
                                    className="h-12 px-4 w-full"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                            <Button type="submit"
                                    className="h-12 bg-blinkly-blue hover:bg-blinkly-violet text-white font-medium px-6">
                                Shorten Now
                            </Button>
                        </form>
                        <p className="text-gray-500 text-sm mt-3">
                            Free users can create up to 10 links. No credit card required.
                        </p>
                    </div>
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
