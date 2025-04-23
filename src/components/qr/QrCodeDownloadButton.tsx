
import React from "react";

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
    // Trigger download of QR image (works with external/public image)
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
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="px-3 py-2 rounded bg-blinkly-blue text-white font-semibold hover:bg-blinkly-purple transition"
    >
      Download QR Code
    </button>
  );
};

export default QrCodeDownloadButton;
