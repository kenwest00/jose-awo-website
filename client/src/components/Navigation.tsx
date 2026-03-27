import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0EB]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-5">
        <Link href="/">
          <span className="font-['Roboto_Mono'] text-[13px] tracking-[2px] uppercase text-[#1A1A1A] hover:text-[#B7410E] transition-colors duration-200 flex items-center gap-2 font-bold cursor-pointer">
            JOSÉ AWO ART
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <Link key={item.label} href={item.href}>
              <span className={`relative font-['Roboto_Mono'] text-[13px] font-medium tracking-[2px] uppercase transition-colors duration-200 group cursor-pointer ${location === item.href ? 'text-[#B7410E]' : 'text-[#1A1A1A] hover:text-[#B7410E]'}`}>
                {item.label}
                <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#B7410E] transform origin-left transition-transform duration-300 ${location === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
