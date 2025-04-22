import React from 'react';
import {LucideIcon} from "lucide-react";

interface FeatureProps {
    feature: {
        id: number;
        title: string;
        description: string;
        icon: LucideIcon;
        gradient: string;
        delay: string;
    }
}

export const FeatureCard: React.FC<FeatureProps> = ({feature}) => {
    return (
        <div
            className="feature-card overflow-hidden"
            style={{
                animationDelay: `${feature.delay}ms`
            }}
        >
            <div className={`h-full rounded-xl bg-gradient-to-br ${feature.gradient} p-[2px]`}>
                <div className="bg-white h-full rounded-[10px] p-6 flex flex-col">
                    <div className="p-3 rounded-full bg-gradient-to-br w-fit mb-4 text-white">
                        <feature.icon size={24}/>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>

                    {/* Animation placeholder - in a real app this would be a Lottie or SVG animation */}
                    <div className="mt-auto pt-4">
                        <div
                            className={`h-2 w-3/4 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse-slow`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
