import React from 'react';
import {Input} from '@/components/ui/input';
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

const UtmParametersSection: React.FC<Props> = ({form}) => (
    <>
        <FormField
            control={form.control}
            name="utmParameters.source"
            render={({field}) => (
                <FormItem>
                    <FormLabel>UTM Source</FormLabel>
                    <FormControl>
                        <Input placeholder="instagram, facebook, email" {...field} />
                    </FormControl>
                    <FormDescription>
                        The referrer (e.g., google, newsletter)
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="utmParameters.medium"
            render={({field}) => (
                <FormItem>
                    <FormLabel>UTM Medium</FormLabel>
                    <FormControl>
                        <Input placeholder="social, cpc, banner, email" {...field} />
                    </FormControl>
                    <FormDescription>
                        Marketing medium (e.g., cpc, banner, email)
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="utmParameters.campaign"
            render={({field}) => (
                <FormItem>
                    <FormLabel>UTM Campaign</FormLabel>
                    <FormControl>
                        <Input placeholder="summer_sale" {...field} />
                    </FormControl>
                    <FormDescription>
                        Name of the campaign
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="utmParameters.term"
            render={({field}) => (
                <FormItem>
                    <FormLabel>UTM Term</FormLabel>
                    <FormControl>
                        <Input placeholder="running+shoes" {...field} />
                    </FormControl>
                    <FormDescription>
                        Identify paid search keywords
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="utmParameters.content"
            render={({field}) => (
                <FormItem>
                    <FormLabel>UTM Content</FormLabel>
                    <FormControl>
                        <Input placeholder="top_banner" {...field} />
                    </FormControl>
                    <FormDescription>
                        Used to differentiate ads or links that point to the same URL
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    </>
);

export default UtmParametersSection;

