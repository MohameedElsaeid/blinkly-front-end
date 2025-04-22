import React from 'react';
import {Link} from 'react-router-dom';

const LoginHeader: React.FC = () => {
    return (
        <div className="text-center mb-8">
            <Link to="/" className="inline-block">
                <img
                    src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png"
                    alt="Blinkly Logo"
                    className="h-10 mx-auto mb-4"
                />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Log in to your Blinkly account</p>
        </div>
    );
};

export default LoginHeader;
