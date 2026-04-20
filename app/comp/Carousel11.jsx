"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultSlides = [
  { id: 1, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", title: "Designed to Inspire", subtitle: "Award-winning digital experiences", tag: "DESIGN", price: "From $5K", color: "#f43f5e" },
  { id: 2, image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80", title: "Built to Perform", subtitle: "Enterprise-grade engineering", tag: "DEVELOP", price: "From $8K", color: "#0ea5e9" },
  { id: 3, image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80", title: "Grown to Scale", subtitle: "Strategic brand positioning", tag: "GROW", price: "From $3K", color: "#22c55e" },
  { id: 4, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80", title: "Team of Visionaries", subtitle: "50+ global creative minds", tag: "TEAM", price: "Meet Us", color: "#f59e0b" },
];

export default function Carousel11({ slides = defaultSlides, autoPlay = true, interval = 4000 }) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRef = useRef(null);
  const total = slides.length;

  const go = useCallback((idx, dir = 1) => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => { setCurrent(idx); setIsAnimating(false); }, 700);
  }, [isAnimating]);

  const next = useCallback(() => go((current + 1) % total, 1), [current, go, total]);
  const prev = useCallback(() => go((current - 1 + total) % total, -1), [current, go, total]);

  useEffect(() => {
    if (!autoPlay) return;
    autoRef.current = setInterval(next, interval);
    return () => clearInterval(autoRef.current);
  }, [autoPlay, interval, next]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    if (autoPlay) autoRef.current = setInterval(next, interval);
  };

  const slide = slides[current];

  return (
    <section style={{ minHeight: "100vh", background: "#09090f", overflow: "hidden", position: "relative", display: "flex", alignItems: "stretch", fontFamily: "system-ui,sans-serif" }}>
      {/* Diagonal clip background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "#09090f" }} />
        {/* Diagonal colored panel */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          right: "-10%", width: "60%",
          background: slide.color,
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          transition: "background 0.6s ease, clip-path 0.6s ease",
          opacity: 0.12,
        }} />
      </div>

      {/* Main layout */}
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", maxWidth: 1400, margin: "0 auto" }} className="c11-grid">
        {/* LEFT: text content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px clamp(24px,6vw,80px)" }}>
          {/* Slide counter */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 48 }}>
            {slides.map((s, i) => (
              <button key={i} onClick={() => { go(i, i > current ? 1 : -1); resetAuto(); }} style={{ width: i === current ? 48 : 8, height: 8, borderRadius: 4, background: i === current ? slide.color : "rgba(255,255,255,0.15)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.4s" }} />
            ))}
          </div>

          {/* Tag */}
          <div key={`tag-${current}`} style={{ animation: `diagSlide${animDir > 0 ? "R" : "L"} 0.6s cubic-bezier(0.23,1,0.32,1) both`, marginBottom: 16 }}>
            <span style={{ color: slide.color, fontSize: 11, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", borderLeft: `3px solid ${slide.color}`, paddingLeft: 12, display: "inline-block" }}>{slide.tag}</span>
          </div>

          {/* Title */}
          <h2 key={`title-${current}`} style={{ color: "#fff", fontSize: "clamp(2.5rem,5.5vw,5.5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", fontFamily: "'Georgia',serif", marginBottom: 20, animation: `diagSlide${animDir > 0 ? "R" : "L"} 0.7s 0.05s cubic-bezier(0.23,1,0.32,1) both` }}>
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p key={`sub-${current}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, lineHeight: 1.6, marginBottom: 40, animation: `diagSlide${animDir > 0 ? "R" : "L"} 0.7s 0.1s cubic-bezier(0.23,1,0.32,1) both` }}>
            {slide.subtitle}
          </p>

          {/* Price + CTA */}
          <div key={`cta-${current}`} style={{ display: "flex", gap: 16, alignItems: "center", animation: `diagSlide${animDir > 0 ? "R" : "L"} 0.7s 0.15s cubic-bezier(0.23,1,0.32,1) both` }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Starting</div>
              <div style={{ color: "#fff", fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em" }}>{slide.price}</div>
            </div>
            <button style={{ background: slide.color, color: "#fff", border: "none", borderRadius: 6, padding: "14px 32px", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.3s", flex: 1, maxWidth: 180 }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
            >Get Started →</button>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 12, marginTop: 60 }}>
            <button onClick={() => { prev(); resetAuto(); }} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${slide.color}30`}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
            >‹</button>
            <button onClick={() => { next(); resetAuto(); }} style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${slide.color}60`, background: `${slide.color}20`, color: slide.color, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${slide.color}40`}
              onMouseLeave={e => e.currentTarget.style.background = `${slide.color}20`}
            >›</button>
          </div>
        </div>

        {/* RIGHT: image */}
        <div style={{ position: "relative", overflow: "hidden", clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
          {slides.map((s, i) => (
            <div key={s.id} style={{
              position: "absolute", inset: 0,
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : `scale(1.05) translateX(${animDir * 40}px)`,
              transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(9,9,15,0.6) 0%,rgba(0,0,0,0.1) 60%)" }} />
            </div>
          ))}
          {/* Diagonal accent line */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${slide.color}30 0%, transparent 40%)`, transition: "background 0.6s", pointerEvents: "none" }} />
        </div>
      </div>

      <style>{`
        @keyframes diagSlideR { from{opacity:0;transform:translateX(-30px) skewX(-3deg);} to{opacity:1;transform:translateX(0) skewX(0);} }
        @keyframes diagSlideL { from{opacity:0;transform:translateX(30px) skewX(3deg);} to{opacity:1;transform:translateX(0) skewX(0);} }
        @media(max-width:768px) { .c11-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </section>
  );
}
