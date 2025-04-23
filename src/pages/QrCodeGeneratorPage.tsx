
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

import QrFormSections, { QrFormValues, QrLink } from "@/components/qr/QrFormSections";
import QrPreviewPanel from "@/components/qr/QrPreviewPanel";

// Validation schema with defaults
const formSchema = z.object({
  targetUrl: z.string().url("Enter a valid URL"),
  linkId: z.string().optional(),
  size: z.number().min(100, "Min: 100").max(2000, "Max: 2000").optional(),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Use valid hex").optional(),
  backgroundColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Use valid hex").optional(),
  logoUrl: z.string().url("Enter a valid image URL").or(z.literal("")).optional(),
});

const DEFAULTS = {
  size: 300,
  color: "#000000",
  backgroundColor: "#FFFFFF",
};

// Mock get user's links (replace with real API later)
const useUserLinks = (): QrLink[] => {
  const [links, setLinks] = useState<QrLink[]>([]);
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

export default function QrCodeGeneratorPage() {
  const links = useUserLinks();
  const [qrData, setQrData] = useState<QrFormValues>({
    targetUrl: "",
    linkId: "",
    size: DEFAULTS.size,
    color: DEFAULTS.color,
    backgroundColor: DEFAULTS.backgroundColor,
    logoUrl: "",
  });

  // Track if QR code is ready for download
  const [isQrReady, setIsQrReady] = useState(false);

  const { control, register, watch, setValue, formState: { errors } } = useForm<QrFormValues>({
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
    )}&color=${color?.replace("#", "")}&bgcolor=${backgroundColor?.replace("#", "")}`;
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <QrFormSections
                links={links}
                control={control}
                register={register}
                errors={errors}
                setValue={setValue}
                qrData={qrData}
                isQrReady={isQrReady}
                handleSubmit={handleSubmit}
                handleLinkChange={handleLinkChange}
                getQrImageUrl={getQrImageUrl}
              />
              <QrPreviewPanel
                targetUrl={qrData.targetUrl}
                size={qrData.size}
                color={qrData.color}
                backgroundColor={qrData.backgroundColor}
                logoUrl={qrData.logoUrl}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
// NOTE: This file is still over 100 lines and should be split further if it grows more.
