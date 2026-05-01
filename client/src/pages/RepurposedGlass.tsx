import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { IMAGES } from "@/lib/constants";

const WORKS = [
  {
    id: "fractured-light",
    title: "Fractured Light",
    date: "2023",
    dimensions: "48 × 36 inches",
    description: "This piece explores the tension between fragility and strength — industrial glass, once discarded, is given new purpose through layers of acrylic and light.",
    image: IMAGES.art1
  },
  {
    id: "amber-prism",
    title: "Amber Prism",
    date: "2024",
    dimensions: "40 × 40 inches",
    description: "Trapping light in amber. A study of texture and translucency using reclaimed industrial glass and custom resin casting.",
    image: IMAGES.glassTexture
  },
  {
    id: "glass-cathedral",
    title: "Glass Cathedral",
    date: "2023",
    dimensions: "60 × 48 inches",
    description: "A towering monolithic presence shaped by light. Shattered glass integrated onto canvas creates a highly textural, structural composition.",
    image: IMAGES.art3
  }
];

export default function RepurposedGlass() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow">
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-20 pt-10">
            <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4">
              Repurposed Glass
            </h2>
            <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] max-w-2xl leading-relaxed">
              Industrial materials transformed into fine art. A definitive exploration of fragility, strength, and environmental memory.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto space-y-24">
          {WORKS.map((work, index) => (
            <FadeIn key={work.id} delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className={`bg-[#E8E4DF] p-6 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-auto object-cover shadow-lg"
                  />
                </div>
                <div className={`flex flex-col justify-center ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-['Roboto_Mono'] text-[13px] tracking-[1px] text-[#B7410E] uppercase">
                      {work.date}
                    </span>
                    <span className="w-6 h-[1px] bg-[#D4D0CB]"></span>
                    <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] uppercase tracking-[1px]">
                      {work.dimensions}
                    </span>
                  </div>
                  <h3 className="font-['Roboto_Mono'] text-[28px] font-medium tracking-[1px] uppercase mb-6">
                    {work.title}
                  </h3>
                  <p className="font-['Work_Sans'] text-[16px] leading-[1.8] text-[#1A1A1A]">
                    {work.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
