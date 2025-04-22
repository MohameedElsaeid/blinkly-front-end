
import React from 'react';
import { Eye, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface Props {
  showPreview: boolean;
  setShowPreview: (val: boolean) => void;
  watchedValues: any;
}
const PreviewPanel: React.FC<Props> = ({
  showPreview,
  setShowPreview,
  watchedValues
}) => (
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
                {watchedValues.rules.map((rule: any, index: number) =>
                  rule.platform && (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{rule.platform}:</span> {rule.url}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {watchedValues.tags && watchedValues.tags.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Tags:</div>
              <div className="flex flex-wrap gap-1">
                {watchedValues.tags.map((tag: string) => (
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

          {(watchedValues.utmParameters?.source || watchedValues.utmParameters?.medium) && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">UTM Parameters:</div>
              <div className="space-y-1 text-sm">
                {Object.entries(watchedValues.utmParameters || {}).map(
                  ([key, value]) =>
                    value ? (
                      <div key={key} className="text-sm">
                        <span className="font-medium">{key}:</span> {String(value)}
                      </div>
                    ) : null
                )}
              </div>
            </div>
          )}

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
);

export default PreviewPanel;
