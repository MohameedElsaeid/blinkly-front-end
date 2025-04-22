import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Link} from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {BlogPost} from '@/types/blog';

// Temporary mock data - replace with actual API call when backend is ready
const mockPosts: BlogPost[] = [
    {
        "id": "1",
        "title": "Getting Started with URL Shortening",
        "content": "URL shortening transforms lengthy web addresses into concise, manageable links. This not only improves the aesthetics of your content but also enhances shareability across platforms. Learn how to effectively implement URL shortening in your campaigns to boost click-through rates and monitor user interactions.",
        "excerpt": "Discover how URL shortening can streamline your marketing efforts and enhance user engagement.",
        "slug": "getting-started-with-url-shortening",
        "publishedAt": "2025-04-22",
        "image": "https://source.unsplash.com/random/800x600?sig=1&topic=technology"
    },
    {
        "id": "2",
        "title": "Best Practices for Link Management",
        "content": "Effective link management involves organizing, tracking, and updating your URLs to ensure they remain functional and relevant. Discover strategies for categorizing links, setting expiration dates, and utilizing analytics to optimize your link performance.",
        "excerpt": "Master the art of managing your links to maintain a cohesive and effective digital presence.",
        "slug": "best-practices-for-link-management",
        "publishedAt": "2025-04-21",
        "image": "https://source.unsplash.com/random/800x600?sig=2&topic=technology"
    },
    {
        "id": "3",
        "title": "Why You Need Branded Short Links",
        "content": "Branded short links incorporate your company's name or a relevant keyword, making them easily identifiable and trustworthy. Explore the benefits of branded links, including increased click-through rates and enhanced brand visibility.",
        "excerpt": "Elevate your brand's credibility and recognition with customized short links.",
        "slug": "why-you-need-branded-short-links",
        "publishedAt": "2025-04-20",
        "image": "https://source.unsplash.com/random/800x600?sig=3&topic=technology"
    },
    {
        "id": "4",
        "title": "Understanding Click Analytics for Short Links",
        "content": "Click analytics provide valuable information about how users interact with your links. Learn how to interpret metrics such as click counts, geographic data, and referral sources to refine your marketing strategies.",
        "excerpt": "Gain insights into user behavior by analyzing click data from your shortened URLs.",
        "slug": "understanding-click-analytics-for-short-links",
        "publishedAt": "2025-04-19",
        "image": "https://source.unsplash.com/random/800x600?sig=4&topic=technology"
    },
    {
        "id": "5",
        "title": "Link Expiration and Redirection Types Explained",
        "content": "Implementing expiration dates on links ensures that outdated content is no longer accessible, while redirection types (301, 302, etc.) guide users appropriately. Understand how to use these tools to maintain a seamless user journey.",
        "excerpt": "Control your content's accessibility and user experience through link expiration and redirection techniques.",
        "slug": "link-expiration-and-redirection-types-explained",
        "publishedAt": "2025-04-18",
        "image": "https://source.unsplash.com/random/800x600?sig=5&topic=technology"
    },
    {
        "id": "6",
        "title": "Boost Campaign Success with UTM Parameters",
        "content": "UTM parameters help you identify which campaigns drive traffic and conversions. Learn how to construct UTM codes and integrate them into your shortened links for precise performance tracking.",
        "excerpt": "Track the effectiveness of your marketing campaigns by appending UTM parameters to your URLs.",
        "slug": "boost-campaign-success-with-utm-parameters",
        "publishedAt": "2025-04-17",
        "image": "https://source.unsplash.com/random/800x600?sig=6&topic=technology"
    },
    {
        "id": "7",
        "title": "The Importance of Custom Aliases in Link Shortening",
        "content": "Custom aliases replace random character strings with meaningful words or phrases, making links more user-friendly. Discover best practices for crafting aliases that align with your brand and content.",
        "excerpt": "Enhance link memorability and user trust by creating custom aliases for your shortened URLs.",
        "slug": "the-importance-of-custom-aliases-in-link-shortening",
        "publishedAt": "2025-04-16",
        "image": "https://source.unsplash.com/random/800x600?sig=7&topic=technology"
    },
    {
        "id": "8",
        "title": "How Short Links Improve Social Media Engagement",
        "content": "Short links are ideal for platforms with character limits and can be customized to include relevant keywords. Explore how to effectively use short links in your social media strategy to drive engagement.",
        "excerpt": "Optimize your social media presence by utilizing short links that encourage clicks and shares.",
        "slug": "how-short-links-improve-social-media-engagement",
        "publishedAt": "2025-04-15",
        "image": "https://source.unsplash.com/random/800x600?sig=8&topic=technology"
    },
    {
        "id": "9",
        "title": "Integrating Short Links into Email Marketing",
        "content": "Shortened URLs in emails reduce clutter and can be monitored for click-through rates. Learn how to seamlessly integrate short links into your email marketing efforts for improved performance.",
        "excerpt": "Enhance your email campaigns by incorporating short links that are trackable and aesthetically pleasing.",
        "slug": "integrating-short-links-into-email-marketing",
        "publishedAt": "2025-04-14",
        "image": "https://source.unsplash.com/random/800x600?sig=9&topic=technology"
    },
    {
        "id": "10",
        "title": "The Role of Short Links in Influencer Marketing",
        "content": "Providing influencers with branded short links allows for consistent messaging and easy tracking of campaign success. Understand how to implement this strategy to maximize your influencer partnerships.",
        "excerpt": "Empower influencers to promote your brand effectively using customized short links.",
        "slug": "the-role-of-short-links-in-influencer-marketing",
        "publishedAt": "2025-04-13",
        "image": "https://source.unsplash.com/random/800x600?sig=10&topic=technology"
    },
    {
        "id": "11",
        "title": "Enhancing SEO with Shortened URLs",
        "content": "While short links themselves don't directly impact SEO, using descriptive aliases and maintaining link integrity can support your overall search engine optimization strategy.",
        "excerpt": "Discover how properly structured short links can contribute to your website's SEO efforts.",
        "slug": "enhancing-seo-with-shortened-urls",
        "publishedAt": "2025-04-12",
        "image": "https://source.unsplash.com/random/800x600?sig=11&topic=technology"
    },
    {
        "id": "12",
        "title": "Utilizing Short Links for Event Promotion",
        "content": "Short links are perfect for promoting events across various channels. Learn how to create and distribute event-specific short URLs to maximize reach and participation.",
        "excerpt": "Drive attendance and engagement for your events by sharing concise, memorable URLs.",
        "slug": "utilizing-short-links-for-event-promotion",
        "publishedAt": "2025-04-11",
        "image": "https://source.unsplash.com/random/800x600?sig=12&topic=technology"
    },
    {
        "id": "13",
        "title": "Monitoring Link Performance Across Channels",
        "content": "Analyzing link performance helps you understand which channels drive the most traffic. Explore tools and techniques for monitoring your links to inform future marketing decisions.",
        "excerpt": "Track and compare the effectiveness of your links across different marketing platforms.",
        "slug": "monitoring-link-performance-across-channels",
        "publishedAt": "2025-04-10",
        "image": "https://source.unsplash.com/random/800x600?sig=13&topic=technology"
    },
    {
        "id": "14",
        "title": "The Security Advantages of Shortened URLs",
        "content": "Implementing secure short links prevents malicious redirections and builds trust with your users. Learn best practices for maintaining the security of your shortened URLs.",
        "excerpt": "Protect your audience and brand reputation by ensuring your short links are secure.",
        "slug": "the-security-advantages-of-shortened-urls",
        "publishedAt": "2025-04-09",
        "image": "https://source.unsplash.com/random/800x600?sig=14&topic=technology"
    },
    {
        "id": "15",
        "title": "Future Trends in URL Shortening and Link Management",
        "content": "As digital marketing evolves, so do the tools we use. Explore upcoming features and innovations in URL shortening and how they can benefit your marketing strategies.",
        "excerpt": "Stay ahead of the curve by understanding emerging trends in link shortening technology.",
        "slug": "future-trends-in-url-shortening-and-link-management",
        "publishedAt": "2025-04-08",
        "image": "https://source.unsplash.com/random/800x600?sig=15&topic=technology"
    }
];

const BlogPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
                    <div className="grid gap-6">
                        {mockPosts.map((post) => (
                            <Link key={post.id} to={`/blog/${post.slug}`}
                                  className="block transition-transform hover:-translate-y-1">
                                <Card>
                                    {post.image && (
                                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle>{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{post.excerpt}</p>
                                        <p className="text-sm text-gray-500 mt-4">
                                            Published on {new Date(post.publishedAt).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default BlogPage;
