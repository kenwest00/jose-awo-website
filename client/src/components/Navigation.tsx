import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F5F0EB]/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-b border-[#D4D0CB]/50 py-3" : "bg-[#F5F0EB]/90 backdrop-blur-sm py-5"
      }`}>
        <div className="flex items-center justify-between px-8">
          <Link href="/">
            <span className="font-['Roboto_Mono'] text-[13px] tracking-[2px] uppercase text-[#1A1A1A] hover:text-[#B7410E] transition-colors duration-200 flex items-center gap-2 font-bold cursor-pointer relative z-[60]">
              JOSÉ AWO ART
            </span>
          </Link>
          
          {/* Desktop Nav */}
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

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[60] text-[#1A1A1A] hover:text-[#B7410E] transition-colors p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-[#F5F0EB] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-center items-center ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center gap-8">
          {links.map((item) => (
            <Link key={item.label} href={item.href}>
              <span 
                onClick={() => setMobileMenuOpen(false)}
                className={`font-['Roboto_Mono'] text-[24px] font-medium tracking-[3px] uppercase transition-colors duration-200 cursor-pointer ${location === item.href ? 'text-[#B7410E]' : 'text-[#1A1A1A]'}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
