import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Plus, X} from 'lucide-react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';

interface Props {
    fields: any[];
    form: any;
    remove: (index: number) => void;
    append: (item: { platform: string; url: string }) => void;
}

const PlatformRulesSection: React.FC<Props> = ({
                                                   fields,
                                                   form,
                                                   remove,
                                                   append
                                               }) => (
    <>
        <div className="mb-4">
            <h3 className="text-lg font-medium">Platform-Specific Rules</h3>
            <p className="text-sm text-muted-foreground">Define different URLs for different platforms</p>
        </div>
        <div className="space-y-4">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-4">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name={`rules.${index}.platform`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Platform</FormLabel>
                                    <FormControl>
                                        <Input placeholder="android, ios, desktop" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name={`rules.${index}.url`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://platform-specific-url.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-8"
                        onClick={() => remove(index)}
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({platform: '', url: ''})}
            >
                <Plus className="mr-2 h-4 w-4"/>
                Add Platform Rule
            </Button>
        </div>
    </>
);
export default PlatformRulesSection;

