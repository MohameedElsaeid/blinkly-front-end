
import React from "react";
import type { BlogPost } from "@/types/blog";
import { formatContent } from "./formatContent";

interface BlogPostContentProps {
    post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => (
    <article className="prose prose-slate lg:prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {post.image && (
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto rounded-lg mb-8 object-cover"
            />
        )}

        {post.content && (
            <div
                className="markdown-content"
                dangerouslySetInnerHTML={{
                    __html: `<p>${formatContent(post.content)}</p>`
                }}
            />
        )}
    </article>
);

export default BlogPostContent;
