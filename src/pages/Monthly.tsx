
import { useState } from "react";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { useGalleryPosts } from "@/hooks/useGallery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Monthly() {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("02");
  
  const { data: posts, isLoading } = useGalleryPosts("popular");

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b-2 border-black pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans tracking-tight">MONTHLY BEST</h1>
          <p className="mt-1 text-muted-foreground text-sm">매월 선정되는 최고의 사진</p>
        </div>
        
        <div className="flex gap-2">
           <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const m = String(i + 1).padStart(2, '0');
                return <SelectItem key={m} value={m}>{m}월</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {(posts || []).map((post) => (
            <div key={post.id} className="relative">
              <GalleryCard {...post} compact />
              <div className="mt-2 text-center">
                 <span className="inline-block bg-[#f5f5f5] text-[#888] text-[10px] px-2 py-0.5 rounded-full font-tahoma">
                    {year}.{month}
                 </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
