import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { IMAGES } from "@/lib/constants";

const COMMISSIONS = [
  {
    id: "coca-cola",
    title: "CDMX Installation",
    client: "Coca-Cola",
    location: "Mexico City",
    date: "2017",
    scale: "Large Scale Corporate Installation",
    brief: "To create a dynamic, culturally resonant piece that reflects both the global identity of the brand and the vibrant energy of Mexico City.",
    process: "The installation involved repurposing industrial materials and applying vivid, expressionistic layers to symbolize the flow of energy and connection.",
    image: IMAGES.glassTexture // Placeholder, user can update
  },
  {
    id: "w-hotel",
    title: "Office Mural",
    client: "The W Hotel Group",
    location: "Atlanta, GA",
    date: "2015",
    scale: "Interior Mural",
    brief: "To develop an engaging, modern mural for the corporate office space that aligns with the W Hotel's luxury, design-forward ethos.",
    process: "Utilizing bold lines and an earthy yet striking palette to create a continuous narrative along the office walls, grounding the workspace with artistic depth.",
    image: IMAGES.auburnAvenue // Placeholder
  }
];

export default function Commissions() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow">
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-20 pt-10">
            <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4">
              Commissions
            </h2>
            <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] max-w-2xl leading-relaxed">
              Case studies of major institutional and corporate commissions, detailing the integration of conceptual art into bespoke environments.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto space-y-32">
          {COMMISSIONS.map((comm) => (
            <FadeIn key={comm.id} delay={0.1}>
              <div className="border-t border-[#D4D0CB] pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Text Panel */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-['Roboto_Mono'] text-[13px] tracking-[1px] text-[#B7410E] uppercase">
                        {comm.client}
                      </span>
                      <span className="w-8 h-[1px] bg-[#D4D0CB]"></span>
                      <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] uppercase tracking-[1px]">
                        {comm.date}
                      </span>
                    </div>
                    
                    <h3 className="font-['Roboto_Mono'] text-[32px] font-medium tracking-[1px] uppercase mb-8">
                      {comm.title}
                    </h3>
                    
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] text-[#A0A0A0] uppercase mb-2">Project Brief</h4>
                        <p className="font-['Work_Sans'] text-[16px] leading-[1.8] text-[#1A1A1A]">{comm.brief}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] text-[#A0A0A0] uppercase mb-2">Process & Execution</h4>
                        <p className="font-['Work_Sans'] text-[16px] leading-[1.8] text-[#1A1A1A]">{comm.process}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[#E8E4DF]">
                        <div>
                          <h4 className="font-['Roboto_Mono'] text-[11px] tracking-[1.5px] text-[#A0A0A0] uppercase mb-1">Scale</h4>
                          <p className="font-['Work_Sans'] text-[14px] text-[#1A1A1A]">{comm.scale}</p>
                        </div>
                        <div>
                          <h4 className="font-['Roboto_Mono'] text-[11px] tracking-[1.5px] text-[#A0A0A0] uppercase mb-1">Location</h4>
                          <p className="font-['Work_Sans'] text-[14px] text-[#1A1A1A]">{comm.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Panel */}
                  <div className="bg-[#E8E4DF] p-6 flex items-center justify-center">
                    <img 
                      src={comm.image} 
                      alt={comm.title}
                      className="w-full h-auto object-cover shadow-lg"
                    />
                  </div>
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
