import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { IMAGES } from "@/lib/constants";

const WORKS = [
  {
    id: "broad-strokes",
    title: "Broad Strokes on Broad Street",
    location: "Atlanta, GA",
    date: "2021",
    description: "A layered abstract exploration of urban space, using bold lines and vivid colors to transform the streetscape and engage the local community in a dialogue about public space.",
    image: IMAGES.broadStrokes
  },
  {
    id: "southside-medical",
    title: "Hope Rises Like a Phoenix",
    location: "Southside Medical Center, Atlanta, GA",
    date: "2015",
    description: "A large-scale public mural celebrating resilience and community healing, blending historical narrative with contemporary expressionism.",
    image: IMAGES.southsideMedical
  }
];

export default function PublicArt() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow">
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-20 pt-10">
            <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4">
              Public Art
            </h2>
            <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] max-w-2xl leading-relaxed">
              Community-engaged installations and murals that transform public spaces and reflect urban narratives.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {WORKS.map((work, index) => (
            <FadeIn key={work.id} delay={index * 0.1}>
              <div className="group">
                <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DF] mb-6">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-['Roboto_Mono'] text-[12px] tracking-[1px] text-[#B7410E] uppercase">
                    {work.date}
                  </span>
                  <span className="w-4 h-[1px] bg-[#D4D0CB]"></span>
                  <span className="font-['Work_Sans'] text-[12px] text-[#A0A0A0] uppercase tracking-[1px]">
                    {work.location}
                  </span>
                </div>
                <h3 className="font-['Roboto_Mono'] text-[24px] font-medium tracking-[1px] uppercase mb-4">
                  {work.title}
                </h3>
                <p className="font-['Work_Sans'] text-[15px] leading-[1.8] text-[#666]">
                  {work.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
