import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import QrFormSections, { QrFormValues, QrLink } from "@/components/qr/QrFormSections";
import QrPreviewPanel from "@/components/qr/QrPreviewPanel";
import { useCreateQrCode, QrCodeApiPayload } from "@/hooks/useCreateQrCode";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/http-client";

const formSchema = z.object({
  targetUrl: z.string().url("Enter a valid URL"),
  linkId: z.string().uuid().optional(),
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

interface LinksResponse {
  links: QrLink[];
}

export default function QrCodeGeneratorPage() {
  // Fetch actual user links (paginated, fetch first page with size 20)
  const { data: linksData, isLoading: linksLoading } = useQuery<LinksResponse>({
    queryKey: ["qr-links"],
    queryFn: async () => {
      const res = await httpClient.get("/api/links?page=1&limit=20");
      // Format to match QrLink[]
      return {
        links: res?.links?.map((l: any) => ({
          id: l.id,
          alias: l.alias,
          originalUrl: l.originalUrl,
        })) ?? []
      };
    },
  });

  const links: QrLink[] = linksData?.links ?? [];

  const [qrData, setQrData] = useState<QrFormValues>({
    targetUrl: "",
    linkId: "",
    size: DEFAULTS.size,
    color: DEFAULTS.color,
    backgroundColor: DEFAULTS.backgroundColor,
    logoUrl: "",
  });
  const [isQrReady, setIsQrReady] = useState(false);

  const [apiQrImageUrl, setApiQrImageUrl] = useState<string>("");
  const lastPayloadRef = useRef<QrCodeApiPayload | null>(null);

  const { control, register, watch, setValue, formState: { errors } } = useForm<QrFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: qrData,
    mode: "onChange"
  });

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
    setIsQrReady(!!newQrData.targetUrl);
  }, [watched]);

  // When "None" is selected or empty is passed, clear the linkId state
  const handleLinkChange = (linkId: string) => {
    if (!linkId) {
      setValue("linkId", undefined);
      return;
    }
    setValue("linkId", linkId);
    if (linkId && links.length) {
      const picked = links.find((l) => l.id === linkId);
      if (picked) setValue("targetUrl", picked.originalUrl);
    }
  };

  // ==== API integration ====
  const createQrCodeMutation = useCreateQrCode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build the payload for the API
    const payload: QrCodeApiPayload = {
      targetUrl: qrData.targetUrl,
      linkId: qrData.linkId || undefined,
      size: qrData.size || DEFAULTS.size,
      color: qrData.color || DEFAULTS.color,
      backgroundColor: qrData.backgroundColor || DEFAULTS.backgroundColor,
      logoUrl: qrData.logoUrl || undefined,
    };
    lastPayloadRef.current = payload;

    createQrCodeMutation.mutate(payload, {
      onSuccess: (response) => {
        setApiQrImageUrl(response.imageUrl);
        toast({
          title: "QR Code Created!",
          description: "Your QR code has been successfully created. You can now download it.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Failed to generate QR code",
          description: error?.message || "Please check your settings and try again.",
          variant: "destructive",
        });
      }
    });
  };

  const getQrImageUrl = () => {
    if (apiQrImageUrl) return apiQrImageUrl;
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
                linksLoading={linksLoading}
              />
              <QrPreviewPanel
                targetUrl={qrData.targetUrl}
                size={qrData.size}
                color={qrData.color}
                backgroundColor={qrData.backgroundColor}
                logoUrl={qrData.logoUrl}
              />
            </div>
            {createQrCodeMutation.isPending && (
              <div className="flex justify-center items-center mt-4">
                <span className="text-muted-foreground animate-pulse">Generating QR code...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
