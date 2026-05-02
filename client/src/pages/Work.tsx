import { Link } from "wouter";
import { Plus } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CATEGORIES = [
  { title: "Exhibitions", series: "SERIES 01", img: IMAGES.broadStrokes, slug: "exhibitions" },
  { title: "Commissions", series: "SERIES 02", img: IMAGES.southsideMedical, slug: "commissions" },
  { title: "Public Art", series: "SERIES 03", img: IMAGES.art4, slug: "public-art" },
  { title: "Repurposed Glass", series: "SERIES 04", img: IMAGES.glassTexture, slug: "repurposed-glass" },
];

const ALL_WORKS = [
  { id: "fractured-light", img: IMAGES.art1, title: "Fractured Light", year: "2023" },
  { id: "urban-reflection", img: IMAGES.art2, title: "Urban Reflection", year: "2022" },
  { id: "glass-cathedral", img: IMAGES.art3, title: "Glass Cathedral", year: "2023" },
  { id: "auburn-avenue", img: IMAGES.auburnAvenue, title: "Auburn Avenue", year: "2022" },
  { id: "southside-medical", img: IMAGES.southsideMedical, title: "Southside Medical", year: "2015" },
  { id: "broad-strokes", img: IMAGES.broadStrokes, title: "Broad Strokes on Broad Street", year: "2021" },
  { id: "material-memory", img: IMAGES.art4, title: "Material Memory", year: "2021" },
  { id: "amber-prism", img: IMAGES.glassTexture, title: "Amber Prism", year: "2024" },
];

export default function Work() {
  return (
    <div className="concept-1 min-h-screen flex flex-col justify-between">
      <Navigation />

      {/* Categories Grid Section */}
      <section className="pt-[72px] bg-[#F5F0EB]">
        {/* Full bleed 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.slug} href={`/work/${cat.slug}`}>
              <div className="group relative w-full h-[50vh] md:h-[70vh] cursor-pointer overflow-hidden bg-[#1A1A1A]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                />
                {/* Gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Text overlay */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-2">
                  <span className="font-['Roboto_Mono'] text-[11px] tracking-[3px] font-bold text-[#B7410E]">
                    {cat.series}
                  </span>
                  <h2 className="font-['Work_Sans'] text-[32px] md:text-[42px] text-[#F5F0EB] tracking-wide font-light">
                    {cat.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Selected Works Dark Section */}
      <section className="bg-[#1A1A1A] py-32 px-8 relative overflow-hidden">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <h3 className="font-['Roboto_Mono'] text-[14px] font-bold tracking-[3px] uppercase text-[#F5F0EB]">
              Selected Works
            </h3>
            <span className="font-['Work_Sans'] italic text-[15px] text-[#A0A0A0]">
              Eight works — drag to explore
            </span>
          </div>
        </FadeIn>

        {/* Horizontal scroll gallery */}
        <div className="overflow-x-auto pb-12 -mx-8 px-8 scrollbar-hide cursor-grab active:cursor-grabbing">
          <div className="flex gap-8 w-max">
            {ALL_WORKS.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.1}>
                <Link href={`/work/${item.id}`}>
                  <div className="group relative w-[75vw] md:w-[35vw] lg:w-[28vw] cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#2A2A2A] mb-6">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      {/* Hover border effect */}
                      <div className="absolute inset-0 border border-[#B7410E] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      {/* Hover icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full border-2 border-[#B7410E] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                          <Plus size={20} className="text-[#B7410E]" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start border-t border-[#333] pt-4">
                      <h4 className="font-['Work_Sans'] text-[16px] text-[#F5F0EB] group-hover:text-[#B7410E] transition-colors duration-300">
                        {item.title}
                      </h4>
                      <span className="font-['Roboto_Mono'] text-[12px] text-[#888]">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
