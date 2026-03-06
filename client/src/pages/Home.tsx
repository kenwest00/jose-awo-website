import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/*
 * DESIGN: "The Digital Studio — Layers of Glass"
 * Philosophy: Light, warm, material-driven. Ferrule chrome accents.
 * Thin modern sans-serif (Inter Tight 100–400) + elegant serif (Cormorant Garamond).
 * Full-width parallax hero using José's actual paintings as glass layers.
 * Smooth scroll-driven parallax via CSS transforms + rAF.
 */

// ─── CDN URLS ────────────────────────────────────────────────────────
// Glass layers (processed from José's actual paintings — full-width 2400px PNGs)
const GLASS_BACK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/glass-hero-back_acec382b.png";
const GLASS_MIDDLE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/glass-hero-middle_e1ac1f97.png";
const GLASS_FRONT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/glass-hero-front_dfd82bd2.png";

// José's paintings (user-uploaded originals)
const PAINTING_VIBRANT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_painting_c8bed018.jpg";
const PAINTING_NOCTURNE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_painting2_5e4038de.jpg";
const PAINTING_RED = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_painting3_9604f272.jpg";

// Site artwork (from joseawoart.com)
const SITE_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/hero_banner_3dc01f8f.jpg";
const SITE_JOSE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_portrait_b6f38eb8.png";
const SITE_EXHIBITIONS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/artwork_exhibitions_1c17bd3c.png";
const SITE_ACTIVISM = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/artwork_activism_2bb267ea.png";
const SITE_COMMISSIONS = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/artwork_commissions_3e8f04d5.png";
const SITE_JOHNNY_GANT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/johnny_gant_06f51848.jpg";
const SITE_BROAD1 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/broad_strokes1_fd0c7442.jpg";
const SITE_BROAD2 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/broad_strokes2_a00dbaf0.jpg";
const SITE_ART4 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/art4_123072db.jpg";
const SITE_JOSE_WORKING = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_working_5cb6d39e.jpg";

// ─── NARRATIVE PHRASES ───────────────────────────────────────────────
const NARRATIVE_PHRASES = [
  { text: "I begin with glass...", start: 0, end: 0.22 },
  { text: "...and layer what I see in the world.", start: 0.22, end: 0.46 },
  { text: "Color speaks. Material remembers.", start: 0.46, end: 0.7 },
  { text: "Every layer tells a story.", start: 0.7, end: 1.0 },
];

// ─── FERRULE DIVIDERS ────────────────────────────────────────────────
function FerruleLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: "3px",
        background: "linear-gradient(90deg, #B8B8B8, #D4D4D4, #A0A0A0, #C8C8C8, #B0B0B0)",
      }}
    />
  );
}

