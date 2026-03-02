/*
 * CONCEPT 1: THE DIGITAL STUDIO
 * Design: Brutalist honesty + Industrial elegance
 * Palette: Studio White #F5F0EB, Charcoal #1A1A1A, Rusted Steel #B7410E
 * Fonts: Roboto Mono (headings) + Work Sans (body)
 * Layout: Light backgrounds, asymmetric grids, material-driven
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, Search, Download, ChevronLeft, ChevronRight, X } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6";

const IMAGES = {
  studioHero: `${CDN}/studio-hero-jwXknvZv5DswHDkt4MbmAu.webp`,
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
};

// Reusable fade-in component
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// SVG Signature animation
function AnimatedSignature() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg viewBox="0 0 600 120" className="w-full max-w-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* J */}
      <path
        d="M30 20 L30 75 Q30 100 15 100"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="120" strokeDashoffset={animate ? "0" : "120"}
        style={{ transition: "stroke-dashoffset 0.8s ease-in-out 0s" }}
      />
      {/* O */}
      <path
        d="M55 60 Q55 20 80 20 Q105 20 105 60 Q105 100 80 100 Q55 100 55 60Z"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset={animate ? "0" : "200"}
        style={{ transition: "stroke-dashoffset 1s ease-in-out 0.2s" }}
      />
      {/* S */}
      <path
        d="M140 30 Q120 20 120 40 Q120 60 140 60 Q160 60 160 80 Q160 100 140 100"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="160" strokeDashoffset={animate ? "0" : "160"}
        style={{ transition: "stroke-dashoffset 0.9s ease-in-out 0.4s" }}
      />
      {/* É */}
      <path
        d="M180 60 L210 60 L210 40 Q210 20 190 20 Q170 20 170 40 L170 80 Q170 100 190 100 Q210 100 210 90 M195 10 L205 0"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="250" strokeDashoffset={animate ? "0" : "250"}
        style={{ transition: "stroke-dashoffset 1s ease-in-out 0.6s" }}
      />
      {/* space + A */}
      <path
        d="M260 100 L285 20 L310 100 M268 70 L302 70"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="220" strokeDashoffset={animate ? "0" : "220"}
        style={{ transition: "stroke-dashoffset 0.9s ease-in-out 1s" }}
      />
      {/* W */}
      <path
        d="M330 20 L345 100 L365 50 L385 100 L400 20"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="280" strokeDashoffset={animate ? "0" : "280"}
        style={{ transition: "stroke-dashoffset 1s ease-in-out 1.2s" }}
      />
      {/* O */}
      <path
        d="M420 60 Q420 20 445 20 Q470 20 470 60 Q470 100 445 100 Q420 100 420 60Z"
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset={animate ? "0" : "200"}
        style={{ transition: "stroke-dashoffset 1s ease-in-out 1.4s" }}
      />
    </svg>
  );
}

