import React from 'react';
import {useParams} from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Skeleton} from "@/components/ui/skeleton";

const BlogPost = () => {
    const {slug} = useParams();

    // Temporary mock data - replace with actual API call when backend is ready
    const post = {
        title: "Getting Started with URL Shortening",
        content: "Learn how to effectively use URL shortening to improve your marketing campaigns...",
        publishedAt: "2025-04-15",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    };

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-3xl mx-auto">
                        <Skeleton className="h-8 w-3/4 mb-4"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-2/3"/>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <article className="max-w-3xl mx-auto">
                    {post.image && (
                        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                    <p className="text-gray-500 mb-8">
                        Published on {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    <div className="prose prose-lg max-w-none">
                        {post.content}
                    </div>
                </article>
            </main>
            <Footer/>
        </div>
    );
};

export default BlogPost;
