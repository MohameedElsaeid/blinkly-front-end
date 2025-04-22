import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Filter, X} from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter
} from "@/components/ui/drawer";
import {useToast} from "@/hooks/use-toast";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {DateRange} from "react-day-picker";

const FilterButton = () => {
    const [open, setOpen] = useState(false);
    const {toast} = useToast();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(),
    });

    const handleApplyFilters = () => {
        toast({
            title: "Filters Applied",
            description: "Your dashboard has been updated with the selected filters.",
        });
        setOpen(false);
    };

    return (
        <>
            <Button
                className="fixed bottom-4 right-4 rounded-full shadow-lg h-14 w-14 flex items-center justify-center"
                onClick={() => setOpen(true)}
            >
                <Filter className="h-6 w-6"/>
            </Button>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="max-h-[85vh]">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <div className="flex items-center justify-between">
                                <DrawerTitle>Dashboard Filters</DrawerTitle>
                                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                            <DrawerDescription>
                                Apply filters to refine your dashboard data
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="p-4 space-y-6">
                            {/* Date Range Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="date-range">Date Range</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date-range"
                                            variant="outline"
                                            className="w-full justify-start text-left"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {format(dateRange.from, "PPP")} -{" "}
                                                        {format(dateRange.to, "PPP")}
                                                    </>
                                                ) : (
                                                    format(dateRange.from, "PPP")
                                                )
                                            ) : (
                                                <span>Pick a date range</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Country Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select defaultValue="all">
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select a country"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Countries</SelectItem>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="au">Australia</SelectItem>
                                        <SelectItem value="de">Germany</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Device Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="device">Device</Label>
                                <Select defaultValue="all">
                                    <SelectTrigger id="device">
                                        <SelectValue placeholder="Select a device"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Devices</SelectItem>
                                        <SelectItem value="mobile">Mobile</SelectItem>
                                        <SelectItem value="desktop">Desktop</SelectItem>
                                        <SelectItem value="tablet">Tablet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* UTM Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="utm">UTM Source</Label>
                                <Select defaultValue="all">
                                    <SelectTrigger id="utm">
                                        <SelectValue placeholder="Select a UTM source"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Sources</SelectItem>
                                        <SelectItem value="google">Google</SelectItem>
                                        <SelectItem value="facebook">Facebook</SelectItem>
                                        <SelectItem value="twitter">Twitter</SelectItem>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DrawerFooter>
                            <Button onClick={handleApplyFilters}>Apply Filters</Button>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default FilterButton;
