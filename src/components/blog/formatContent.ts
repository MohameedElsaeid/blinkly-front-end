
/**
 * Utility: formatContent
 * Converts markdown-style content to sanitized HTML for blog posts.
 */
export function formatContent(content: string): string {
    return content
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />')
        .replace(/## (.*?)\n/g, '</p><h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2><p>')
        .replace(/### (.*?)\n/g, '</p><h3 class="text-xl font-semibold mt-6 mb-3">$1</h3><p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/g, '</p><pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre><p>')
        .replace(/- (.*?)(?=\n|$)/g, '</p><ul class="list-disc pl-6 my-4"><li>$1</li></ul><p>')
        .replace(/<\/ul><p><\/p><ul class="list-disc pl-6 my-4">/g, '</ul><ul class="list-disc pl-6 my-4">')
        .replace(/^(.+)$/m, '<p>$1</p>');
}
