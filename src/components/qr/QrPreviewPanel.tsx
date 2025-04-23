
import React from "react";
import { Label } from "@/components/ui/label";
import { QrPreview } from "@/components/qr/QrPreview";
import type { QrFormValues } from "./QrFormSections";

interface QrPreviewPanelProps extends QrFormValues {}

const QrPreviewPanel: React.FC<QrPreviewPanelProps> = ({
  targetUrl,
  size,
  color,
  backgroundColor,
  logoUrl,
}) => (
  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-6">
    <Label className="mb-2 font-semibold text-lg text-blinkly-blue">Preview</Label>
    <div
      className="w-fit bg-white rounded-lg border p-4 shadow-inner"
      style={{ minHeight: size, minWidth: size }}
    >
      <QrPreview
        targetUrl={targetUrl}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
        logoUrl={logoUrl}
      />
    </div>
    <p className="mt-2 text-xs text-muted-foreground text-center">
      Your QR code updates as you type!
    </p>
  </div>
);

export default QrPreviewPanel;
