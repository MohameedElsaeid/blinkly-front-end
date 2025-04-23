
import {marked} from "marked";
import DOMPurify from 'dompurify';

/**
 * Utility: formatContent
 * Converts markdown-style content to sanitized HTML for blog posts.
 */

// Create a custom renderer to disable header IDs
const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
    // Custom heading renderer without generating IDs
    return `<h${level}>${text}</h${level}>`;
};

marked.setOptions({
    gfm: true,
    breaks: true,
    smartLists: true,
    renderer: renderer  // Use the custom renderer
});

export function formatContent(content: string): string {
    // Convert to string explicitly to handle the Promise return type
    const html = marked.parse(content) as string;
    return DOMPurify.sanitize(html);
}
