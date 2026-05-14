import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, Download, Check, X } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { AnimatedSignature } from "@/components/AnimatedSignature";
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
  { id: "material-memory", img: IMAGES.art4, title: "Material Memory", year: "2021" },
  { id: "amber-prism", img: IMAGES.glassTexture, title: "Amber Prism", year: "2024" },
];

const CUSTOM_CV = [
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
      "2019 — Change your Thinking, Change the World | Gallery 297 | Atlanta, GA",
      "2018 — NBAF Artist Take Over | Atlanta, GA",
      "2017 — Art Basel Duns-Joesphine Hotel Gallery | Miami, FL",
      "2015 — W Hotel Group | 24 Ivan Allen Dr. | Atlanta, GA",
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
      "2017 — Kristen Kitchens Esq | Atlanta, GA",
      "2016 — Teresa Easton Collection, Glass Door installation (AJC), Atlanta, GA",
      "2015 — Hope Rises Like a Phoenix, South Side Medical Center, Atlanta, GA",
      "2015 — The W Hotel Group, Atlanta, GA. Office Mural",
      "2014 — Mack Willborn Collection, Atlanta, GA | Glass installation",
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
      "2009 — Stronger in the broken places, Studioplex | Atlanta, GA",
      "2008 — The Soul of Atlanta, Janke Gallery, Atlanta, GA"
    ]
  }
];

