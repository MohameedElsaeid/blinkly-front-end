
import React from "react";

// Use a public QR API for the preview. (For a real app, use a React QR generator lib.)
// Handles color, background, size and logo overlay via fallback if the API doesn't support all.

type QrPreviewProps = {
  targetUrl?: string; // Make targetUrl optional
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
  pattern?: string;
  cornerStyle?: string;
  frame?: string;
};

export const QrPreview: React.FC<QrPreviewProps> = ({
  targetUrl = "", // Provide empty string as default
  size = 300,
  color = "#000000",
  backgroundColor = "#FFFFFF",
  logoUrl,
  pattern = "square",
  cornerStyle = "standard",
  frame = "none",
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
  // Note: The pattern, cornerStyle, and frame would normally be implemented with a proper QR library
  // Here we're only modifying the URL for demo purposes - some features not fully supported by this API
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    targetUrl
  )}&color=${color.replace("#", "")}&bgcolor=${backgroundColor.replace("#", "")}`;

  // Add frame styles
  let frameStyles = {};
  if (frame !== "none") {
    frameStyles = {
      padding: "20px",
      border: `2px solid ${color}`,
      borderRadius: frame === "rounded" ? "12px" : "0",
    };
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div style={frameStyles} className="flex items-center justify-center">
        <img
          src={apiUrl}
          alt="QR code preview"
          width={frame !== "none" ? size - 40 : size}
          height={frame !== "none" ? size - 40 : size}
          className="rounded-lg transition"
          style={{ background: backgroundColor }}
          draggable={false}
        />
      </div>
      
      {frame === "scan-me" && (
        <div className="absolute -bottom-6 left-0 right-0 text-center bg-white py-1 text-xs font-bold rounded-b-lg border-t" style={{ color }}>
          SCAN ME
        </div>
      )}
      
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
