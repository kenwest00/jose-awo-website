import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const IMAGES = {
  studioHero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/studio-hero-jwXknvZv5DswHDkt4MbmAu.webp",
  narrativeHero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/narrative-hero-Ri8parw7YQWdeHS2M5Lkpm.webp",
};

export default function Home() {
  const [hoveredConcept, setHoveredConcept] = useState<1 | 2 | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="px-8 pt-8 pb-4"
        >
          <p className="font-['Roboto_Mono'] text-[11px] tracking-[3px] uppercase text-[#6B6B6B]">
            Website Redesign Concepts
          </p>
        </motion.header>

        {/* Main */}
        <div className="flex-1 flex flex-col justify-center px-8 pb-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-16"
          >
            <h1 className="font-['Anton'] text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[1px] uppercase">
              <span className="text-white">José</span>
              <br />
              <span className="text-[#D4A843]">Awo</span>
              <span className="text-white"> Art</span>
            </h1>
            <p className="font-['Lora'] text-[#888] text-lg mt-6 max-w-xl leading-relaxed italic">
              Two distinct visions for a world-class artist portfolio — choose a concept to explore.
            </p>
          </motion.div>

          {/* Concept Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
            {/* Concept 1 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/concept-1">
                <div
                  className="group relative overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredConcept(1)}
                  onMouseLeave={() => setHoveredConcept(null)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={IMAGES.studioHero}
                      alt="The Digital Studio concept"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-['Roboto_Mono'] text-[11px] tracking-[2px] uppercase text-[#B7410E]">
                          Concept 01
                        </span>
                        <span className="w-8 h-[1px] bg-[#B7410E]" />
                      </div>
                      <h2 className="font-['Roboto_Mono'] text-2xl md:text-3xl font-medium tracking-[1.5px] uppercase text-white mb-2">
                        The Digital Studio
                      </h2>
                      <p className="font-['Work_Sans'] text-sm text-[#ccc] max-w-md leading-relaxed">
                        Brutalist honesty meets industrial elegance. Light backgrounds, monospaced typography, material-driven animations.
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 mt-4 text-[#B7410E] font-['Roboto_Mono'] text-xs tracking-[2px] uppercase transition-all duration-300 group-hover:gap-4">
                        <span>Explore Concept</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Border accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Light Theme", "Industrial", "Collector-Focused", "FLIP Animations"].map((tag) => (
                  <span key={tag} className="font-['Roboto_Mono'] text-[10px] tracking-[1px] uppercase text-[#666] border border-[#333] px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Concept 2 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Link href="/concept-2">
                <div
                  className="group relative overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredConcept(2)}
                  onMouseLeave={() => setHoveredConcept(null)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={IMAGES.narrativeHero}
                      alt="The Immersive Narrative concept"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-['Anton'] text-[11px] tracking-[2px] uppercase text-[#D4A843]">
                          Concept 02
                        </span>
                        <span className="w-8 h-[1px] bg-[#D4A843]" />
                      </div>
                      <h2 className="font-['Anton'] text-2xl md:text-3xl tracking-[1px] uppercase text-white mb-2">
                        The Immersive Narrative
                      </h2>
                      <p className="font-['Lora'] text-sm text-[#ccc] max-w-md leading-relaxed">
                        Cinematic storytelling through darkness and light. Art as activism, guided narrative, emotional resonance.
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 mt-4 text-[#D4A843] font-['Anton'] text-xs tracking-[2px] uppercase transition-all duration-300 group-hover:gap-4">
                        <span>Explore Concept</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Border accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A843] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Dark Theme", "Cinematic", "Story-Driven", "WebGL Effects"].map((tag) => (
                  <span key={tag} className="font-['Anton'] text-[10px] tracking-[2px] uppercase text-[#666] border border-[#333] px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="px-8 pb-8 flex justify-between items-end"
        >
          <p className="font-['Roboto_Mono'] text-[10px] tracking-[2px] uppercase text-[#444]">
            Scroll within each concept to see all pages
          </p>
          <p className="font-['Roboto_Mono'] text-[10px] tracking-[2px] uppercase text-[#444]">
            2026
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