function FerruleLineThin({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: "1.5px",
        background: "linear-gradient(90deg, #B8B8B8, #D4D4D4, #A0A0A0, #C8C8C8, #B0B0B0)",
      }}
    />
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(250, 246, 240, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#"
            className="font-sans text-sm md:text-base tracking-[0.35em] uppercase"
            style={{
              fontWeight: 200,
              color: scrolled ? "#2A2A2A" : "#FAF6F0",
              textShadow: scrolled ? "none" : "0 2px 12px rgba(0,0,0,0.6)",
              transition: "color 0.5s, text-shadow 0.5s",
            }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          >
            José Awo
          </motion.a>
          <nav className="hidden md:flex items-center gap-8">
            {["Work", "About", "Collect", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans text-xs tracking-[0.25em] uppercase relative"
                style={{
                  fontWeight: 300,
                  color: scrolled ? "#4A4A4A" : "rgba(250,246,240,0.9)",
                  textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.5)",
                  transition: "color 0.5s, text-shadow 0.5s",
                }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className="w-5 h-[1px] transition-all duration-500"
              style={{
                backgroundColor: scrolled ? "#2A2A2A" : "#FAF6F0",
                transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
              }}
            />
            <span
              className="w-5 h-[1px] transition-all duration-500"
              style={{
                backgroundColor: scrolled ? "#2A2A2A" : "#FAF6F0",
                transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </button>
        </div>
      </div>
      <FerruleLineThin className={`transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden px-6 py-6"
          style={{ backgroundColor: "rgba(250, 246, 240, 0.98)", backdropFilter: "blur(12px)" }}
        >
          {["Work", "About", "Collect", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 font-sans text-xs tracking-[0.25em] uppercase"
              style={{ fontWeight: 300, color: "#4A4A4A" }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

// ─── PARALLAX HERO ───────────────────────────────────────────────────
function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    let ticking = false;
    let prevPhrase = 0;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) { ticking = false; return; }
        const rect = containerRef.current.getBoundingClientRect();
        const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const pct = Math.max(0, Math.min(1, scrolled / totalScroll));

        // Direct DOM manipulation for buttery smooth parallax — no React re-renders
        const backY = pct * -8;
        const midY = pct * -25;
        const frontY = pct * -45;
        const heroOpacity = pct > 0.75 ? Math.max(0, 1 - (pct - 0.75) / 0.25) : 1;

        if (layerBackRef.current) {
          layerBackRef.current.style.transform = `translate3d(0, ${backY}%, 0) scale(1.15)`;
          layerBackRef.current.style.opacity = String(heroOpacity);
        }
        if (layerMidRef.current) {
          layerMidRef.current.style.transform = `translate3d(0, ${midY}%, 0) scale(1.2)`;
          layerMidRef.current.style.opacity = String(heroOpacity * 0.75);
        }
        if (layerFrontRef.current) {
          layerFrontRef.current.style.transform = `translate3d(0, ${frontY}%, 0) scale(1.25)`;
          layerFrontRef.current.style.opacity = String(heroOpacity * 0.6);
        }

        // Scroll indicator fade
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - pct * 6));
        }

        // Narrative phrase
        const idx = NARRATIVE_PHRASES.findIndex(p => pct >= p.start && pct < p.end);
        if (idx !== -1 && idx !== prevPhrase) {
          prevPhrase = idx;
          setCurrentPhrase(idx);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "250vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Back layer — vibrant glass piece (reds, teals, golds) */}
        <div
          ref={layerBackRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform, opacity", transform: "scale(1.15)" }}
        >
          <img
            src={GLASS_BACK}
            alt=""
            className="w-full h-full object-cover"
            style={{ imageRendering: "auto" }}
          />
        </div>

        {/* Middle layer — dark nocturne (gold leaf, drips, beads) */}
        <div
          ref={layerMidRef}
          className="absolute inset-0 w-full h-full"
          style={{
            willChange: "transform, opacity",
            transform: "scale(1.2)",
            mixBlendMode: "screen",
            opacity: 0.75,
          }}
        >
          <img
            src={GLASS_MIDDLE}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Front layer — red portrait (crimson, splatters) */}
        <div
          ref={layerFrontRef}
          className="absolute inset-0 w-full h-full"
          style={{
            willChange: "transform, opacity",
            transform: "scale(1.25)",
            mixBlendMode: "multiply",
            opacity: 0.6,
          }}
        >
          <img
            src={GLASS_FRONT}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Subtle vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Narrative text — floating between layers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.p
            ref={narrativeRef}
            key={currentPhrase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl md:text-4xl lg:text-5xl italic text-center max-w-3xl leading-relaxed px-8"
            style={{
              color: "#FAF6F0",
              textShadow: "0 2px 20px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)",
            }}
          >
            {NARRATIVE_PHRASES[currentPhrase]?.text}
          </motion.p>
        </div>

        {/* Artist name watermark — top left */}
        <div className="absolute top-24 left-6 md:left-10 z-10 pointer-events-none">
          <p
            className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase"
            style={{
              color: "rgba(250,246,240,0.7)",
              fontWeight: 200,
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            José Awo — Mixed Media on Glass
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span
            className="font-sans text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(250,246,240,0.7)", fontWeight: 300, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="rgba(250,246,240,0.7)" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── FEATURED WORK ───────────────────────────────────────────────────
function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.section
      ref={ref}
      id="work"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <FerruleLine />
      <motion.div
        className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 md:pt-28"
        style={{ opacity, y }}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="lg:w-3/5">
            <motion.div
              className="relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={PAINTING_RED}
                alt="Mixed Media on Glass — José Awo"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </motion.div>
          </div>
          <div className="lg:w-2/5 lg:pt-12">
            <p
              className="font-sans text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: "#B8B8B8", fontWeight: 300 }}
            >
              Featured Work
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl mb-6 leading-tight"
              style={{ fontWeight: 400, color: "#2A2A2A" }}
            >
              Untitled (Red Portrait)
            </h2>
            <p
              className="font-sans text-sm mb-2"
              style={{ color: "#9A9590", fontWeight: 300 }}
            >
              Mixed Media on Glass, 2024
            </p>
            <p
              className="font-sans text-sm mb-8 leading-relaxed"
              style={{ color: "#9A9590", fontWeight: 300 }}
            >
              48 × 36 inches
            </p>
            <p
              className="font-serif text-lg italic leading-relaxed mb-10"
              style={{ color: "#4A4A4A", fontWeight: 300 }}
            >
              Through powerful imagery, colors and materials, my art highlights
              what is happening in society — causing the viewer to ponder
              several societal issues in perhaps a new and different light.
            </p>
            <motion.a
              href="#collect"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] uppercase group"
              style={{ color: "#2A2A2A", fontWeight: 300 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              Inquire About This Work
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M0 4H18M18 4L14 0.5M18 4L14 7.5" stroke="#B8B8B8" strokeWidth="0.75" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ─── CATEGORY CARD ───────────────────────────────────────────────────
function CategoryCard({
  title,
  image,
  description,
  index,
}: {
  title: string;
  image: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ delay: index * 0.15 }}
    >
      <motion.div className="block group cursor-pointer" whileHover="hover">
        <div className="relative overflow-hidden mb-5">
          <motion.img
            src={image}
            alt={title}
            className="w-full aspect-[4/3] object-cover"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ border: "2px solid transparent" }}
            variants={{ hover: { borderColor: "#B8B8B8" } }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="font-sans text-xs tracking-[0.25em] uppercase mb-2"
              style={{ fontWeight: 400, color: "#2A2A2A" }}
            >
              {title}
            </h3>
            <p
              className="font-sans text-sm leading-relaxed max-w-xs"
              style={{ fontWeight: 300, color: "#9A9590" }}
            >
              {description}
            </p>
          </div>
          <motion.svg
            width="20" height="8" viewBox="0 0 20 8" fill="none"
            className="mt-1 flex-shrink-0"
            variants={{ hover: { x: 4 } }}
            transition={{ duration: 0.3 }}
          >
            <path d="M0 4H18M18 4L14 0.5M18 4L14 7.5" stroke="#B8B8B8" strokeWidth="0.75" />
          </motion.svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CATEGORIES ──────────────────────────────────────────────────────
function Categories() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <FerruleLineThin className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <CategoryCard
            title="Exhibitions"
            image={SITE_EXHIBITIONS}
            description="Gallery shows and museum installations showcasing mixed-media works on glass."
            index={0}
          />
          <CategoryCard
            title="Commissions"
            image={SITE_COMMISSIONS}
            description="Custom works for private collectors, corporate spaces, and public venues."
            index={1}
          />
          <CategoryCard
            title="Community"
            image={SITE_ACTIVISM}
            description="Broad Strokes and other initiatives using art as a voice for change."
            index={2}
          />
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS HIGHLIGHT ──────────────────────────────────────────────
function ProjectsHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.section
      ref={ref}
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <motion.div
        className="max-w-[1200px] mx-auto px-6 md:px-10"
        style={{ opacity, y }}
      >
        <FerruleLine className="mb-16" />
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase mb-10"
          style={{ color: "#B8B8B8", fontWeight: 300 }}
        >
          Notable Projects
        </p>

        {/* Johnny Gant */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20">
          <div className="lg:w-1/2">
            <motion.div
              className="overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={SITE_JOHNNY_GANT}
                alt="Johnny Gant Event — Atlanta City Hall"
                className="w-full aspect-[3/2] object-cover"
              />
            </motion.div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3
              className="font-serif text-2xl md:text-3xl mb-4"
              style={{ fontWeight: 400, color: "#2A2A2A" }}
            >
              Johnny Gant Event
            </h3>
            <p
              className="font-sans text-[10px] tracking-[0.2em] uppercase mb-4"
              style={{ color: "#B8B8B8", fontWeight: 300 }}
            >
              Atlanta City Hall — Commission
            </p>
            <p
              className="font-sans text-sm leading-relaxed mb-6"
              style={{ fontWeight: 300, color: "#9A9590" }}
            >
              The Atlanta City Council recognized celebrated boxer Johnny L. Gant Sr.'s
              outstanding humanitarianism. José Awo was commissioned to create a piece
              to commemorate the day which hangs in the council chamber.
            </p>
          </div>
        </div>

        {/* Broad Strokes */}
        <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16">
          <div className="lg:w-1/2">
            <motion.div
              className="overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={SITE_BROAD1}
                alt="Broad Strokes on Broad Street"
                className="w-full aspect-[3/2] object-cover"
              />
            </motion.div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3
              className="font-serif text-2xl md:text-3xl mb-4"
              style={{ fontWeight: 400, color: "#2A2A2A" }}
            >
              Broad Strokes on Broad Street
            </h3>
            <p
              className="font-sans text-[10px] tracking-[0.2em] uppercase mb-4"
              style={{ color: "#B8B8B8", fontWeight: 300 }}
            >
              Art Activism — Atlanta
            </p>
            <p
              className="font-sans text-sm leading-relaxed mb-6"
              style={{ fontWeight: 300, color: "#9A9590" }}
            >
              An interactive, multi-media exhibit designed to bring increased attention
              to the plight of Atlanta's un-homed community. Featuring painting
              installations with QR codes launching clips from members of the
              un-housed community. All proceeds donated to CaringWorks.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ─── AUDIENCE PATHWAYS ───────────────────────────────────────────────
function AudiencePathways() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pathways = [
    {
      label: "For Collectors",
      description: "View available works, request pricing, and schedule private viewings.",
      href: "#collect",
    },
    {
      label: "For Exhibitors",
      description: "Exhibition history, artist CV, and partnership inquiries.",
      href: "#about",
    },
    {
      label: "Explore All Work",
      description: "Browse the complete portfolio across all series and media.",
      href: "#work",
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="collect"
      className="py-20 md:py-28"
      style={{ opacity, backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <FerruleLine className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {pathways.map((p, i) => (
            <motion.a
              key={p.label}
              href={p.href}
              className="group block py-8 md:py-0"
              whileHover="hover"
            >
              <div
                className="h-full md:px-8"
                style={{
                  borderBottom: "1px solid rgba(184,184,184,0.2)",
                  borderRight: i < 2 ? undefined : "none",
                }}
              >
                <div
                  className="h-full"
                  style={{
                    borderRight: i < 2 ? "1px solid rgba(184,184,184,0.2)" : "none",
                    paddingRight: i < 2 ? "2rem" : "0",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="font-sans text-xs tracking-[0.25em] uppercase"
                      style={{ fontWeight: 400, color: "#2A2A2A" }}
                    >
                      {p.label}
                    </h3>
                    <motion.svg
                      width="20" height="8" viewBox="0 0 20 8" fill="none"
                      variants={{ hover: { x: 4 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M0 4H18M18 4L14 0.5M18 4L14 7.5" stroke="#B8B8B8" strokeWidth="0.75" />
                    </motion.svg>
                  </div>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ fontWeight: 300, color: "#9A9590" }}
                  >
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── ARTIST STATEMENT ────────────────────────────────────────────────
function ArtistStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.section
      ref={ref}
      id="about"
      className="py-24 md:py-36"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <motion.div
        className="max-w-[1000px] mx-auto px-6 md:px-10"
        style={{ opacity, y }}
      >
        <FerruleLineThin className="mb-16 max-w-[200px] mx-auto" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="lg:w-2/5">
            <motion.div
              className="overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={SITE_JOSE}
                alt="José Awo"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          <div className="lg:w-3/5">
            <p
              className="font-sans text-[10px] tracking-[0.3em] uppercase mb-8"
              style={{ color: "#B8B8B8", fontWeight: 300 }}
            >
              About the Artist
            </p>
            <blockquote
              className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed mb-8"
              style={{ color: "#2A2A2A", fontWeight: 300 }}
            >
              "Through powerful imagery, colors and materials, my art highlights
              what is happening in society."
            </blockquote>
            <p
              className="font-sans text-sm leading-relaxed mb-6"
              style={{ fontWeight: 300, color: "#9A9590" }}
            >
              Atlanta-based conceptual artist José Awo draws inspiration from
              international travels to create sublime pieces that are "challenging
              and daring." Using repurposed materials such as industrial glass,
              he has refined his own visual and conceptual vocabulary to create
              the dramatic.
            </p>
            <p
              className="font-sans text-sm leading-relaxed mb-6"
              style={{ fontWeight: 300, color: "#9A9590" }}
            >
              Awo is heavily influenced by his friend and mentor the legendary
              Santa Fe lithographer/painter Ron Adams, who called Awo's work
              "challenging & daring" and stated "you won't see anything like
              them anywhere else."
            </p>
            <p
              className="font-sans text-sm tracking-[0.15em]"
              style={{ color: "#B8B8B8", fontWeight: 300 }}
            >
              — José Awo, Atlanta
            </p>
          </div>
        </div>

        <FerruleLineThin className="mt-16 max-w-[200px] mx-auto" />
      </motion.div>
    </motion.section>
  );
}

// ─── GALLERY STRIP ───────────────────────────────────────────────────
function GalleryStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const artworks = [
    { src: PAINTING_VIBRANT, alt: "Mixed Media on Glass" },
    { src: SITE_ART4, alt: "Artwork Detail" },
    { src: PAINTING_NOCTURNE, alt: "Nocturne in Glass and Gold" },
    { src: SITE_BROAD2, alt: "Broad Strokes on Broad Street" },
    { src: PAINTING_RED, alt: "Red Portrait" },
    { src: SITE_JOSE_WORKING, alt: "José in the Studio" },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-16 md:py-24 overflow-hidden"
      style={{ opacity, backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-10">
        <FerruleLineThin className="mb-10" />
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#B8B8B8", fontWeight: 300 }}
        >
          Selected Works
        </p>
      </div>
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-6 md:px-10 pb-4">
        {artworks.map((art, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 relative overflow-hidden cursor-pointer"
            style={{ width: "280px" }}
            whileHover="hover"
          >
            <motion.img
              src={art.src}
              alt={art.alt}
              className="w-full aspect-[3/4] object-cover"
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ border: "2px solid transparent" }}
              variants={{ hover: { borderColor: "#B8B8B8" } }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <motion.div
        className="max-w-[800px] mx-auto px-6 md:px-10"
        style={{ opacity, y }}
      >
        <FerruleLine className="mb-16" />
        <div className="text-center mb-12">
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "#B8B8B8", fontWeight: 300 }}
          >
            Get in Touch
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl italic mb-4"
            style={{ fontWeight: 300, color: "#2A2A2A" }}
          >
            Let's connect
          </h2>
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ fontWeight: 300, color: "#9A9590" }}
          >
            For inquiries about available works, commissions, exhibitions, or collaborations.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="font-sans text-[10px] tracking-[0.2em] uppercase block mb-2"
                style={{ color: "#9A9590", fontWeight: 300 }}
              >
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b py-3 font-sans text-sm focus:outline-none transition-colors"
                style={{ borderColor: "rgba(184,184,184,0.4)", color: "#2A2A2A", fontWeight: 300 }}
                onFocus={(e) => (e.target.style.borderColor = "#B8B8B8")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(184,184,184,0.4)")}
              />
            </div>
            <div>
              <label
                className="font-sans text-[10px] tracking-[0.2em] uppercase block mb-2"
                style={{ color: "#9A9590", fontWeight: 300 }}
              >
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b py-3 font-sans text-sm focus:outline-none transition-colors"
                style={{ borderColor: "rgba(184,184,184,0.4)", color: "#2A2A2A", fontWeight: 300 }}
                onFocus={(e) => (e.target.style.borderColor = "#B8B8B8")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(184,184,184,0.4)")}
              />
            </div>
          </div>
          <div>
            <label
              className="font-sans text-[10px] tracking-[0.2em] uppercase block mb-2"
              style={{ color: "#9A9590", fontWeight: 300 }}
            >
              I'm interested in...
            </label>
            <div className="flex flex-wrap gap-3 mt-3">
              {["Collecting", "Exhibiting", "Commissioning", "Collaborating", "Just Saying Hello"].map(
                (opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 hover:bg-[#2A2A2A] hover:text-[#FAF6F0] hover:border-[#2A2A2A]"
                    style={{ borderColor: "rgba(184,184,184,0.4)", color: "#4A4A4A", fontWeight: 300 }}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          </div>
          <div>
            <label
              className="font-sans text-[10px] tracking-[0.2em] uppercase block mb-2"
              style={{ color: "#9A9590", fontWeight: 300 }}
            >
              Message
            </label>
            <textarea
              rows={4}
              className="w-full bg-transparent border-b py-3 font-sans text-sm focus:outline-none transition-colors resize-none"
              style={{ borderColor: "rgba(184,184,184,0.4)", color: "#2A2A2A", fontWeight: 300 }}
              onFocus={(e) => (e.target.style.borderColor = "#B8B8B8")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(184,184,184,0.4)")}
            />
          </div>
          <div className="pt-4">
            <motion.button
              type="submit"
              className="font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300"
              style={{ backgroundColor: "#2A2A2A", color: "#FAF6F0", fontWeight: 300 }}
              whileHover={{ backgroundColor: "#4A4A4A", scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Send Message
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "var(--cream)" }}>
      <FerruleLineThin />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="font-sans text-xs tracking-[0.2em] uppercase"
            style={{ color: "#9A9590", fontWeight: 200 }}
          >
            © 2025 José Awo. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Instagram", "Email"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="font-sans text-xs tracking-[0.15em] uppercase"
                style={{ color: "#9A9590", fontWeight: 300 }}
                whileHover={{ color: "#2A2A2A" }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <Navigation />
      <ParallaxHero />
      <FeaturedWork />
      <Categories />
      <ProjectsHighlight />
      <GalleryStrip />
      <ArtistStatement />
      <AudiencePathways />
      <Contact />
      <Footer />
    </div>
  );
}
