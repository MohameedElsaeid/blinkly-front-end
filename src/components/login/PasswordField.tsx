import React, {useState} from 'react';
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control} from 'react-hook-form';
import {Eye, EyeOff} from "lucide-react";
import {FormValues} from './LoginFormSchema';

interface PasswordFieldProps {
    control: Control<FormValues>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({control}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormField
            control={control}
            name="password"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                        <FormControl>
                            <Input
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                {...field}
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default PasswordField;
