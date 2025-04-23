
import {marked} from "marked";
import DOMPurify from 'dompurify';

/**
 * Utility: formatContent
 * Converts markdown-style content to sanitized HTML for blog posts.
 */

marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false, // Set headerIds to false instead of using headerPrefix
    smartLists: true,
});


export function formatContent(content: string): string {
    // Convert to string explicitly to handle the Promise return type
    const html = marked.parse(content) as string;
    return DOMPurify.sanitize(html);
}
