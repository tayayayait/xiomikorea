
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "gallery" | "forum">("all");
  const navigate = useNavigate();

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // In a real app, we would navigate to a search results page with parameters
    // navigate(`/search?q=${encodeURIComponent(query)}&type=${activeTab}`);
    
    console.log(`Searching for "${query}" in ${activeTab}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full shadow-xl animate-in slide-in-from-top-10 duration-300">
        <div className="mx-auto w-[1040px] px-0 py-8 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 mt-4 hover:bg-transparent" 
            onClick={onClose}
          >
            <X className="h-6 w-6 text-gray-500" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="flex flex-col items-center justify-center space-y-6 pt-4 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">SEARCH</h2>
            
            {/* Search Tabs */}
            <div className="flex items-center space-x-1 border-b border-gray-200 w-full max-w-2xl justify-center pb-4 mb-4">
              <button
                onClick={() => setActiveTab("all")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === "all" ? "text-black font-bold" : "text-gray-500 hover:text-black"
                )}
              >
                통합검색
                {activeTab === "all" && <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#cc0000]" />}
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setActiveTab("gallery")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === "gallery" ? "text-black font-bold" : "text-gray-500 hover:text-black"
                )}
              >
                갤러리
                {activeTab === "gallery" && <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#cc0000]" />}
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setActiveTab("forum")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === "forum" ? "text-black font-bold" : "text-gray-500 hover:text-black"
                )}
              >
                포럼/게시판
                {activeTab === "forum" && <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#cc0000]" />}
              </button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-14 pl-6 pr-14 text-lg border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-black rounded-none"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-2 top-2 h-10 w-10 bg-black hover:bg-[#333] rounded-none"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            <div className="text-sm text-gray-400">
              최근 검색어 기능이 곧 제공될 예정입니다.
            </div>
          </div>
        </div>
      </div>
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
