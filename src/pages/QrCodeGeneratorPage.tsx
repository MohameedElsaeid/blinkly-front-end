
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useCreateQrCode, QrCodeApiPayload } from "@/hooks/useCreateQrCode";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/http-client";
import QrCodeCreationWizard from "@/components/qr/QrCodeCreationWizard";
import { QrLink } from "@/components/qr/QrFormSections";

// Define the expected API response type
interface LinksResponse {
  links: QrLink[];
}

export default function QrCodeGeneratorPage() {
  // Fetch actual user links (paginated, fetch first page with size 20)
  const { data: linksData, isLoading: linksLoading } = useQuery<LinksResponse>({
    queryKey: ["qr-links"],
    queryFn: async () => {
      const res = await httpClient.get<{ links: any[] }>("/api/links?page=1&limit=20");
      // Format to match QrLink[]
      return {
        links: (res?.links ?? []).map((l: any) => ({
          id: l.id,
          alias: l.alias,
          originalUrl: l.originalUrl,
        })),
      };
    },
  });

  const links: QrLink[] = linksData?.links ?? [];
  const [apiQrImageUrl, setApiQrImageUrl] = useState<string>("");
  const lastPayloadRef = useRef<QrCodeApiPayload | null>(null);

  // ==== API integration ====
  const createQrCodeMutation = useCreateQrCode();

  const handleSubmit = async (payload: QrCodeApiPayload) => {
    // Ensure we're submitting valid data
    const validatedPayload = { ...payload };
    
    // Make sure URLs are properly formatted
    if (validatedPayload.logoUrl && !validatedPayload.logoUrl.startsWith("http")) {
      // Either fix the URL format by adding http:// prefix or remove it
      if (validatedPayload.logoUrl.includes(".")) {
        validatedPayload.logoUrl = `https://${validatedPayload.logoUrl}`;
      } else {
        delete validatedPayload.logoUrl;
      }
    }
    
    lastPayloadRef.current = validatedPayload;

    createQrCodeMutation.mutate(validatedPayload, {
      onSuccess: (response) => {
        setApiQrImageUrl(response.imageUrl);
        toast({
          title: "QR Code Created!",
          description: "Your QR code has been successfully created. You can now download it.",
        });
      },
      onError: (error: any) => {
        console.error("QR code generation error:", error);
        const errorMessage = error?.response?.data?.message || 
                            error?.message || 
                            "Please check your settings and try again.";
                            
        toast({
          title: "Failed to generate QR code",
          description: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="w-full p-4 md:p-8 mt-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-blinkly-blue">
              Generate QR Code
            </CardTitle>
            <p className="text-muted-foreground">
              Create, customize, and download professional QR codes in three easy steps
            </p>
          </CardHeader>
          <CardContent>
            <QrCodeCreationWizard
              links={links}
              linksLoading={linksLoading}
              onSubmit={handleSubmit}
              generatedQrUrl={apiQrImageUrl}
              isGenerating={createQrCodeMutation.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

