import React from 'react';
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control} from 'react-hook-form';
import {FormValues} from './LoginFormSchema';

interface EmailFieldProps {
    control: Control<FormValues>;
}

const EmailField: React.FC<EmailFieldProps> = ({control}) => {
    return (
        <FormField
            control={control}
            name="email"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="your.email@example.com"
                            type="email"
                            {...field}
                            autoComplete="email"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default EmailField;
