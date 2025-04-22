
import React from "react";
import { Crown } from "lucide-react";

/**
 * Visually indicates a "Premium" feature.
 * Purple color scheme for clarity & branding.
 */
const PremiumBadge: React.FC = () => (
  <span className="inline-flex items-center px-2 py-0.5 ml-2 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 animate-sparkle">
    <Crown size={14} className="mr-1 text-purple-500" />
    Premium
  </span>
);

export default PremiumBadge;
