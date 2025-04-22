import React from "react";
import {Link} from "react-router-dom";

const SidebarLogo: React.FC = () => {
    return (
        <div className="p-6 border-b flex items-center">
            <Link to="/dashboard" className="flex items-center">
                <img
                    src="/lovable-uploads/42155296-07ef-4530-b05e-fc8ee23eeb8b.png"
                    alt="Blinkly Logo"
                    className="h-8 w-auto"
                />
                <span className="ml-2 text-lg font-extrabold text-blinkly-blue tracking-tight">
          Blinkly
        </span>
            </Link>
        </div>
    );
};

export default SidebarLogo;
