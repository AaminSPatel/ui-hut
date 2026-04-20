"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1682685797886-e0e0a0a1f823?w=900&q=80",
    title: "Into the Wild Unknown",
    subtitle: "Discover breathtaking landscapes",
    tag: "Adventure",
    cta: "Explore Now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    title: "Summit the Impossible",
    subtitle: "Push your limits beyond imagination",
    tag: "Extreme",
    cta: "Start Journey",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
    title: "Ocean Depths Await",
    subtitle: "Dive into the unexplored blue",
    tag: "Marine",
    cta: "Dive Deep",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    title: "Forest Serenity",
    subtitle: "Reconnect with ancient nature",
    tag: "Wellness",
    cta: "Find Peace",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=900&q=80",
    title: "Desert Mirage",
    subtitle: "Walk the endless golden sands",
    tag: "Arid",
    cta: "Wander Free",
  },
];

export default function Carousel1({ slides = defaultSlides, autoPlay = true, interval = 3500 }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const autoRef = useRef(null);
  const total = slides.length;

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (!autoPlay) return;
    autoRef.current = setInterval(next, interval);
    return () => clearInterval(autoRef.current);
  }, [autoPlay, interval, next]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    if (autoPlay) autoRef.current = setInterval(next, interval);
  };

  const goTo = (i) => { setActive(i); resetAuto(); };

  const getTransform = (i) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const abs = Math.abs(diff);
    const tx = diff * 280;
    const tz = abs === 0 ? 0 : -220 - abs * 60;
    const ry = diff * -38;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.58;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : abs === 2 ? 0.45 : 0;
    const zIndex = 100 - abs * 20;
    const brightness = abs === 0 ? 1 : abs === 1 ? 0.65 : 0.4;
    return { tx, tz, ry, scale, opacity, zIndex, brightness };
  };

  const onMouseDown = (e) => { setDragging(true); dragStart.current = e.clientX; };
  const onMouseUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 60) { diff > 0 ? next() : prev(); resetAuto(); }
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: "linear-gradient(135deg,#0a0a0f 0%,#12121f 50%,#0a0f1a 100%)" }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={() => setDragging(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(99,102,241,0.18) 0%,transparent 70%)",
          filter: "blur(40px)"
        }} />
      </div>

      {/* Title area */}
      <div className="relative z-10 text-center mb-12 px-4">
        <p className="text-indigo-400 tracking-[0.4em] text-xs uppercase mb-3 font-medium">Featured Collection</p>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Worlds Worth <em style={{ fontStyle: "italic", color: "#818cf8" }}>Exploring</em>
        </h1>
      </div>

      {/* 3D Stage */}
      <div className="relative w-full" style={{ height: 420, perspective: 1400 }}>
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {slides.map((slide, i) => {
            const { tx, tz, ry, scale, opacity, zIndex, brightness } = getTransform(i);
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                onClick={() => { if (!isActive) { goTo(i); } }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 480,
                  height: 340,
                  marginLeft: -240,
                  marginTop: -170,
                  transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
                  cursor: isActive ? "grab" : "pointer",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: isActive ? "0 40px 100px rgba(0,0,0,0.7),0 0 0 1px rgba(99,102,241,0.25)" : "0 20px 60px rgba(0,0,0,0.5)",
                  filter: `brightness(${brightness})`,
                }}
              >
                <img src={slide.image} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {/* Overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)" }} />
                {isActive && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px", animation: "fadeUp 0.5s ease" }}>
                    <span style={{ display: "inline-block", background: "#6366f1", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, marginBottom: 10 }}>{slide.tag}</span>
                    <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginBottom: 6, fontFamily: "'Georgia',serif" }}>{slide.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 18 }}>{slide.subtitle}</p>
                    <button style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "10px 24px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
                      onMouseEnter={e => e.target.style.background = "rgba(99,102,241,0.8)"}
                      onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}
                    >{slide.cta}</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center gap-6 mt-10">
        <button onClick={() => { prev(); resetAuto(); }} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 18, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.4)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >‹</button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? "#6366f1" : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0 }} />
          ))}
        </div>
        <button onClick={() => { next(); resetAuto(); }} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 18, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.4)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >›</button>
      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:translateY(0);} }`}</style>
    </section>
  );
}
