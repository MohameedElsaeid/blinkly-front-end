import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Facebook, Instagram, Linkedin, Twitter} from "lucide-react";
import {toast} from "sonner";
import {Link} from "react-router-dom";

const Footer = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Thanks for subscribing! This is a demo.");
    };

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Product Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link to="/features"
                                      className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
                            <li><Link to="/pricing"
                                      className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help
                                Center</Link></li>
                            <li><Link to="/blog"
                                      className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About
                                Us</Link></li>
                            <li><Link to="/contact"
                                      className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of
                                Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy
                                Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
                        <p className="text-gray-300 mb-2">Email: support@blinkly.app</p>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="https://www.facebook.com/blinklyaapp/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                                aria-label="Follow us on Facebook"
                            >
                                <Facebook size={20}/>
                            </a>
                            <a
                                href="https://www.instagram.com/blinklyapp/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                                aria-label="Follow us on Instagram"
                            >
                                <Instagram size={20}/>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/blinklyapp/about"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                                aria-label="Follow us on LinkedIn"
                            >
                                <Linkedin size={20}/>
                            </a>
                            <a
                                href="https://x.com/BlinklyApp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                                aria-label="Follow us on Twitter"
                            >
                                <Twitter size={20}/>
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                        <p className="text-gray-300 mb-4">Stay up to date with the latest features and updates.</p>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                required
                            />
                            <Button type="submit" className="bg-blinkly-blue hover:bg-blinkly-violet text-white">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div
                    className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <img
                            src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png"
                            alt="Blinkly Logo"
                            className="h-8"
                        />
                    </div>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Blinkly. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
