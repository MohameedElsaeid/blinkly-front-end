import {marked} from "marked";
import DOMPurify from 'dompurify';

/**
 * Utility: formatContent
 * Converts markdown-style content to sanitized HTML for blog posts.
 */

marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true,
    smartLists: true,
});


export function formatContent(content: string): string {
    const html = marked.parse(content);
    return DOMPurify.sanitize(html);
}
