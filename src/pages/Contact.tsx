import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Facebook, Instagram, Linkedin, Mail, Twitter} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';

const Contact = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
                <div className="max-w-3xl mx-auto">
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-center mb-6 space-x-2">
                                <Mail className="w-6 h-6 text-blinkly-blue"/>
                                <a href="mailto:support@blinkly.app"
                                   className="text-lg hover:text-blinkly-blue transition-colors">
                                    support@blinkly.app
                                </a>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-xl font-semibold text-center mb-6">Follow Us</h2>
                                <div className="flex justify-center space-x-6">
                                    <a
                                        href="https://www.facebook.com/blinklyapp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blinkly-blue transition-colors"
                                        aria-label="Follow us on Facebook"
                                    >
                                        <Facebook className="w-8 h-8"/>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/blinklyapp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blinkly-blue transition-colors"
                                        aria-label="Follow us on Instagram"
                                    >
                                        <Instagram className="w-8 h-8"/>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/blinklyapp/about"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blinkly-blue transition-colors"
                                        aria-label="Follow us on LinkedIn"
                                    >
                                        <Linkedin className="w-8 h-8"/>
                                    </a>
                                    <a
                                        href="https://x.com/BlinklyApp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blinkly-blue transition-colors"
                                        aria-label="Follow us on Twitter"
                                    >
                                        <Twitter className="w-8 h-8"/>
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Contact;
