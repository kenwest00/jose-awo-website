import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Landing() {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
            {/* Absolute center title */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center hidden lg:block">
                <h1 className="font-['Roboto_Mono'] text-[14px] tracking-[4px] uppercase text-[#A0A0A0] bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl mix-blend-difference">
                    José Awo — Visual Mockups
                </h1>
            </div>

            {/* Concept 1 Split */}
            <Link href="/concept-1">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex-1 h-full bg-[#F5F0EB] flex flex-col items-center justify-center p-12 cursor-pointer transition-all duration-700 ease-in-out hover:flex-[1.15]"
                >
                    {/* Subtle Background Elements */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#B7410E]/5 rounded-full blur-3xl" />
                        <div className="absolute top-1/2 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4D0CB] to-transparent" />
                    </div>

                    <div className="relative z-10 text-center flex flex-col items-center max-w-md">
                        <span className="font-['Roboto_Mono'] text-[10px] tracking-[4px] uppercase text-[#B7410E] mb-6">
                            Concept 01
                        </span>
                        <h2 className="font-['Roboto_Mono'] text-4xl md:text-5xl font-medium tracking-[2px] uppercase text-[#1A1A1A] mb-6 font-semibold">
                            The Digital Studio
                        </h2>
                        <p className="font-['Work_Sans'] text-base text-[#A0A0A0] mb-10 leading-relaxed max-w-sm">
                            Industrial Brutalism meets Gallery Minimalism. Warm off-white backgrounds, material-driven layout, and asymmetric grids.
                        </p>

                        <div className="inline-flex items-center gap-4 font-['Roboto_Mono'] text-[12px] tracking-[2px] uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-2 overflow-hidden relative">
                            <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full absolute">Explore Concept</span>
                            <span className="transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-[#B7410E]">Explore Concept</span>
                            <span className="opacity-0">Explore Concept</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out group-hover:text-[#B7410E]" />
                        </div>
                    </div>
                </motion.div>
            </Link>

            {/* Concept 2 Split */}
            <Link href="/concept-2">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex-1 h-full bg-[#0D0D0D] flex flex-col items-center justify-center p-12 cursor-pointer transition-all duration-700 ease-in-out hover:flex-[1.15]"
                >
                    {/* Subtle Background Elements */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D4A843]/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 text-center flex flex-col items-center max-w-md">
                        <span className="font-['Anton'] text-[11px] tracking-[4px] uppercase text-[#D4A843] mb-6">
                            Concept 02
                        </span>
                        <h2 className="font-['Anton'] text-5xl md:text-6xl tracking-[2px] uppercase text-[#F0EDE8] mb-6 drop-shadow-lg">
                            The Immersive Narrative
                        </h2>
                        <p className="font-['Lora'] text-lg italic text-[#F0EDE8]/60 mb-10 leading-relaxed max-w-sm">
                            Cinematic Documentary approach. Deep charcoal tones, theatrical lighting, and a narrative-driven scroll experience.
                        </p>

                        <div className="inline-flex items-center gap-4 font-['Anton'] text-[12px] tracking-[3px] uppercase text-[#F0EDE8] border-b border-[#F0EDE8] pb-2 overflow-hidden relative">
                            <span className="transition-transform duration-500 ease-out group-hover:-translate-y-full absolute">Enter Experience</span>
                            <span className="transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-[#D4A843]">Enter Experience</span>
                            <span className="opacity-0">Enter Experience</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out group-hover:text-[#D4A843]" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}
