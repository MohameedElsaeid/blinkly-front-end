import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";

export const UrlShortener = () => {
    const [url, setUrl] = useState('');

    const handleShortenUrl = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) {
            toast.error("Please enter a URL");
            return;
        }
        toast.success("URL shortened successfully! This is a demo.");
        setUrl('');
    };

    return (
        <div className="glass-card bg-white/40 p-6 max-w-2xl mx-auto mb-16">
            <form onSubmit={handleShortenUrl} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                    <Input
                        type="url"
                        placeholder="Enter your long URL"
                        className="h-12 px-4 w-full"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <Button type="submit"
                        className="h-12 bg-blinkly-blue hover:bg-blinkly-violet text-white font-medium px-6">
                    Shorten Now
                </Button>
            </form>
            <p className="text-gray-500 text-sm mt-3">
                Free users can create up to 10 links. No credit card required.
            </p>
        </div>
    );
};
