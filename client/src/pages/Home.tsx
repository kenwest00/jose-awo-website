import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";
import { FadeIn } from "@/components/FadeIn";
import { AnimatedSignature } from "@/components/AnimatedSignature";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      {/* ============ HOMEPAGE SECTION ============ */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-20 px-8 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6 w-full max-w-2xl px-4"
        >
          <AnimatedSignature />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="font-['Work_Sans'] text-[13px] tracking-[3px] text-[#A0A0A0] uppercase text-center"
        >
          Conceptual Art · Repurposed Materials · Atlanta
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 0.6 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[2px] uppercase text-[#A0A0A0]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-8 bg-[#B7410E]"
          />
        </motion.div>

        <div className="mt-32 w-full max-w-5xl">
          <div className="relative h-[500px]">
            {/* Artwork 1 - rotated */}
            <FadeIn className="absolute left-0 top-0 w-[45%]" delay={0.1}>
              <Link href="/work/fractured-light">
                <div className="transform rotate-[-2deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_32px_rgba(26,26,26,0.08)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.12)] cursor-pointer">
                  <img src={IMAGES.art1} alt="Artwork" className="w-full" />
                </div>
              </Link>
            </FadeIn>
            {/* Artwork 2 - rotated other way */}
            <FadeIn className="absolute right-0 top-8 w-[42%]" delay={0.2}>
              <Link href="/work">
                <div className="transform rotate-[3deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_32px_rgba(26,26,26,0.08)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.12)] cursor-pointer">
                  <img src={IMAGES.art2} alt="Artwork" className="w-full" />
                </div>
              </Link>
            </FadeIn>
            {/* Artwork 3 - centered below */}
            <FadeIn className="absolute left-[20%] top-[220px] w-[48%]" delay={0.3}>
              <Link href="/work">
                <div className="transform rotate-[1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_32px_rgba(26,26,26,0.08)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.12)] cursor-pointer">
                  <img src={IMAGES.art3} alt="Artwork" className="w-full" />
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
