
import React, { useState } from 'react';
import { Check } from "lucide-react";
import { COUNTRIES } from '@/lib/countries';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from './SignupFormSchema';
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface CountrySelectorProps {
  value: string;
  setValue: UseFormSetValue<FormValues>;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  
  const handleSelect = (countryValue: string) => {
    setValue('country', countryValue);
    
    const selectedCountry = COUNTRIES.find(country => country.code === countryValue);
    if (selectedCountry && selectedCountry.phoneCode) {
      setValue('countryCode', selectedCountry.phoneCode);
    }
    
    setOpen(false);
  };

  const selectedCountry = COUNTRIES.find(country => country.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCountry ? (
              <span className="flex items-center">
                <span className="mr-2">{selectedCountry.flag}</span> {selectedCountry.name}
              </span>
            ) : (
              "Select country"
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-y-auto">
              {COUNTRIES.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => handleSelect(country.code)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      country.code === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="mr-2">{country.flag}</span> {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelector;
