import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Card, CardContent} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Shield} from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Shield className="w-8 h-8 text-blinkly-blue"/>
                        <h1 className="text-4xl font-bold">Privacy Policy</h1>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <p className="text-gray-600 mb-4">
                                Effective Date: April 18, 2025
                            </p>
                            <p className="text-lg text-gray-600 mb-8">
                                At Blinkly, your privacy is our priority. This Privacy Policy explains how we collect,
                                use, and protect your information.
                            </p>
                        </CardContent>
                    </Card>

                    <ScrollArea className="h-[600px] rounded-lg">
                        <div className="space-y-8 pr-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                                    <div className="space-y-4 text-gray-600">
                                        <p>Account Data: Name, email, and login credentials</p>
                                        <p>Usage Data: IP address, device/browser info, geolocation, and click
                                            analytics</p>
                                        <p>Link Data: URLs created and associated metadata</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        <li>To deliver core features (link tracking, analytics, QR code generation)</li>
                                        <li>To improve platform functionality and user experience</li>
                                        <li>To ensure security and prevent misuse</li>
                                        <li>To send important service updates and communications</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
                                    <p className="text-gray-600">
                                        We implement military-grade encryption, anti-spam filtering, and robust
                                        monitoring to protect your data. All data handling complies with GDPR and
                                        applicable privacy standards.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">4. Data Sharing</h2>
                                    <p className="text-gray-600">
                                        We do not sell or rent your personal data. We may share data with third-party
                                        processors only as necessary to provide Blinkly services.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
                                    <p className="text-gray-600">
                                        You may request access, correction, or deletion of your personal data at any
                                        time by contacting{" "}
                                        <a
                                            href="mailto:privacy@blinkly.app"
                                            className="text-blinkly-blue hover:underline"
                                        >
                                            privacy@blinkly.app
                                        </a>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Privacy;

