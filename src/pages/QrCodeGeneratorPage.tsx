
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
      const res = await httpClient.get("/api/links?page=1&limit=20");
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full p-4 md:p-8 mt-4">
        <Card>
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
