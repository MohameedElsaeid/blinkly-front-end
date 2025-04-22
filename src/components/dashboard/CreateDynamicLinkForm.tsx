import React, {useState} from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import httpClient from '@/lib/http-client';
import {useToast} from '@/hooks/use-toast';
import {Card, CardContent} from '@/components/ui/card';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {Separator} from '@/components/ui/separator';
import {
    Form,
} from '@/components/ui/form';

import BasicFieldsSection from './dynamic-link-form/BasicFieldsSection';
import TagsInputSection from './dynamic-link-form/TagsInputSection';
import ExpirationDateSection from './dynamic-link-form/ExpirationDateSection';
import PlatformRulesSection from './dynamic-link-form/PlatformRulesSection';
import UtmParametersSection from './dynamic-link-form/UtmParametersSection';
import MetadataSection from './dynamic-link-form/MetadataSection';
import PreviewPanel from './dynamic-link-form/PreviewPanel';
import FormActions from './dynamic-link-form/FormActions';

// Define the schema for the form
const dynamicLinkFormSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    alias: z.string().min(1, {message: "Alias is required"}),
    defaultUrl: z.string().url({message: "Please enter a valid URL"}),
    rules: z.array(
        z.object({
            platform: z.string().min(1, {message: "Platform is required"}),
            url: z.string().url({message: "Please enter a valid URL"})
        })
    ).optional(),
    utmParameters: z.object({
        source: z.string().optional(),
        medium: z.string().optional(),
        campaign: z.string().optional(),
        term: z.string().optional(),
        content: z.string().optional()
    }).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaImage: z.string().url().optional().or(z.literal('')),
    tags: z.array(z.string()).optional(),
    deepLinkPath: z.string().optional(),
    expiresAt: z.string().optional()
});

// Define the type based on the schema
type DynamicLinkFormValues = z.infer<typeof dynamicLinkFormSchema>;

const CreateDynamicLinkForm = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [isMetaDataOpen, setIsMetaDataOpen] = useState(false);
    const [isUtmParamsOpen, setIsUtmParamsOpen] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const {toast} = useToast();

    // Initialize form with default values
    const form = useForm<DynamicLinkFormValues>({
        resolver: zodResolver(dynamicLinkFormSchema),
        defaultValues: {
            name: '',
            alias: '',
            defaultUrl: '',
            rules: [{platform: '', url: ''}],
            utmParameters: {
                source: '',
                medium: '',
                campaign: '',
                term: '',
                content: ''
            },
            metaTitle: '',
            metaDescription: '',
            metaImage: '',
            tags: [],
            deepLinkPath: '',
            expiresAt: ''
        },
    });

    // Use field array for dynamic rules
    const {fields, append, remove} = useFieldArray({
        name: "rules",
        control: form.control
    });

    const watchedValues = form.watch();

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            form.setValue('tags', updatedTags);
            setNewTag('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag) {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
        form.setValue('tags', updatedTags);
    };

    const onSubmit = async (data: DynamicLinkFormValues) => {
        setIsCreating(true);
        try {
            // If fields are empty, clean them up before submission
            const cleanedData = {
                ...data,
                rules: data.rules?.filter(rule => rule.platform && rule.url) || [],
                utmParameters: Object.entries(data.utmParameters || {}).reduce((acc, [key, value]) => {
                    if (value) acc[key] = value;
                    return acc;
                }, {} as Record<string, string>)
            };

            // Make API call to create the dynamic link
            const response = await httpClient.post('/api/dynamic-links', cleanedData);

            toast({
                title: "Dynamic link created successfully!",
                description: "Your dynamic link is now ready to use.",
            });

            console.log('Dynamic link created:', response);
        } catch (error) {
            console.error('Error creating dynamic link:', error);
            toast({
                variant: "destructive",
                title: "Failed to create dynamic link",
                description: "There was an error creating your dynamic link. Please try again.",
            });
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {/* Basic Fields */}
                                    <BasicFieldsSection form={form}/>

                                    {/* Tags Input */}
                                    <TagsInputSection
                                        tags={tags}
                                        newTag={newTag}
                                        setNewTag={setNewTag}
                                        handleAddTag={handleAddTag}
                                        handleKeyDown={handleKeyDown}
                                        handleRemoveTag={handleRemoveTag}
                                    />

                                    {/* Expiration Date */}
                                    <ExpirationDateSection form={form}/>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Platform-Specific Rules */}
                        <Card>
                            <CardContent className="pt-6">
                                <PlatformRulesSection
                                    fields={fields}
                                    form={form}
                                    remove={remove}
                                    append={append}
                                />
                            </CardContent>
                        </Card>

                        {/* UTM Parameters */}
                        <Collapsible
                            open={isUtmParamsOpen}
                            onOpenChange={setIsUtmParamsOpen}
                            className="bg-white border rounded-md shadow-sm"
                        >
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-lg font-medium">UTM Parameters</h3>
                                <CollapsibleTrigger asChild>
                                    <button type="button"
                                            className="ml-auto px-2 py-1 text-sm font-medium rounded hover:bg-muted transition"
                                            onClick={() => setIsUtmParamsOpen(val => !val)}>
                                        {isUtmParamsOpen ? "Hide" : "Show"}
                                    </button>
                                </CollapsibleTrigger>
                            </div>
                            <Separator/>
                            <CollapsibleContent>
                                <div className="p-4 space-y-4">
                                    <UtmParametersSection form={form}/>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Meta Data for Social Media */}
                        <Collapsible
                            open={isMetaDataOpen}
                            onOpenChange={setIsMetaDataOpen}
                            className="bg-white border rounded-md shadow-sm"
                        >
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Social Media Preview</h3>
                                <CollapsibleTrigger asChild>
                                    <button type="button"
                                            className="ml-auto px-2 py-1 text-sm font-medium rounded hover:bg-muted transition"
                                            onClick={() => setIsMetaDataOpen(val => !val)}>
                                        {isMetaDataOpen ? "Hide" : "Show"}
                                    </button>
                                </CollapsibleTrigger>
                            </div>
                            <Separator/>
                            <CollapsibleContent>
                                <div className="p-4 space-y-4">
                                    <MetadataSection form={form}/>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Form Actions */}
                        <FormActions
                            isCreating={isCreating}
                            onReset={() => form.reset()}
                        />
                    </form>
                </Form>
            </div>
            {/* Preview Panel */}
            <div className="lg:col-span-2">
                <PreviewPanel
                    showPreview={showPreview}
                    setShowPreview={setShowPreview}
                    watchedValues={watchedValues}
                />
            </div>
        </div>
    );
};

export default CreateDynamicLinkForm;
