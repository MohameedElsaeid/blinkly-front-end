
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link, ChartBar, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blinkly-blue to-blinkly-violet bg-clip-text text-transparent">
            Revolutionizing Digital Connectivity and Link Management
          </h1>
          
          <Card className="mb-12">
            <CardContent className="pt-6">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                In an era where every click counts, Blinkly is redefining how individuals and businesses connect, share, and grow online. More than just a link shortener, Blinkly is a powerful digital strategy platform designed to turn every link into a smart, trackable, and brand-enhancing asset.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="feature-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <ChartBar className="w-12 h-12 text-blinkly-blue mb-4" />
                  <h3 className="font-semibold mb-2">Intelligent Analytics</h3>
                  <p className="text-gray-600">Real-time insights and analytics to understand your audience better</p>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-12 h-12 text-blinkly-blue mb-4" />
                  <h3 className="font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-gray-600">Enterprise-grade security for your peace of mind</p>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Link className="w-12 h-12 text-blinkly-blue mb-4" />
                  <h3 className="font-semibold mb-2">Smart Management</h3>
                  <p className="text-gray-600">Transform every link into a powerful digital asset</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-6">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                With intelligent link management, real-time analytics, and enterprise-grade security, Blinkly helps you understand your audience, optimize marketing efforts, and amplify your brand's presence across all channels.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                From custom domain support and dynamic QR codes to advanced UTM tracking and team collaboration tools, Blinkly equips digital professionals with everything they need to master modern connectivity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're a startup founder, digital marketer, or enterprise leader — Blinkly empowers you to transform digital connections into measurable success.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