const BROAD_STROKES_GALLERY = [
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235080928-2XIGWH4MMFBBPRXJ4340/Broad+Strokes+on+Broad+Street+1.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235089505-XTFFJS0KHJJ0JHEYJFLB/Broad+Strokes+on+Broad+Street+QR+codes1.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235090302-ER5UPIGMSUPND1Y3LSTM/Broad+Strokes+on+Broad+Street+QR+codes2.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235090692-L9K02RG2GTO76MNGAT2U/broad+strokes+on+broad+street2.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235099768-AHTEGZAKQX7QD4BRSLKR/Broad+Strokes+on+Broad+Street3.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235100083-7LIRDPVPFGB33LH6FKLQ/Broad+Strokes+on+Broad+Street4.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235107838-NTA4WB979KDEX6GJ034E/Broad+Strokes+on+Broad+Street4%281%29.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235112396-APDE75MSBJ7NRY12EN7Q/IMG_2869.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235108790-RF18ZH33N76OXIRCUUDZ/jose1.jpg",
  "https://images.squarespace-cdn.com/content/v1/63bc4cd3254b492a58259fd6/1674235107566-TC2DPZ7JJW35ZUSUFPT0/IMG_1877.jpg",
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [openCVSections, setOpenCVSections] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    
    // Handle anchor links on load
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    
    return () => clearTimeout(timer);
  }, []);

  const toggleCVSection = (category: string) => {
    setOpenCVSections(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      {/* ============ HERO SECTION ============ */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={loaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={IMAGES.studioHero} 
            alt="José Awo Studio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6 w-full max-w-2xl px-4 flex justify-center text-[#F5F0EB]"
          >
            <AnimatedSignature />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-['Work_Sans'] text-[15px] tracking-[4px] text-[#F5F0EB]/80 uppercase text-center"
          >
            ART IN REFLECTION
          </motion.p>
        </div>
      </section>

      {/* ============ BIO SECTION (Light) ============ */}
      <section id="bio" className="py-32 px-8 bg-[#F5F0EB]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="font-['Space_Grotesk'] text-[36px] font-medium tracking-[1.5px] uppercase mb-16 text-center">
              José Awo Bio
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div className="space-y-6 font-['Work_Sans'] text-[17px] leading-[1.65] text-[#1A1A1A]">
                <p>
                  Awo is heavily influenced by his friend and mentor the legendary Santa Fe lithographer/painter Ron Adams (6/25/34 – 11/10/20). Adams called Awo's work "...challenging & daring," & stated "...you won't see anything like them anywhere else."
                </p>
                <p>
                  Atlanta-based conceptual artist Jose Awo draws inspiration from international travels to create sublime pieces that are "challenging and daring."
                </p>
                <p>
                  Using repurposed materials such as industrial glass, he has refined his own visual and conceptual vocabulary to create the dramatic. Awo's pieces are deconstructed and pure, with a studied appreciation of life's overlooked treasures. His artwork is designed to draw viewers into a reflective state of self-examination.
                </p>
                <p>
                  Through the use of powerful imagery, colors and materials, Awo's art highlights what's happening in society causing the viewer to ponder several societal issues -- such as the plight of the unhoused -- in perhaps a new and different light.
                </p>
                
                <div className="pt-8">
                  <a href="/s/jose-art-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group border-2 border-[#1A1A1A] px-6 py-3 relative overflow-hidden transition-colors duration-300">
                    <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2 font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#1A1A1A] group-hover:text-white transition-colors duration-300">
                      <Download size={14} /> Download Resume
                    </span>
                  </a>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-8">
              <FadeIn>
                <img
                  src={IMAGES.artist}
                  alt="José Awo"
                  className="w-full object-cover aspect-[4/3] mb-8"
                />
              </FadeIn>
              
              <FadeIn>
                <h3 className="font-['Space_Grotesk'] text-[18px] tracking-[1.5px] uppercase text-[#B7410E] mb-6">
                  Curriculum Vitae
                </h3>
                {CUSTOM_CV.map((section) => {
                  const isOpen = openCVSections.includes(section.category);
                  return (
                    <div key={section.category} className="mb-4 border border-[#D4D0CB] bg-[#F5F0EB]">
                      <button 
                        onClick={() => toggleCVSection(section.category)}
                        className="w-full flex items-center justify-between p-5 cursor-pointer focus:outline-none group"
                      >
                        <h4 className="font-['Space_Grotesk'] text-[13px] tracking-[1px] uppercase text-[#B7410E] group-hover:text-[#1A1A1A] transition-colors text-left">
                          {section.category}
                        </h4>
                        <ChevronDown size={18} className={`text-[#B7410E] transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 space-y-3 border-t border-[#E8E4DF] mt-2">
                          {section.entries.map((entry, ei) => (
                            <p key={ei} className="font-['Work_Sans'] text-[14px] text-[#1A1A1A] pb-2 border-b border-[#E8E4DF] last:border-0 last:pb-0">
                              {entry}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SELECTED WORKS GALLERY (Dark) ============ */}
      <section id="works" className="bg-[#1A1A1A] py-32 px-8 relative overflow-hidden">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <h3 className="font-['Space_Grotesk'] text-[14px] font-bold tracking-[3px] uppercase text-[#F5F0EB]">
              Selected Works
            </h3>
            <span className="font-['Work_Sans'] italic text-[15px] text-[#A0A0A0]">
              Pieces available for collection — drag to explore
            </span>
          </div>
        </FadeIn>

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
                        className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0 p-4"
                      />
                      <div className="absolute inset-0 border border-[#B7410E] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                      <span className="font-['Space_Grotesk'] text-[12px] text-[#888]">
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

      {/* ============ ACTIVISM (Light) ============ */}
      <section id="activism" className="py-32 px-8 bg-[#F5F0EB]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-['Space_Grotesk'] text-[36px] font-medium tracking-[1.5px] uppercase mb-12 text-[#1A1A1A]">
              Activism
            </h2>
            <p className="font-['Work_Sans'] text-[19px] leading-[1.8] text-[#1A1A1A]">
              Awo uses both his art and his service to the community as powerful tools in building coalitions and advocating for change. Through his art, he strives to help individuals and the public to visualize and experience the feelings and stories that its creator shares. 
              <br/><br/>
              Through his mentorship and service work with South Atlanta High School, Meals on Wheels, The Male Scholars Foundation and Caring Works to name a few, Awo is active in campaigning and being a voice for change.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ JOHNNY GANT (Dark) ============ */}
      <section className="py-32 px-8 bg-[#1A1A1A] text-[#F5F0EB]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative aspect-[4/3] bg-[#2A2A2A]">
              <img src={IMAGES.art2} alt="Johnny Gant Recognition" className="w-full h-full object-cover opacity-80" />
            </div>
          </FadeIn>
          <FadeIn>
            <h2 className="font-['Space_Grotesk'] text-[24px] font-medium tracking-[1.5px] uppercase mb-8 text-[#B7410E]">
              Johnny Gant Event <br/>(Atlanta City Hall)
            </h2>
            <p className="font-['Work_Sans'] text-[17px] leading-[1.65] text-[#D4D0CB]">
              The Atlanta City Council recognized celebrated boxer Johnny L. Gant Sr.’s outstanding humanitarianism and contributions to training athletes and the sport of boxing; his lifetime of accomplishments in sport, education, and business; and a legacy of kind heartedness as a philanthropist, boxer, and trainer of future Olympians and professional boxing athletes and designated August 1, 2022 as Johnny L. Gant Sr. Day. Jose Āwo was commissioned to create a piece to commemorate the day which hangs in the council chamber.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ BROAD STROKES (Light) ============ */}
      <section className="py-32 px-8 bg-[#F5F0EB]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="font-['Space_Grotesk'] text-[36px] font-medium tracking-[1.5px] uppercase mb-12 text-center text-[#1A1A1A]">
              Broad Strokes on Broad Street
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div className="space-y-6 font-['Work_Sans'] text-[17px] leading-[1.65] text-[#1A1A1A]">
                <p>
                  The project, organized and curated by the Mayor’s Office of Cultural Affairs (OCA) Public Art Program, provided opportunities for five local artists to showcase their work and artistic process by creating a temporary mural on a wall within the Broad Street boardwalk area between Martin Luther King Jr. Dr. and Mitchell St. in downtown Atlanta.
                </p>
                <p>
                  Broad Strokes on Broad Street is an art exhibit created by international conceptual artist Jose Āwo and was designed to bring increased attention to the plight of Atlanta’s un-homed community. The Broad Strokes on Broad Street journey consisted of a series of events advocating against homelessness in Atlanta by leveraging art activism, with a goal of providing a voice from and a window into heartfelt discussions and the experiences of the un-homed.
                </p>
                <p>
                  An Atlanta native, Āwo donated all proceeds from the installation to CaringWorks, a local agency that is working to end homelessness by providing comprehensive services and resources to the un-homed. Attendees experienced Āwo's talents through an interactive, multi-media exhibit that incorporated painting installations featuring QR codes. The codes launched clips featuring members of the un-housed community who shed light on the issue. The exhibit was presented by the City Atlanta Department of Planning and Urban Design.
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="columns-2 gap-4 space-y-4">
                {BROAD_STROKES_GALLERY.map((imgUrl, i) => (
                  <div key={i} className="break-inside-avoid relative overflow-hidden bg-[#E8E4DF]">
                    <img 
                      src={imgUrl} 
                      alt={`Broad Strokes ${i}`} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ CONTACT (Dark) ============ */}
      <section id="contact" className="py-32 px-8 bg-[#1A1A1A] text-[#F5F0EB]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-['Space_Grotesk'] text-[36px] font-medium tracking-[1.5px] uppercase mb-12 text-center">
              Contact José
            </h2>

            <form onSubmit={handleContactSubmit} className="space-y-8 bg-[#2A2A2A] p-8 md:p-12 border-t-4 border-[#B7410E]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                    First Name
                  </label>
                  <input type="text" required className="w-full bg-transparent border-b-2 border-[#555] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/10 font-['Work_Sans'] text-[17px] text-[#F5F0EB] outline-none transition-all duration-300" />
                </div>
                <div className="group relative">
                  <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                    Last Name
                  </label>
                  <input type="text" required className="w-full bg-transparent border-b-2 border-[#555] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/10 font-['Work_Sans'] text-[17px] text-[#F5F0EB] outline-none transition-all duration-300" />
                </div>
              </div>

              <div className="group relative">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                  Email
                </label>
                <input type="email" required className="w-full bg-transparent border-b-2 border-[#555] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/10 font-['Work_Sans'] text-[17px] text-[#F5F0EB] outline-none transition-all duration-300" />
              </div>

              <div className="group relative">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                  Subject
                </label>
                <input type="text" required className="w-full bg-transparent border-b-2 border-[#555] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/10 font-['Work_Sans'] text-[17px] text-[#F5F0EB] outline-none transition-all duration-300" />
              </div>

              <div className="group relative">
                <label className="font-['Space_Grotesk'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                  Message
                </label>
                <textarea rows={5} required className="w-full bg-transparent border-b-2 border-[#555] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/10 font-['Work_Sans'] text-[17px] text-[#F5F0EB] outline-none transition-all duration-300 resize-none" />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300 mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {!isSuccess && <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />}
                <span className="relative flex items-center justify-center gap-2 font-['Space_Grotesk'] text-[14px] tracking-[1.5px] uppercase transition-colors duration-300 text-[#B7410E] group-hover:text-[#F5F0EB]">
                  {isSubmitting ? "Sending..." : isSuccess ? <><Check size={18} /> Sent</> : "Submit"}
                </span>
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ============ CATEGORY MODAL ============ */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1A1A1A] w-full max-w-5xl max-h-[90vh] overflow-y-auto border-4 border-[#B7410E] relative shadow-[0_0_50px_rgba(183,65,14,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass Background Metaphor */}
              <div 
                className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen grayscale-[0.5]"
                style={{
                  backgroundImage: `url(${IMAGES.glassTexture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed'
                }}
              />

              <div className="sticky top-0 bg-[#1A1A1A]/85 backdrop-blur-xl border-b border-[#333] px-8 md:px-12 py-8 flex justify-between items-center z-20">
                <h3 className="font-['Space_Grotesk'] text-[32px] md:text-[48px] font-bold tracking-[4px] uppercase text-[#F5F0EB]">
                  {activeModal}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-[#F5F0EB] hover:text-[#B7410E] transition-colors p-2"
                >
                  <X size={36} />
                </button>
              </div>
              
              <div className="relative z-10 p-8 md:p-12 space-y-2">
                {activeModal === "Repurposed Glass" ? (
                  <p className="font-['Work_Sans'] text-[24px] text-[#A0A0A0] font-light leading-relaxed">
                    Recent works focusing on the intersection of light, texture, and repurposed industrial materials.
                  </p>
                ) : (
                  CUSTOM_CV.find(section => section.category === activeModal)?.entries.map((entry, idx) => {
                    const parts = entry.split(" — ");
                    const year = parts.length > 1 ? parts[0] : "";
                    const details = parts.length > 1 ? parts.slice(1).join(" — ") : entry;
                    
                    return (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 pb-8 border-b border-[#333] last:border-0 last:pb-0 pt-8 first:pt-0 group">
                        {year && (
                          <span className="font-['Space_Grotesk'] text-[16px] text-[#B7410E] tracking-[2px] font-bold w-20 flex-shrink-0 group-hover:text-[#F5F0EB] transition-colors duration-300">
                            {year}
                          </span>
                        )}
                        <span className="font-['Work_Sans'] text-[20px] md:text-[24px] text-[#F5F0EB] font-light group-hover:text-[#B7410E] transition-colors duration-300">
                          {details}
                        </span>
                      </div>
                    );
                  }) || (
                    <p className="font-['Work_Sans'] text-[24px] text-[#A0A0A0] font-light">
                      Details coming soon.
                    </p>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
