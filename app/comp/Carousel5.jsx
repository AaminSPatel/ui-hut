"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultSlides = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    layer: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    eyebrow: "Future Forward",
    headline: "The Age of\nArtificial Minds",
    sub: "Intelligence reimagined for the next generation of human potential",
    cta1: "Discover AI",
    cta2: "Watch Demo",
    accent: "#00d4ff",
    number: "01",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80",
    eyebrow: "Reach Further",
    headline: "Beyond Earth's\nHorizon",
    sub: "Pioneering the cosmos with technologies that defy what's possible",
    cta1: "Explore Space",
    cta2: "Our Mission",
    accent: "#ff6b35",
    number: "02",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    eyebrow: "Build Tomorrow",
    headline: "Engineering the\nImpossible",
    sub: "Quantum computing meets nano-engineering at the frontier of tomorrow",
    cta1: "See Tech",
    cta2: "Learn More",
    accent: "#7c3aed",
    number: "03",
  },
  {
    id: 4,
    bg: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80",
    eyebrow: "Ocean Deep",
    headline: "Mapping the\nFinal Frontier",
    sub: "Seventy percent of Earth remains unexplored. We're changing that.",
    cta1: "Dive In",
    cta2: "Our Fleet",
    accent: "#059669",
    number: "04",
  },
];

export default function Carousel5({ slides = defaultSlides, autoInterval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef(null);
  const total = slides.length;

  const go = useCallback((nextIdx, direction = 1) => {
    if (animating) return;
    setPrev(current);
    setDir(direction);
    setAnimating(true);
    setCurrent(nextIdx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }, [animating, current]);

  const next = useCallback(() => go((current + 1) % total, 1), [current, go, total]);
  const goBack = useCallback(() => go((current - 1 + total) % total, -1), [current, go, total]);

  useEffect(() => {
    autoRef.current = setInterval(next, autoInterval);
    return () => clearInterval(autoRef.current);
  }, [next, autoInterval]);

  const resetAuto = () => { clearInterval(autoRef.current); autoRef.current = setInterval(next, autoInterval); };

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000" }}>
      {/* Previous slide (exiting) */}
      {prevSlide && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          transform: `translateX(${dir > 0 ? "-100%" : "100%"}) scale(0.9)`,
          opacity: 0,
          transition: "all 0.9s cubic-bezier(0.77,0,0.175,1)",
        }}>
          <img src={prevSlide.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* Current slide (entering) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        animation: animating ? `slideIn${dir > 0 ? "R" : "L"} 0.9s cubic-bezier(0.77,0,0.175,1) forwards` : "none",
      }}>
        <img src={slide.bg} alt={slide.headline} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 8s ease", transform: animating ? "scale(1.05)" : "scale(1)" }} />
        {/* Multi-layer overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 20% 50%, ${slide.accent}18 0%, transparent 60%)` }} />
      </div>

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(24px,8vw,120px)" }}>
        {/* Number */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          <span style={{ color: slide.accent, fontSize: "clamp(3rem,6vw,6rem)", fontWeight: 900, lineHeight: 1, opacity: 0.15, fontFamily: "monospace", animation: animating ? "numberFade 0.6s 0.2s both" : "none" }}>{slide.number}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ height: 2, width: 60, background: slide.accent, borderRadius: 1, animation: animating ? "lineGrow 0.5s 0.3s both" : "none" }} />
            <span style={{ color: slide.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", animation: animating ? "textFade 0.5s 0.35s both" : "none" }}>{slide.eyebrow}</span>
          </div>
        </div>

        <h1 style={{
          color: "#fff",
          fontSize: "clamp(2.5rem,7vw,6.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          whiteSpace: "pre-line",
          marginBottom: 24,
          fontFamily: "'Georgia', serif",
          animation: animating ? "headlineFade 0.7s 0.2s both" : "none",
          textShadow: `0 0 80px ${slide.accent}30`,
        }}>{slide.headline}</h1>

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(14px,2vw,18px)", maxWidth: 480, lineHeight: 1.7, marginBottom: 40, animation: animating ? "textFade 0.6s 0.4s both" : "none" }}>{slide.sub}</p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: animating ? "textFade 0.6s 0.5s both" : "none" }}>
          <button style={{ background: slide.accent, color: "#000", border: "none", borderRadius: 4, padding: "16px 36px", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.3s", boxShadow: `0 0 30px ${slide.accent}40` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 40px ${slide.accent}60`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 30px ${slide.accent}40`; }}
          >{slide.cta1}</button>
          <button style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 4, padding: "16px 36px", fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = slide.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"}
          >{slide.cta2}</button>
        </div>
      </div>

      {/* Right side nav */}
      <div style={{ position: "absolute", right: "clamp(20px,4vw,60px)", top: "50%", transform: "translateY(-50%)", zIndex: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {slides.map((s, i) => (
          <button key={i} onClick={() => { go(i, i > current ? 1 : -1); resetAuto(); }} style={{ width: 3, height: i === current ? 40 : 20, borderRadius: 2, background: i === current ? slide.accent : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0 }} />
        ))}
      </div>

      {/* Bottom controls */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", alignItems: "center", gap: 24 }}>
        <button onClick={() => { goBack(); resetAuto(); }} style={{ width: 52, height: 52, borderRadius: "50%", border: `1px solid ${slide.accent}50`, background: `${slide.accent}15`, color: "#fff", fontSize: 20, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = `${slide.accent}35`}
          onMouseLeave={e => e.currentTarget.style.background = `${slide.accent}15`}
        >‹</button>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em" }}>{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button onClick={() => { next(); resetAuto(); }} style={{ width: 52, height: 52, borderRadius: "50%", border: `1px solid ${slide.accent}50`, background: `${slide.accent}15`, color: "#fff", fontSize: 20, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = `${slide.accent}35`}
          onMouseLeave={e => e.currentTarget.style.background = `${slide.accent}15`}
        >›</button>
      </div>

      <style>{`
        @keyframes slideInR { from { transform: translateX(100%) scale(0.95); opacity:0; } to { transform: translateX(0) scale(1); opacity:1; } }
        @keyframes slideInL { from { transform: translateX(-100%) scale(0.95); opacity:0; } to { transform: translateX(0) scale(1); opacity:1; } }
        @keyframes headlineFade { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
        @keyframes textFade { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes numberFade { from { opacity:0; } to { opacity:0.15; } }
        @keyframes lineGrow { from { width:0; opacity:0; } to { width:60px; opacity:1; } }
      `}</style>
    </section>
  );
}
