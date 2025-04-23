
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/lib/http-client";

export interface QrCodeApiPayload {
  targetUrl: string;
  linkId?: string;
  title?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
  pattern?: string;
  cornerStyle?: string;
  frame?: string;
}

export interface QrCodeApiResponse {
  imageUrl: string;  // This assumes the backend returns the image URL, update as needed
  // You can extend this interface if backend returns more fields
}

// Helper to validate URL format
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export function useCreateQrCode() {
  return useMutation({
    mutationFn: async (payload: QrCodeApiPayload): Promise<QrCodeApiResponse> => {
      // Validate and format the payload before sending to API
      const formattedPayload = { ...payload };
      
      // Remove logoUrl if empty or invalid
      if (formattedPayload.logoUrl) {
        if (!isValidUrl(formattedPayload.logoUrl)) {
          delete formattedPayload.logoUrl;
        }
      }
      
      // This will include Bearer auth via httpClient
      return await httpClient.post<QrCodeApiResponse>("/api/qr", formattedPayload);
    }
  });
}
