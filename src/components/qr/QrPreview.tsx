
import React from "react";

// Use a public QR API for the preview. (For a real app, use a React QR generator lib.)
// Handles color, background, size and logo overlay via fallback if the API doesn't support all.

type QrPreviewProps = {
  targetUrl?: string; // Make targetUrl optional
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
};

export const QrPreview: React.FC<QrPreviewProps> = ({
  targetUrl = "", // Provide empty string as default
  size = 300,
  color = "#000000",
  backgroundColor = "#FFFFFF",
  logoUrl,
}) => {
  if (!targetUrl) {
    // Show a placeholder QR or instruction
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-8 text-muted-foreground">
        <span className="text-5xl">📷</span>
        <span className="mt-2 text-sm">QR code will appear here</span>
      </div>
    );
  }

  // Use goqr.me API for easy preview
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    targetUrl
  )}&color=${color.replace("#", "")}&bgcolor=${backgroundColor.replace("#", "")}`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <img
        src={apiUrl}
        alt="QR code preview"
        width={size}
        height={size}
        className="rounded-lg transition"
        style={{ background: backgroundColor }}
        draggable={false}
      />
      {logoUrl && (
        <img
          src={logoUrl}
          alt="Logo overlay"
          className="absolute rounded-full shadow-md"
          style={{
            top: "50%",
            left: "50%",
            width: size / 4,
            height: size / 4,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            objectFit: "contain",
            background: "#fff",
          }}
          draggable={false}
        />
      )}
    </div>
  );
};
