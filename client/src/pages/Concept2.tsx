/*
 * CONCEPT 2: THE IMMERSIVE NARRATIVE
 * Design: Cinematic Documentary / Dark Immersive
 * Palette: Deep Charcoal #0D0D0D, Warm White #F0EDE8, Spotlight Gold #D4A843
 * Fonts: Anton (display) + Lora (body)
 * Layout: Full-viewport scenes, theatrical lighting, narrative-driven
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Play, ChevronDown, Mail, Phone, MapPin } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6";

const IMAGES = {
  narrativeHero: `${CDN}/narrative-hero-Ri8parw7YQWdeHS2M5Lkpm.webp`,
  artist: `${CDN}/artist_2897ec9e.jpg`,
  art1: `${CDN}/art1_faa9735a.jpg`,
  art2: `${CDN}/art2_7e31ecfe.jpg`,
  art3: `${CDN}/art3_1170f1c4.jpg`,
  art4: `${CDN}/art4_46f3ec6a.jpg`,
  group1: `${CDN}/group1_b0f30c6b.jpg`,
  jose2: `${CDN}/jose2_79abb764.jpg`,
  jose3: `${CDN}/jose3_84cfa33a.jpg`,
  joseFamily: `${CDN}/jose_family_e6374163.jpg`,
  glassTexture: `${CDN}/glass-texture-G7LKw9JUdEBYFVE6T7fzLT.webp`,
  communityBw: `${CDN}/community-bw-Tmj75UzPNhdW6tER4LEFcT.webp`,
};

// Fade-in component
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word reveal
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Spotlight cursor effect
function SpotlightCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[100] w-[300px] h-[300px] rounded-full opacity-[0.06] hidden lg:block"
      style={{
        background: "radial-gradient(circle, rgba(212,168,67,0.8) 0%, transparent 70%)",
        left: pos.x - 150,
        top: pos.y - 150,
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
}

// Navigation
function C2Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0D0D0D]/95 backdrop-blur-md py-4" : "bg-transparent py-6"}`}>
      <div className="flex items-center justify-between px-8">
        <Link href="/">
          <span className="font-['Lora'] text-[11px] tracking-[2px] uppercase text-[#6B6B6B] hover:text-[#D4A843] transition-colors duration-300 flex items-center gap-2">
            <ArrowLeft size={12} /> Back to Concepts
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {["Homepage", "Gallery", "Artwork", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#c2-${item.toLowerCase()}`}
              className="relative font-['Anton'] text-[12px] tracking-[3px] uppercase text-[#F0EDE8]/60 hover:text-[#D4A843] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <span className="font-['Anton'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B]">
          Concept 02
        </span>
      </div>
    </nav>
  );
}

export default function Concept2() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="concept-2 bg-[#0D0D0D] text-[#F0EDE8] min-h-screen">
      <SpotlightCursor />
      <C2Nav />

      {/* ============ HOMEPAGE SECTION ============ */}
      <section id="c2-homepage" ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Page label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute top-24 left-8 z-20"
        >
          <span className="font-['Lora'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B]">
            Page: Homepage
          </span>
        </motion.div>

        {/* Background image with parallax */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={IMAGES.narrativeHero}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#0D0D0D]/30 to-[#0D0D0D]" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 min-h-screen flex flex-col justify-end px-8 pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-['Anton'] text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-[2px] uppercase">
              <span className="text-[#F0EDE8]">José</span>
              <br />
              <span className="text-[#D4A843]" style={{ textShadow: "0 0 40px rgba(212,168,67,0.3)" }}>
                Awo
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
            className="font-['Lora'] text-[18px] italic text-[#F0EDE8]/60 mt-6 max-w-lg"
          >
            Art that sees what others overlook. Materials that speak what words cannot.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 right-8 flex flex-col items-center gap-3"
          >
            <span className="font-['Anton'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B] [writing-mode:vertical-lr]">
              Scroll
            </span>
            <motion.div
              animate={{ height: [20, 40, 20] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] bg-[#D4A843]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Opening statement */}
      <section className="py-40 px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-['Lora'] text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.5] text-[#F0EDE8]/90">
              <WordReveal text="Every discarded piece of glass holds a story. Every overlooked corner of the city whispers a truth. José Awo listens — and transforms what he hears into art." />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ GALLERY SECTION ============ */}
      <section id="c2-gallery" className="py-32 px-8 relative">
        <div className="absolute top-8 left-8">
          <span className="font-['Lora'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B]">
            Page: Gallery
          </span>
        </div>

        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#D4A843] block mb-3">
                The Collection
              </span>
              <h2 className="font-['Anton'] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[1px] uppercase">
                Selected Works
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {["All", "Glass", "Mixed Media", "Commissions"].map((filter, i) => (
                <span
                  key={filter}
                  className={`font-['Anton'] text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 ${
                    i === 0 ? "text-[#D4A843]" : "text-[#6B6B6B] hover:text-[#F0EDE8]"
                  }`}
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Cinematic gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large featured */}
          <FadeIn className="md:col-span-8 md:row-span-2">
            <div className="group relative overflow-hidden cursor-pointer h-full">
              <img
                src={IMAGES.art1}
                alt="Featured artwork"
                className="w-full h-full object-cover min-h-[400px] md:min-h-[600px] transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#D4A843] block mb-2">
                  Exhibitions · 2023
                </span>
                <h3 className="font-['Anton'] text-[32px] tracking-[1px] uppercase text-white">
                  Fractured Light
                </h3>
                <p className="font-['Lora'] text-[14px] text-white/60 mt-2">
                  Industrial glass, acrylic, mixed media — 48 × 36 in.
                </p>
              </div>
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D4A843]" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#D4A843]" />
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#D4A843]" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-[#D4A843]" />
              </div>
            </div>
          </FadeIn>

          {/* Side pieces */}
          {[
            { img: IMAGES.art2, title: "Urban Reflection", year: "2022" },
            { img: IMAGES.art3, title: "Glass Cathedral", year: "2023" },
          ].map((item, i) => (
            <FadeIn key={item.title} className="md:col-span-4" delay={0.15 * (i + 1)}>
              <div className="group relative overflow-hidden cursor-pointer h-full min-h-[280px]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="font-['Anton'] text-[20px] tracking-[1px] uppercase text-white">
                    {item.title}
                  </h3>
                  <span className="font-['Lora'] text-[12px] text-[#D4A843]">{item.year}</span>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Bottom row */}
          {[
            { img: IMAGES.art4, title: "Material Memory", year: "2021" },
            { img: IMAGES.glassTexture, title: "Amber Prism", year: "2024" },
            { img: IMAGES.group1, title: "Community Canvas", year: "2023" },
          ].map((item, i) => (
            <FadeIn key={item.title} className="md:col-span-4" delay={0.1 * (i + 1)}>
              <div className="group relative overflow-hidden cursor-pointer aspect-[4/3]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="font-['Anton'] text-[20px] tracking-[1px] uppercase text-white">
                    {item.title}
                  </h3>
                  <span className="font-['Lora'] text-[12px] text-[#D4A843]">{item.year}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============ ARTWORK DETAIL SECTION ============ */}
      <section id="c2-artwork" className="py-32 relative">
        <div className="absolute top-8 left-8 z-10">
          <span className="font-['Lora'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B]">
            Page: Individual Artwork
          </span>
        </div>

        {/* Full-bleed artwork */}
        <div className="relative">
          <FadeIn>
            <div className="relative w-full h-[80vh] overflow-hidden">
              <img
                src={IMAGES.art1}
                alt="Fractured Light"
                className="w-full h-full object-contain bg-[#050505]"
              />
              {/* Vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
            </div>
          </FadeIn>

          {/* Details overlay panel */}
          <FadeIn delay={0.3}>
            <div className="max-w-6xl mx-auto px-8 -mt-32 relative z-10">
              <div className="bg-[#111]/95 backdrop-blur-md border border-[#222] p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left - Title and metadata */}
                  <div>
                    <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#D4A843] block mb-4">
                      Exhibitions · Repurposed Glass Series
                    </span>
                    <h2 className="font-['Anton'] text-[clamp(2rem,4vw,3.5rem)] tracking-[1px] uppercase leading-[1] mb-8">
                      Fractured Light
                    </h2>

                    {/* Metadata grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {[
                        { label: "Year", value: "2023" },
                        { label: "Medium", value: "Industrial glass, acrylic" },
                        { label: "Dimensions", value: "48 × 36 in." },
                        { label: "Status", value: "Available" },
                      ].map((field) => (
                        <div key={field.label}>
                          <span className="font-['Anton'] text-[10px] tracking-[2px] uppercase text-[#6B6B6B] block mb-1">
                            {field.label}
                          </span>
                          <span className={`font-['Lora'] text-[15px] ${field.label === "Status" ? "text-[#D4A843]" : "text-[#F0EDE8]"}`}>
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right - Statement and CTA */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#6B6B6B] mb-4">
                        Artist's Note
                      </h3>
                      <p className="font-['Lora'] text-[16px] italic leading-[1.8] text-[#F0EDE8]/70">
                        "This piece explores the tension between fragility and strength — industrial glass, once discarded, is given new purpose through layers of acrylic and light. The fractures become pathways for illumination."
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 space-y-4">
                      <button className="group relative w-full bg-[#D4A843] py-4 overflow-hidden transition-all duration-300 hover:bg-[#C49A3A]">
                        <span className="relative font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#0D0D0D]">
                          Inquire About This Piece
                        </span>
                      </button>
                      <button className="group relative w-full border border-[#333] py-4 overflow-hidden transition-all duration-300 hover:border-[#D4A843]">
                        <span className="relative font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#6B6B6B] group-hover:text-[#D4A843] transition-colors duration-300">
                          Schedule Private Viewing
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#222]">
                  <button className="flex items-center gap-3 font-['Anton'] text-[12px] tracking-[2px] uppercase text-[#6B6B6B] hover:text-[#D4A843] transition-colors duration-300">
                    <ArrowLeft size={14} /> Previous Work
                  </button>
                  <span className="font-['Lora'] text-[12px] text-[#6B6B6B]">3 of 12</span>
                  <button className="flex items-center gap-3 font-['Anton'] text-[12px] tracking-[2px] uppercase text-[#6B6B6B] hover:text-[#D4A843] transition-colors duration-300">
                    Next Work <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section id="c2-about" className="py-32 relative overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <span className="font-['Lora'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B]">
            Page: About
          </span>
        </div>

        {/* Cinematic portrait */}
        <FadeIn>
          <div className="relative w-full h-[70vh] overflow-hidden">
            <img
              src={IMAGES.artist}
              alt="José Awo"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

            {/* Title over image */}
            <div className="absolute bottom-12 left-8 md:left-16">
              <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#D4A843] block mb-3">
                The Artist
              </span>
              <h2 className="font-['Anton'] text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[2px] uppercase">
                José<br />Awo
              </h2>
            </div>
          </div>
        </FadeIn>

        {/* Bio */}
        <div className="max-w-5xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <FadeIn>
                <p className="font-['Lora'] text-[19px] leading-[1.8] text-[#F0EDE8]/80 mb-8">
                  Atlanta-based conceptual artist José Awo draws inspiration from international travels to create sublime pieces that are "challenging and daring." Using repurposed materials such as industrial glass, he has refined his own visual and conceptual vocabulary to create the dramatic.
                </p>
              </FadeIn>

              {/* Pull quote */}
              <FadeIn delay={0.1}>
                <div className="relative my-12 py-8">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#D4A843] via-[#D4A843]/50 to-transparent" />
                  <blockquote className="pl-8">
                    <p className="font-['Lora'] text-[24px] italic text-[#D4A843] leading-[1.6]" style={{ textShadow: "0 0 30px rgba(212,168,67,0.15)" }}>
                      "...challenging & daring — you won't see anything like them anywhere else."
                    </p>
                    <cite className="font-['Anton'] text-[11px] tracking-[2px] uppercase text-[#6B6B6B] mt-4 block not-italic">
                      Ron Adams — Legendary Santa Fe Lithographer
                    </cite>
                  </blockquote>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="font-['Lora'] text-[19px] leading-[1.8] text-[#F0EDE8]/80">
                  Awo's pieces are deconstructed and pure, with a studied appreciation of life's overlooked treasures. His artwork is designed to draw viewers into a reflective state of self-examination. Through the use of powerful imagery, colors and materials, his art highlights what's happening in society.
                </p>
              </FadeIn>
            </div>

            {/* Right - photos */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn delay={0.1}>
                <div className="group relative overflow-hidden">
                  <img
                    src={IMAGES.jose2}
                    alt="José at work"
                    className="w-full object-cover aspect-[4/3] transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 border border-[#D4A843]/0 group-hover:border-[#D4A843]/40 transition-all duration-500" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="group relative overflow-hidden">
                  <img
                    src={IMAGES.jose3}
                    alt="José in studio"
                    className="w-full object-cover aspect-[3/4] transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 border border-[#D4A843]/0 group-hover:border-[#D4A843]/40 transition-all duration-500" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Community section */}
        <div className="max-w-6xl mx-auto px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
              <div className="relative">
                <img
                  src={IMAGES.communityBw}
                  alt="Community"
                  className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D0D0D]/50" />
              </div>
              <div className="bg-[#111] p-8 md:p-12 flex flex-col justify-center">
                <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#D4A843] block mb-4">
                  Art as Activism
                </span>
                <h3 className="font-['Anton'] text-[32px] tracking-[1px] uppercase mb-6">
                  Community First
                </h3>
                <p className="font-['Lora'] text-[16px] leading-[1.8] text-[#F0EDE8]/60 mb-8">
                  Beyond the gallery walls, José's work extends into the community. As a mentor, volunteer, and advocate, he uses art as a vehicle for social change — bringing visibility to the unhoused, mentoring young artists, and transforming public spaces.
                </p>
                <div className="space-y-3">
                  {["Mentor — South Atlanta High School", "Volunteer — Meals on Wheels", "Advocate — CaringWorks"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#D4A843] rounded-full" />
                      <span className="font-['Lora'] text-[14px] text-[#F0EDE8]/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-8 py-32">
          <FadeIn>
            <h3 className="font-['Anton'] text-[32px] tracking-[1px] uppercase text-center mb-16">
              Career Timeline
            </h3>
          </FadeIn>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#222] transform -translate-x-1/2" />

            {[
              { year: "2021", title: "Solo Exhibition", desc: "Mason Fine Art, Atlanta, GA", side: "left" },
              { year: "2022", title: "Johnny Gant Portrait", desc: "Commissioned by Atlanta City Hall", side: "right" },
              { year: "2023", title: "Broad Strokes", desc: "City of Atlanta Dept. of Planning", side: "left" },
              { year: "2024", title: "Glass Series", desc: "New body of work with repurposed industrial glass", side: "right" },
            ].map((event, i) => (
              <FadeIn key={event.year} delay={i * 0.1}>
                <div className={`relative flex items-center mb-16 ${event.side === "left" ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${event.side === "left" ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <span className="font-['Anton'] text-[40px] text-[#D4A843]/30 block leading-none">
                      {event.year}
                    </span>
                    <h4 className="font-['Anton'] text-[18px] tracking-[1px] uppercase text-[#F0EDE8] mt-2">
                      {event.title}
                    </h4>
                    <p className="font-['Lora'] text-[14px] text-[#6B6B6B] mt-1">
                      {event.desc}
                    </p>
                  </div>
                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#D4A843] rounded-full z-10">
                    <div className="absolute inset-0 rounded-full bg-[#D4A843] animate-ping opacity-20" />
                  </div>
                  <div className="w-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="c2-contact" className="py-32 px-8 relative">
        <div className="absolute top-8 left-8">
          <span className="font-['Lora'] text-[10px] tracking-[3px] uppercase text-[#6B6B6B]">
            Page: Contact
          </span>
        </div>

        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#D4A843] block mb-4">
                Get in Touch
              </span>
              <h2 className="font-['Anton'] text-[clamp(2.5rem,6vw,5rem)] tracking-[1px] uppercase">
                Start a Conversation
              </h2>
              <p className="font-['Lora'] text-[18px] italic text-[#F0EDE8]/50 mt-4 max-w-lg mx-auto">
                Whether you're a collector, curator, or simply moved by the work — every conversation begins here.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: "Full Name", type: "text" },
                    { label: "Email", type: "email" },
                  ].map((field) => (
                    <div key={field.label} className="group">
                      <label className="font-['Anton'] text-[10px] tracking-[2px] uppercase text-[#6B6B6B] group-focus-within:text-[#D4A843] transition-colors duration-300 block mb-3">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#D4A843] py-3 font-['Lora'] text-[16px] text-[#F0EDE8] outline-none transition-colors duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Role selector */}
                <div className="group">
                  <label className="font-['Anton'] text-[10px] tracking-[2px] uppercase text-[#6B6B6B] group-focus-within:text-[#D4A843] transition-colors duration-300 block mb-3">
                    I am a...
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Collector", "Curator / Gallery", "Press", "Art Lover", "Other"].map((role, i) => (
                      <button
                        key={role}
                        type="button"
                        className={`font-['Anton'] text-[11px] tracking-[2px] uppercase px-5 py-2.5 border transition-all duration-300 ${
                          i === 0
                            ? "border-[#D4A843] text-[#D4A843] bg-[#D4A843]/10"
                            : "border-[#333] text-[#6B6B6B] hover:border-[#D4A843] hover:text-[#D4A843]"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div className="group">
                  <label className="font-['Anton'] text-[10px] tracking-[2px] uppercase text-[#6B6B6B] group-focus-within:text-[#D4A843] transition-colors duration-300 block mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#D4A843] py-3 font-['Lora'] text-[16px] text-[#F0EDE8] outline-none transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="group">
                  <label className="font-['Anton'] text-[10px] tracking-[2px] uppercase text-[#6B6B6B] group-focus-within:text-[#D4A843] transition-colors duration-300 block mb-3">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#D4A843] py-3 font-['Lora'] text-[16px] text-[#F0EDE8] outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <button className="group relative w-full bg-[#D4A843] py-4 overflow-hidden transition-all duration-300 hover:bg-[#C49A3A]">
                  <span className="relative font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#0D0D0D]">
                    Send Message
                  </span>
                </button>
              </form>
            </FadeIn>

            {/* Contact info */}
            <FadeIn className="lg:col-span-2" delay={0.2}>
              <div className="space-y-10">
                <div>
                  <h3 className="font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#D4A843] mb-6">
                    Direct Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail size={16} className="text-[#6B6B6B]" />
                      <span className="font-['Lora'] text-[15px] text-[#F0EDE8]/70">info@joseawoart.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin size={16} className="text-[#6B6B6B]" />
                      <span className="font-['Lora'] text-[15px] text-[#F0EDE8]/70">Atlanta, Georgia</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#D4A843] mb-6">
                    For Collectors
                  </h3>
                  <p className="font-['Lora'] text-[15px] leading-[1.8] text-[#F0EDE8]/50">
                    Interested in acquiring a piece? Request access to the private Viewing Room for detailed imagery, provenance documentation, and pricing.
                  </p>
                  <button className="mt-4 flex items-center gap-2 font-['Anton'] text-[11px] tracking-[2px] uppercase text-[#D4A843] hover:gap-3 transition-all duration-300">
                    <Lock size={12} /> Request Viewing Room Access
                  </button>
                </div>

                <div>
                  <h3 className="font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#D4A843] mb-6">
                    For Exhibitors
                  </h3>
                  <p className="font-['Lora'] text-[15px] leading-[1.8] text-[#F0EDE8]/50">
                    Download the exhibition kit with high-resolution images, artist bio, and technical specifications for installation.
                  </p>
                  <button className="mt-4 flex items-center gap-2 font-['Anton'] text-[11px] tracking-[2px] uppercase text-[#D4A843] hover:gap-3 transition-all duration-300">
                    Download Exhibition Kit <ArrowRight size={12} />
                  </button>
                </div>

                {/* Social */}
                <div className="pt-8 border-t border-[#222]">
                  <h3 className="font-['Anton'] text-[14px] tracking-[2px] uppercase text-[#6B6B6B] mb-4">
                    Follow
                  </h3>
                  <div className="flex gap-6">
                    {["Instagram", "LinkedIn"].map((platform) => (
                      <span
                        key={platform}
                        className="font-['Lora'] text-[14px] text-[#6B6B6B] hover:text-[#D4A843] transition-colors duration-300 cursor-pointer"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-['Anton'] text-[11px] tracking-[3px] uppercase text-[#6B6B6B]">
            © 2026 José Awo Art
          </span>
          <span className="font-['Lora'] text-[10px] tracking-[2px] uppercase text-[#333]">
            Concept 2: The Immersive Narrative — Visual Mockup
          </span>
        </div>
      </footer>
    </div>
  );
}
