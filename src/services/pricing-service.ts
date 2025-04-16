
import httpClient, { PackagesResponse } from '@/lib/http-client';

export const fetchPricingPackages = async (): Promise<PackagesResponse> => {
  try {
    const data = await httpClient.getPackages();
    return data;
  } catch (error) {
    console.error('Error fetching pricing packages:', error);
    throw error;
  }
};
