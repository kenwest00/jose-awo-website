import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// CDN URLs — Real artwork layers from José's paintings
const LAYER_BACK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/layer-back-real_8302d065.jpg";
const LAYER_MIDDLE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/layer-middle-real_5f2bd18e.jpg";
const LAYER_FRONT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/layer-front-real_6192a9c1.jpg";
const PAINTING_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_painting_da1d7704.jpg";
const PAINTING_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_painting2_e413bad3.jpg";
const PAINTING_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032373885/PUxVj88aG3TdKTkiHjSYV6/jose_painting3_956d00f2.jpg";

const NARRATIVE_PHRASES = [
  { text: "I begin with glass...", start: 0, end: 0.2 },
  { text: "...and layer what I see in the world.", start: 0.2, end: 0.45 },
  { text: "Color speaks. Material remembers.", start: 0.45, end: 0.7 },
  { text: "Every layer tells a story. Explore mine.", start: 0.7, end: 1.0 },
];

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

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

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
              textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.5)",
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
                  color: scrolled ? "#4A4A4A" : "rgba(250,246,240,0.85)",
                  textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.4)",
                  transition: "color 0.5s, text-shadow 0.5s",
                }}
                whileHover={{ color: "#2A2A2A" }}
                transition={{ duration: 0.3 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-[#B8B8B8]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </nav>
          {/* Mobile menu button */}
          <button className="md:hidden flex flex-col gap-1.5">
            <span className="w-5 h-[1px] transition-colors duration-500" style={{ backgroundColor: scrolled ? "#2A2A2A" : "#FAF6F0" }} />
            <span className="w-5 h-[1px] transition-colors duration-500" style={{ backgroundColor: scrolled ? "#2A2A2A" : "#FAF6F0" }} />
          </button>
        </div>
      </div>
      <FerruleLineThin className={`transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
    </motion.header>
  );
}

function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const prevPhraseRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (!containerRef.current) { ticking = false; return; }
          const rect = containerRef.current.getBoundingClientRect();
          const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
          const scrolled = -rect.top;
          const pct = Math.max(0, Math.min(1, scrolled / totalScroll));
          setScrollPct(pct);

          // Determine narrative phrase
          const idx = NARRATIVE_PHRASES.findIndex(p => pct >= p.start && pct < p.end);
          if (idx !== -1 && idx !== prevPhraseRef.current) {
            prevPhraseRef.current = idx;
            setCurrentPhrase(idx);
          }
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Direct CSS transform values — no spring, pure smooth
  const backY = scrollPct * -10; // slow
  const middleY = scrollPct * -30; // medium
  const frontY = scrollPct * -55; // fast
  const heroOpacity = scrollPct > 0.75 ? Math.max(0, 1 - (scrollPct - 0.75) / 0.25) : 1;
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollPct * 8);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "280vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Back layer — vibrant glass piece: reds, teals, golds */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(0, ${backY}%, 0) scale(1.2)`,
            willChange: "transform",
            opacity: heroOpacity,
          }}
        >
          <img
            src={LAYER_BACK}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle layer — dark nocturne: gold leaf, drips, beads */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(0, ${middleY}%, 0) scale(1.25)`,
            willChange: "transform",
            opacity: heroOpacity * 0.7,
            mixBlendMode: "screen",
          }}
        >
          <img
            src={LAYER_MIDDLE}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Front layer — red portrait: crimson, splatters */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(0, ${frontY}%, 0) scale(1.3)`,
            willChange: "transform",
            opacity: heroOpacity * 0.55,
            mixBlendMode: "multiply",
          }}
        >
          <img
            src={LAYER_FRONT}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Subtle dark vignette at edges for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        {/* Narrative text — floating between layers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            className="relative px-8 py-6"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(250,246,240,0.45) 0%, transparent 70%)",
            }}
          >
            <p
              className="font-serif text-2xl md:text-4xl lg:text-5xl italic text-center max-w-3xl leading-relaxed transition-opacity duration-700 ease-out"
              style={{
                color: "#FAF6F0",
                textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
              }}
              key={currentPhrase}
            >
              {NARRATIVE_PHRASES[currentPhrase]?.text}
            </p>
          </div>
        </div>

        {/* Artist name watermark */}
        <div className="absolute top-24 left-6 md:left-10 z-10 pointer-events-none">
          <p
            className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase"
            style={{
              color: "rgba(250,246,240,0.7)",
              fontWeight: 200,
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            José Awo — Mixed Media on Glass
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 transition-opacity duration-300"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span
            className="font-sans text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(250,246,240,0.7)", fontWeight: 300, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
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
        {/* Featured artwork */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="lg:w-3/5">
            <motion.div
              className="relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={PAINTING_3}
                alt="Red portrait — Mixed Media on Glass"
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
              what is happening in society.
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

function CategoryCard({
  title,
  image,
  description,
  link,
  index,
}: {
  title: string;
  image: string;
  description: string;
  link: string;
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
      <motion.a
        href={link}
        className="block group"
        whileHover="hover"
      >
        <div className="relative overflow-hidden mb-5">
          <motion.img
            src={image}
            alt={title}
            className="w-full aspect-[4/3] object-cover"
            variants={{
              hover: { scale: 1.04 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          {/* Ferrule-colored border on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ border: "2px solid transparent" }}
            variants={{
              hover: { borderColor: "#B8B8B8" },
            }}
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
            width="20"
            height="8"
            viewBox="0 0 20 8"
            fill="none"
            className="mt-1 flex-shrink-0"
            variants={{
              hover: { x: 4 },
            }}
            transition={{ duration: 0.3 }}
          >
            <path d="M0 4H18M18 4L14 0.5M18 4L14 7.5" stroke="#B8B8B8" strokeWidth="0.75" />
          </motion.svg>
        </div>
      </motion.a>
    </motion.div>
  );
}

function Categories() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <FerruleLineThin className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <CategoryCard
            title="Exhibitions"
            image={PAINTING_1}
            description="Gallery shows and museum installations showcasing mixed-media works on glass."
            link="#exhibitions"
            index={0}
          />
          <CategoryCard
            title="Commissions"
            image={PAINTING_2}
            description="Custom works created for private collectors, corporate spaces, and public venues."
            link="#commissions"
            index={1}
          />
          <CategoryCard
            title="Community"
            image={PAINTING_3}
            description="Broad Strokes and other initiatives bringing art to underserved communities."
            link="#community"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}

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
      href: "#exhibit",
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
              className="group py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0"
              style={{
                borderBottom: i < 2 ? "1px solid rgba(184,184,184,0.3)" : "none",
                borderRight: undefined,
              }}
              whileHover="hover"
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
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
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
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

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
        className="max-w-[900px] mx-auto px-6 md:px-10 text-center"
        style={{ opacity, y }}
      >
        <FerruleLineThin className="mb-16 max-w-[200px] mx-auto" />
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase mb-8"
          style={{ color: "#B8B8B8", fontWeight: 300 }}
        >
          About the Artist
        </p>
        <blockquote
          className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed mb-10"
          style={{ color: "#2A2A2A", fontWeight: 300 }}
        >
          "Through powerful imagery, colors and materials, my art highlights
          what is happening in society. Each piece begins with glass — a
          material that is both fragile and enduring — and builds through
          layers of paint, gold leaf, and found objects."
        </blockquote>
        <p
          className="font-sans text-sm tracking-[0.15em]"
          style={{ color: "#9A9590", fontWeight: 300 }}
        >
          — José Awo, Atlanta
        </p>
        <FerruleLineThin className="mt-16 max-w-[200px] mx-auto" />
      </motion.div>
    </motion.section>
  );
}

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

        <form className="space-y-6">
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
                style={{
                  borderColor: "rgba(184,184,184,0.4)",
                  color: "#2A2A2A",
                  fontWeight: 300,
                }}
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
                style={{
                  borderColor: "rgba(184,184,184,0.4)",
                  color: "#2A2A2A",
                  fontWeight: 300,
                }}
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
                    style={{
                      borderColor: "rgba(184,184,184,0.4)",
                      color: "#4A4A4A",
                      fontWeight: 300,
                    }}
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
              style={{
                borderColor: "rgba(184,184,184,0.4)",
                color: "#2A2A2A",
                fontWeight: 300,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#B8B8B8")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(184,184,184,0.4)")}
            />
          </div>
          <div className="pt-4">
            <motion.button
              type="submit"
              className="font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-300"
              style={{
                backgroundColor: "#2A2A2A",
                color: "#FAF6F0",
                fontWeight: 300,
              }}
              whileHover={{
                backgroundColor: "#4A4A4A",
                scale: 1.01,
              }}
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
            © 2024 José Awo. All rights reserved.
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

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <Navigation />
      <ParallaxHero />
      <FeaturedWork />
      <Categories />
      <ArtistStatement />
      <AudiencePathways />
      <Contact />
      <Footer />
    </div>
  );
}
