import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Skeleton} from "@/components/ui/skeleton";
import type {BlogPost} from '@/types/blog';
import {ArrowLeft} from 'lucide-react';
import {Helmet} from "react-helmet-async";
import BlogPostMeta from "@/components/blog/BlogPostMeta";
import BlogPostContent from "@/components/blog/BlogPostContent";

const mockPosts: BlogPost[] = [
    {
        "id": "1",
        "title": "Getting Started with URL Shortening",
        "content": "URL shortening transforms lengthy web addresses into concise, manageable links. This not only improves the aesthetics of your content but also enhances shareability across platforms. Learn how to effectively implement URL shortening in your campaigns to boost click-through rates and monitor user interactions.",
        "excerpt": "Discover how URL shortening can streamline your marketing efforts and enhance user engagement.",
        "slug": "getting-started-with-url-shortening",
        "publishedAt": "2025-04-22",
        "image": "https://blinkly.app/lovable-uploads/blog/getting-started-with-url-shortening-min.png",
        "author": "Alex Johnson",
        "category": "Guides",
        "readTime": "5 min read"
    },
    {
        "id": "2",
        "title": "Best Practices for Link Management",
        "content": "Effective link management involves organizing, tracking, and updating your URLs to ensure they remain functional and relevant. Discover strategies for categorizing links, setting expiration dates, and utilizing analytics to optimize your link performance.",
        "excerpt": "Master the art of managing your links to maintain a cohesive and effective digital presence.",
        "slug": "best-practices-for-link-management",
        "publishedAt": "2025-04-21",
        "image": "https://blinkly.app/lovable-uploads/blog/best-practices-for-link-management-min.png",
        "author": "Emma Davis",
        "category": "Best Practices",
        "readTime": "7 min read"
    },
    {
        "id": "3",
        "title": "Why You Need Branded Short Links",
        "content": "Branded short links incorporate your company's name or a relevant keyword, making them easily identifiable and trustworthy. Explore the benefits of branded links, including increased click-through rates and enhanced brand visibility.",
        "excerpt": "Elevate your brand's credibility and recognition with customized short links.",
        "slug": "why-you-need-branded-short-links",
        "publishedAt": "2025-04-20",
        "image": "https://blinkly.app/lovable-uploads/blog/why-you-need-branded-short-links-min.png",
        "author": "Michael Brown",
        "category": "Branding",
        "readTime": "4 min read"
    },
    {
        "id": "4",
        "title": "Understanding Click Analytics for Short Links",
        "content": "Click analytics provide valuable information about how users interact with your links. Learn how to interpret metrics such as click counts, geographic data, and referral sources to refine your marketing strategies.",
        "excerpt": "Gain insights into user behavior by analyzing click data from your shortened URLs.",
        "slug": "understanding-click-analytics-for-short-links",
        "publishedAt": "2025-04-19",
        "image": "https://blinkly.app/lovable-uploads/blog/understanding-click-analytics-for-short-links-min.png",
        "author": "Sophia Lee",
        "category": "Analytics",
        "readTime": "6 min read"
    },
    {
        "id": "5",
        "title": "Link Expiration and Redirection Types Explained",
        "content": "Implementing expiration dates on links ensures that outdated content is no longer accessible, while redirection types (301, 302, etc.) guide users appropriately. Understand how to use these tools to maintain a seamless user journey.",
        "excerpt": "Control your content's accessibility and user experience through link expiration and redirection techniques.",
        "slug": "link-expiration-and-redirection-types-explained",
        "publishedAt": "2025-04-18",
        "image": "https://blinkly.app/lovable-uploads/blog/link-expiration-and-redirection-types-explained-min.png",
        "author": "Ethan Wilson",
        "category": "Technical",
        "readTime": "8 min read"
    },
    {
        "id": "6",
        "title": "Boost Campaign Success with UTM Parameters",
        "content": "UTM parameters help you identify which campaigns drive traffic and conversions. Learn how to construct UTM codes and integrate them into your shortened links for precise performance tracking.",
        "excerpt": "Track the effectiveness of your marketing campaigns by appending UTM parameters to your URLs.",
        "slug": "boost-campaign-success-with-utm-parameters",
        "publishedAt": "2025-04-17",
        "image": "https://blinkly.app/lovable-uploads/blog/boost-campaign-success-with-utm-parameters-min.png",
        "author": "Olivia Martinez",
        "category": "Marketing",
        "readTime": "5 min read"
    },
    {
        "id": "7",
        "title": "The Importance of Custom Aliases in Link Shortening",
        "content": "Custom aliases replace random character strings with meaningful words or phrases, making links more user-friendly. Discover best practices for crafting aliases that align with your brand and content.",
        "excerpt": "Enhance link memorability and user trust by creating custom aliases for your shortened URLs.",
        "slug": "the-importance-of-custom-aliases-in-link-shortening",
        "publishedAt": "2025-04-16",
        "image": "https://blinkly.app/lovable-uploads/blog/the-importance-of-custom-aliases-in-link-shortening-min.png",
        "author": "Daniel Green",
        "category": "Best Practices",
        "readTime": "4 min read"
    },
    {
        "id": "8",
        "title": "How Short Links Improve Social Media Engagement",
        "content": "Short links are ideal for platforms with character limits and can be customized to include relevant keywords. Explore how to effectively use short links in your social media strategy to drive engagement.",
        "excerpt": "Optimize your social media presence by utilizing short links that encourage clicks and shares.",
        "slug": "how-short-links-improve-social-media-engagement",
        "publishedAt": "2025-04-15",
        "image": "https://blinkly.app/lovable-uploads/blog/how-short-links-improve-social-media-engagement-min.png",
        "author": "Jessica Taylor",
        "category": "Social Media",
        "readTime": "6 min read"
    },
    {
        "id": "9",
        "title": "Integrating Short Links into Email Marketing",
        "content": "Shortened URLs in emails reduce clutter and can be monitored for click-through rates. Learn how to seamlessly integrate short links into your email marketing efforts for improved performance.",
        "excerpt": "Enhance your email campaigns by incorporating short links that are trackable and aesthetically pleasing.",
        "slug": "integrating-short-links-into-email-marketing",
        "publishedAt": "2025-04-14",
        "image": "https://blinkly.app/lovable-uploads/blog/integrating-short-links-into-email-marketing-min.png",
        "author": "Ryan Miller",
        "category": "Email Marketing",
        "readTime": "5 min read"
    },
    {
        "id": "10",
        "title": "The Role of Short Links in Influencer Marketing",
        "content": "Providing influencers with branded short links allows for consistent messaging and easy tracking of campaign success. Understand how to implement this strategy to maximize your influencer partnerships.",
        "excerpt": "Empower influencers to promote your brand effectively using customized short links.",
        "slug": "the-role-of-short-links-in-influencer-marketing",
        "publishedAt": "2025-04-13",
        "image": "https://blinkly.app/lovable-uploads/blog/the-role-of-short-links-in-influencer-marketing-min.png",
        "author": "Natalie Chen",
        "category": "Influencer Marketing",
        "readTime": "7 min read"
    },
    {
        "id": "11",
        "title": "Enhancing SEO with Shortened URLs",
        "content": "While short links themselves don't directly impact SEO, using descriptive aliases and maintaining link integrity can support your overall search engine optimization strategy.",
        "excerpt": "Discover how properly structured short links can contribute to your website's SEO efforts.",
        "slug": "enhancing-seo-with-shortened-urls",
        "publishedAt": "2025-04-12",
        "image": "https://blinkly.app/lovable-uploads/blog/enhancing-seo.png",
        "author": "James Wilson",
        "category": "SEO",
        "readTime": "6 min read"
    },
    {
        "id": "12",
        "title": "Utilizing Short Links for Event Promotion",
        "content": "Short links are perfect for promoting events across various channels. Learn how to create and distribute event-specific short URLs to maximize reach and participation.",
        "excerpt": "Drive attendance and engagement for your events by sharing concise, memorable URLs.",
        "slug": "utilizing-short-links-for-event-promotion",
        "publishedAt": "2025-04-11",
        "image": "https://blinkly.app/lovable-uploads/blog/utilizing-short-links-for-event-promotion-min.png",
        "author": "Lisa Thompson",
        "category": "Events",
        "readTime": "4 min read"
    },
    {
        "id": "13",
        "title": "Monitoring Link Performance Across Channels",
        "content": "Analyzing link performance helps you understand which channels drive the most traffic. Explore tools and techniques for monitoring your links to inform future marketing decisions.",
        "excerpt": "Track and compare the effectiveness of your links across different marketing platforms.",
        "slug": "monitoring-link-performance-across-channels",
        "publishedAt": "2025-04-10",
        "image": "https://blinkly.app/lovable-uploads/blog/monitoring-link-performance-across-channels-min.png",
        "author": "Kevin Robinson",
        "category": "Analytics",
        "readTime": "7 min read"
    },
    {
        "id": "14",
        "title": "The Security Advantages of Shortened URLs",
        "content": "Implementing secure short links prevents malicious redirections and builds trust with your users. Learn best practices for maintaining the security of your shortened URLs.",
        "excerpt": "Protect your audience and brand reputation by ensuring your short links are secure.",
        "slug": "the-security-advantages-of-shortened-urls",
        "publishedAt": "2025-04-09",
        "image": "https://blinkly.app/lovable-uploads/blog/the-security-advantages-of-shortened-urls-min.png",
        "author": "Amanda Hughes",
        "category": "Security",
        "readTime": "6 min read"
    },
    {
        "id": "15",
        "title": "Future Trends in URL Shortening and Link Management",
        "content": "As digital marketing evolves, so do the tools we use. Explore upcoming features and innovations in URL shortening and how they can benefit your marketing strategies.",
        "excerpt": "Stay ahead of the curve by understanding emerging trends in link shortening technology.",
        "slug": "future-trends-in-url-shortening-and-link-management",
        "publishedAt": "2025-04-08",
        "image": "https://blinkly.app/lovable-uploads/blog/future-trends-in-url-shortening-and-link-management-min.png",
        "author": "Christopher Parker",
        "category": "Trends",
        "readTime": "8 min read"
    }
];
const BlogPostPage: React.FC = () => {
    const {slug} = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulating API request delay
        const timer = setTimeout(() => {
            const foundPost = mockPosts.find(p => p.slug === slug);

            if (foundPost) {
                setPost(foundPost);
            }

            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [slug]);

    const handleBack = () => {
        navigate('/blog');
    };

    if (isLoading) {
        return (
            <>
                <Navbar/>
                <div className="container max-w-4xl mx-auto px-4 py-12">
                    <div className="mb-8">
                        <Skeleton className="h-8 w-3/4 mb-4"/>
                        <div className="flex space-x-4 mb-6">
                            <Skeleton className="h-5 w-24"/>
                            <Skeleton className="h-5 w-24"/>
                            <Skeleton className="h-5 w-24"/>
                        </div>
                        <Skeleton className="h-64 w-full mb-8"/>
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-full"/>
                            <Skeleton className="h-6 w-full"/>
                            <Skeleton className="h-6 w-5/6"/>
                            <Skeleton className="h-6 w-4/5"/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <Navbar/>
                <div className="container mx-auto px-4 py-24 text-center">
                    <h1 className="text-3xl font-bold mb-6">Blog Post Not Found</h1>
                    <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={handleBack}
                        className="flex items-center text-primary hover:text-primary/80 font-medium mx-auto"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Blog
                    </button>
                </div>
                <Footer/>
            </>
        );
    }

    // Build the full URL for sharing
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;

    return (
        <>
            <Helmet>
                <title>{post?.title} | Blinkly Blog</title>
                <meta name="description" content={post?.excerpt}/>

                {/* OpenGraph Meta Tags */}
                <meta property="og:title" content={post?.title}/>
                <meta property="og:description" content={post?.excerpt}/>
                <meta property="og:url" content={shareUrl}/>
                <meta property="og:type" content="article"/>
                <meta property="og:site_name" content="Blinkly"/>
                {post?.image && (
                    <>
                        <meta property="og:image" content={post.image}/>
                        <meta property="og:image:type" content="image/png"/>
                        <meta property="og:image:width" content="1200"/>
                        <meta property="og:image:height" content="630"/>
                    </>
                )}
                <meta property="fb:app_id" content="1208594394302399"/>

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={post?.title}/>
                <meta name="twitter:description" content={post?.excerpt}/>
                {post?.image && <meta name="twitter:image" content={post.image}/>}
            </Helmet>

            <Navbar/>
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <button
                    onClick={handleBack}
                    className="flex items-center text-primary hover:text-primary/80 font-medium mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Blog
                </button>

                <BlogPostMeta post={post} shareUrl={shareUrl}/>

                <BlogPostContent post={post}/>
            </div>
            <Footer/>
        </>
    );
};

export default BlogPostPage;
