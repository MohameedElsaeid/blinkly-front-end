
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
