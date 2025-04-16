
import React from 'react';
import { Link } from 'react-router-dom';

const SignupHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <Link to="/" className="inline-block">
        <img 
          src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png" 
          alt="Blinkly Logo" 
          className="h-10 mx-auto mb-4"
        />
      </Link>
      <h2 className="text-2xl font-bold text-gray-900">Create Your Blinkly Account</h2>
      <p className="text-sm text-gray-600 mt-1">Join our community and start using Blinkly</p>
    </div>
  );
};

export default SignupHeader;
