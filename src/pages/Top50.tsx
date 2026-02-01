
import { GalleryCard } from "@/components/ui/GalleryCard";
import { useGalleryPosts } from "@/hooks/useGallery";

export default function Top50() {
  // Use "popular" sort which sorts by views currently, but we want likes.
  // Ideally backend should support sort by likes. For now we use what we have.
  const { data: posts, isLoading } = useGalleryPosts("popular");

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8 border-b-2 border-black pb-4 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight font-sans">TOP 50</h1>
          <p className="mt-1 text-muted-foreground text-sm">가장 많은 사랑을 받은 사진들</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] bg-gray-100 animate-pulse rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {(posts || []).slice(0, 50).map((post, index) => (
            <div key={post.id} className="relative group">
              {/* Ranking Badge */}
              <div className="absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center bg-black/80 text-white font-bold text-sm rounded-sm">
                {index + 1}
              </div>
              <GalleryCard {...post} compact />
            </div>
          ))}
          {(!posts || posts.length === 0) && (
            <div className="col-span-full text-center py-20 text-gray-400">
              데이터가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
