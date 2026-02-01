import { Link } from "react-router-dom";
import { Camera, Instagram, Youtube, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: "커뮤니티 소개", href: "/about" },
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
    ],
    community: [
      { label: "갤러리", href: "/gallery" },
      { label: "공지사항", href: "/notice" },
      { label: "FAQ", href: "/faq" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/xiaomi", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@xiaomi", label: "YouTube" },
    { icon: Facebook, href: "https://facebook.com/xiaomi", label: "Facebook" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary group-hover:bg-primary/90 transition-colors">
                <Camera className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white">
                샤오미코리아 커뮤니티
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              샤오미 스마트폰으로 촬영한 사진을 공유하고,
              <br />
              다른 사용자들과 함께 소통하는 프리미엄 갤러리 공간입니다.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              정보
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              커뮤니티
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            © {currentYear} 샤오미코리아 커뮤니티. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
