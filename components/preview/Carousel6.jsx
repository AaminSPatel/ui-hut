"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultSlides = [
  { id: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", title: "Summit Serenity", category: "Mountains", desc: "Where silence speaks louder than words", color: "#60a5fa" },
  { id: 2, image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", title: "Golden Hour", category: "Desert", desc: "Endless dunes bathed in amber light", color: "#f59e0b" },
  { id: 3, image: "https://images.unsplash.com/photo-1439853949212-36589f9f2c3c?w=800&q=80", title: "Nordic Glow", category: "Aurora", desc: "The sky dances in green and violet", color: "#34d399" },
  { id: 4, image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", title: "Forest Mirror", category: "Lakes", desc: "Perfect reflections, imperfect peace", color: "#a78bfa" },
  { id: 5, image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80", title: "Volcano Watch", category: "Volcanic", desc: "Earth's raw fury made beautiful", color: "#f87171" },
  { id: 6, image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", title: "Valley of Life", category: "Meadows", desc: "Greener than any dream", color: "#4ade80" },
];

export default function Carousel6({ slides = defaultSlides, autoPlay = true, interval = 3000 }) {
  const [active, setActive] = useState(0);
  const autoRef = useRef(null);
  const total = slides.length;
  const ITEM_H = 110;
  const RADIUS = 220;

  const next = useCallback(() => setActive(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (!autoPlay) return;
    autoRef.current = setInterval(next, interval);
    return () => clearInterval(autoRef.current);
  }, [autoPlay, interval, next]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    if (autoPlay) autoRef.current = setInterval(next, interval);
  };

  const getItemStyle = (i) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const angle = (diff / total) * 360;
    const rad = (angle * Math.PI) / 180;
    const y = Math.sin(rad) * RADIUS;
    const z = Math.cos(rad) * RADIUS - RADIUS;
    const scale = diff === 0 ? 1 : Math.max(0.5, 1 - Math.abs(diff) * 0.15);
    const opacity = diff === 0 ? 1 : Math.max(0, 1 - Math.abs(diff) * 0.25);
    const brightness = diff === 0 ? 1 : 0.4 + (1 - Math.abs(diff) * 0.15) * 0.3;
    return { y, z, scale, opacity, brightness, isActive: diff === 0 };
  };

  const slide = slides[active];

  return (
    <section style={{ minHeight: "100vh", background: "#06060f", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", fontFamily: "system-ui,sans-serif" }}>
      {/* Ambient */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 75% 50%, ${slide.color}18 0%, transparent 70%)`, transition: "background 0.8s ease", pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "clamp(40px,6vw,100px)", width: "100%", maxWidth: 1100, padding: "0 clamp(20px,5vw,60px)" }}>
        {/* Left: 3D Wheel */}
        <div style={{ position: "relative", width: 260, height: 500, flexShrink: 0, perspective: 900 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
            {slides.map((s, i) => {
              const { y, z, scale, opacity, brightness, isActive } = getItemStyle(i);
              return (
                <div
                  key={s.id}
                  onClick={() => { setActive(i); resetAuto(); }}
                  style={{
                    position: "absolute", left: 0, right: 0,
                    top: "50%",
                    height: ITEM_H,
                    marginTop: -ITEM_H / 2,
                    transform: `translateY(${y}px) translateZ(${z}px) scale(${scale})`,
                    opacity,
                    filter: `brightness(${brightness})`,
                    transition: "all 0.65s cubic-bezier(0.23,1,0.32,1)",
                    cursor: isActive ? "default" : "pointer",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: isActive ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 2px ${s.color}50` : "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                  {isActive && (
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                      <div style={{ width: 3, height: 30, background: s.color, borderRadius: 2 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Info panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div key={active} style={{ animation: "slideInfo 0.5s cubic-bezier(0.23,1,0.32,1) both" }}>
            <span style={{ display: "inline-block", color: slide.color, fontSize: 11, fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", background: `${slide.color}15`, border: `1px solid ${slide.color}40`, borderRadius: 30, padding: "5px 16px", marginBottom: 20 }}>{slide.category}</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 20, fontFamily: "'Georgia',serif" }}>{slide.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, lineHeight: 1.6, marginBottom: 36 }}>{slide.desc}</p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 48 }}>
              <button style={{ background: slide.color, color: "#000", border: "none", borderRadius: 50, padding: "13px 32px", fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.3s", letterSpacing: "0.04em" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
              >Explore →</button>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 600 }}>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Thumb strip */}
          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((s, i) => (
              <div key={s.id} onClick={() => { setActive(i); resetAuto(); }} style={{ width: i === active ? 60 : 40, height: 6, borderRadius: 3, background: i === active ? slide.color : "rgba(255,255,255,0.15)", cursor: "pointer", transition: "all 0.4s" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <div style={{ position: "absolute", right: "clamp(16px,3vw,40px)", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10 }}>
        {[{ label: "↑", fn: () => { prev(); resetAuto(); } }, { label: "↓", fn: () => { next(); resetAuto(); } }].map((b, i) => (
          <button key={i} onClick={b.fn} style={{ width: 42, height: 42, borderRadius: "50%", border: `1px solid ${slide.color}40`, background: `${slide.color}15`, color: slide.color, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background = `${slide.color}35`}
            onMouseLeave={e => e.currentTarget.style.background = `${slide.color}15`}
          >{b.label}</button>
        ))}
      </div>

      <style>{`@keyframes slideInfo { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}
