import {RedirectType} from './link';

export interface PlatformRule {
    platform: string;
    url: string;
}

export interface UtmParameters {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
}

export interface DynamicLinkCreationData {
    name: string;
    alias: string;
    defaultUrl: string;
    rules?: PlatformRule[];
    utmParameters?: UtmParameters;
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: string;
    tags?: string[];
    deepLinkPath?: string;
    expiresAt?: string;
}

export interface DynamicLink extends DynamicLinkCreationData {
    id: string;
    isActive: boolean;
    clickCount: number;
    redirectType: RedirectType;
    createdAt: string;
    updatedAt: string;
}

export interface DynamicLinkDetails extends DynamicLink {
    analytics: {
        totalClicks: number;
        clicksByPlatform: Record<string, number>;
        clicksByDate: Record<string, number>;
    };
}

export interface DynamicLinksResponse {
    links: DynamicLink[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
