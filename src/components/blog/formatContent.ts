
import {marked} from "marked";
import DOMPurify from 'dompurify';

/**
 * Utility: formatContent
 * Converts markdown-style content to sanitized HTML for blog posts.
 */

marked.setOptions({
    gfm: true,
    breaks: true,
    headerPrefix: '', // Use headerPrefix instead of headerIds
    smartLists: true,
});


export function formatContent(content: string): string {
    // Convert to string explicitly to handle the Promise return type
    const html = marked.parse(content) as string;
    return DOMPurify.sanitize(html);
}
