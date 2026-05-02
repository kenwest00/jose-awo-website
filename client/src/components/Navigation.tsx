import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hash, setHash] = useState(() => typeof window !== 'undefined' ? window.location.hash : "");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    // wouter's pushLocation might not trigger hashchange if path is same, so we also rely on clicks
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Bio", href: "/#bio" },
    { label: "Work", href: "/#works" },
    { label: "Activism", href: "/#activism" },
    { label: "Contact", href: "/#contact" },
  ];

  const getIsActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location === "/" && hash === href.replace("/", "");
    }
    if (href === "/") {
      return location === "/" && (hash === "" || hash === "#home");
    }
    return location === href;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F5F0EB]/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-b border-[#D4D0CB]/50 py-3" : "bg-[#F5F0EB]/90 backdrop-blur-sm py-5"
      }`}>
        <div className="flex items-center justify-between px-8">
          <Link href="/">
            <span 
              onClick={() => setHash("")}
              className="font-['Space_Grotesk'] text-[13px] tracking-[2px] uppercase text-[#1A1A1A] hover:text-[#B7410E] transition-colors duration-200 flex items-center gap-2 font-bold cursor-pointer relative z-[60]"
            >
              JOSÉ AWO ART
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((item) => {
              const isActive = getIsActive(item.href);
              return (
                <Link 
                  key={item.label} 
                  href={item.href}
                  onClick={() => {
                    setHash(item.href.replace("/", ""));
                    if (item.href.startsWith("/#")) {
                      const id = item.href.replace("/#", "");
                      const element = document.getElementById(id);
                      if (element) {
                        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 10);
                      }
                    } else if (item.href === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  <span className={`relative font-['Space_Grotesk'] text-[13px] font-medium tracking-[2px] uppercase transition-colors duration-200 group cursor-pointer ${isActive ? 'text-[#B7410E]' : 'text-[#1A1A1A] hover:text-[#B7410E]'}`}>
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#B7410E] transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </span>
                </Link>
              );
            })}
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
          {links.map((item) => {
            const isActive = getIsActive(item.href);
            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => {
                  setHash(item.href.replace("/", ""));
                  setMobileMenuOpen(false);
                  if (item.href.startsWith("/#")) {
                    const id = item.href.replace("/#", "");
                    const element = document.getElementById(id);
                    if (element) {
                      setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 300);
                    }
                  } else if (item.href === "/") {
                    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
                  }
                }}
              >
                <span className={`font-['Space_Grotesk'] text-[24px] font-medium tracking-[3px] uppercase transition-colors duration-200 cursor-pointer ${isActive ? 'text-[#B7410E]' : 'text-[#1A1A1A]'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
