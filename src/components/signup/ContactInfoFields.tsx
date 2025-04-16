
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, UseFormSetValue } from 'react-hook-form';
import { COUNTRIES } from '@/lib/countries';
import { FormValues } from './SignupFormSchema';

interface ContactInfoFieldsProps {
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({ control, setValue }) => {
  const handleCountryChange = (countryValue: string) => {
    setValue('country', countryValue);
    
    const selectedCountry = COUNTRIES.find(country => country.code === countryValue);
    if (selectedCountry && selectedCountry.phoneCode) {
      setValue('countryCode', selectedCountry.phoneCode);
    }
  };

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
            <Select 
              onValueChange={handleCountryChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[200px]">
                {COUNTRIES.map(country => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="mr-2">{country.flag}</span> {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
