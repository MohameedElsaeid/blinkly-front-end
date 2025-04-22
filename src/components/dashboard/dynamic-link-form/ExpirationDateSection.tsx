import React from 'react';
import {Button} from '@/components/ui/button';
import {Calendar as CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {Calendar} from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import {cn} from '@/lib/utils';

interface Props {
    form: any;
}

const ExpirationDateSection: React.FC<Props> = ({form}) => (
    <FormField
        control={form.control}
        name="expiresAt"
        render={({field}) => (
            <FormItem className="flex flex-col">
                <FormLabel>Expiration Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                    format(new Date(field.value), "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={date => field.onChange(date ? date.toISOString() : "")}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                        />
                    </PopoverContent>
                </Popover>
                <FormDescription>
                    Link will expire at this date/time (optional)
                </FormDescription>
                <FormMessage/>
            </FormItem>
        )}
    />
);
export default ExpirationDateSection;

