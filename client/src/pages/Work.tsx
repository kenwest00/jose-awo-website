import { Link } from "wouter";
import { Plus } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Work() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 relative flex-grow">
        <FadeIn>
          <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4 pt-10">
            Work
          </h2>
          <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] mb-16 max-w-xl leading-relaxed">
            Browse by series. Each collection represents a distinct chapter in the artist's evolving practice.
          </p>
        </FadeIn>

        {/* Horizontal scroll gallery */}
        <div className="overflow-x-auto pb-8 -mx-8 px-8 scrollbar-hide">
          <div className="flex gap-6 w-max">
            {[
              { title: "EXHIBITIONS", desc: "Gallery shows and institutional presentations", img: IMAGES.broadStrokes, slug: "exhibitions" },
              { title: "COMMISSIONS", desc: "Bespoke works for collectors and institutions", img: IMAGES.southsideMedical, slug: "commissions" },
              { title: "PUBLIC ART", desc: "Community-engaged installations and murals", img: IMAGES.art4, slug: "public-art" },
              { title: "REPURPOSED GLASS", desc: "Industrial glass transformed into fine art", img: IMAGES.glassTexture, slug: "repurposed-glass" },
            ].map((series, i) => (
              <FadeIn key={series.title} delay={i * 0.15}>
                <Link href={`/work/${series.slug}`}>
                  <div className="group relative w-[70vw] md:w-[45vw] lg:w-[35vw] cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-[#E8E4DF]">
                      <img
                        src={series.img}
                        alt={series.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      {/* Hover prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#1A1A1A]/20 transition-all duration-300">
                        <span className="font-['Roboto_Mono'] text-[12px] tracking-[2px] uppercase text-[#1A1A1A] bg-[#F5F0EB] px-4 py-2">
                          Click to Explore
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-['Roboto_Mono'] text-[18px] font-medium tracking-[1px] uppercase text-[#1A1A1A] mb-1">
                        {series.title}
                      </h3>
                      <p className="font-['Work_Sans'] text-[13px] text-[#A0A0A0]">
                        {series.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full h-[2px] bg-[#D4D0CB] relative">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-[#B7410E]" />
        </div>

        {/* Series Grid Preview */}
        <div className="mt-24">
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-['Roboto_Mono'] text-[24px] font-medium tracking-[1px] uppercase">
                Selected Works
              </h3>
              <div className="flex gap-6">
                {["ALL", "YEAR ↓", "MEDIUM"].map((filter, i) => (
                  <span
                    key={filter}
                    className={`font-['Roboto_Mono'] text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors duration-200 ${
                      i === 0 ? "text-[#1A1A1A] border-b-[1.5px] border-[#B7410E] pb-1" : "text-[#A0A0A0] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Asymmetric masonry grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: "fractured-light", img: IMAGES.art1, title: "Fractured Light", year: "2023", span: "md:col-span-2 md:row-span-2" },
              { id: "urban-reflection", img: IMAGES.art2, title: "Urban Reflection", year: "2022", span: "" },
              { id: "glass-cathedral", img: IMAGES.art3, title: "Glass Cathedral", year: "2023", span: "" },
              { id: "auburn-avenue", img: IMAGES.auburnAvenue, title: "Auburn Avenue", year: "2022", span: "md:col-span-2" },
              { id: "southside-medical", img: IMAGES.southsideMedical, title: "Southside Medical", year: "2015", span: "" },
              { id: "broad-strokes", img: IMAGES.broadStrokes, title: "Broad Strokes on Broad Street", year: "2021", span: "md:col-span-2 md:row-span-2" },
              { id: "material-memory", img: IMAGES.art4, title: "Material Memory", year: "2021", span: "" },
              { id: "amber-prism", img: IMAGES.glassTexture, title: "Amber Prism", year: "2024", span: "md:col-span-2" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08} className={item.span}>
                <Link href={`/work/${item.id}`}>
                  <div className="group relative overflow-hidden cursor-pointer bg-[#F5F0EB] p-3 block">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover aspect-[4/3] transition-all duration-300 group-hover:brightness-[0.85]"
                      />
                      {/* Hover border */}
                      <div className="absolute inset-0 border border-[#B7410E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Hover icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full border-2 border-[#B7410E] flex items-center justify-center">
                          <Plus size={16} className="text-[#B7410E]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] group-hover:text-[#1A1A1A] transition-colors duration-300">
                        {item.title}, {item.year}
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
