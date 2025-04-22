import React from 'react';
import {BarChart4, Link as LinkIcon, QrCode, Sparkles} from "lucide-react";

export const FloatingElements = () => {
    return (
        <>
            <div className="absolute top-1/4 right-10 md:right-1/4 w-16 h-16 animate-float">
                <QrCode size={64} className="text-blinkly-violet opacity-40"/>
            </div>
            <div className="absolute bottom-1/4 left-10 md:left-1/3 w-12 h-12 animate-float"
                 style={{animationDelay: '1s'}}>
                <LinkIcon size={48} className="text-blinkly-blue opacity-40"/>
            </div>
            <div className="absolute top-1/3 left-20 w-10 h-10 animate-float" style={{animationDelay: '0.5s'}}>
                <BarChart4 size={40} className="text-blinkly-mint opacity-40"/>
            </div>
            <div className="absolute bottom-1/3 right-20 animate-sparkle">
                <Sparkles size={28} className="text-yellow-400"/>
            </div>
        </>
    );
};
