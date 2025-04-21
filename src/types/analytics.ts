
export interface DistributionData {
  distribution: Record<string, number>;
  percentages: Record<string, number>;
}

export interface DeviceDistributionResponse {
  total_clicks: number;
  period_start: string;
  period_end: string;
  devices: DistributionData;
  browsers: DistributionData;
  operating_systems: DistributionData;
  browser_versions: DistributionData;
  os_versions: DistributionData;
  unique_devices: number;
  unique_browsers: number;
  unique_operating_systems: number;
}
