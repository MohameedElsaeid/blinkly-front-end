
import React from "react";
import { User, Calendar, Clock, Tag } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import type { BlogPost } from "@/types/blog";

interface BlogPostMetaProps {
    post: BlogPost;
    shareUrl: string;
    className?: string;
}

const BlogPostMeta: React.FC<BlogPostMetaProps> = ({ post, shareUrl, className }) => (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 ${className || ""}`}>
        {post.author && (
            <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>{post.author}</span>
            </div>
        )}

        <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{post.publishedAt}</span>
        </div>

        {post.readTime && (
            <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{post.readTime}</span>
            </div>
        )}

        {post.category && (
            <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" />
                <span>{post.category}</span>
            </div>
        )}

        <ShareButton
            title={post.title}
            excerpt={post.excerpt}
            image={post.image}
            url={shareUrl}
            className="ml-auto"
        />
    </div>
);

export default BlogPostMeta;
