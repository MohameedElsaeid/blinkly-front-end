
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
const MetadataSection: React.FC<Props> = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="metaTitle"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meta Title</FormLabel>
          <FormControl>
            <Input placeholder="Exciting Promotion!" {...field} />
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
  </>
);

export default MetadataSection;

