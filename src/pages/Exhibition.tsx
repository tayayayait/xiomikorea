
import { GalleryCard } from "@/components/ui/GalleryCard";
import { useGalleryPosts } from "@/hooks/useGallery";

export default function Exhibition() {
  // Exhibition usually requires specific filtering (e.g., curated tags).
  // For now, we will display all posts but with a different header style.
  const { data: posts, isLoading } = useGalleryPosts("latest");

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground tracking-tight uppercase mb-3">Online Exhibition</h1>
        <div className="w-10 h-[2px] bg-[#cc0000] mx-auto mb-4"></div>
        <p className="text-muted-foreground text-sm uppercase tracking-wide">
          Curated collections from our best photographers
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {(posts || []).map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#cc0000] transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.profiles?.username || "Unknown Artist"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
