
export interface Plan {
    id: string;
    name: string;
    billingFrequency: string;
    price: number;
    description: string;
    features: string;
    shortenedLinksLimit: number;
    qrCodesLimit: number;
    freeTrialAvailable: boolean;
    freeTrialDays: number | null;
    isMostPopular: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Subscription {
    id: string;
    plan: Plan;
    startDate: string;
    endDate: string | null;
    status: string;
    autoRenew: boolean;
    stripeSubscriptionId: string | null;
    source: string | null;
    stripeCustomerId: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface UsageItem {
    count: number;
    limit: number;
    remaining: number;
}

export interface Usage {
    links: UsageItem;
    dynamicLinks: UsageItem;
    qrCodes: UsageItem;
}

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    ipAddress: string | null;
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    dateOfBirth: string | null;
    address: string | null;
    city: string | null;
    postalCode: string | null;
    profilePicture: string | null;
    bio: string | null;
    preferredLanguage: string;
    timezone: string;
    activeSubscription: Subscription;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    usage: Usage;
}

export interface UpdateUserProfileRequest {
    firstName?: string;
    lastName?: string;
    countryCode?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    bio?: string;
    preferredLanguage?: string;
    timezone?: string;
}
