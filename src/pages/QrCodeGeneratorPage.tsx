
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { QrPreview } from "@/components/qr/QrPreview";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import QrCodeDownloadButton from "@/components/qr/QrCodeDownloadButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Validation schema with defaults
const formSchema = z.object({
  targetUrl: z.string().url("Enter a valid URL"),
  linkId: z.string().optional(),
  size: z.number().min(100, "Min: 100").max(2000, "Max: 2000").optional(),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Use valid hex").optional(),
  backgroundColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Use valid hex").optional(),
  logoUrl: z.string().url("Enter a valid image URL").or(z.literal("")).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock get user's links (replace with real API later)
const useUserLinks = () => {
  const [links, setLinks] = useState<{ id: string; alias: string; originalUrl: string }[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setLinks([
        { id: "abc123", alias: "my-link", originalUrl: "https://google.com" },
        { id: "def456", alias: "company-site", originalUrl: "https://blinkly.app" }
      ]);
    }, 400);
  }, []);
  return links;
};

const DEFAULTS = {
  size: 300,
  color: "#000000",
  backgroundColor: "#FFFFFF",
};

export default function QrCodeGeneratorPage() {
  const links = useUserLinks();
  const [qrData, setQrData] = useState<FormValues>({
    targetUrl: "",
    linkId: "",
    size: DEFAULTS.size,
    color: DEFAULTS.color,
    backgroundColor: DEFAULTS.backgroundColor,
    logoUrl: "",
  });
  
  // Track if QR code is ready for download
  const [isQrReady, setIsQrReady] = useState(false);

  const { control, register, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: qrData,
    mode: "onChange"
  });

  // Live watch for form changes to update preview
  const watched = watch();
  useEffect(() => {
    const newQrData = {
      ...watched,
      size: watched.size || DEFAULTS.size,
      color: watched.color || DEFAULTS.color,
      backgroundColor: watched.backgroundColor || DEFAULTS.backgroundColor,
      logoUrl: watched.logoUrl || "",
    };
    
    setQrData(newQrData);
    
    // QR is ready if we have a target URL
    setIsQrReady(!!newQrData.targetUrl);
  }, [watched]);

  // When user picks a link, set targetUrl to its originalUrl
  const handleLinkChange = (linkId: string) => {
    setValue("linkId", linkId);
    if (linkId && links.length) {
      const picked = links.find((l) => l.id === linkId);
      if (picked) setValue("targetUrl", picked.originalUrl);
    }
  };

  // Demo submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "QR Code Ready!",
      description: "Your QR code is ready for download.",
    });
  };

  // Get QR image URL for download
  const getQrImageUrl = () => {
    const { targetUrl, size, color, backgroundColor } = qrData;
    if (!targetUrl) return "";
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      targetUrl
    )}&color=${color.replace("#", "")}&bgcolor=${backgroundColor.replace("#", "")}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full p-4 md:p-8 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-blinkly-blue">
              Generate QR Code
            </CardTitle>
            <p className="text-muted-foreground">
              Customize your own QR code and download instantly
            </p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit} autoComplete="off">
              <div className="space-y-5">
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
                          <SelectItem value="">None</SelectItem>
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
                  <Label htmlFor="size">Size ({qrData.size}px)</Label>
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
              </div>
              {/* Live QR Preview */}
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-6">
                <Label className="mb-2 font-semibold text-lg text-blinkly-blue">Preview</Label>
                <div
                  className="w-fit bg-white rounded-lg border p-4 shadow-inner"
                  style={{ minHeight: qrData.size, minWidth: qrData.size }}
                >
                  <QrPreview {...qrData} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground text-center">Your QR code updates as you type!</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
