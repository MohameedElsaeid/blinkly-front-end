
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Link as LinkIcon, 
  Plus, 
  Eye, 
  Save,
  X,
  Calendar,
  Tag
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import httpClient from '@/lib/http-client';

// Define the schema for the form
const dynamicLinkFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  alias: z.string().min(1, { message: "Alias is required" }),
  defaultUrl: z.string().url({ message: "Please enter a valid URL" }),
  rules: z.array(
    z.object({
      platform: z.string().min(1, { message: "Platform is required" }),
      url: z.string().url({ message: "Please enter a valid URL" })
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
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<DynamicLinkFormValues>({
    resolver: zodResolver(dynamicLinkFormSchema),
    defaultValues: {
      name: '',
      alias: '',
      defaultUrl: '',
      rules: [{ platform: '', url: '' }],
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
  const { fields, append, remove } = useFieldArray({
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            Campaign Name*
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Summer Promotion 2025" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          A descriptive name for your dynamic link
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Alias*</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="defaultUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Default Destination URL*
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/landing-page" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          The default URL users will be directed to
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deepLinkPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deep Link Path</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="/page/123" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Specific path that will be appended to the URL (for app deep linking)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tags Input */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex mt-1.5 mb-1.5">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add tags and press Enter (e.g., campaign, promotion)"
                        className="rounded-r-none"
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag}
                        className="rounded-l-none"
                        variant="secondary"
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Expiration Date */}
                  <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
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
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Link will expire at this date/time (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Platform-Specific Rules */}
            <Card>
              <CardContent className="pt-6">
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
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Platform</FormLabel>
                              <FormControl>
                                <Input placeholder="android, ios, desktop" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`rules.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://platform-specific-url.com" {...field} />
                              </FormControl>
                              <FormMessage />
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
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ platform: '', url: '' })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Platform Rule
                  </Button>
                </div>
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
                  <Button variant="ghost" size="sm">
                    {isUtmParamsOpen ? "Hide" : "Show"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <Separator />
              <CollapsibleContent>
                <div className="p-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="utmParameters.source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Source</FormLabel>
                        <FormControl>
                          <Input placeholder="instagram, facebook, email" {...field} />
                        </FormControl>
                        <FormDescription>
                          The referrer (e.g., google, newsletter)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="utmParameters.medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Medium</FormLabel>
                        <FormControl>
                          <Input placeholder="social, cpc, banner, email" {...field} />
                        </FormControl>
                        <FormDescription>
                          Marketing medium (e.g., cpc, banner, email)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="utmParameters.campaign"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Campaign</FormLabel>
                        <FormControl>
                          <Input placeholder="summer_sale" {...field} />
                        </FormControl>
                        <FormDescription>
                          Name of the campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="utmParameters.term"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Term</FormLabel>
                        <FormControl>
                          <Input placeholder="running+shoes" {...field} />
                        </FormControl>
                        <FormDescription>
                          Identify paid search keywords
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="utmParameters.content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Content</FormLabel>
                        <FormControl>
                          <Input placeholder="top_banner" {...field} />
                        </FormControl>
                        <FormDescription>
                          Used to differentiate ads or links that point to the same URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <Button variant="ghost" size="sm">
                    {isMetaDataOpen ? "Hide" : "Show"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <Separator />
              <CollapsibleContent>
                <div className="p-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Exciting Promotion!" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Title shown in social media previews
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Don't miss our limited time offer" 
                            {...field} 
                            className="resize-none"
                          />
                        </FormControl>
                        <FormDescription>
                          Description shown in social media previews
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Image URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/promo-image.jpg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Image displayed in social media previews
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Dynamic Link"}
                <Save className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-2">
        <Card className="sticky top-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Link Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4 mr-1" />
                {showPreview ? "Hide" : "Show"}
              </Button>
            </div>

            {showPreview && (
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-slate-50">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Your dynamic link:</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-600">
                        {watchedValues.alias
                          ? `blinkly.app/${watchedValues.alias}`
                          : "blinkly.app/your-alias"}
                      </span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Default redirect:</div>
                  <div className="text-sm font-medium truncate">
                    {watchedValues.defaultUrl || "https://example.com/landing-page"}
                  </div>
                </div>

                {watchedValues.rules && watchedValues.rules.length > 0 && watchedValues.rules[0].platform && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Platform rules:</div>
                    <div className="space-y-2">
                      {watchedValues.rules.map((rule, index) => (
                        rule.platform && (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{rule.platform}:</span> {rule.url}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {watchedValues.tags && watchedValues.tags.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Tags:</div>
                    <div className="flex flex-wrap gap-1">
                      {watchedValues.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {watchedValues.expiresAt && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Expires:</div>
                    <div className="text-sm">
                      {format(new Date(watchedValues.expiresAt), "PPP")}
                    </div>
                  </div>
                )}

                {/* UTM Parameters Preview */}
                {(watchedValues.utmParameters?.source || watchedValues.utmParameters?.medium) && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">UTM Parameters:</div>
                    <div className="space-y-1 text-sm">
                      {Object.entries(watchedValues.utmParameters || {}).map(([key, value]) => 
                        value ? (
                          <div key={key} className="text-sm">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                {/* Social Media Preview */}
                {(watchedValues.metaTitle || watchedValues.metaDescription || watchedValues.metaImage) && (
                  <div className="border rounded-md overflow-hidden mt-4">
                    <div className="text-xs bg-slate-100 p-2 text-slate-500">
                      Social Media Preview
                    </div>
                    {watchedValues.metaImage && (
                      <div className="h-32 bg-slate-200 overflow-hidden">
                        <img 
                          src={watchedValues.metaImage} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image can't load
                            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Preview+Image";
                          }}
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <div className="font-medium">
                        {watchedValues.metaTitle || "Title will appear here"}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {watchedValues.metaDescription || "Description will appear here"}
                      </div>
                      <div className="text-xs text-blue-600 mt-2">
                        blinkly.app/{watchedValues.alias || "your-alias"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDynamicLinkForm;
