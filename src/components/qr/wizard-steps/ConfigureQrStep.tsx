
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { QrFormValues } from "../QrFormSections";

interface ConfigureQrStepProps {
  formData: QrFormValues;
  updateFormData: (data: Partial<QrFormValues>) => void;
  links: { id: string; alias: string; originalUrl: string }[];
  linksLoading: boolean;
  onNext: () => void;
}

const ConfigureQrStep: React.FC<ConfigureQrStepProps> = ({
  formData,
  updateFormData,
  links,
  linksLoading,
  onNext,
}) => {
  const [urlError, setUrlError] = useState("");
  const [useShortLink, setUseShortLink] = useState(false);

  const validateUrl = (url: string) => {
    // Basic URL validation
    try {
      new URL(url);
      setUrlError("");
      return true;
    } catch (e) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)");
      return false;
    }
  };

  const handleNext = () => {
    if (validateUrl(formData.targetUrl)) {
      onNext();
    }
  };

  const handleLinkChange = (linkId: string) => {
    if (linkId === "none") {
      updateFormData({ linkId: "" });
      return;
    }
    updateFormData({ linkId });
    if (linkId && links.length) {
      const picked = links.find((l) => l.id === linkId);
      if (picked) updateFormData({ targetUrl: picked.originalUrl });
    }
  };

  const handleToggleShortLink = (checked: boolean) => {
    setUseShortLink(checked);
    if (!checked) {
      updateFormData({ linkId: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Configure QR Code</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="targetUrl">Destination URL*</Label>
          <Input
            id="targetUrl"
            type="text"
            value={formData.targetUrl}
            onChange={(e) => updateFormData({ targetUrl: e.target.value })}
            placeholder="https://example.com"
            className={urlError ? "border-destructive" : ""}
          />
          {urlError && <p className="text-xs text-destructive">{urlError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Link Title (Optional)</Label>
          <Input
            id="title"
            type="text"
            value={formData.title || ""}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="My QR Code"
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="linkToggle">Link to short URL</Label>
          <Switch
            id="linkToggle"
            checked={useShortLink}
            onCheckedChange={handleToggleShortLink}
          />
        </div>

        {useShortLink && (
          <div className="space-y-2">
            <Label htmlFor="linkId">Choose a short link</Label>
            <Select
              value={formData.linkId || "none"}
              onValueChange={handleLinkChange}
              disabled={linksLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={linksLoading ? "Loading..." : "Choose a link"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {links.map(link => (
                  <SelectItem key={link.id} value={link.id}>
                    {link.alias} ({link.originalUrl})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext} 
          disabled={!formData.targetUrl}
          className="bg-blinkly-blue hover:bg-blinkly-purple"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConfigureQrStep;
