
import React, { useState } from "react";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for filters
const mockFilters = {
    users: ["All Users", "Registered Users", "Anonymous Users", "New Users"],
    links: ["All Links", "Active Links", "Expired Links"],
    tags: ["marketing", "social", "product", "blog", "event", "promotion", "sales"],
    utmSources: ["direct", "google", "facebook", "twitter", "linkedin", "instagram", "email", "newsletter"],
    utmMediums: ["organic", "cpc", "social", "email", "referral", "affiliate", "display"],
    platforms: ["All Platforms", "Desktop", "Mobile", "Tablet", "iOS", "Android", "Windows", "MacOS"],
    countries: ["All Countries", "United States", "United Kingdom", "Canada", "Germany", "France", "Australia", "Japan"],
};

type FilterType = keyof typeof mockFilters;

const GlobalFilters = () => {
    const [openFilters, setOpenFilters] = useState<Record<FilterType, boolean>>({
        users: false,
        links: false,
        tags: false,
        utmSources: false,
        utmMediums: false,
        platforms: false,
        countries: false,
    });

    const [selectedFilters, setSelectedFilters] = useState<Record<FilterType, string[]>>({
        users: [],
        links: [],
        tags: [],
        utmSources: [],
        utmMediums: [],
        platforms: [],
        countries: [],
    });

    const toggleFilter = (type: FilterType) => {
        setOpenFilters((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleSelect = (type: FilterType, value: string) => {
        setSelectedFilters((prev) => {
            const current = [...prev[type]];
            const index = current.indexOf(value);

            if (index !== -1) {
                current.splice(index, 1);
            } else {
                current.push(value);
            }

            return { ...prev, [type]: current };
        });
    };

    const getTotalFiltersCount = () => {
        return Object.values(selectedFilters).reduce((acc, filters) => acc + filters.length, 0);
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            users: [],
            links: [],
            tags: [],
            utmSources: [],
            utmMediums: [],
            platforms: [],
            countries: [],
        });
    };

    const filterTypes: { type: FilterType; label: string }[] = [
        { type: "users", label: "User" },
        { type: "links", label: "Link/Alias" },
        { type: "tags", label: "Tag" },
        { type: "utmSources", label: "UTM Source" },
        { type: "utmMediums", label: "UTM Medium" },
        { type: "platforms", label: "Platform" },
        { type: "countries", label: "Country" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                    <h2 className="text-lg font-medium mr-2">Filters</h2>
                    {getTotalFiltersCount() > 0 && (
                        <Badge variant="secondary" className="mr-2">
                            {getTotalFiltersCount()}
                        </Badge>
                    )}
                </div>
                {getTotalFiltersCount() > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                        Clear All
                    </Button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {filterTypes.map(({ type, label }) => (
                    <Popover key={type} open={openFilters[type]} onOpenChange={(open) => setOpenFilters((prev) => ({ ...prev, [type]: open }))}>
                        <PopoverTrigger asChild>
                            <Button 
                                variant={selectedFilters[type].length > 0 ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => toggleFilter(type)} 
                                className="h-9"
                            >
                                {label}
                                {selectedFilters[type].length > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {selectedFilters[type].length}
                                    </Badge>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="start">
                            <Command>
                                <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                                <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                                <CommandGroup>
                                    {mockFilters[type].map((item) => (
                                        <CommandItem
                                            key={item}
                                            value={item}
                                            onSelect={() => handleSelect(type, item)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedFilters[type].includes(item) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {item}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                ))}
            </div>

            {getTotalFiltersCount() > 0 && (
                <div className="pt-2">
                    <Separator className="my-2" />
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(selectedFilters).map(([type, values]) =>
                            values.map((value) => (
                                <Badge key={`${type}-${value}`} variant="secondary" className="px-2 py-1">
                                    {value}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSelect(type as FilterType, value)}
                                        className="h-4 w-4 p-0 ml-1"
                                    >
                                        <span className="sr-only">Remove</span>
                                        <Filter className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalFilters;
