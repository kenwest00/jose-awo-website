import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  { id: "butts-county", img: "/works/butts-county.webp", title: "Butt's County Medical Center", year: "2018", medium: "Flovilla mix media collage, oil & acrylic watercolors", dimensions: "13' x 4'", series: "SMC - commissioned work", status: "Commissioned", note: '"Commissioned work"' },
  { id: "red-sublime", img: "/works/red-sublime.webp", title: "Red Sublime", year: "2014", medium: "Oil & acrylic on canvas, epoxy resin", dimensions: "5' x 5'", series: "Originals", status: "Available", note: "" },
  { id: "wedding-party", img: "/works/wedding-party.webp", title: "The wedding party", year: "2016", medium: "Oil in acrylic on canvas", dimensions: "12' x 4'", series: "Originals", status: "Available", note: "" },
  { id: "sweet-auburn", img: "/works/sweet-auburn.webp", title: "Sweet auburn", year: "2024", medium: "Oil pastel on paper", dimensions: "6' x 4'", series: "Originals", status: "Available", note: '"Featured in ArtsATL"' },
  { id: "changed-of-mind", img: "/works/changed-of-mind.webp", title: "Changed of Mind", year: "2010", medium: "Oil and acrylic on industrial glass", dimensions: "10' x 4'", series: "Originals", status: "Available", note: "" },
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



