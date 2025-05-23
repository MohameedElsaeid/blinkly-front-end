
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    image?: string;
    author?: string;
    category?: string;
    readTime?: string;
}
