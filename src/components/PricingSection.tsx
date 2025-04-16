
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);
  
  const tiers = [
    {
      name: "Free",
      description: "Perfect for trying out Blinkly.",
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        "10 shortened links",
        "5 QR codes",
        "Basic analytics",
        "1 Link-in-bio page",
        "Standard support",
      ],
      buttonText: "Sign Up",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Pro",
      description: "For creators and professionals.",
      price: {
        monthly: 12,
        yearly: 10
      },
      features: [
        "Unlimited shortened links",
        "Unlimited QR codes",
        "Custom domains",
        "Advanced analytics",
        "5 Link-in-bio pages",
        "Priority support",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Business",
      description: "For teams and businesses.",
      price: {
        monthly: 29,
        yearly: 24
      },
      features: [
        "Everything in Pro",
        "Team collaboration",
        "SSO authentication",
        "API access",
        "Custom branding",
        "Dedicated support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Plans That Scale With You</h2>
        <p className="section-description">
          Choose the perfect plan for your needs. All plans include core features.
        </p>
        
        <div className="flex items-center justify-center mt-6 mb-12">
          <span className={`mr-3 ${!yearly ? 'font-semibold text-blinkly-blue' : 'text-gray-500'}`}>Monthly</span>
          <Switch 
            checked={yearly}
            onCheckedChange={setYearly}
          />
          <span className={`ml-3 ${yearly ? 'font-semibold text-blinkly-blue' : 'text-gray-500'}`}>
            Yearly <span className="text-sm text-green-500 font-normal">(Save 16%)</span>
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-2xl bg-white p-8 shadow-lg flex flex-col ${tier.popular ? 'border-2 border-blinkly-blue ring-2 ring-blinkly-blue/20 md:scale-105 z-10' : 'border border-gray-200'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blinkly-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className="text-gray-500 mt-2">{tier.description}</p>
              
              <div className="mt-4 mb-8">
                <span className="text-4xl font-bold">${yearly ? tier.price.yearly : tier.price.monthly}</span>
                <span className="text-gray-500">/mo</span>
                {yearly && tier.price.monthly > 0 && (
                  <p className="text-sm text-gray-500">Billed annually (${tier.price.yearly * 12}/year)</p>
                )}
              </div>
              
              <ul className="space-y-3 grow mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={tier.buttonVariant as "outline" | "default"} 
                className={`mt-auto ${tier.popular ? 'bg-blinkly-blue hover:bg-blinkly-violet text-white' : ''}`}
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need a custom plan? <a href="#" className="text-blinkly-blue hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
