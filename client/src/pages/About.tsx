import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function About() {
  const customCV = [
    {
      category: "Fellowship/Residency",
      entries: [
        "Georgia Institute of Technology Artist in residence: 2025 - 2026",
        "ARC Culture and Community Design: 2023 - 2024",
      ]
    },
    {
      category: "Exhibitions",
      entries: [
        "2019 — Change your Thinking, Change the World l Gallery 297 | Atlanta, GA",
        "2018 — NBAF Artist Take Over l Atlanta, GA",
        "2017 — Art Basel Duns-Joesphine Hotel Gallery l Miami, FL",
        "2015 — W Hotel Group l 24 Ivan Allen Dr. l Atlanta, GA",
        "2014 — Art Basel Voice Mana Gallary | Wynwood, FL",
        "2012 — For the Love of Art: For the Love of Culture, Studioplex | Atlanta, GA",
        "2011 — This Blackness is Just for You, Elseworth Industrial | Atlanta, GA"
      ]
    },
    {
      category: "Commissions",
      entries: [
        "2019 — Allen & Judy Daniels Trust | Reception, Abstract",
        "2017 — Coca-Cola, CDMX Installation",
        "2017 — Kristen Kitchens Esq l, Atlanta, GA",
        "2016 — Teresa Easton Collection, Glass Door installation (AJC), Atlanta, GA",
        "2015 — Hope Rises Like a Phoenix, South Side Medical Center, Atlanta, GA",
        "2015 — The W Hotel Group, Atlanta, GA. Office Mural",
        "2014 — Mack Willborn Collection, Atlanta, GA l Glass installation",
        "2012 — Ernest Kaiser Collection: Modern Shame, Sandy Springs, GA",
        "2010 — Dr. Chris Reeves, Alpharetta, GA | Untitled",
        "2009 — Al Taylor, Atlanta, GA. Conceptual | What your Mind can Achieve"
      ]
    },
    {
      category: "Public Art",
      entries: [
        "2022 — CrossWalk Project: Hope Hill Elementary School, Atlanta, GA",
        "2021 — Broad Stroke on Broad St., Atlanta, GA",
        "2016 — Dunbar Community project, Learning in Color Collab, Atlanta, GA",
        "2014 — Hope Rises Like a Phoenix, SouthSide Medical Center, Atlanta, GA",
        "2010 — Co-artist lead - Love, Hope, & Miracles, Atlanta, GA",
        "2009 — Stronger in the broken places, Studioplex l Atlanta, GA",
        "2008 — The Soul of Atlanta, Janke Gallery, Atlanta, GA"
      ]
    }
  ];

  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow">
        {/* Hero image */}
        <FadeIn>
          <div className="relative w-full h-[60vh] overflow-hidden mb-20 mt-10">
            <img
              src="/crown_of_thorns.jpg"
              alt="Artist studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0EB] via-transparent to-transparent" />
            <h2 className="absolute bottom-8 left-8 font-['Roboto_Mono'] text-[48px] md:text-[72px] font-medium tracking-[3px] uppercase text-[#1A1A1A]">
              About
            </h2>
          </div>
        </FadeIn>

        {/* Bio - two column */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 mb-32">
          <div className="lg:col-span-3">
            <FadeIn>
              <p className="font-['Work_Sans'] text-[17px] leading-[1.65] text-[#1A1A1A] mb-6">
                Jose Awo is an Atlanta-based artist known for a dynamic, versatile body of work that includes abstract expressionism, bold illustration, and stylized photographic alteration. His art powerfully conveys intense inner emotion and delves into urban and historical narratives.
              </p>
            </FadeIn>

            {/* Pull quote */}
            <FadeIn delay={0.1}>
              <blockquote className="border-l-[3px] border-[#B7410E] pl-6 my-8">
                <p className="font-['Roboto_Mono'] text-[20px] italic text-[#B7410E] leading-relaxed">
                  "...challenging & daring — you won't see anything like them anywhere else."
                </p>
                <cite className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] mt-2 block not-italic">
                  — Ron Adams, Legendary Santa Fe Lithographer
                </cite>
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h4 className="font-['Roboto_Mono'] text-[14px] tracking-[1.5px] uppercase text-[#1A1A1A] mb-3 mt-6">Key Artistic Themes and Styles:</h4>
              <ul className="list-disc pl-5 font-['Work_Sans'] text-[16px] leading-[1.65] text-[#1A1A1A] mb-6 space-y-2">
                <li><strong className="font-semibold">Abstract Expressionism:</strong> Characterized by energetic, free-form paintings, often utilizing an earthy palette and featuring fragmented human forms.</li>
                <li><strong className="font-semibold">Urban & Historical Narrative:</strong> Impressionistic works that focus on African-American history and the Civil Rights Movement.</li>
                <li><strong className="font-semibold">Mixed Media:</strong> Layers of multi media artifacts and color applied over underlying figurative imagery.</li>
                <li><strong className="font-semibold">Public Art:</strong> Large-scale, layered abstract works and murals, distinguished by bold lines and vivid colors (e.g., the notable "Broad Strokes on Broad Street").</li>
              </ul>
              <p className="font-['Work_Sans'] text-[17px] leading-[1.65] text-[#1A1A1A] mb-6">
                Awo's portfolio is defined by its energetic compositions, bold color, and a consistent focus on the human figure, the urban environment, and historical context, all rendered through a contemporary, expressionistic lens.
              </p>
            </FadeIn>
          </div>

          {/* Right column - photos */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <div className="group overflow-hidden cursor-pointer">
                <img
                  src="/jose_working.jpg"
                  alt="José Awo"
                  className="w-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="group overflow-hidden cursor-pointer">
                <img
                  src={IMAGES.jose2}
                  alt="José Awo at work"
                  className="w-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Artist Statement */}
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-32">
            <h3 className="font-['Roboto_Mono'] text-[24px] font-medium tracking-[1px] uppercase mb-8">
              Artist Statement
            </h3>
            <p className="font-['Work_Sans'] text-[19px] leading-[1.8] text-[#1A1A1A]">
              My work as a conceptual artist is a reflection on the dramatic, sublime, and often challenging nature of human experience, deeply rooted in my culture, environment, and commitment to youth. I aim to create a challenging and daring body of work with a unique visual and conceptual style. 
              <br /><br />
              A defining characteristic of my practice is the integration of rediscovered and repurposed materials which transform the overlooked into the profound and give new life to forgotten narratives.
            </p>
          </div>
        </FadeIn>

        {/* CV Section */}
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h3 className="font-['Roboto_Mono'] text-[24px] font-medium tracking-[1px] uppercase mb-8">
              Curriculum Vitae
            </h3>
          </FadeIn>

          {customCV.map((section, si) => (
            <FadeIn key={section.category} delay={si * 0.1}>
              <div className="mb-8">
                <h4 className="font-['Roboto_Mono'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] mb-4">
                  {section.category}
                </h4>
                {section.entries.map((entry, ei) => (
                  <motion.p
                    key={ei}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ei * 0.03 }}
                    className="font-['Work_Sans'] text-[15px] text-[#1A1A1A] py-2 border-b border-[#E8E4DF]"
                  >
                    {entry}
                  </motion.p>
                ))}
              </div>
            </FadeIn>
          ))}

          {/* Download buttons */}
          <FadeIn>
            <div className="flex flex-wrap gap-4 mt-12">
              {["Download Full CV (PDF)", "Download Press Kit (ZIP)"].map((label) => (
                <button key={label} className="relative group border-2 border-[#1A1A1A] px-6 py-3 overflow-hidden transition-colors duration-300">
                  <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2 font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#1A1A1A] group-hover:text-white transition-colors duration-300">
                    <Download size={14} /> {label}
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
