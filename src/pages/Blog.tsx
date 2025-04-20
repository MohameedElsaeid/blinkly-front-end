
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost } from '@/types/blog';

// Temporary mock data - replace with actual API call when backend is ready
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with URL Shortening",
    content: "Learn how to effectively use URL shortening to improve your marketing campaigns...",
    excerpt: "Discover the power of URL shortening and how it can transform your digital marketing strategy.",
    slug: "getting-started-with-url-shortening",
    publishedAt: "2025-04-15",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: "2",
    title: "Best Practices for Link Management",
    content: "Explore the best practices for managing your shortened URLs...",
    excerpt: "Master the art of link management with these proven strategies and tips.",
    slug: "best-practices-for-link-management",
    publishedAt: "2025-04-10",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <div className="grid gap-6">
            {mockPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="block transition-transform hover:-translate-y-1">
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
      <Footer />
    </div>
  );
};

export default BlogPage;
