
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { QrFormValues } from "../QrFormSections";
import { QrPreview } from "../QrPreview";

interface PreviewSaveStepProps {
  formData: QrFormValues;
  generatedQrUrl?: string;
  isGenerating: boolean;
  onBack: () => void;
}

const isSvg = (url: string) => url.toLowerCase().endsWith(".svg");
const isPng = (url: string) => url.toLowerCase().endsWith(".png") || url.toLowerCase().endsWith(".jpg") || url.toLowerCase().endsWith(".jpeg") || url.toLowerCase().endsWith(".webp");

const PreviewSaveStep: React.FC<PreviewSaveStepProps> = ({
  formData,
  generatedQrUrl,
  isGenerating,
  onBack,
}) => {
  // get the right download url and infer type
  const getAvailableFormats = () => {
    if (!generatedQrUrl) {
      // Both preview API endpoints are available (png/svg)
      return { png: true, svg: true };
    }
    // Check backend url extension
    return {
      png: isPng(generatedQrUrl),
      svg: isSvg(generatedQrUrl),
    };
  };

  const handleDownload = async (format: "png" | "svg") => {
    try {
      let downloadUrl = "";

      if (generatedQrUrl) {
        // Use backend url, regardless of selected format since backend only returns one actual asset
        downloadUrl = generatedQrUrl;
      } else {
        // Fallback to QR preview api
        const { targetUrl, size, color, backgroundColor } = formData;
        if (!targetUrl) return;
        downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
          targetUrl
        )}&color=${color?.replace("#", "")}&bgcolor=${backgroundColor?.replace("#", "")}&format=${format}`;
      }

      const response = await fetch(downloadUrl, { mode: "cors" });
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const extension = format === "svg" ? "svg" : "png";
      // If the file is not SVG but user requested SVG, fallback to PNG
      const extOut = (contentType && contentType.includes("svg")) ? "svg" : "png";
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `qr-code-${Date.now()}.${extOut}`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading QR code:`, error);
    }
  };

  const getPreviewUrl = () => {
    const { targetUrl, size, color, backgroundColor } = formData;
    if (!targetUrl) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      targetUrl
    )}&color=${color?.replace("#", "")}&bgcolor=${backgroundColor?.replace("#", "")}`;
  };

  const available = getAvailableFormats();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Preview & Save</h2>
      
      <div className="flex flex-col items-center space-y-6">
        {isGenerating ? (
          <div className="animate-pulse flex flex-col items-center justify-center h-64 w-64 bg-slate-100 rounded-lg">
            <p className="text-center text-muted-foreground">Generating QR code...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-8 shadow-sm max-w-md mx-auto">
            <QrPreview
              targetUrl={formData.targetUrl}
              size={300}
              color={formData.color}
              backgroundColor={formData.backgroundColor}
              logoUrl={formData.logoUrl}
              pattern={formData.pattern}
              cornerStyle={formData.cornerStyle}
              frame={formData.frame}
            />
          </div>
        )}
        
        <div className="space-y-2 w-full max-w-md">
          {formData.title && (
            <h3 className="text-lg font-medium text-center">{formData.title}</h3>
          )}
          <p className="text-sm text-muted-foreground text-center truncate">
            {formData.targetUrl}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          {available.png && (
            <Button 
              onClick={() => handleDownload("png")} 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isGenerating}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
          )}
          {available.svg && (
            <Button 
              onClick={() => handleDownload("svg")} 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isGenerating}
            >
              <Download className="mr-2 h-4 w-4" />
              Download SVG
            </Button>
          )}
          <Button 
            className="flex-1 bg-blinkly-blue hover:bg-blinkly-purple"
            disabled={isGenerating}
          >
            <Save className="mr-2 h-4 w-4" />
            Save to Library
          </Button>
        </div>
      </div>
      
      <div className="flex justify-start pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Design
        </Button>
      </div>
    </div>
  );
};

export default PreviewSaveStep;

