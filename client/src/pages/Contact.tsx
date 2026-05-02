import { FadeIn } from "@/components/FadeIn";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Contact() {
  const [inquiryType, setInquiryType] = useState("Art Collector");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

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

            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { label: "Full Name", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Phone", type: "tel", required: false },
              ].map((field) => (
                <div key={field.label} className="group relative">
                  <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                    {field.label} {!field.required && <span className="text-[#D4D0CB]">(optional)</span>}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/5 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-all duration-300"
                  />
                </div>
              ))}

              {/* Dropdown */}
              <div className="group relative">
                <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                  I am a...
                </label>
                <select 
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/5 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option>Art Collector</option>
                  <option>Curator / Gallery</option>
                  <option>Press / Media</option>
                  <option>Art Enthusiast</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Conditional Institution Field */}
              {inquiryType === "Curator / Gallery" && (
                <FadeIn>
                  <div className="group relative">
                    <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/5 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-all duration-300"
                    />
                  </div>
                </FadeIn>
              )}

              {/* Subject */}
              <div className="group relative">
                <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/5 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="group relative">
                <label className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] group-focus-within:text-[#B7410E] transition-colors duration-200 block mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full bg-transparent border-b-2 border-[#D4D0CB] focus:border-[#B7410E] py-3 px-2 focus:bg-[#B7410E]/5 font-['Work_Sans'] text-[17px] text-[#1A1A1A] outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Newsletter */}
              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="newsletter"
                  className="w-4 h-4 accent-[#B7410E] cursor-pointer"
                />
                <label htmlFor="newsletter" className="font-['Work_Sans'] text-[14px] text-[#666] cursor-pointer select-none">
                  Subscribe to studio newsletter for exhibition updates
                </label>
              </div>

              {/* Submit */}
              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="relative group w-full border-2 border-[#B7410E] py-4 overflow-hidden transition-colors duration-300 mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {!isSuccess && <span className="absolute inset-0 bg-[#B7410E] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />}
                <span className="relative flex items-center justify-center gap-2 font-['Roboto_Mono'] text-[14px] tracking-[1.5px] uppercase transition-colors duration-300 text-[#B7410E] group-hover:text-[#F5F0EB]">
                  {isSubmitting ? "Sending..." : isSuccess ? <><Check size={18} /> Message Sent</> : "Send Message"}
                </span>
              </button>
            </form>

            {/* Social links & Physical Grounding */}
            <div className="mt-16 space-y-8">
              <div>
                <h4 className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] mb-2">Inquiries</h4>
                <a href="mailto:info@joseawoart.com" className="font-['Work_Sans'] text-[16px] text-[#1A1A1A] hover:text-[#B7410E] transition-colors">
                  info@joseawoart.com
                </a>
              </div>
              
              <div>
                <h4 className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] mb-2">Studio</h4>
                <p className="font-['Work_Sans'] text-[16px] text-[#1A1A1A]">
                  Atlanta, GA
                </p>
              </div>

              <div>
                <h4 className="font-['Roboto_Mono'] text-[12px] tracking-[1.5px] uppercase text-[#A0A0A0] mb-2">Social</h4>
                <div className="flex gap-6">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-['Work_Sans'] text-[16px] text-[#1A1A1A] hover:text-[#B7410E] transition-colors">
                    Instagram
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-['Work_Sans'] text-[16px] text-[#1A1A1A] hover:text-[#B7410E] transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
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
