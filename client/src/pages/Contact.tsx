import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Contact() {
  return (
    <div className="concept-1 bg-[#F5F0EB] text-[#1A1A1A] min-h-screen flex flex-col justify-between">
      <Navigation />

      <section className="py-32 px-8 flex-grow flex flex-col justify-center mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
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
              <button 
                type="button"
                className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300 mt-4 cursor-pointer"
              >
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
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#A0A0A0" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="#A0A0A0" strokeWidth="0.5" />
                  ))}
                  <line x1="100" y1="0" x2="100" y2="400" stroke="#A0A0A0" strokeWidth="2" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#A0A0A0" strokeWidth="2" />
                  <line x1="250" y1="0" x2="250" y2="400" stroke="#A0A0A0" strokeWidth="1.5" />
                  <line x1="0" y1="300" x2="400" y2="300" stroke="#A0A0A0" strokeWidth="1.5" />
                </svg>
              </div>
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

      <Footer />
    </div>
  );
}
