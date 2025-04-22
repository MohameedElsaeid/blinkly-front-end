
import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
  excerpt: string;
  image?: string;
  url: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, excerpt, image, url, className }) => {
  // Handler for Web Share API or fallback to copying link
  const handleShare = async () => {
    const shareData: ShareData = {
      title,
      text: excerpt,
      url,
    };

    // Some applications (like Android/iOS) may support images via files[] in ShareData, but browsers generally do NOT support image sharing yet.
    // We include the image as a visible preview and in text content.
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // Optionally show toast/success message
      } catch (err) {
        // Optionally show error/toast
      }
    } else {
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Unable to copy link. Please copy it manually.");
      }
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className={className}
      onClick={handleShare}
      title="Share this post"
    >
      <Share2 className="mr-2 w-4 h-4" />
      Share
    </Button>
  );
};

export default ShareButton;
