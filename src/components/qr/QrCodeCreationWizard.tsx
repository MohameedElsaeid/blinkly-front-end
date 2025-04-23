
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, Save } from "lucide-react";
import ConfigureQrStep from "./wizard-steps/ConfigureQrStep";
import CustomizeDesignStep from "./wizard-steps/CustomizeDesignStep";
import PreviewSaveStep from "./wizard-steps/PreviewSaveStep";
import { QrFormValues } from "./QrFormSections";
import { QrCodeApiPayload } from "@/hooks/useCreateQrCode";

type WizardStep = "configure" | "customize" | "preview";

interface QrCodeCreationWizardProps {
  links: { id: string; alias: string; originalUrl: string }[];
  linksLoading: boolean;
  onSubmit: (payload: QrCodeApiPayload) => void;
  generatedQrUrl?: string;
  isGenerating: boolean;
}

const DEFAULTS = {
  size: 300,
  color: "#000000",
  backgroundColor: "#FFFFFF",
};

const QrCodeCreationWizard: React.FC<QrCodeCreationWizardProps> = ({
  links,
  linksLoading,
  onSubmit,
  generatedQrUrl,
  isGenerating,
}) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>("configure");
  const [formData, setFormData] = useState<QrFormValues>({
    targetUrl: "",
    title: "",
    linkId: "",
    size: DEFAULTS.size,
    color: DEFAULTS.color,
    backgroundColor: DEFAULTS.backgroundColor,
    logoUrl: "",
    pattern: "square",
    cornerStyle: "standard",
    frame: "none",
  });

  const goToNextStep = () => {
    if (currentStep === "configure") setCurrentStep("customize");
    else if (currentStep === "customize") setCurrentStep("preview");
  };

  const goToPreviousStep = () => {
    if (currentStep === "customize") setCurrentStep("configure");
    else if (currentStep === "preview") setCurrentStep("customize");
  };

  const handleSubmit = () => {
    const payload: QrCodeApiPayload = {
      targetUrl: formData.targetUrl,
      linkId: formData.linkId || undefined,
      size: formData.size,
      color: formData.color,
      backgroundColor: formData.backgroundColor,
      logoUrl: formData.logoUrl || undefined,
      title: formData.title,
      pattern: formData.pattern,
      cornerStyle: formData.cornerStyle,
      frame: formData.frame,
    };
    onSubmit(payload);
    // Move to preview step after submitting
    setCurrentStep("preview");
  };

  const updateFormData = (newData: Partial<QrFormValues>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "configure":
        return (
          <ConfigureQrStep
            formData={formData}
            updateFormData={updateFormData}
            links={links}
            linksLoading={linksLoading}
            onNext={goToNextStep}
          />
        );
      case "customize":
        return (
          <CustomizeDesignStep
            formData={formData}
            updateFormData={updateFormData}
            onBack={goToPreviousStep}
            onSubmit={handleSubmit}
          />
        );
      case "preview":
        return (
          <PreviewSaveStep
            formData={formData}
            generatedQrUrl={generatedQrUrl}
            isGenerating={isGenerating}
            onBack={goToPreviousStep}
          />
        );
      default:
        return null;
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center w-full">
          <div className={`p-2 rounded-full ${currentStep === "configure" ? "bg-blinkly-blue text-white" : "bg-gray-200"}`}>
            1
          </div>
          <div className={`h-1 flex-1 ${currentStep !== "configure" ? "bg-blinkly-blue" : "bg-gray-200"}`}></div>
          <div className={`p-2 rounded-full ${currentStep === "customize" ? "bg-blinkly-blue text-white" : "bg-gray-200"}`}>
            2
          </div>
          <div className={`h-1 flex-1 ${currentStep === "preview" ? "bg-blinkly-blue" : "bg-gray-200"}`}></div>
          <div className={`p-2 rounded-full ${currentStep === "preview" ? "bg-blinkly-blue text-white" : "bg-gray-200"}`}>
            3
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {renderProgressIndicator()}
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};

export default QrCodeCreationWizard;
