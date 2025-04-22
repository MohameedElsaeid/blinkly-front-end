
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag, X } from 'lucide-react';

interface Props {
  tags: string[];
  newTag: string;
  setNewTag: (val: string) => void;
  handleAddTag: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleRemoveTag: (tag: string) => void;
}
const TagsInputSection: React.FC<Props> = ({
  tags,
  newTag,
  setNewTag,
  handleAddTag,
  handleKeyDown,
  handleRemoveTag,
}) => (
  <div>
    <Label>Tags</Label>
    <div className="flex mt-1.5 mb-1.5">
      <Input
        value={newTag}
        onChange={e => setNewTag(e.target.value)}
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
      {tags.map(tag => (
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
);
export default TagsInputSection;