const SpeckleSVG = ({ type, className }: { type: number, className?: string }) => {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="currentColor">
      {type === 1 && (<g><circle cx="103.2" cy="84.0" r="1.1" opacity="0.30" /> <circle cx="148.3" cy="152.8" r="0.6" opacity="0.40" /> <circle cx="205.4" cy="174.0" r="0.5" opacity="0.32" /> <circle cx="90.9" cy="70.8" r="1.1" opacity="0.22" /> <circle cx="89.3" cy="88.4" r="0.3" opacity="0.44" /> <circle cx="74.3" cy="100.0" r="0.9" opacity="0.42" /> <circle cx="14.0" cy="71.0" r="0.7" opacity="0.37" /> <circle cx="139.9" cy="142.4" r="0.7" opacity="0.22" /> <circle cx="158.8" cy="149.6" r="0.5" opacity="0.23" /> <circle cx="88.2" cy="99.9" r="1.0" opacity="0.18" /> <circle cx="143.5" cy="73.8" r="0.5" opacity="0.39" /> <circle cx="112.7" cy="146.6" r="0.6" opacity="0.33" /> <circle cx="153.7" cy="34.6" r="2.0" opacity="0.38" /> <circle cx="28.3" cy="67.2" r="1.2" opacity="0.26" /> <circle cx="74.7" cy="163.7" r="0.3" opacity="0.43" /> <circle cx="142.6" cy="112.4" r="1.0" opacity="0.35" /> <circle cx="99.9" cy="116.2" r="1.0" opacity="0.30" /> <circle cx="145.6" cy="156.5" r="0.7" opacity="0.16" /> <circle cx="154.6" cy="91.4" r="0.4" opacity="0.29" /> <circle cx="178.8" cy="96.4" r="0.8" opacity="0.33" /> <circle cx="101.6" cy="110.3" r="0.7" opacity="0.27" /> <circle cx="64.8" cy="110.8" r="0.9" opacity="0.39" /> <circle cx="64.8" cy="112.6" r="0.3" opacity="0.43" /> <circle cx="114.3" cy="55.6" r="1.0" opacity="0.27" /> <circle cx="93.0" cy="64.5" r="0.3" opacity="0.23" /> <circle cx="100.1" cy="64.7" r="1.1" opacity="0.35" /> <circle cx="167.6" cy="111.8" r="1.0" opacity="0.32" /> <circle cx="87.2" cy="146.0" r="1.2" opacity="0.20" /> <circle cx="82.7" cy="-0.2" r="1.1" opacity="0.18" /> <circle cx="96.0" cy="134.9" r="0.6" opacity="0.41" /> <circle cx="154.6" cy="160.7" r="0.7" opacity="0.20" /> <circle cx="104.6" cy="69.1" r="0.4" opacity="0.28" /> <circle cx="100.8" cy="76.5" r="1.1" opacity="0.39" /> <circle cx="49.2" cy="122.7" r="0.4" opacity="0.33" /> <circle cx="35.7" cy="158.2" r="0.8" opacity="0.21" /> <circle cx="140.2" cy="52.5" r="1.1" opacity="0.19" /> <circle cx="81.2" cy="114.8" r="1.1" opacity="0.30" /> <circle cx="91.8" cy="88.8" r="0.8" opacity="0.44" /> <circle cx="73.1" cy="132.0" r="1.0" opacity="0.22" /> <circle cx="107.6" cy="138.9" r="1.1" opacity="0.29" /> <circle cx="158.9" cy="98.0" r="1.8" opacity="0.35" /> <circle cx="150.9" cy="105.2" r="0.7" opacity="0.34" /> <circle cx="91.7" cy="66.9" r="0.7" opacity="0.34" /> <circle cx="94.1" cy="118.0" r="0.6" opacity="0.43" /> <circle cx="73.0" cy="64.6" r="1.1" opacity="0.37" /> <circle cx="116.1" cy="74.6" r="0.5" opacity="0.34" /> <circle cx="124.6" cy="195.0" r="0.7" opacity="0.22" /> <circle cx="125.3" cy="115.9" r="0.3" opacity="0.40" /> <circle cx="105.7" cy="132.2" r="0.7" opacity="0.33" /> <circle cx="61.7" cy="96.4" r="1.0" opacity="0.33" /> <circle cx="100.0" cy="67.6" r="0.6" opacity="0.37" /> <circle cx="118.5" cy="113.9" r="1.1" opacity="0.27" /> <circle cx="185.1" cy="144.2" r="0.7" opacity="0.44" /> <circle cx="103.6" cy="65.8" r="0.7" opacity="0.22" /> <circle cx="147.3" cy="58.6" r="0.8" opacity="0.18" /> <circle cx="145.0" cy="86.6" r="1.0" opacity="0.18" /> <circle cx="98.0" cy="153.8" r="0.7" opacity="0.24" /> <circle cx="106.9" cy="127.9" r="0.6" opacity="0.31" /> <circle cx="140.8" cy="67.8" r="0.8" opacity="0.16" /> <circle cx="73.6" cy="92.9" r="0.5" opacity="0.39" /> <circle cx="145.9" cy="175.6" r="1.0" opacity="0.22" /> <circle cx="130.8" cy="77.0" r="2.0" opacity="0.18" /> <circle cx="61.6" cy="124.2" r="0.3" opacity="0.29" /> <circle cx="136.7" cy="60.7" r="1.1" opacity="0.31" /> <circle cx="64.8" cy="81.9" r="0.7" opacity="0.36" /> <circle cx="166.0" cy="207.8" r="0.8" opacity="0.25" /> <circle cx="107.1" cy="162.7" r="1.1" opacity="0.16" /> <circle cx="75.4" cy="55.0" r="0.4" opacity="0.23" /> <circle cx="22.3" cy="64.5" r="0.6" opacity="0.22" /> <circle cx="161.4" cy="125.1" r="0.5" opacity="0.38" /> <circle cx="19.0" cy="108.2" r="0.9" opacity="0.31" /> <circle cx="133.6" cy="92.8" r="0.8" opacity="0.18" /> <circle cx="96.4" cy="101.8" r="2.3" opacity="0.39" /> <circle cx="47.5" cy="65.3" r="0.9" opacity="0.17" /> <circle cx="105.3" cy="118.5" r="0.8" opacity="0.19" /> <circle cx="77.8" cy="156.0" r="0.3" opacity="0.27" /> <circle cx="25.3" cy="73.0" r="0.3" opacity="0.29" /> <circle cx="127.1" cy="102.6" r="1.2" opacity="0.28" /> <circle cx="59.3" cy="110.0" r="1.1" opacity="0.33" /> <circle cx="101.8" cy="89.4" r="2.3" opacity="0.27" /> <circle cx="203.2" cy="92.9" r="0.6" opacity="0.45" /> <circle cx="164.0" cy="90.2" r="0.6" opacity="0.25" /> <circle cx="159.5" cy="75.3" r="1.1" opacity="0.27" /> <circle cx="116.9" cy="70.5" r="0.7" opacity="0.38" /> <circle cx="187.2" cy="70.9" r="0.7" opacity="0.43" /> <circle cx="168.0" cy="75.7" r="0.4" opacity="0.26" /> <circle cx="131.9" cy="71.3" r="0.4" opacity="0.37" /> <circle cx="140.2" cy="40.9" r="0.4" opacity="0.38" /> <circle cx="147.3" cy="79.2" r="0.6" opacity="0.27" /> <circle cx="125.4" cy="84.4" r="0.5" opacity="0.15" /> <circle cx="159.5" cy="91.5" r="0.5" opacity="0.19" /> <circle cx="154.7" cy="92.7" r="0.5" opacity="0.40" /> <circle cx="155.8" cy="76.5" r="0.4" opacity="0.25" /> <circle cx="126.1" cy="72.9" r="1.0" opacity="0.29" /> <circle cx="131.5" cy="47.2" r="1.1" opacity="0.44" /> <circle cx="132.3" cy="80.6" r="1.0" opacity="0.41" /> <circle cx="185.5" cy="85.9" r="1.0" opacity="0.36" /> <circle cx="143.2" cy="94.6" r="0.7" opacity="0.43" /> <circle cx="151.7" cy="53.4" r="0.6" opacity="0.34" /> <circle cx="114.0" cy="85.7" r="0.6" opacity="0.40" /> <circle cx="110.4" cy="53.6" r="1.7" opacity="0.19" /> <circle cx="161.8" cy="83.2" r="0.7" opacity="0.39" /> <circle cx="123.3" cy="63.8" r="1.7" opacity="0.40" /> <circle cx="136.3" cy="74.7" r="1.2" opacity="0.31" /> <circle cx="127.1" cy="51.8" r="0.8" opacity="0.43" /> <circle cx="138.8" cy="89.9" r="1.6" opacity="0.43" /> <circle cx="180.8" cy="47.7" r="0.8" opacity="0.24" /> <circle cx="178.6" cy="76.8" r="0.3" opacity="0.27" /> <circle cx="169.5" cy="83.1" r="0.6" opacity="0.28" /> <circle cx="169.6" cy="61.5" r="0.9" opacity="0.36" /></g>)}
      {type === 2 && (<g><circle cx="80.4" cy="87.3" r="1.0" opacity="0.39" /> <circle cx="90.1" cy="130.4" r="0.6" opacity="0.41" /> <circle cx="149.9" cy="74.3" r="0.5" opacity="0.16" /> <circle cx="59.4" cy="85.9" r="1.2" opacity="0.36" /> <circle cx="59.1" cy="81.2" r="0.4" opacity="0.26" /> <circle cx="26.4" cy="112.2" r="0.7" opacity="0.39" /> <circle cx="43.8" cy="35.9" r="0.8" opacity="0.36" /> <circle cx="110.7" cy="109.9" r="1.9" opacity="0.25" /> <circle cx="89.0" cy="92.6" r="0.9" opacity="0.29" /> <circle cx="153.5" cy="33.1" r="1.1" opacity="0.34" /> <circle cx="91.6" cy="-6.7" r="1.0" opacity="0.34" /> <circle cx="33.7" cy="111.7" r="0.6" opacity="0.37" /> <circle cx="130.6" cy="130.2" r="0.8" opacity="0.39" /> <circle cx="27.7" cy="136.4" r="0.9" opacity="0.36" /> <circle cx="63.6" cy="46.7" r="0.9" opacity="0.35" /> <circle cx="178.7" cy="128.9" r="1.2" opacity="0.34" /> <circle cx="108.8" cy="81.1" r="1.0" opacity="0.39" /> <circle cx="74.8" cy="48.3" r="0.9" opacity="0.27" /> <circle cx="142.9" cy="91.9" r="1.1" opacity="0.25" /> <circle cx="96.8" cy="104.5" r="0.4" opacity="0.28" /> <circle cx="117.6" cy="95.3" r="1.0" opacity="0.23" /> <circle cx="126.5" cy="196.6" r="1.1" opacity="0.29" /> <circle cx="187.8" cy="104.8" r="0.6" opacity="0.41" /> <circle cx="183.0" cy="78.8" r="0.5" opacity="0.40" /> <circle cx="102.3" cy="96.5" r="0.6" opacity="0.42" /> <circle cx="135.5" cy="118.2" r="0.3" opacity="0.41" /> <circle cx="121.5" cy="63.5" r="0.5" opacity="0.18" /> <circle cx="98.3" cy="78.7" r="0.8" opacity="0.29" /> <circle cx="135.8" cy="73.7" r="0.8" opacity="0.23" /> <circle cx="114.9" cy="53.7" r="0.8" opacity="0.42" /> <circle cx="185.9" cy="91.2" r="0.7" opacity="0.30" /> <circle cx="98.7" cy="52.3" r="0.9" opacity="0.27" /> <circle cx="134.0" cy="117.4" r="2.4" opacity="0.34" /> <circle cx="136.0" cy="83.6" r="0.7" opacity="0.31" /> <circle cx="113.6" cy="83.0" r="1.2" opacity="0.32" /> <circle cx="108.9" cy="117.0" r="2.3" opacity="0.34" /> <circle cx="158.3" cy="109.9" r="0.9" opacity="0.22" /> <circle cx="144.5" cy="73.8" r="1.1" opacity="0.24" /> <circle cx="130.1" cy="-18.5" r="0.3" opacity="0.33" /> <circle cx="119.2" cy="11.0" r="1.0" opacity="0.39" /> <circle cx="68.8" cy="87.7" r="1.2" opacity="0.18" /> <circle cx="109.5" cy="156.2" r="0.8" opacity="0.20" /> <circle cx="77.5" cy="113.2" r="1.0" opacity="0.26" /> <circle cx="85.4" cy="118.9" r="0.7" opacity="0.41" /> <circle cx="106.7" cy="68.0" r="0.4" opacity="0.35" /> <circle cx="71.9" cy="79.4" r="0.8" opacity="0.43" /> <circle cx="103.1" cy="136.0" r="1.1" opacity="0.16" /> <circle cx="146.0" cy="103.5" r="1.1" opacity="0.33" /> <circle cx="60.2" cy="201.3" r="0.9" opacity="0.36" /> <circle cx="125.1" cy="93.5" r="0.7" opacity="0.44" /> <circle cx="53.9" cy="154.1" r="1.2" opacity="0.18" /> <circle cx="3.8" cy="168.9" r="1.7" opacity="0.17" /> <circle cx="27.7" cy="188.0" r="0.3" opacity="0.23" /> <circle cx="70.1" cy="105.9" r="0.6" opacity="0.33" /> <circle cx="30.9" cy="136.7" r="0.9" opacity="0.38" /> <circle cx="37.8" cy="148.6" r="0.7" opacity="0.41" /> <circle cx="99.3" cy="118.9" r="0.9" opacity="0.32" /> <circle cx="31.0" cy="177.8" r="0.7" opacity="0.28" /> <circle cx="39.3" cy="118.2" r="0.9" opacity="0.35" /> <circle cx="75.7" cy="143.0" r="0.3" opacity="0.20" /> <circle cx="54.1" cy="123.7" r="0.4" opacity="0.23" /> <circle cx="94.9" cy="104.9" r="2.5" opacity="0.36" /> <circle cx="51.2" cy="132.0" r="0.6" opacity="0.18" /> <circle cx="26.9" cy="122.9" r="1.1" opacity="0.35" /> <circle cx="79.8" cy="167.7" r="1.2" opacity="0.35" /> <circle cx="55.8" cy="107.7" r="0.4" opacity="0.19" /> <circle cx="46.7" cy="140.3" r="0.9" opacity="0.38" /> <circle cx="32.0" cy="100.7" r="0.8" opacity="0.42" /> <circle cx="39.8" cy="143.1" r="0.7" opacity="0.32" /> <circle cx="76.4" cy="110.9" r="2.0" opacity="0.33" /> <circle cx="41.8" cy="151.5" r="1.2" opacity="0.23" /> <circle cx="73.7" cy="103.9" r="1.0" opacity="0.19" /> <circle cx="39.5" cy="144.5" r="2.1" opacity="0.26" /> <circle cx="33.6" cy="106.2" r="0.4" opacity="0.26" /> <circle cx="72.8" cy="160.3" r="0.4" opacity="0.32" /> <circle cx="17.2" cy="94.5" r="0.8" opacity="0.20" /> <circle cx="46.0" cy="130.0" r="0.8" opacity="0.40" /> <circle cx="64.1" cy="118.0" r="2.3" opacity="0.32" /> <circle cx="93.2" cy="161.1" r="1.8" opacity="0.35" /> <circle cx="69.4" cy="121.7" r="0.4" opacity="0.28" /> <circle cx="3.6" cy="176.6" r="0.9" opacity="0.32" /> <circle cx="52.2" cy="165.5" r="0.5" opacity="0.40" /> <circle cx="81.2" cy="168.6" r="1.1" opacity="0.28" /> <circle cx="35.9" cy="119.6" r="0.4" opacity="0.26" /> <circle cx="63.1" cy="147.7" r="1.0" opacity="0.20" /> <circle cx="71.3" cy="200.4" r="2.0" opacity="0.19" /> <circle cx="48.2" cy="115.1" r="1.0" opacity="0.36" /> <circle cx="74.6" cy="120.3" r="1.1" opacity="0.17" /> <circle cx="51.6" cy="186.9" r="1.2" opacity="0.17" /> <circle cx="52.4" cy="160.3" r="0.5" opacity="0.39" /></g>)}
      {type === 3 && (<g><circle cx="141.2" cy="112.6" r="0.6" opacity="0.40" /> <circle cx="94.9" cy="27.9" r="1.2" opacity="0.37" /> <circle cx="100.4" cy="82.6" r="1.1" opacity="0.32" /> <circle cx="127.0" cy="-42.5" r="0.8" opacity="0.21" /> <circle cx="87.5" cy="111.9" r="0.4" opacity="0.28" /> <circle cx="90.6" cy="7.0" r="1.0" opacity="0.28" /> <circle cx="108.4" cy="64.6" r="1.1" opacity="0.43" /> <circle cx="198.4" cy="57.8" r="0.8" opacity="0.21" /> <circle cx="90.3" cy="163.0" r="0.4" opacity="0.29" /> <circle cx="28.9" cy="56.8" r="1.9" opacity="0.25" /> <circle cx="95.3" cy="80.8" r="1.1" opacity="0.17" /> <circle cx="91.7" cy="108.2" r="0.5" opacity="0.43" /> <circle cx="182.9" cy="82.8" r="0.6" opacity="0.43" /> <circle cx="8.5" cy="78.4" r="0.7" opacity="0.38" /> <circle cx="136.2" cy="112.9" r="1.1" opacity="0.22" /> <circle cx="24.0" cy="125.0" r="0.7" opacity="0.35" /> <circle cx="178.9" cy="81.2" r="0.9" opacity="0.37" /> <circle cx="180.9" cy="79.2" r="0.4" opacity="0.43" /> <circle cx="164.0" cy="99.3" r="0.7" opacity="0.19" /> <circle cx="104.3" cy="51.1" r="0.4" opacity="0.43" /> <circle cx="74.7" cy="70.1" r="0.9" opacity="0.38" /> <circle cx="119.3" cy="59.1" r="1.5" opacity="0.19" /> <circle cx="9.0" cy="172.6" r="1.0" opacity="0.42" /> <circle cx="139.2" cy="75.7" r="0.9" opacity="0.42" /> <circle cx="143.1" cy="-54.1" r="0.4" opacity="0.27" /> <circle cx="107.6" cy="99.5" r="0.4" opacity="0.40" /> <circle cx="151.8" cy="180.8" r="0.8" opacity="0.39" /> <circle cx="113.4" cy="27.4" r="0.4" opacity="0.25" /> <circle cx="73.3" cy="86.4" r="0.5" opacity="0.31" /> <circle cx="193.8" cy="58.1" r="0.7" opacity="0.37" /> <circle cx="66.9" cy="46.8" r="0.7" opacity="0.35" /> <circle cx="57.1" cy="137.8" r="1.1" opacity="0.44" /> <circle cx="82.3" cy="54.5" r="0.8" opacity="0.31" /> <circle cx="8.2" cy="89.2" r="0.5" opacity="0.42" /> <circle cx="140.3" cy="19.7" r="1.2" opacity="0.39" /> <circle cx="88.6" cy="123.5" r="1.1" opacity="0.42" /> <circle cx="30.5" cy="101.4" r="1.0" opacity="0.39" /> <circle cx="174.1" cy="193.0" r="1.0" opacity="0.43" /> <circle cx="77.6" cy="-80.6" r="1.0" opacity="0.25" /> <circle cx="137.7" cy="86.9" r="0.7" opacity="0.24" /> <circle cx="214.4" cy="23.9" r="1.1" opacity="0.39" /> <circle cx="55.0" cy="2.3" r="0.8" opacity="0.28" /> <circle cx="192.9" cy="82.5" r="1.0" opacity="0.38" /> <circle cx="166.0" cy="144.5" r="0.9" opacity="0.16" /> <circle cx="10.5" cy="42.4" r="0.9" opacity="0.22" /> <circle cx="4.6" cy="123.0" r="0.9" opacity="0.43" /> <circle cx="110.9" cy="116.2" r="0.8" opacity="0.29" /> <circle cx="71.9" cy="82.1" r="0.7" opacity="0.29" /> <circle cx="103.3" cy="117.1" r="0.9" opacity="0.34" /> <circle cx="-26.8" cy="59.7" r="0.3" opacity="0.27" /> <circle cx="24.4" cy="90.4" r="1.0" opacity="0.32" /> <circle cx="123.5" cy="79.6" r="0.9" opacity="0.38" /> <circle cx="100.8" cy="171.4" r="0.5" opacity="0.20" /> <circle cx="124.2" cy="93.3" r="1.1" opacity="0.24" /> <circle cx="73.1" cy="25.7" r="1.1" opacity="0.44" /> <circle cx="153.0" cy="116.6" r="2.2" opacity="0.16" /> <circle cx="169.7" cy="44.2" r="0.9" opacity="0.37" /> <circle cx="85.8" cy="-9.1" r="0.8" opacity="0.16" /> <circle cx="24.2" cy="133.8" r="0.9" opacity="0.23" /> <circle cx="70.1" cy="127.0" r="1.1" opacity="0.36" /> <circle cx="79.6" cy="61.1" r="0.9" opacity="0.44" /> <circle cx="85.9" cy="141.4" r="0.7" opacity="0.23" /> <circle cx="97.8" cy="185.9" r="0.4" opacity="0.40" /> <circle cx="104.0" cy="23.4" r="0.8" opacity="0.41" /> <circle cx="50.6" cy="192.2" r="1.1" opacity="0.31" /> <circle cx="85.2" cy="149.9" r="0.4" opacity="0.33" /> <circle cx="109.2" cy="168.5" r="0.9" opacity="0.31" /> <circle cx="193.1" cy="78.2" r="0.4" opacity="0.39" /> <circle cx="86.0" cy="113.8" r="0.7" opacity="0.42" /> <circle cx="55.3" cy="91.4" r="0.7" opacity="0.29" /> <circle cx="127.9" cy="157.2" r="0.5" opacity="0.31" /> <circle cx="68.4" cy="69.3" r="1.0" opacity="0.40" /> <circle cx="87.5" cy="102.7" r="1.0" opacity="0.37" /> <circle cx="67.0" cy="29.4" r="0.4" opacity="0.20" /> <circle cx="207.9" cy="38.6" r="0.3" opacity="0.17" /> <circle cx="77.8" cy="89.9" r="0.4" opacity="0.44" /> <circle cx="105.3" cy="199.2" r="1.1" opacity="0.40" /> <circle cx="209.5" cy="92.2" r="0.9" opacity="0.38" /> <circle cx="76.2" cy="115.9" r="0.9" opacity="0.42" /> <circle cx="137.5" cy="101.3" r="0.9" opacity="0.34" /> <circle cx="59.9" cy="66.8" r="0.5" opacity="0.32" /> <circle cx="129.5" cy="68.0" r="0.7" opacity="0.43" /> <circle cx="117.7" cy="155.6" r="0.9" opacity="0.18" /> <circle cx="254.8" cy="182.8" r="1.0" opacity="0.41" /> <circle cx="-48.8" cy="-7.8" r="0.7" opacity="0.37" /> <circle cx="115.5" cy="92.6" r="1.2" opacity="0.28" /> <circle cx="82.6" cy="156.7" r="1.1" opacity="0.45" /> <circle cx="168.2" cy="91.8" r="0.6" opacity="0.19" /> <circle cx="100.3" cy="118.7" r="0.7" opacity="0.21" /> <circle cx="177.1" cy="150.5" r="0.5" opacity="0.39" /> <circle cx="40.0" cy="64.6" r="0.6" opacity="0.30" /> <circle cx="83.3" cy="56.2" r="0.7" opacity="0.44" /> <circle cx="101.1" cy="127.4" r="0.3" opacity="0.16" /> <circle cx="191.3" cy="18.5" r="0.3" opacity="0.42" /> <circle cx="89.5" cy="106.9" r="0.4" opacity="0.27" /> <circle cx="68.1" cy="83.8" r="1.0" opacity="0.25" /> <circle cx="111.7" cy="100.7" r="0.5" opacity="0.44" /> <circle cx="120.5" cy="-31.1" r="0.9" opacity="0.27" /> <circle cx="135.7" cy="127.4" r="1.2" opacity="0.16" /> <circle cx="241.3" cy="80.3" r="0.3" opacity="0.41" /> <circle cx="36.8" cy="128.1" r="0.7" opacity="0.43" /> <circle cx="130.2" cy="53.3" r="0.9" opacity="0.28" /> <circle cx="145.7" cy="218.5" r="0.4" opacity="0.40" /> <circle cx="-6.6" cy="105.9" r="0.8" opacity="0.42" /> <circle cx="31.1" cy="142.8" r="1.2" opacity="0.38" /> <circle cx="103.9" cy="106.5" r="1.1" opacity="0.30" /> <circle cx="-9.9" cy="-9.2" r="0.9" opacity="0.16" /> <circle cx="60.7" cy="-16.5" r="0.6" opacity="0.19" /> <circle cx="62.5" cy="144.3" r="1.0" opacity="0.44" /> <circle cx="43.6" cy="96.4" r="1.2" opacity="0.28" /> <circle cx="47.2" cy="24.4" r="0.4" opacity="0.22" /> <circle cx="12.2" cy="69.0" r="1.1" opacity="0.33" /> <circle cx="110.9" cy="74.8" r="0.8" opacity="0.35" /> <circle cx="184.0" cy="37.3" r="0.6" opacity="0.30" /> <circle cx="8.2" cy="162.1" r="1.2" opacity="0.37" /> <circle cx="135.2" cy="77.3" r="0.5" opacity="0.44" /> <circle cx="104.1" cy="86.5" r="1.1" opacity="0.38" /> <circle cx="88.1" cy="148.5" r="0.8" opacity="0.23" /> <circle cx="110.1" cy="109.7" r="0.9" opacity="0.28" /> <circle cx="154.3" cy="105.6" r="0.7" opacity="0.28" /></g>)}
    </svg>
  );
};

