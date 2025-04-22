
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const HelpCenter = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="container mx-auto px-4 pt-24 pb-16 flex-1">
                <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>
                <div className="grid gap-8 max-w-3xl mx-auto">
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-4 text-center">
                                Contact Support
                            </h2>
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <Mail className="w-6 h-6 text-blinkly-blue" />
                                <a
                                    href="mailto:support@blinkly.app"
                                    className="text-lg hover:text-blinkly-blue transition-colors"
                                >
                                    support@blinkly.app
                                </a>
                            </div>
                            <p className="text-center text-muted-foreground">
                                Reach out to us anytime via email for assistance.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-4 text-center">
                                Follow Us
                            </h2>
                            <div className="flex justify-center space-x-6 mb-4">
                                <a
                                    href="https://www.facebook.com/blinklyapp/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blinkly-blue transition-colors"
                                    aria-label="Follow us on Facebook"
                                >
                                    <Facebook className="w-8 h-8" />
                                </a>
                                <a
                                    href="https://www.instagram.com/blinklyapp/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blinkly-blue transition-colors"
                                    aria-label="Follow us on Instagram"
                                >
                                    <Instagram className="w-8 h-8" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/blinklyapp/about"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blinkly-blue transition-colors"
                                    aria-label="Follow us on LinkedIn"
                                >
                                    <Linkedin className="w-8 h-8" />
                                </a>
                                <a
                                    href="https://x.com/BlinklyApp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blinkly-blue transition-colors"
                                    aria-label="Follow us on Twitter"
                                >
                                    <Twitter className="w-8 h-8" />
                                </a>
                            </div>
                            <p className="text-center text-muted-foreground">
                                Stay connected for updates, tips, and news!
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-4 text-center">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-center text-muted-foreground mb-2">
                                Explore our FAQ and guides below, or <a href="mailto:support@blinkly.app" className="text-blinkly-blue underline">email us</a> with your question.
                            </p>
                            {/* Add actual help content, guides, or FAQs here as needed */}
                            <ul className="list-disc list-inside text-gray-600 mx-auto max-w-xl mt-4">
                                <li>How to create and manage short links.</li>
                                <li>Understanding analytics and statistics.</li>
                                <li>Upgrading or managing your subscription.</li>
                                <li>Troubleshooting common issues.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default HelpCenter;
