export type RedirectType = 301 | 302;

export interface LinkCreationData {
  originalUrl: string;
  alias?: string;
  tags?: string[];
  redirectType?: RedirectType;
  expiresAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  description?: string;
}

export interface Link {
  id: string;
  originalUrl: string;
  alias: string;
  isActive: boolean;
  tags: string[];
  clickCount: number;
  redirectType: RedirectType;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LinksResponse {
  links: Link[];
  pagination: PaginationInfo;
}

export interface UserDevice {
  id: string;
  userId: string | null;
  deviceId: string;
  xDeviceMemory: number;
  xPlatform: string;
  xScreenWidth: number;
  xScreenHeight: number;
  xColorDepth: number;
  xTimeZone: string;
}

export interface ClickEvent {
  id: string;
  timestamp: string;
  userId: string | null;
  userDeviceId: string;
  userDevice: UserDevice;
  linkId: string;
  host: string;
  requestTime: string;
  referer: string;
  userAgent: string;
  geoCountry: string | null;
  geoCity: string | null;
}

export interface Analytics {
  totalClicks: number;
  uniqueDevices: number;
  clicksByCountry: Record<string, number>;
  clicksByCity: Record<string, number>;
  clicksByBrowser: Record<string, number>;
  clicksByDevice: Record<string, number>;
  clicksByOS: Record<string, number>;
  clicksByDate: Record<string, number>;
  recentClicks: ClickEvent[];
}

export interface LinkDetails extends Link {
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  description: string;
  clickEvents: ClickEvent[];
  analytics: Analytics;
}

export interface TopLink {
  id: string;
  alias: string;
  originalUrl: string;
  clickCount: number;
}

export interface TopLinksResponse {
  links: TopLink[];
}
