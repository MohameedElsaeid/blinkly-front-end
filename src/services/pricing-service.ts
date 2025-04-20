
import httpClient, { PackagesResponse } from '@/lib/http-client';

// Fetch function that will be used by React Query
export const fetchPricingPackages = async (): Promise<PackagesResponse> => {
  try {
    const data = await httpClient.getPackages();
    return data;
  } catch (error) {
    console.error('Error fetching pricing packages:', error);
    throw error;
  }
};
