
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check } from 'lucide-react';
import { fetchPricingPackages } from '@/services/pricing-service';
import { Package } from '@/lib/http-client';
import { useQuery } from '@tanstack/react-query';

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);
  
  // Fetch pricing packages using React Query
  const { data: packagesData, isLoading, error } = useQuery({
    queryKey: ['packages'],
    queryFn: fetchPricingPackages,
  });
  
  // Get the appropriate packages based on billing frequency
  const packages = yearly 
    ? packagesData?.yearly 
    : packagesData?.monthly;

  // Format price for display
  const formatPrice = (priceString: string | null): { amount: string, period: string } => {
    if (!priceString) return { amount: 'Custom', period: '' };
    
    const price = priceString.replace('$', '');
    return {
      amount: price,
      period: yearly ? '/year' : '/mo'
    };
  };

  // Handle enterprise package contact
  const handleEnterpriseContact = () => {
    window.location.href = 'mailto:sales@blinkly.app?subject=Enterprise%20Pricing%20Inquiry';
  };

  if (isLoading) {
    return (
      <section id="pricing" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Plans That Scale With You</h2>
          <p className="section-description mb-12">Loading pricing options...</p>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-blinkly-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Plans That Scale With You</h2>
          <p className="section-description text-red-500">
            Sorry, we couldn't load the pricing information. Please try again later.
          </p>
        </div>
      </section>
    );
  }

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
        
        {packages && packages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 lg:gap-8 max-w-7xl mx-auto">
            {packages.map((pkg: Package) => {
              const { amount, period } = formatPrice(pkg.price);
              const isEnterprise = pkg.name === "ENTERPRISE";
              
              return (
                <div 
                  key={pkg.id}
                  className={`relative rounded-2xl bg-white p-6 lg:p-8 shadow-lg flex flex-col ${
                    pkg.isMostPopular ? 'border-2 border-blinkly-blue ring-2 ring-blinkly-blue/20 md:scale-105 z-10' : 'border border-gray-200'
                  }`}
                >
                  {pkg.isMostPopular && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blinkly-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-xl lg:text-2xl font-bold">{pkg.name}</h3>
                  <p className="text-gray-500 mt-2 h-12">
                    {pkg.name === "FREE" ? "Perfect for trying out Blinkly." : 
                     pkg.name === "BASIC" ? "Great for individuals and freelancers." :
                     pkg.name === "PROFESSIONAL" ? "Ideal for creators and professionals." :
                     pkg.name === "BUSINESS" ? "Perfect for growing businesses and teams." :
                     "Tailored solutions for large organizations."}
                  </p>
                  
                  <div className="mt-4 mb-8">
                    {isEnterprise ? (
                      <span className="text-4xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">${amount}</span>
                        <span className="text-gray-500">{period}</span>
                      </>
                    )}
                  </div>
                  
                  <ul className="space-y-3 grow mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={pkg.isMostPopular ? "default" : "outline"} 
                    className={`mt-auto ${pkg.isMostPopular ? 'bg-blinkly-blue hover:bg-blinkly-violet text-white' : ''}`}
                    onClick={isEnterprise ? handleEnterpriseContact : undefined}
                  >
                    {isEnterprise ? "Contact Sales" : pkg.name === "FREE" ? "Sign Up" : "Start Free Trial"}
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No pricing packages available at the moment.</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need a custom plan? <a href="mailto:sales@blinkly.app" className="text-blinkly-blue hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
