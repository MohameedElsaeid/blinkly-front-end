import React from 'react';
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control} from 'react-hook-form';
import {FormValues} from './SignupFormSchema';

interface PersonalInfoFieldsProps {
    control: Control<FormValues>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({control}) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={control}
                name="firstName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="lastName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default PersonalInfoFields;
