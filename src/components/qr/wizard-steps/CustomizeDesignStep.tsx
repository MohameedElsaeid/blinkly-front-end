import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QrFormValues } from "../QrFormSections";
import { QrPreview } from "../QrPreview";
import { Square, Circle, SquareDashed, CircleDashed, Hexagon, Octagon, Star, Triangle, SquareCheck, CircleCheck, SquareX, CircleX, Frame, Upload } from "lucide-react";

interface CustomizeDesignStepProps {
  formData: QrFormValues;
  updateFormData: (data: Partial<QrFormValues>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const patterns = [
  { id: "square", icon: Square, label: "Square" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "squareDashed", icon: SquareDashed, label: "Dashed Square", premium: true },
  { id: "circleDashed", icon: CircleDashed, label: "Dashed Circle", premium: true },
];

const corners = [
  { id: "standard", label: "Standard" },
  { id: "rounded", label: "Rounded" },
  { id: "dot", label: "Dot", premium: true },
  { id: "classy", label: "Classy", premium: true },
];

const frames = [
  { id: "none", label: "None" },
  { id: "basic", label: "Basic" },
  { id: "rounded", label: "Rounded" },
  { id: "scan-me", label: "Scan Me", premium: true },
];

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const CustomizeDesignStep: React.FC<CustomizeDesignStepProps> = ({
  formData,
  updateFormData,
  onBack,
  onSubmit,
}) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        alert("Logo file must be less than 5MB");
        return;
      }
      
      const logoUrl = URL.createObjectURL(file);
      updateFormData({ logoUrl });
    }
  };

  const handleLogoUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    
    if (!url) {
      updateFormData({ logoUrl: "" });
      return;
    }
    
    let formattedUrl = url;
    if (!url.startsWith('http')) {
      formattedUrl = `https://${url}`;
    }
    
    updateFormData({ logoUrl: formattedUrl });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Customize Design</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Patterns</Label>
            <div className="grid grid-cols-4 gap-2">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className={`border rounded-md p-2 flex flex-col items-center cursor-pointer ${
                    formData.pattern === pattern.id ? "border-blue-500 bg-blue-50" : ""
                  } ${pattern.premium ? "opacity-70" : ""}`}
                  onClick={() => !pattern.premium && updateFormData({ pattern: pattern.id })}
                >
                  <pattern.icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{pattern.label}</span>
                  {pattern.premium && (
                    <span className="text-[10px] text-blue-600 font-semibold">Premium</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Corners</Label>
            <RadioGroup
              value={formData.cornerStyle || "standard"}
              onValueChange={(value) => updateFormData({ cornerStyle: value })}
              className="grid grid-cols-2 gap-2"
            >
              {corners.map((corner) => (
                <div
                  key={corner.id}
                  className={`border rounded-md p-2 flex items-center ${
                    corner.premium ? "opacity-70" : ""
                  }`}
                >
                  <RadioGroupItem
                    value={corner.id}
                    id={`corner-${corner.id}`}
                    disabled={corner.premium}
                  />
                  <Label
                    htmlFor={`corner-${corner.id}`}
                    className={`ml-2 ${corner.premium ? "flex items-center" : ""}`}
                  >
                    {corner.label}
                    {corner.premium && (
                      <span className="text-[10px] text-blue-600 font-semibold ml-1">Premium</span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Code Color</Label>
              <Input
                id="color"
                type="color"
                value={formData.color || "#000000"}
                onChange={(e) => updateFormData({ color: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={formData.backgroundColor || "#FFFFFF"}
                onChange={(e) => updateFormData({ backgroundColor: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logo (Optional)</Label>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter logo URL (https://example.com/logo.png)"
                value={formData.logoUrl || ""}
                onChange={handleLogoUrlInput}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">
                Or upload a file:
              </div>
              <label 
                htmlFor="logoUpload" 
                className="cursor-pointer flex items-center justify-center border border-dashed rounded-md p-3 w-full hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                <span className="text-sm">Upload Logo (PNG, max 5MB)</span>
              </label>
              <input
                id="logoUpload"
                type="file"
                accept="image/png"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
            {formData.logoUrl && (
              <div className="flex items-center mt-2">
                <img src={formData.logoUrl} className="h-8 w-8 object-contain mr-2" alt="Logo preview" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateFormData({ logoUrl: "" })}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Frame</Label>
            <RadioGroup
              value={formData.frame || "none"}
              onValueChange={(value) => updateFormData({ frame: value })}
              className="grid grid-cols-2 gap-2"
            >
              {frames.map((frame) => (
                <div
                  key={frame.id}
                  className={`border rounded-md p-2 flex items-center ${
                    frame.premium ? "opacity-70" : ""
                  }`}
                >
                  <RadioGroupItem
                    value={frame.id}
                    id={`frame-${frame.id}`}
                    disabled={frame.premium}
                  />
                  <Label
                    htmlFor={`frame-${frame.id}`}
                    className={`ml-2 ${frame.premium ? "flex items-center" : ""}`}
                  >
                    {frame.label}
                    {frame.premium && (
                      <span className="text-[10px] text-blue-600 font-semibold ml-1">Premium</span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 bg-slate-50 rounded-xl p-6">
          <Label className="font-semibold">Live Preview</Label>
          <div className="bg-white rounded-lg p-4 shadow-inner" style={{ minHeight: 250, minWidth: 250 }}>
            <QrPreview
              targetUrl={formData.targetUrl}
              size={250}
              color={formData.color}
              backgroundColor={formData.backgroundColor}
              logoUrl={formData.logoUrl}
              pattern={formData.pattern}
              cornerStyle={formData.cornerStyle}
              frame={formData.frame}
            />
          </div>
          <p className="text-xs text-muted-foreground">Preview updates as you customize</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onSubmit} 
          className="bg-blinkly-blue hover:bg-blinkly-purple"
        >
          Create QR Code
        </Button>
      </div>
    </div>
  );
};

export default CustomizeDesignStep;
