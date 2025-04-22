import React from 'react';
import {Input} from '@/components/ui/input';
import {Link as LinkIcon} from 'lucide-react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';

interface Props {
    form: any;
}

const BasicFieldsSection: React.FC<Props> = ({form}) => (
    <>
        <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem>
                    <FormLabel>
                        <div className="flex items-center gap-2">Campaign Name*</div>
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="Summer Promotion 2025" {...field} />
                    </FormControl>
                    <FormDescription>
                        A descriptive name for your dynamic link
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="alias"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Custom Alias*</FormLabel>
                    <FormControl>
                        <div className="flex">
              <span
                  className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                blinkly.app/
              </span>
                            <Input
                                className="rounded-l-none"
                                placeholder="summer-promo"
                                {...field}
                            />
                        </div>
                    </FormControl>
                    <FormDescription>
                        A unique identifier for your dynamic link
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="defaultUrl"
            render={({field}) => (
                <FormItem>
                    <FormLabel>
                        <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4"/>
                            Default Destination URL*
                        </div>
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com/landing-page" {...field} />
                    </FormControl>
                    <FormDescription>
                        The default URL users will be directed to
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="deepLinkPath"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Deep Link Path</FormLabel>
                    <FormControl>
                        <Input placeholder="/page/123" {...field} />
                    </FormControl>
                    <FormDescription>
                        Specific path that will be appended to the URL (for app deep linking)
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    </>
);
export default BasicFieldsSection;

