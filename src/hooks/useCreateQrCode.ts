
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/lib/http-client";

export interface QrCodeApiPayload {
  targetUrl: string;
  linkId?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
}

export interface QrCodeApiResponse {
  imageUrl: string;  // This assumes the backend returns the image URL, update as needed
  // You can extend this interface if backend returns more fields
}

export function useCreateQrCode() {
  return useMutation({
    mutationFn: async (payload: QrCodeApiPayload): Promise<QrCodeApiResponse> => {
      // This will include Bearer auth via httpClient
      return await httpClient.post<QrCodeApiResponse>("/api/qr", payload);
    }
  });
}
