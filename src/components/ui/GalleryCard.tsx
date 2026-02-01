import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  id: string;
  image_url: string;
  title: string;
  username?: string;
  likes_count?: number;
  views: number;
  compact?: boolean; // Leica Club 스타일 컴팩트 모드
}

export function GalleryCard({
  id,
  image_url,
  title,
  username,
  likes_count,
  views,
  compact = false,
}: GalleryCardProps) {
  return (
    <Link to={`/gallery/${id}`} className="block group">
      {/* 1. Image Container (3:2 Aspect Ratio, No Radius) */}
      <div className="aspect-[3/2] overflow-hidden bg-gray-100 relative">
        <img
          src={image_url}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* 2. Minimal Content (Title Only) */}
      <div className="pt-3 pb-6 text-center">
        <h3 className="text-[13px] font-normal text-[#333] truncate px-1 group-hover:text-[#cc0000] group-hover:underline decoration-[0.5px] underline-offset-2 transition-colors">
          {title}
        </h3>
        {/* Leica Club doesn't show username/likes in grid mostly, or very subtly */}
        {!compact && (
          <div className="mt-1 text-[11px] text-gray-400 font-light hidden sm:block">
             by {username || "Anonymous"}
          </div>
        )}
      </div>
    </Link>
  );
}
