
import React from 'react';
import { Link2, QrCode, Layout, BarChart3 } from "lucide-react";

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
          <div 
            key={feature.id}
            className="feature-card overflow-hidden"
            style={{
              animationDelay: `${feature.delay}ms`
            }}
          >
            <div className={`h-full rounded-xl bg-gradient-to-br ${feature.gradient} p-[2px]`}>
              <div className="bg-white h-full rounded-[10px] p-6 flex flex-col">
                <div className="p-3 rounded-full bg-gradient-to-br w-fit mb-4 text-white">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                {/* Animation placeholder - in a real app this would be a Lottie or SVG animation */}
                <div className="mt-auto pt-4">
                  <div className={`h-2 w-3/4 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse-slow`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
