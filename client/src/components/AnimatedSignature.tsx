import { useState, useEffect } from "react";

export function AnimatedSignature() {
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
