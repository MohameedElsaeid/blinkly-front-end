import React from 'react';
import {Link2, QrCode, Layout, BarChart3} from "lucide-react";
import {FeatureCard} from './features/FeatureCard';

const features = [
    {
        id: 1,
        title: "Smart Link Shortening",
        description: "Create branded links with custom domains, redirection rules, and auto-expiring links.",
        icon: Link2,
        gradient: "from-blinkly-blue to-blinkly-violet",
        delay: "0"
    },
    {
        id: 2,
        title: "QR Code Generation",
        description: "Design beautiful QR codes with custom colors, logos, and editable designs.",
        icon: QrCode,
        gradient: "from-blinkly-mint to-blinkly-lightblue",
        delay: "100"
    },
    {
        id: 3,
        title: "Link-in-Bio Pages",
        description: "Build stunning bio pages with drag-and-drop editing, media support, and themes.",
        icon: Layout,
        gradient: "from-blinkly-orange to-blinkly-yellow",
        delay: "200"
    },
    {
        id: 4,
        title: "Analytics & Insights",
        description: "Track performance with real-time charts, heatmaps, and UTM parameter support.",
        icon: BarChart3,
        gradient: "from-blinkly-violet to-blinkly-purple",
        delay: "300"
    }
];

const FeaturesSection = () => {
    return (
        <section id="features" className="container-section">
            <h2 className="section-title">Everything You Need in One Platform</h2>
            <p className="section-description">
                Blinkly combines all the tools you need to create, manage, and analyze your links effectively.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {features.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature}/>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
