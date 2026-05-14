export function Footer() {
  return (
    <footer className="px-8 py-12 border-t border-[#E8E4DF] bg-[#F5F0EB]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-['Space_Grotesk'] text-[11px] tracking-[2px] uppercase text-[#A0A0A0]">
          © 2026 José Awo Art
        </span>
        <a href="https://abiknows.com" target="_blank" rel="noopener noreferrer" className="font-['Space_Grotesk'] text-[10px] tracking-[2px] uppercase text-red-600 hover:text-red-800 transition-colors">
          ABI CREATIVE
        </a>
      </div>
    </footer>
  );
}
