import { Link } from "wouter";
import { Plus } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { IMAGES } from "@/lib/constants";

const WORKS = [
  {
    id: "broad-strokes",
    title: "Broad Strokes on Broad Street",
    location: "Atlanta, GA",
    year: "2021",
    img: IMAGES.broadStrokes,
    span: "md:col-span-2 md:row-span-2"
  },
  {
    id: "southside-medical",
    title: "Hope Rises Like a Phoenix",
    location: "Southside Medical Center",
    year: "2015",
    img: IMAGES.southsideMedical,
    span: ""
  },
  {
    id: "urban-reflection",
    title: "Urban Reflection",
    location: "Downtown Plaza",
    year: "2022",
    img: IMAGES.art2,
    span: ""
  }
];

export default function PublicArt() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow">
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-16 pt-10">
            <Link href="/work">
              <span className="inline-flex items-center gap-2 font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] hover:text-[#B7410E] transition-colors cursor-pointer mb-8">
                ← Back to Work
              </span>
            </Link>
            <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4">
              Public Art
            </h2>
            <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] max-w-2xl leading-relaxed">
              Community-engaged installations and murals that transform public spaces and reflect urban narratives.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WORKS.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.08} className={item.span}>
                <Link href={`/work/${item.id}`}>
                  <div className="group relative overflow-hidden cursor-pointer bg-[#F5F0EB] p-3 block h-full">
                    <div className="relative overflow-hidden h-full">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover aspect-[4/3] transition-all duration-300 group-hover:brightness-[0.85]"
                      />
                      <div className="absolute inset-0 border border-[#B7410E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full border-2 border-[#B7410E] flex items-center justify-center">
                          <Plus size={16} className="text-[#B7410E]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="block font-['Work_Sans'] text-[14px] text-[#1A1A1A] group-hover:text-[#B7410E] transition-colors duration-300">
                        {item.title}
                      </span>
                      <span className="block font-['Roboto_Mono'] text-[11px] text-[#A0A0A0] uppercase tracking-[1px] mt-1">
                        {item.location}, {item.year}
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
