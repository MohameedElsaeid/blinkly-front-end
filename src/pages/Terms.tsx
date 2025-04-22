import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Card, CardContent} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {FileText} from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <FileText className="w-8 h-8 text-blinkly-blue"/>
                        <h1 className="text-4xl font-bold">Terms of Service</h1>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <p className="text-gray-600 mb-4">
                                Effective Date: April 18, 2025
                            </p>
                            <p className="text-lg text-gray-600 mb-8">
                                Welcome to Blinkly. By accessing or using our services, you agree to be bound by these
                                Terms of Service ("Terms"). Please read them carefully.
                            </p>
                        </CardContent>
                    </Card>

                    <ScrollArea className="h-[600px] rounded-lg">
                        <div className="space-y-8 pr-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">1. Use of Services</h2>
                                    <p className="text-gray-600">
                                        You agree to use Blinkly for lawful purposes only. You may not use our platform
                                        to create or distribute links associated with harmful, misleading, or malicious
                                        content.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">2. Account Responsibility</h2>
                                    <p className="text-gray-600">
                                        You are responsible for maintaining the confidentiality of your login
                                        credentials and for all activities under your account.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">3. Data and Analytics</h2>
                                    <p className="text-gray-600">
                                        Blinkly provides tracking and analytics data as part of its services. You agree
                                        not to misuse or misrepresent this data.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
                                    <p className="text-gray-600">
                                        All platform content, features, and technologies are owned by Blinkly and are
                                        protected under intellectual property laws. You may not copy, modify, or
                                        distribute any part of our platform without explicit permission.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
                                    <p className="text-gray-600">
                                        We reserve the right to suspend or terminate access if any Terms are violated or
                                        if your actions pose security or legal risks.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <h2 className="text-xl font-semibold mb-4">6. Modifications</h2>
                                    <p className="text-gray-600">
                                        We may update these Terms at any time. Continued use of the service after
                                        changes constitutes your acceptance.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-gray-600">
                                        For questions or concerns, contact us at{" "}
                                        <a
                                            href="mailto:support@blinkly.app"
                                            className="text-blinkly-blue hover:underline"
                                        >
                                            support@blinkly.app
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

export default Terms;