export default function Home() {

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const yText = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);
  
  // Parallax layers for splatters
  const ySplat1 = useTransform(scrollY, [0, 1000], [0, -250]);
  const ySplat2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const ySplat3 = useTransform(scrollY, [0, 1000], [0, 300]);
  const ySplat4 = useTransform(scrollY, [0, 1000], [0, 150]);
  const ySplat5 = useTransform(scrollY, [0, 1000], [0, -400]);

  // Parallax layers for Selected Works splatters
  const yWorksSplat1 = useTransform(scrollY, [1000, 3000], [200, -200]);
  const yWorksSplat2 = useTransform(scrollY, [1000, 3000], [-150, 250]);
  const yWorksSplat3 = useTransform(scrollY, [1000, 3000], [100, -300]);

  const [loaded, setLoaded] = useState(false);
  const [openCVSections, setOpenCVSections] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setSelectedArtwork(null);
      }
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
    <div className="concept-1 bg-[#F5F0EB] text-[#D4A843] min-h-screen flex flex-col justify-between">
      <Navigation />

      {/* ============ HERO SECTION ============ */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#1A1A1A]">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={loaded ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
          <img 
            src={IMAGES.studioHero} 
            alt="José Awo Studio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
          </motion.div>
        </motion.div>


        {/* Parallax Splatters */}
        <motion.div style={{ y: ySplat1, opacity: opacityHero }} className="absolute z-0 top-[15%] left-[10%] w-48 md:w-64 text-[#B7410E] pointer-events-none opacity-80 drop-shadow-2xl">
          <SpeckleSVG type={1} />
        </motion.div>
        <motion.div style={{ y: ySplat2, opacity: opacityHero }} className="absolute z-0 top-[60%] right-[15%] w-64 md:w-96 text-[#D4A843] pointer-events-none opacity-70 drop-shadow-2xl">
          <SpeckleSVG type={2} />
        </motion.div>
        <motion.div style={{ y: ySplat3, opacity: opacityHero }} className="absolute z-0 top-[25%] right-[25%] w-40 md:w-56 text-[#B7410E] pointer-events-none opacity-60 drop-shadow-2xl mix-blend-overlay">
          <SpeckleSVG type={3} />
        </motion.div>
        <motion.div style={{ y: ySplat4, opacity: opacityHero }} className="absolute z-0 bottom-[20%] left-[20%] w-48 md:w-72 text-[#B7410E] pointer-events-none opacity-80 drop-shadow-2xl">
          <SpeckleSVG type={2} />
        </motion.div>
        <motion.div style={{ y: ySplat5, opacity: opacityHero }} className="absolute z-0 top-[40%] left-[45%] w-32 md:w-48 text-[#D4A843] pointer-events-none opacity-90 drop-shadow-2xl">
          <SpeckleSVG type={1} />
        </motion.div>

        <motion.div style={{ y: yText, opacity: opacityHero }} className="relative z-10 flex flex-col items-center px-8 w-full">
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
        </motion.div>

        {/* Gradient Transition to Bio Section */}
        <div className="absolute bottom-0 left-0 w-full h-10 md:h-16 bg-gradient-to-t from-[#F5F0EB] via-[#F5F0EB]/60 to-transparent z-10 pointer-events-none" />
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
                  <a href="/Jose_Awo_Artist_CV_Art_In_Reflection.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group border-2 border-[#1A1A1A] px-6 py-3 relative overflow-hidden transition-colors duration-300">
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
        
        {/* Parallax Splatters for Works */}
        <motion.div style={{ y: yWorksSplat1 }} className="absolute z-0 top-[10%] left-[5%] w-40 md:w-56 text-[#B7410E] pointer-events-none opacity-20 drop-shadow-xl">
          <SpeckleSVG type={1} />
        </motion.div>
        <motion.div style={{ y: yWorksSplat2 }} className="absolute z-0 top-[40%] right-[10%] w-48 md:w-64 text-[#D4A843] pointer-events-none opacity-[0.15] drop-shadow-xl">
          <SpeckleSVG type={2} />
        </motion.div>
        <motion.div style={{ y: yWorksSplat3 }} className="absolute z-0 bottom-[10%] left-[20%] w-32 md:w-48 text-[#B7410E] pointer-events-none opacity-20 drop-shadow-xl">
          <SpeckleSVG type={3} />
        </motion.div>

        <FadeIn className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <h3 className="font-['Space_Grotesk'] text-[14px] font-bold tracking-[3px] uppercase text-[#F5F0EB]">
              Selected Works
            </h3>
            <span className="font-['Work_Sans'] italic text-[15px] text-[#A0A0A0]">
              Pieces available for collection — drag to explore
            </span>
          </div>
        </FadeIn>

        <div className="relative z-10 overflow-x-auto pb-12 -mx-8 px-8 scrollbar-hide cursor-grab active:cursor-grabbing">
          <div className="flex gap-8 w-max">
            {ALL_WORKS.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.1}>
                <div onClick={() => setSelectedArtwork(item)}>
                  <div className="group relative w-[75vw] md:w-[35vw] lg:w-[28vw] cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#2A2A2A] mb-6">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0 p-4"
                      />
                      <div className="absolute inset-0 border border-[#B7410E] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                </div>
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

      {/* ARTWORK MODAL */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5F0EB] w-full max-w-6xl max-h-[90vh] overflow-y-auto relative block lg:flex shadow-2xl"
            >
              <button 
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-black/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="lg:w-[60%] bg-[#E8E4DF] p-8 py-12 flex items-center justify-center min-h-[40vh] lg:min-h-[80vh]">
                <img
                  src={selectedArtwork.img}
                  alt={selectedArtwork.title}
                  className="max-h-[40vh] lg:max-h-[70vh] w-auto object-contain shadow-lg"
                />
              </div>

              <div className="lg:w-[40%] p-8 pb-16 lg:p-12 flex flex-col justify-center">
                <h2 className="font-['Space_Grotesk'] text-[28px] font-medium tracking-[1px] uppercase mb-8 text-[#1A1A1A]">
                  {selectedArtwork.title}
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "Year", value: selectedArtwork.year, color: "text-[#A0A0A0]" },
                    { label: "Medium", value: selectedArtwork.medium, color: "text-[#1A1A1A]" },
                    { label: "Dimensions", value: selectedArtwork.dimensions, color: "text-[#1A1A1A]" },
                    { label: "Series", value: selectedArtwork.series, color: "text-[#B7410E]" },
                    { label: "Status", value: selectedArtwork.status, color: "text-[#1A1A1A]", mono: true },
                  ].map((field) => (
                    <div key={field.label} className="flex justify-between items-baseline border-b border-[#E8E4DF] pb-3">
                      <span className="font-['Work_Sans'] text-[13px] text-[#A0A0A0] tracking-[0.5px]">
                        {field.label}
                      </span>
                      <span className={`${field.mono ? "font-['Space_Grotesk'] text-[13px] tracking-[1px]" : "font-['Work_Sans'] text-[15px]"} ${field.color}`}>
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedArtwork.note && (
                  <p className="font-['Work_Sans'] text-[15px] italic text-[#666] leading-relaxed mb-10">
                    {selectedArtwork.note}
                  </p>
                )}

                <button 
                  className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300"
                >
                  <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative font-['Space_Grotesk'] text-[14px] tracking-[1.5px] uppercase text-[#B7410E] group-hover:text-[#F5F0EB] transition-colors duration-300">
                    Inquire About This Piece
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
