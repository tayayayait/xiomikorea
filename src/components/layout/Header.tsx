import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Camera, LogOut, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Forum", href: "/forum" }, // Main -> Forum
  { name: "Gallery", href: "/gallery" },
  { name: "Exhibition", href: "/exhibition" }, // Added mock
  { name: "Monthly", href: "/monthly" }, // Added mock
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header className="w-full bg-white relative z-40">
        {/* 1. 최상단 유틸리티 바 (Utility Bar) - 32px */}
        <div className="border-b border-gray-200 bg-[#f8f8f8] h-[32px] flex items-center">
          <div className="mx-auto w-[1040px] px-0 flex items-center justify-end gap-3 text-[11px] text-[#666] font-normal tracking-tight">
            <Link to="/faq" className="hover:text-black">FAQ</Link>
            <span className="text-gray-300">|</span>
            <Link to="/top50" className="hover:text-black">TOP50</Link>
            <span className="text-gray-300">|</span>
            {user ? (
              <>
                <button onClick={() => navigate("/profile")} className="hover:text-black">MY PAGE</button>
                <span className="text-gray-300">|</span>
                <button onClick={handleSignOut} className="hover:text-black">LOGOUT</button>
              </>
            ) : (
              <>
                <Link to="/auth?tab=login" className="hover:text-black">LOGIN</Link>
                <span className="text-gray-300">|</span>
                <Link to="/auth?tab=signup" className="hover:text-black">JOIN</Link>
              </>
            )}
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-black flex items-center gap-1 font-bold"
            >
               SEARCH
            </button>
          </div>
        </div>

        {/* 2. 로고 영역 - 90px */}
        <div className="mx-auto w-[1040px] px-0 h-[90px] flex items-center justify-start">
          <Link to="/" className="flex items-center gap-3">
            {/* Xiaomi Red Logo */}
            <img 
              src="/xiaomi-red-logo.png" 
              alt="Xiaomi" 
              className="h-[52px] w-[52px] rounded-full object-cover"
            />
            <div className="flex flex-col justify-center h-full pt-1">
               <span className="text-[26px] font-bold text-black leading-none tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>
                 XiaomiClub.net
               </span>
               <span className="text-[10px] text-[#888] tracking-[0.2em] font-normal mt-1">
                 PREMIUM PHOTO COMMUNITY
               </span>
            </div>
          </Link>
        </div>

        {/* 3. Black GNB - 50px */}
        <div className="bg-black w-full h-[50px]">
          <nav className="mx-auto w-[1040px] px-0 h-full flex items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center h-full px-5 text-[15px] font-bold text-white transition-colors uppercase tracking-tight",
                    "hover:bg-[#333]", 
                    location.pathname === item.href && "text-[#cc0000]" 
                  )}
                  style={{ fontFamily: '"Malgun Gothic", "Dotum", sans-serif' }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Menu Trigger (Visible only on small screens) */}
              <div className="md:hidden ml-auto pr-4">
                  {/* ... existing mobile menu ... */}
              </div>
          </nav>
        </div>
      </header>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
