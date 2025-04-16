
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormValues } from './SignupFormSchema';
import CountrySelector from './CountrySelector';

interface ContactInfoFieldsProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({ control, setValue }) => {
  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <CountrySelector value={field.value} setValue={setValue} />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-5 gap-2">
        <FormField
          control={control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input disabled placeholder="+1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default ContactInfoFields;
