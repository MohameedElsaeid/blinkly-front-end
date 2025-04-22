import React from 'react';
import {ArrowRight} from 'lucide-react';
import {Button} from '@/components/ui/button';

const useCases = [
    {
        id: 1,
        title: "Marketers",
        description: "Track campaigns with smart URLs and gain insights into customer behavior.",
        image: "/placeholder.svg",
        color: "bg-gradient-to-r from-blue-500 to-blue-700"
    },
    {
        id: 2,
        title: "Creators",
        description: "Share all your content from one customizable bio page with analytics.",
        image: "/placeholder.svg",
        color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "Retailers",
        description: "Bridge offline-to-online with scannable QR codes that drive customer engagement.",
        image: "/placeholder.svg",
        color: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
        id: 4,
        title: "Startups",
        description: "Share product launch links with branded slugs for enhanced recognition.",
        image: "/placeholder.svg",
        color: "bg-gradient-to-r from-green-400 to-blinkly-mint"
    }
];

const UseCasesSection = () => {
    return (
        <section id="use-cases" className="bg-gray-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="section-title">Built for Everyone Who Shares Links</h2>
                <p className="section-description">
                    See how different industries are leveraging Blinkly to drive results.
                </p>

                <div
                    className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-6 max-w-7xl mx-auto">
                    {useCases.map((useCase) => (
                        <div
                            key={useCase.id}
                            className="md:min-w-[350px] flex-shrink-0 md:snap-center rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className={`${useCase.color} h-32 flex items-center justify-center text-white`}>
                                <span className="text-3xl font-bold">{useCase.title}</span>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">{useCase.description}</p>
                                <Button variant="ghost"
                                        className="text-blinkly-blue hover:text-blinkly-violet hover:bg-blue-50 px-0">
                                    Learn more <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button className="bg-blinkly-blue hover:bg-blinkly-violet text-white">
                        See all use cases
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
