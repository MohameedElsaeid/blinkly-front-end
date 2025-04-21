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
