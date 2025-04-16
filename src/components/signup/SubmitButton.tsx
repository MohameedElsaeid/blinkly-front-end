
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <Button 
      type="submit" 
      disabled={isLoading} 
      className="w-full bg-blinkly-blue hover:bg-blinkly-violet"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Account...
        </>
      ) : (
        'Create Account'
      )}
    </Button>
  );
};

export default SubmitButton;
