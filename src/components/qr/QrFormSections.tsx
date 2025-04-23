
import React from "react";
import { Controller, Control, UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import QrCodeDownloadButton from "@/components/qr/QrCodeDownloadButton";

export type QrLink = { id: string; alias: string; originalUrl: string };
export type QrFormValues = {
  targetUrl: string;
  linkId?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
};
interface QrFormSectionsProps {
  links: QrLink[];
  control: Control<QrFormValues>;
  register: UseFormRegister<QrFormValues>;
  errors: FieldErrors<QrFormValues>;
  setValue: UseFormSetValue<QrFormValues>;
  qrData: QrFormValues;
  isQrReady: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleLinkChange: (linkId: string) => void;
  getQrImageUrl: () => string;
}

const DEFAULTS = {
  size: 300,
  color: "#000000",
  backgroundColor: "#FFFFFF",
};

export const QrFormSections: React.FC<QrFormSectionsProps> = ({
  links,
  control,
  register,
  errors,
  setValue,
  qrData,
  isQrReady,
  handleSubmit,
  handleLinkChange,
  getQrImageUrl,
}) => (
  <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
    {/* LinkId dropdown */}
    <div>
      <Label htmlFor="linkId">Associate with Link (optional)</Label>
      <Controller
        control={control}
        name="linkId"
        render={({ field }) => (
          <Select value={field.value} onValueChange={handleLinkChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a link" />
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
        )}
      />
    </div>
    {/* Target URL */}
    <div>
      <Label htmlFor="targetUrl">URL to encode</Label>
      <Input
        {...register("targetUrl")}
        id="targetUrl"
        type="text"
        placeholder="https://example.com"
        className={errors.targetUrl ? "border-destructive" : ""}
      />
      {errors.targetUrl && <p className="text-xs text-destructive mt-1">{errors.targetUrl.message}</p>}
    </div>
    {/* Size */}
    <div>
      <Label htmlFor="size">Size ({qrData.size || DEFAULTS.size}px)</Label>
      <Controller
        control={control}
        name="size"
        render={({ field }) => (
          <Slider
            min={100}
            max={2000}
            step={10}
            value={[field.value || DEFAULTS.size]}
            onValueChange={val => field.onChange(val[0])}
          />
        )}
      />
      {errors.size && <p className="text-xs text-destructive mt-1">{errors.size.message}</p>}
    </div>
    {/* Color & BG Color */}
    <div className="flex flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="color">Color</Label>
        <Input
          {...register("color")}
          id="color"
          type="color"
          defaultValue={DEFAULTS.color}
        />
        {errors.color && <p className="text-xs text-destructive mt-1">{errors.color.message}</p>}
      </div>
      <div className="flex-1">
        <Label htmlFor="backgroundColor">Background</Label>
        <Input
          {...register("backgroundColor")}
          id="backgroundColor"
          type="color"
          defaultValue={DEFAULTS.backgroundColor}
        />
        {errors.backgroundColor && <p className="text-xs text-destructive mt-1">{errors.backgroundColor.message}</p>}
      </div>
    </div>
    {/* Logo URL */}
    <div>
      <Label htmlFor="logoUrl">Logo URL (optional)</Label>
      <Input
        {...register("logoUrl")}
        id="logoUrl"
        type="text"
        placeholder="https://your-logo.com/logo.png"
      />
      {errors.logoUrl && <p className="text-xs text-destructive mt-1">{errors.logoUrl.message}</p>}
    </div>
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-blinkly-blue hover:bg-blinkly-purple text-white font-bold"
      >
        Generate QR Code
      </Button>
      {isQrReady && (
        <QrCodeDownloadButton 
          qrImageUrl={getQrImageUrl()} 
          size={qrData.size} 
          filename={`qr-code-${Date.now()}.png`} 
        />
      )}
    </div>
  </form>
);

export default QrFormSections;
