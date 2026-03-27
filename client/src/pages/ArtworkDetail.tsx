import { useParams } from "wouter";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Dummy data map for artworks
const ARTWORKS: Record<string, any> = {
  "fractured-light": {
    title: "Fractured Light",
    img: IMAGES.art1,
    year: "2023",
    medium: "Industrial glass, acrylic, mixed media",
    dimensions: "48 × 36 inches",
    series: "Repurposed Glass",
    status: "AVAILABLE",
    note: '"This piece explores the tension between fragility and strength — industrial glass, once discarded, is given new purpose through layers of acrylic and light."'
  },
  "urban-reflection": {
    title: "Urban Reflection",
    img: IMAGES.art2,
    year: "2022",
    medium: "Mixed media, concrete, glass",
    dimensions: "36 × 36 inches",
    series: "Cityscapes",
    status: "SOLD",
    note: '"Reflections of the city cast upon broken surfaces."'
  },
  "glass-cathedral": {
    title: "Glass Cathedral",
    img: IMAGES.art3,
    year: "2023",
    medium: "Shattered glass on canvas",
    dimensions: "60 × 48 inches",
    series: "Repurposed Glass",
    status: "AVAILABLE",
    note: '"A towering monolithic presence shaped by light."'
  },
  "material-memory": {
    title: "Material Memory",
    img: IMAGES.art4,
    year: "2021",
    medium: "Scrap metal, found objects",
    dimensions: "24 × 24 inches",
    series: "Salvage",
    status: "AVAILABLE",
    note: '"Remembering what was here before the development."'
  },
  "amber-prism": {
    title: "Amber Prism",
    img: IMAGES.glassTexture,
    year: "2024",
    medium: "Glass texture, resin, light box",
    dimensions: "40 × 40 inches",
    series: "Prisms",
    status: "AVAILABLE",
    note: '"Trapping light in amber."'
  }
};

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = id && ARTWORKS[id] ? ARTWORKS[id] : ARTWORKS["fractured-light"];

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
            <h2 className="font-['Roboto_Mono'] text-[28px] font-medium tracking-[1px] uppercase mb-8">
              {artwork.title}
            </h2>

            <div className="space-y-4 mb-8">
              {[
                { label: "Year", value: artwork.year, color: "text-[#A0A0A0]" },
                { label: "Medium", value: artwork.medium, color: "text-[#1A1A1A]" },
                { label: "Dimensions", value: artwork.dimensions, color: "text-[#1A1A1A]" },
                { label: "Series", value: artwork.series, color: "text-[#B7410E]", link: true },
                { label: "Status", value: artwork.status, color: "text-[#1A1A1A]", mono: true },
              ].map((field) => (
                <div key={field.label} className="flex justify-between items-baseline border-b border-[#E8E4DF] pb-3">
                  <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] tracking-[0.5px]">
                    {field.label}
                  </span>
                  <span className={`${field.mono ? "font-['Roboto_Mono'] text-[13px] uppercase tracking-[1px]" : "font-['Work_Sans'] text-[15px]"} ${field.color} ${field.link ? "hover:underline cursor-pointer" : ""}`}>
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
            <button className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300">
              <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative font-['Roboto_Mono'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] group-hover:text-[#F5F0EB] transition-colors duration-300">
                Inquire About This Piece
              </span>
            </button>

            {/* Prev/Next */}
            <div className="flex justify-between mt-8">
              <button className="flex items-center gap-2 font-['Roboto_Mono'] text-[12px] tracking-[1px] uppercase text-[#A0A0A0] hover:text-[#1A1A1A] hover:gap-3 transition-all duration-200">
                <ChevronLeft size={14} /> Previous
              </button>
              <button className="flex items-center gap-2 font-['Roboto_Mono'] text-[12px] tracking-[1px] uppercase text-[#A0A0A0] hover:text-[#1A1A1A] hover:gap-3 transition-all duration-200">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
