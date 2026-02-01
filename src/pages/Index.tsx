import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Camera, Image, Bell, MessageSquare, Calendar } from "lucide-react";
import { useGalleryPosts } from "@/hooks/useGallery";
import { useNotices } from "@/hooks/useNotices";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { GalleryCard } from "@/components/ui/GalleryCard";

export default function Index() {
  const { data: posts, isLoading: postsLoading } = useGalleryPosts("latest");
  const { data: notices, isLoading: noticesLoading } = useNotices();

  // Leica Club gallery preview (10 items)
  const galleryPreview = posts?.slice(0, 10) || [];
  const noticePreview = notices?.slice(0, 5) || []; // Notice list preview

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero & Notice Split Section (Compact Leica Style) */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto w-[1040px] px-0 py-8">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left: Featured Visual (66%) - No rounded corners */}
            <div className="col-span-8 bg-black relative group aspect-[3/2] overflow-hidden">
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-white">
                <div className="text-center p-6">
                  <h2 className="text-3xl font-light mb-3 tracking-tight">XIAOMI<br/><span className="font-bold">IMAGERY AWARDS 2026</span></h2>
                  <div className="w-10 h-[2px] bg-[#cc0000] mx-auto mb-3"></div>
                  <p className="text-sm text-gray-400 font-light tracking-wide uppercase">Capture the moment, share the inspiration</p>
                </div>
              </div>
            </div>

            {/* Right: Notice (33%) - Red Header Block */}
            <div className="col-span-4 h-full flex flex-col">
              {/* Red Header - The Signature Look */}
              <div className="bg-[#cc0000] h-[40px] flex items-center justify-between px-4">
                <h3 className="text-white text-[14px] font-bold tracking-tight">NOTICE</h3>
                <Link to="/notice" className="text-white/80 text-[11px] hover:text-white">MORE +</Link>
              </div>
              
              {/* Notice List - Simple, no rounding */}
              <div className="border border-t-0 border-gray-200 bg-white flex-1 p-0">
                <ul className="divide-y divide-gray-100">
                  {noticesLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                       <li key={i} className="h-10 border-b border-gray-50"></li>
                    ))
                  ) : noticePreview.length > 0 ? (
                    noticePreview.map((notice) => (
                      <li key={notice.id} className="group hover:bg-gray-50 transition-colors">
                        <Link to={`/notice/${notice.id}`} className="block px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] text-[#cc0000] font-bold border border-[#cc0000] px-1 py-[1px] leading-none">공지</span>
                             <h4 className="text-[13px] text-[#333] font-normal truncate flex-1 group-hover:underline decoration-1 underline-offset-2">
                               {notice.title}
                             </h4>
                          </div>
                          <div className="text-right">
                             <span className="text-[10px] text-[#999] font-tahoma">
                               {format(new Date(notice.created_at), "yyyy.MM.dd", { locale: ko })}
                             </span>
                          </div>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p className="text-xs text-center text-gray-400 py-10">등록된 공지사항이 없습니다.</p>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Gallery Grid Section (Leica Style 4-Column strict) */}
      <section className="py-12 bg-white">
        <div className="mx-auto w-[1040px] px-0">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-4 border-b-2 border-black pb-2">
            <h2 className="text-[20px] font-bold text-black tracking-tighter uppercase font-sans">
              Gallery <span className="text-[#cc0000] text-[14px] font-normal ml-2 normal-case tracking-normal">New Photos</span>
            </h2>
            <Link to="/gallery" className="text-[11px] text-[#888] hover:text-black mb-1 font-tahoma">more +</Link>
          </div>

          {!postsLoading && galleryPreview.length > 0 ? (
            <div className="grid grid-cols-4 gap-x-5 gap-y-8">
              {galleryPreview.slice(0, 8).map((item) => (
                <GalleryCard
                  key={item.id}
                  {...item}
                  compact
                />
              ))}
            </div>
          ) : postsLoading ? (
            <div className="grid grid-cols-4 gap-x-5 gap-y-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/2] bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 border border-gray-100">
              <p className="text-sm text-gray-400">등록된 사진이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Community / Event (Simple List) */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-[1040px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Community */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
                <h3 className="text-lg font-bold text-black">COMMUNITY</h3>
                <span className="text-[11px] text-gray-400">자유게시판</span>
              </div>
              <ul className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="py-2.5 flex items-center justify-between text-[13px] hover:bg-gray-50 transition-colors cursor-pointer group">
                    <span className="text-gray-600 group-hover:text-[#cc0000]">자유게시판에 최신 글을 확인해보세요.</span>
                    <span className="text-gray-400 text-[11px]">2026.02.01</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
                <h3 className="text-lg font-bold text-black">EVENT</h3>
                <span className="text-[11px] text-gray-400">이벤트</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-gray-100 mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#cc0000]/10 group-hover:bg-[#cc0000]/20 transition-colors" />
                    </div>
                    <h4 className="text-[13px] font-medium text-gray-800 group-hover:text-[#cc0000] transition-colors truncate">
                      2026년 포토 콘테스트 안내
                    </h4>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
