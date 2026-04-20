"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultSlides = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80",
    mid: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=60",
    eyebrow: "Chapter I",
    title: "The Void Between Stars",
    sub: "In the space between moments, entire universes are born.",
    number: "001",
    accent: "#7c3aed",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    eyebrow: "Chapter II",
    title: "Light That Travels Forever",
    sub: "The photon remembers nothing of its eight-minute journey.",
    number: "002",
    accent: "#f59e0b",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=80",
    eyebrow: "Chapter III",
    title: "Ocean of Infinite Blue",
    sub: "Depth has no ceiling. Silence has no floor.",
    number: "003",
    accent: "#06b6d4",
  },
  {
    id: 4,
    bg: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    eyebrow: "Chapter IV",
    title: "The City Never Sleeps",
    sub: "Seven million dreams, burning simultaneously.",
    number: "004",
    accent: "#f472b6",
  },
];

export default function Carousel10({ slides = defaultSlides, autoPlay = true, interval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);
  const autoRef = useRef(null);
  const total = slides.length;

  const go = useCallback((idx) => {
    if (transitioning) return;
    setPrev(current);
    setCurrent(idx);
    setTransitioning(true);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 1000);
  }, [current, transitioning]);

  const next = useCallback(() => go((current + 1) % total), [current, go, total]);
  const goBack = useCallback(() => go((current - 1 + total) % total), [current, go, total]);

  useEffect(() => {
    if (!autoPlay) return;
    autoRef.current = setInterval(next, interval);
    return () => clearInterval(autoRef.current);
  }, [autoPlay, interval, next]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    if (autoPlay) autoRef.current = setInterval(next, interval);
  };

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) setMouse({ x: e.clientX / rect.width, y: e.clientY / rect.height });
  };

  const slide = slides[current];
  const mx = (mouse.x - 0.5) * 40;
  const my = (mouse.y - 0.5) * 24;

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,sans-serif" }}
    >
      {/* Layer 1: Far background */}
      <div style={{ position: "absolute", inset: "-10%", zIndex: 0, transition: "none", transform: `translate(${-mx * 0.5}px, ${-my * 0.5}px)` }}>
        {slides.map((s, i) => (
          <div key={s.id} style={{
            position: "absolute", inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1s ease",
          }}>
            <img src={s.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px) brightness(0.3)", transform: "scale(1.1)" }} />
          </div>
        ))}
      </div>

      {/* Layer 2: Mid image (slower parallax) */}
      <div style={{ position: "absolute", inset: "-5%", zIndex: 1, transform: `translate(${-mx * 1.2}px, ${-my * 1.2}px)`, transition: "transform 0.15s ease" }}>
        {slides.map((s, i) => (
          <div key={s.id} style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, transition: "opacity 1s ease" }}>
            <img src={s.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)", transform: "scale(1.05)" }} />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `radial-gradient(ellipse at 20% 50%, ${slide.accent}15 0%, transparent 65%)`, transition: "background 0.8s ease" }} />

      {/* Transition overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 9,
        background: "#000",
        opacity: transitioning ? 0 : 0,
        animation: transitioning ? "flashIn 1s ease both" : "none",
        pointerEvents: "none",
      }} />

      {/* Content — Layer 3 (most parallax) */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1200, padding: "0 clamp(24px,8vw,100px)", transform: `translate(${mx * 1.5}px, ${my * 1.5}px)`, transition: "transform 0.3s ease" }}>
        <div style={{ maxWidth: 640 }}>
          {/* Number */}
          <div style={{ fontSize: "clamp(6rem,15vw,16rem)", fontWeight: 900, lineHeight: 0.85, color: "rgba(255,255,255,0.04)", fontFamily: "'Georgia',serif", letterSpacing: "-0.05em", position: "absolute", right: "clamp(20px,6vw,80px)", top: "50%", transform: "translateY(-60%)", userSelect: "none", pointerEvents: "none" }}>
            {slide.number}
          </div>

          {/* Chapter */}
          <div key={`eyebrow-${current}`} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, animation: "layerFadeUp 0.7s 0.1s both" }}>
            <div style={{ height: 1, width: 40, background: slide.accent, transition: "background 0.5s" }} />
            <span style={{ color: slide.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", transition: "color 0.5s" }}>{slide.eyebrow}</span>
          </div>

          <h2 key={`title-${current}`} style={{ color: "#fff", fontSize: "clamp(2.5rem,6vw,6rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em", fontFamily: "'Georgia',serif", marginBottom: 24, animation: "layerFadeUp 0.8s 0.15s both" }}>
            {slide.title}
          </h2>

          <p key={`sub-${current}`} style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(14px,1.8vw,20px)", lineHeight: 1.7, maxWidth: 420, marginBottom: 48, fontStyle: "italic", animation: "layerFadeUp 0.8s 0.25s both" }}>
            {slide.sub}
          </p>

          <div key={`cta-${current}`} style={{ display: "flex", gap: 14, alignItems: "center", animation: "layerFadeUp 0.8s 0.35s both" }}>
            <button style={{ background: slide.accent, color: "#fff", border: "none", borderRadius: 6, padding: "14px 32px", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 0.3s", boxShadow: `0 0 30px ${slide.accent}50` }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
            >Read More</button>
            <button style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "14px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = slide.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            >Gallery</button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(24px,6vw,80px)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => { go(i); resetAuto(); }} style={{ height: 3, width: i === current ? 40 : 16, borderRadius: 2, background: i === current ? slide.accent : "rgba(255,255,255,0.25)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.4s" }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => { goBack(); resetAuto(); }} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background = `${slide.accent}30`}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >‹</button>
          <button onClick={() => { next(); resetAuto(); }} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background = `${slide.accent}30`}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >›</button>
        </div>
      </div>

      <style>{`
        @keyframes layerFadeUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
        @keyframes flashIn { 0%{opacity:0.5;} 50%{opacity:0.2;} 100%{opacity:0;} }
      `}</style>
    </section>
  );
}
