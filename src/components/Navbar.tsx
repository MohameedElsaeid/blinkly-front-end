
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/lovable-uploads/340d3bab-1fcc-460c-9090-9ccd664c8efd.png" 
                alt="Blinkly Logo" 
                className="h-10 w-auto" 
              />
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#features" className="text-gray-800 hover:text-blinkly-blue px-3 py-2 text-sm font-medium transition-colors">Features</a>
              <a href="#use-cases" className="text-gray-800 hover:text-blinkly-blue px-3 py-2 text-sm font-medium transition-colors">Use Cases</a>
              <a href="#pricing" className="text-gray-800 hover:text-blinkly-blue px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-800 hover:text-blinkly-blue px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/blinklyapp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue transition-colors" title="Follow us on Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/blinklyapp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue transition-colors" title="Follow us on Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/blinklyapp/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue transition-colors" title="Follow us on LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://x.com/BlinklyApp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue transition-colors" title="Follow us on Twitter">
                <Twitter size={18} />
              </a>
            </div>
            <Button variant="ghost" className="text-gray-800 hover:text-blinkly-blue">Login</Button>
            <Button className="bg-blinkly-blue hover:bg-blinkly-violet text-white">Sign Up</Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-800 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 text-gray-800 hover:text-blinkly-blue font-medium">Features</a>
            <a href="#use-cases" className="block px-3 py-2 text-gray-800 hover:text-blinkly-blue font-medium">Use Cases</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-800 hover:text-blinkly-blue font-medium">Pricing</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-800 hover:text-blinkly-blue font-medium">Testimonials</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-5">
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/blinklyapp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/blinklyapp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/company/blinklyapp/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue">
                  <Linkedin size={18} />
                </a>
                <a href="https://x.com/BlinklyApp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blinkly-blue">
                  <Twitter size={18} />
                </a>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-800">Login</Button>
                <Button size="sm" className="bg-blinkly-blue hover:bg-blinkly-violet text-white">Sign Up</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
