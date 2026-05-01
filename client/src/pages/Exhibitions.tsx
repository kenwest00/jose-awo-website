import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { IMAGES } from "@/lib/constants";

const SHOWS = [
  {
    id: "change-your-thinking",
    title: "Change your Thinking, Change the World",
    institution: "Gallery 297",
    location: "Atlanta, GA",
    date: "2019",
    curatorial: "An immersive exploration of abstract expressionism challenging conventional perceptions of identity and urban space. This exhibition brought together large-scale canvases utilizing repurposed materials and bold, emotive brushstrokes to confront historical narratives.",
    image: IMAGES.broadStrokes
  },
  {
    id: "art-basel-voice",
    title: "Art Basel Voice",
    institution: "Mana Gallery",
    location: "Wynwood, FL",
    date: "2014",
    curatorial: "A high-impact showcase during Miami Art Week, featuring fragmented human forms and architectural reflections. The collection emphasized the tension between fragility and strength in modern cityscapes.",
    image: IMAGES.art1
  }
];

export default function Exhibitions() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow">
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-20 pt-10">
            <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4">
              Exhibitions
            </h2>
            <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] max-w-2xl leading-relaxed">
              Selected gallery shows and institutional presentations highlighting the evolution of José Awo's conceptual practice.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto space-y-32">
          {SHOWS.map((show, index) => (
            <FadeIn key={show.id} delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DF]">
                    <img 
                      src={show.image} 
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-['Roboto_Mono'] text-[13px] tracking-[1px] text-[#B7410E] uppercase">
                      {show.date}
                    </span>
                    <span className="w-8 h-[1px] bg-[#D4D0CB]"></span>
                    <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] uppercase tracking-[1px]">
                      {show.location}
                    </span>
                  </div>
                  <h3 className="font-['Roboto_Mono'] text-[28px] font-medium tracking-[1px] uppercase mb-2">
                    {show.title}
                  </h3>
                  <h4 className="font-['Work_Sans'] text-[18px] text-[#1A1A1A] mb-8 italic">
                    {show.institution}
                  </h4>
                  <p className="font-['Work_Sans'] text-[16px] leading-[1.8] text-[#666]">
                    {show.curatorial}
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
