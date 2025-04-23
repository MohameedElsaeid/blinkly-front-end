
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QrCodeDownloadButtonProps {
  qrImageUrl: string;
  size?: number;
  filename?: string;
}

const QrCodeDownloadButton: React.FC<QrCodeDownloadButtonProps> = ({
  qrImageUrl,
  size = 300,
  filename = "qr-code.png"
}) => {
  const handleDownload = async () => {
    try {
      // Trigger download of QR image
      const response = await fetch(qrImageUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDownload}
      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold"
      size="lg"
    >
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  );
};

export default QrCodeDownloadButton;
