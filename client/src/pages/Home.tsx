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
      <section className="relative min-h-screen flex flex-col justify-center items-center">
        {/* Full Bleed Background Image */}
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
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6 w-full max-w-2xl px-4 flex justify-center text-[#F5F0EB]"
          >
            {/* We force the signature to be lighter by rendering it in white or off-white. The component might use currentcolor, but we will wrap it in a text-color class. */}
            <AnimatedSignature />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-['Work_Sans'] text-[15px] tracking-[4px] text-[#F5F0EB]/80 uppercase text-center"
          >
            Art Through Glass
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-16 z-10 flex flex-col items-center gap-4"
        >
          <Link href="/work">
            <button className="relative group border border-[#F5F0EB]/50 hover:border-[#B7410E] px-8 py-4 overflow-hidden transition-colors duration-300 backdrop-blur-sm bg-black/20 cursor-pointer">
              <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative font-['Roboto_Mono'] text-[12px] tracking-[2px] uppercase text-[#F5F0EB] transition-colors duration-300">
                Enter Gallery
              </span>
            </button>
          </Link>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
}
