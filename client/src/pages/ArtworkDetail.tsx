import { useParams, Link } from "wouter";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Dummy data map for artworks
const ARTWORKS: Record<string, any> = {
  "butts-county": {
    title: "Butt's County Medical Center",
    img: "/works/butts-county.webp",
    year: "2018",
    medium: "Flovilla mix Media Collage, oil & acrylic watercolors",
    dimensions: "13' x 4'",
    series: "SMC - Commissioned work",
    status: "COMMISSIONED",
    note: '"Commissioned work"'
  },
  "red-sublime": {
    title: "Red Sublime",
    img: "/works/red-sublime.webp",
    year: "2014",
    medium: "Oil & Acrylic on Canvas, Epoxy resin",
    dimensions: "5' x 5'",
    series: "Originals",
    status: "AVAILABLE",
    note: ""
  },
  "wedding-party": {
    title: "The wedding party",
    img: "/works/wedding-party.webp",
    year: "2016",
    medium: "Oil in acrylic on canvas",
    dimensions: "12' x 4'",
    series: "Originals",
    status: "AVAILABLE",
    note: ""
  },
  "sweet-auburn": {
    title: "Sweet auburn",
    img: "/works/sweet-auburn.webp",
    year: "2024",
    medium: "Oil pastel on paper",
    dimensions: "6' x 4'",
    series: "Originals",
    status: "AVAILABLE",
    note: '"https://www.artsatl.org/what-to-see-do-and-hear-atlanta-stories-a-nest-of-jazz-trans-cinema-more/"'
  },
  "changed-of-mind": {
    title: "Changed of Mind",
    img: "/works/changed-of-mind.webp",
    year: "2010",
    medium: "Oil and acrylic on industrial glass",
    dimensions: "10' x 4'",
    series: "Originals",
    status: "AVAILABLE",
    note: ""
  }
};

export default function ArtworkDetail() {
  const { id } = useParams();
  const currentId = id || "butts-county";
  const artwork = ARTWORKS[currentId] || ARTWORKS["butts-county"];
  
  const keys = Object.keys(ARTWORKS);
  const currentIndex = keys.indexOf(currentId) !== -1 ? keys.indexOf(currentId) : 0;
  
  const prevId = currentIndex > 0 ? keys[currentIndex - 1] : keys[keys.length - 1];
  const nextId = currentIndex < keys.length - 1 ? keys[currentIndex + 1] : keys[0];
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-24 relative flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row min-h-[80vh]">
          {/* Left panel - Image */}
          <FadeIn className="lg:w-[65%] bg-[#E8E4DF] flex items-center justify-center p-8 lg:p-16">
            <div className="relative group cursor-zoom-in">
              <img
                src={artwork.img}
                alt={artwork.title}
                className="max-h-[70vh] w-auto object-contain shadow-lg"
              />
              <div className="absolute bottom-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                <Search size={20} className="text-[#A0A0A0]" />
              </div>
            </div>
          </FadeIn>

          {/* Right panel - Details */}
          <FadeIn className="lg:w-[35%] bg-[#F5F0EB] p-8 lg:p-12 flex flex-col justify-center" delay={0.2}>
            <h2 className="font-['Space_Grotesk'] text-[28px] font-medium tracking-[1px] uppercase mb-8">
              {artwork.title}
            </h2>

            <div className="space-y-4 mb-8">
              {[
                { label: "Year", value: artwork.year, color: "text-[#A0A0A0]" },
                { label: "Medium", value: artwork.medium, color: "text-[#1A1A1A]" },
                { label: "Dimensions", value: artwork.dimensions, color: "text-[#1A1A1A]" },
                { label: "Series", value: artwork.series, color: "text-[#B7410E]", link: true },
                { label: "Status", value: artwork.status, color: "text-[#1A1A1A]", mono: true },
                ...(artwork.provenance ? [{ label: "Provenance", value: artwork.provenance, color: "text-[#1A1A1A]" }] : []),
                ...(artwork.exhibitionHistory ? [{ label: "Exhibitions", value: artwork.exhibitionHistory, color: "text-[#1A1A1A]" }] : []),
              ].map((field) => (
                <div key={field.label} className="flex justify-between items-baseline border-b border-[#E8E4DF] pb-3">
                  <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] tracking-[0.5px]">
                    {field.label}
                  </span>
                  <span className={`${field.mono ? "font-['Space_Grotesk'] text-[13px] uppercase tracking-[1px]" : "font-['Work_Sans'] text-[15px]"} ${field.color} ${field.link ? "hover:underline cursor-pointer" : ""}`}>
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Artist's Note */}
            <p className="font-['Work_Sans'] text-[15px] italic text-[#666] leading-relaxed mb-10">
              {artwork.note}
            </p>

            {/* Inquiry button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative font-['Space_Grotesk'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] group-hover:text-[#F5F0EB] transition-colors duration-300">
                Inquire About This Piece
              </span>
            </button>

            {/* Prev/Next */}
            <div className="flex justify-between mt-8">
              <Link href={`/work/${prevId}`}>
                <a className="flex items-center gap-2 font-['Space_Grotesk'] text-[12px] tracking-[1px] uppercase text-[#A0A0A0] hover:text-[#1A1A1A] hover:gap-3 transition-all duration-200 cursor-pointer">
                  <ChevronLeft size={14} /> Previous
                </a>
              </Link>
              <Link href={`/work/${nextId}`}>
                <a className="flex items-center gap-2 font-['Space_Grotesk'] text-[12px] tracking-[1px] uppercase text-[#A0A0A0] hover:text-[#1A1A1A] hover:gap-3 transition-all duration-200 cursor-pointer">
                  Next <ChevronRight size={14} />
                </a>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      {/* Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F5F0EB] w-full max-w-lg relative p-8 shadow-2xl border border-[#D4D0CB]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#A0A0A0] hover:text-[#1A1A1A] transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="font-['Space_Grotesk'] text-[24px] font-medium tracking-[1px] uppercase text-[#1A1A1A] mb-8">
              Inquire
            </h3>
            
            <form className="space-y-6">
              <div className="group">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  readOnly
                  value={`Inquiry regarding: ${artwork.title}`}
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] py-3 font-['Work_Sans'] text-[15px] text-[#1A1A1A] outline-none opacity-70 cursor-not-allowed"
                />
              </div>
              
              <div className="group">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[15px] text-[#1A1A1A] outline-none transition-colors duration-200"
                />
              </div>

              <div className="group">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[15px] text-[#1A1A1A] outline-none transition-colors duration-200"
                />
              </div>

              <div className="group">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[15px] text-[#1A1A1A] outline-none transition-colors duration-200 resize-none"
                />
              </div>
              
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300 mt-4 cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative font-['Space_Grotesk'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] group-hover:text-[#F5F0EB] transition-colors duration-300">
                  Send Inquiry
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
