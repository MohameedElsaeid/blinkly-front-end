
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Link as LinkIcon, 
  Plus, 
  Eye, 
  Save,
  X,
  Copy
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

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
import httpClient from '@/lib/http-client';
import { LinkCreationData, RedirectType } from '@/types/link';

const formSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL" }),
  alias: z.string().optional(),
  tags: z.array(z.string()).optional(),
  redirectType: z.number().optional(),
  expiresAt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaImage: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

const CreateLinkForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isMetaDataOpen, setIsMetaDataOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();

  const form = useForm<LinkCreationData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: '',
      alias: '',
      tags: [],
      redirectType: 302, // Temporary redirect by default
      expiresAt: '',
      metaTitle: '',
      metaDescription: '',
      metaImage: '',
      description: '',
    },
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

  const onSubmit = async (data: LinkCreationData) => {
    setIsCreating(true);
    try {
      // Make API call to create the link
      const response = await httpClient.post('https://api.blinkly.app/api/links', data);
      
      toast({
        title: "Link created successfully!",
        description: "Your short link is now ready to use.",
      });
      
      // Reset form if needed
      // form.reset();
      
      console.log('Link created:', response);
    } catch (error) {
      console.error('Error creating link:', error);
      toast({
        variant: "destructive",
        title: "Failed to create link",
        description: "There was an error creating your link. Please try again.",
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
                    name="originalUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Destination URL*
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/landing-page" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          The full URL of the page you want to link to
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
                        <FormLabel>Custom Alias</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                              blinkly.app/
                            </span>
                            <Input 
                              className="rounded-l-none" 
                              placeholder="promo-link" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Leave blank to generate a random short link
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
                        placeholder="Add tags and press Enter (e.g., campaign, sale)"
                        className="rounded-r-none"
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag}
                        className="rounded-l-none"
                        variant="secondary"
                      >
                        <Plus className="h-4 w-4" />
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
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Collapsible 
              open={isAdvancedOpen} 
              onOpenChange={setIsAdvancedOpen}
              className="bg-white border rounded-md shadow-sm"
            >
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Advanced Settings</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isAdvancedOpen ? "Hide" : "Show"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <Separator />
              <CollapsibleContent>
                <div className="p-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Internal tracking link for ad campaign #X" 
                            {...field} 
                            className="resize-none"
                          />
                        </FormControl>
                        <FormDescription>
                          For your internal reference only, not visible to users
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="redirectType"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value === 301}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? 301 : 302);
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            Permanent Redirect (301)
                          </FormLabel>
                          <FormDescription>
                            Use when the URL is permanently moved. Better for SEO but browsers cache heavily.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiration Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Link will expire at this date/time (optional)
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
                            placeholder="Big Sale!" 
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
                            placeholder="Check out our biggest sale of the year." 
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
                            placeholder="https://example.com/banner.jpg" 
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
                {isCreating ? "Creating..." : "Create Link"}
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
                    <div className="text-xs text-muted-foreground">Your short link:</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-600">
                        {watchedValues.alias
                          ? `blinkly.app/${watchedValues.alias}`
                          : "blinkly.app/random-id"}
                      </span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Redirects to:</div>
                  <div className="text-sm font-medium truncate">
                    {watchedValues.originalUrl || "https://example.com/landing-page"}
                  </div>
                </div>

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
                      {new Date(watchedValues.expiresAt).toLocaleString()}
                    </div>
                  </div>
                )}

                {watchedValues.redirectType && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Redirect type:</div>
                    <div className="text-sm">
                      {watchedValues.redirectType === 301 ? "301 (Permanent)" : "302 (Temporary)"}
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
                        blinkly.app/{watchedValues.alias || "random-id"}
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

export default CreateLinkForm;