// Navigation bar for Concept 1
function C1Nav({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0EB]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-5">
        <Link href="/">
          <span className="font-['Roboto_Mono'] text-[11px] tracking-[2px] uppercase text-[#A0A0A0] hover:text-[#B7410E] transition-colors duration-200 flex items-center gap-2">
            <ArrowLeft size={12} /> Back to Concepts
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {["Homepage", "Gallery", "Artwork", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#c1-${item.toLowerCase()}`}
              className="relative font-['Roboto_Mono'] text-[13px] font-medium tracking-[2px] uppercase text-[#1A1A1A] hover:text-[#B7410E] transition-colors duration-200 group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>
        <span className="font-['Roboto_Mono'] text-[10px] tracking-[2px] uppercase text-[#A0A0A0]">
          Concept 01
        </span>
      </div>
    </nav>
  );
}

export default function Concept1() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen">
      <C1Nav activeSection="homepage" />

      {/* ============ HOMEPAGE SECTION ============ */}
      <section id="c1-homepage" className="min-h-screen flex flex-col justify-center items-center pt-20 px-8 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute top-24 left-8"
        >
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[3px] uppercase text-[#A0A0A0]">
            Page: Homepage
          </span>
        </motion.div>

        {/* Animated signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <AnimatedSignature />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="font-['Work_Sans'] text-[13px] tracking-[3px] text-[#A0A0A0] uppercase text-center"
        >
          Conceptual Art · Repurposed Materials · Atlanta
        </motion.p>

        {/* Scroll hint */}
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

        {/* Artwork preview below fold */}
        <div className="mt-32 w-full max-w-5xl">
          <div className="relative h-[500px]">
            {/* Artwork 1 - rotated */}
            <FadeIn className="absolute left-0 top-0 w-[45%]" delay={0.1}>
              <div className="transform rotate-[-2deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_32px_rgba(26,26,26,0.08)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.12)]">
                <img src={IMAGES.art1} alt="Artwork" className="w-full" />
              </div>
            </FadeIn>
            {/* Artwork 2 - rotated other way */}
            <FadeIn className="absolute right-0 top-8 w-[42%]" delay={0.2}>
              <div className="transform rotate-[3deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_32px_rgba(26,26,26,0.08)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.12)]">
                <img src={IMAGES.art2} alt="Artwork" className="w-full" />
              </div>
            </FadeIn>
            {/* Artwork 3 - centered below */}
            <FadeIn className="absolute left-[20%] top-[220px] w-[48%]" delay={0.3}>
              <div className="transform rotate-[1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_32px_rgba(26,26,26,0.08)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.12)]">
                <img src={IMAGES.art3} alt="Artwork" className="w-full" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ GALLERY SECTION ============ */}
      <section id="c1-gallery" className="py-32 px-8 relative">
        <div className="absolute top-8 left-8">
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[3px] uppercase text-[#A0A0A0]">
            Page: Gallery / Work Overview
          </span>
        </div>

        <FadeIn>
          <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-4">
            Work
          </h2>
          <p className="font-['Work_Sans'] text-[17px] text-[#A0A0A0] mb-16 max-w-xl leading-relaxed">
            Browse by series. Each collection represents a distinct chapter in the artist's evolving practice.
          </p>
        </FadeIn>

        {/* Horizontal scroll gallery */}
        <div className="overflow-x-auto pb-8 -mx-8 px-8 scrollbar-hide">
          <div className="flex gap-6 w-max">
            {[
              { title: "EXHIBITIONS", desc: "Gallery shows and institutional presentations", img: IMAGES.art1 },
              { title: "COMMISSIONS", desc: "Bespoke works for collectors and institutions", img: IMAGES.art4 },
              { title: "PUBLIC ART", desc: "Community-engaged installations and murals", img: IMAGES.group1 },
              { title: "REPURPOSED GLASS", desc: "Industrial glass transformed into fine art", img: IMAGES.glassTexture },
            ].map((series, i) => (
              <FadeIn key={series.title} delay={i * 0.15}>
                <div className="group relative w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] overflow-hidden cursor-pointer">
                  <img
                    src={series.img}
                    alt={series.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-['Roboto_Mono'] text-[24px] font-medium tracking-[1px] uppercase text-white mb-1">
                      {series.title}
                    </h3>
                    <p className="font-['Work_Sans'] text-[13px] text-white/70">
                      {series.desc}
                    </p>
                  </div>
                  {/* Hover prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-['Roboto_Mono'] text-[12px] tracking-[2px] uppercase text-[#B7410E] bg-white/90 px-4 py-2">
                      Click to Explore →
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full h-[2px] bg-[#D4D0CB] relative">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-[#B7410E]" />
        </div>

        {/* Series Grid Preview */}
        <div className="mt-24">
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-['Roboto_Mono'] text-[24px] font-medium tracking-[1px] uppercase">
                Exhibitions
              </h3>
              <div className="flex gap-6">
                {["ALL", "YEAR ↓", "MEDIUM"].map((filter, i) => (
                  <span
                    key={filter}
                    className={`font-['Roboto_Mono'] text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors duration-200 ${
                      i === 0 ? "text-[#1A1A1A] border-b-[1.5px] border-[#B7410E] pb-1" : "text-[#A0A0A0] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Asymmetric masonry grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: IMAGES.art1, title: "Fractured Light", year: "2023", span: "md:col-span-2 md:row-span-2" },
              { img: IMAGES.art2, title: "Urban Reflection", year: "2022", span: "" },
              { img: IMAGES.art3, title: "Glass Cathedral", year: "2023", span: "" },
              { img: IMAGES.art4, title: "Material Memory", year: "2021", span: "" },
              { img: IMAGES.glassTexture, title: "Amber Prism", year: "2024", span: "md:col-span-2" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08} className={item.span}>
                <div className="group relative overflow-hidden cursor-pointer bg-[#F5F0EB] p-3">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover aspect-[4/3] transition-all duration-300 group-hover:brightness-[0.85]"
                    />
                    {/* Hover border */}
                    <div className="absolute inset-0 border border-[#B7410E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Hover icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-2 border-[#B7410E] flex items-center justify-center">
                        <Plus size={16} className="text-[#B7410E]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] group-hover:text-[#1A1A1A] transition-colors duration-300">
                      {item.title}, {item.year}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARTWORK DETAIL SECTION ============ */}
      <section id="c1-artwork" className="py-32 relative">
        <div className="absolute top-8 left-8">
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[3px] uppercase text-[#A0A0A0]">
            Page: Individual Artwork
          </span>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[80vh]">
          {/* Left panel - Image */}
          <FadeIn className="lg:w-[65%] bg-[#E8E4DF] flex items-center justify-center p-8 lg:p-16">
            <div className="relative group cursor-zoom-in">
              <img
                src={IMAGES.art1}
                alt="Fractured Light"
                className="max-h-[70vh] w-auto object-contain shadow-lg"
              />
              <div className="absolute bottom-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                <Search size={20} className="text-[#A0A0A0]" />
              </div>
            </div>
          </FadeIn>

          {/* Right panel - Details */}
          <FadeIn className="lg:w-[35%] bg-[#F5F0EB] p-8 lg:p-12 flex flex-col justify-center" delay={0.2}>
            <h2 className="font-['Roboto_Mono'] text-[28px] font-medium tracking-[1px] uppercase mb-8">
              Fractured Light
            </h2>

            <div className="space-y-4 mb-8">
              {[
                { label: "Year", value: "2023", color: "text-[#A0A0A0]" },
                { label: "Medium", value: "Industrial glass, acrylic, mixed media", color: "text-[#1A1A1A]" },
                { label: "Dimensions", value: "48 × 36 inches", color: "text-[#1A1A1A]" },
                { label: "Series", value: "Repurposed Glass", color: "text-[#B7410E]", link: true },
                { label: "Status", value: "AVAILABLE", color: "text-[#1A1A1A]", mono: true },
              ].map((field) => (
                <div key={field.label} className="flex justify-between items-baseline border-b border-[#E8E4DF] pb-3">
                  <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] tracking-[0.5px]">
                    {field.label}
                  </span>
                  <span className={`${field.mono ? "font-['Roboto_Mono'] text-[13px] uppercase tracking-[1px]" : "font-['Work_Sans'] text-[15px]"} ${field.color} ${field.link ? "hover:underline cursor-pointer" : ""}`}>
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Artist's Note */}
            <p className="font-['Work_Sans'] text-[15px] italic text-[#666] leading-relaxed mb-10">
              "This piece explores the tension between fragility and strength — industrial glass, once discarded, is given new purpose through layers of acrylic and light."
            </p>

            {/* Inquiry button */}
            <button className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300">
              <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative font-['Roboto_Mono'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] group-hover:text-[#F5F0EB] transition-colors duration-300">
                Inquire About This Piece
              </span>
            </button>

            {/* Prev/Next */}
            <div className="flex justify-between mt-8">
              <button className="flex items-center gap-2 font-['Roboto_Mono'] text-[12px] tracking-[1px] uppercase text-[#A0A0A0] hover:text-[#1A1A1A] hover:gap-3 transition-all duration-200">
                <ChevronLeft size={14} /> Previous
              </button>
              <button className="flex items-center gap-2 font-['Roboto_Mono'] text-[12px] tracking-[1px] uppercase text-[#A0A0A0] hover:text-[#1A1A1A] hover:gap-3 transition-all duration-200">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section id="c1-about" className="py-32 px-8 relative">
        <div className="absolute top-8 left-8">
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[3px] uppercase text-[#A0A0A0]">
            Page: About
          </span>
        </div>

        {/* Hero image */}
        <FadeIn>
          <div className="relative w-full h-[60vh] overflow-hidden mb-20">
            <img
              src={IMAGES.studioHero}
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
                Atlanta-based conceptual artist José Awo draws inspiration from international travels to create sublime pieces that are "challenging and daring." Using repurposed materials such as industrial glass, he has refined his own visual and conceptual vocabulary to create the dramatic.
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
              <p className="font-['Work_Sans'] text-[17px] leading-[1.65] text-[#1A1A1A] mb-6">
                Awo's pieces are deconstructed and pure, with a studied appreciation of life's overlooked treasures. His artwork is designed to draw viewers into a reflective state of self-examination. Through the use of powerful imagery, colors and materials, his art highlights what's happening in society.
              </p>
            </FadeIn>
          </div>

          {/* Right column - photos */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <div className="group overflow-hidden cursor-pointer">
                <img
                  src={IMAGES.artist}
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
              Through the use of powerful imagery, colors and materials, my art highlights what's happening in society causing the viewer to ponder several societal issues — such as the plight of the unhoused — in perhaps a new and different light. My work is a bridge between the overlooked and the seen, the discarded and the treasured.
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

          {[
            { category: "Commissions", entries: ["2022 — Johnny Gant Portrait, Atlanta City Hall, Atlanta, GA", "2021 — Private Collection, Mixed Media on Glass, Miami, FL"] },
            { category: "Exhibitions", entries: ["2023 — Broad Strokes on Broad Street, City of Atlanta Dept. of Planning", "2022 — Group Exhibition, Atlanta Contemporary Art Center", "2021 — Solo Exhibition, Mason Fine Art, Atlanta, GA"] },
            { category: "Community", entries: ["Ongoing — Mentor, South Atlanta High School", "Ongoing — Volunteer, Meals on Wheels", "Ongoing — Advocate, CaringWorks"] },
          ].map((section, si) => (
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

      {/* ============ CONTACT SECTION ============ */}
      <section id="c1-contact" className="py-32 px-8 relative">
        <div className="absolute top-8 left-8">
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[3px] uppercase text-[#A0A0A0]">
            Page: Contact
          </span>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <FadeIn>
            <h2 className="font-['Roboto_Mono'] text-[36px] font-medium tracking-[1.5px] uppercase mb-12">
              Contact
            </h2>

            <form className="space-y-8">
              {[
                { label: "Full Name", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Phone", type: "tel", required: false },
              ].map((field) => (
                <div key={field.label} className="group">
                  <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                    {field.label} {!field.required && <span className="text-[#D4D0CB]">(optional)</span>}
                  </label>
                  <input
                    type={field.type}
                    className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-colors duration-200"
                  />
                </div>
              ))}

              {/* Dropdown */}
              <div className="group">
                <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                  I am a...
                </label>
                <select className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-colors duration-200 appearance-none">
                  <option>Art Collector</option>
                  <option>Curator / Gallery</option>
                  <option>Press / Media</option>
                  <option>Art Enthusiast</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Subject */}
              <div className="group">
                <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-colors duration-200"
                />
              </div>

              {/* Message */}
              <div className="group">
                <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#1A1A1A] transition-colors duration-200 block mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <button className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300 mt-4">
                <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative font-['Roboto_Mono'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] group-hover:text-[#F5F0EB] transition-colors duration-300">
                  Send Message
                </span>
              </button>
            </form>

            {/* Social links */}
            <div className="mt-12 space-y-2">
              <p className="font-['Work_Sans'] text-[15px] text-[#A0A0A0]">
                info@joseawoart.com
              </p>
              <p className="font-['Work_Sans'] text-[15px] text-[#A0A0A0]">
                Instagram · LinkedIn
              </p>
            </div>
          </FadeIn>

          {/* Map placeholder */}
          <FadeIn delay={0.2}>
            <div className="relative w-full h-full min-h-[500px] bg-[#E8E4DF] flex items-center justify-center overflow-hidden">
              {/* Stylized map representation */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Grid lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#A0A0A0" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="#A0A0A0" strokeWidth="0.5" />
                  ))}
                  {/* Roads */}
                  <line x1="100" y1="0" x2="100" y2="400" stroke="#A0A0A0" strokeWidth="2" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#A0A0A0" strokeWidth="2" />
                  <line x1="250" y1="0" x2="250" y2="400" stroke="#A0A0A0" strokeWidth="1.5" />
                  <line x1="0" y1="300" x2="400" y2="300" stroke="#A0A0A0" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 bg-[#B7410E] rounded-full relative">
                  <div className="absolute inset-0 rounded-full bg-[#B7410E] animate-ping opacity-30" />
                </div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#B7410E] -mt-[1px]" />
                <p className="font-['Roboto_Mono'] text-[11px] tracking-[1px] uppercase text-[#1A1A1A] mt-4 bg-white/80 px-3 py-1">
                  Atlanta, GA
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-[#E8E4DF]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-['Roboto_Mono'] text-[11px] tracking-[2px] uppercase text-[#A0A0A0]">
            © 2026 José Awo Art
          </span>
          <span className="font-['Roboto_Mono'] text-[10px] tracking-[2px] uppercase text-[#D4D0CB]">
            Concept 1: The Digital Studio — Visual Mockup
          </span>
        </div>
      </footer>
    </div>
  );
}
