import {Button} from "@/components/ui/button";
import {CheckCircle} from "lucide-react";
import {Link} from "react-router-dom";

const SignupSuccessful = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 text-center p-8 md:p-12">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-500"/>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Registration Successful!</h2>
            <p className="text-muted-foreground max-w-md">
                Your Blinkly account has been created successfully. You can now log in to start using our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild>
                    <Link to="/login">Log In</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to="/">Return Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default SignupSuccessful;
