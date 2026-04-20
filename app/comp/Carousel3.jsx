"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultCards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    frontTitle: "Minimal Design",
    frontDesc: "Less is infinitely more",
    backTitle: "Design Philosophy",
    backDesc: "We craft interfaces that breathe. Every pixel serves a purpose, every space tells a story.",
    backCta: "View Work",
    accent: "#f59e0b",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    frontTitle: "Bold Typography",
    frontDesc: "Words that command attention",
    backTitle: "Type Mastery",
    backDesc: "Typography is the voice of your brand. We choose typefaces that speak volumes before a word is read.",
    backCta: "Learn More",
    accent: "#10b981",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    frontTitle: "Motion & Flow",
    frontDesc: "Animation that feels alive",
    backTitle: "Motion Design",
    backDesc: "Great animation is invisible. It guides, delights, and never interrupts the user's flow.",
    backCta: "See Motion",
    accent: "#8b5cf6",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1558618047-f1de3a9c0eb3?w=600&q=80",
    frontTitle: "Color Theory",
    frontDesc: "Palettes that evoke emotion",
    backTitle: "Color Science",
    backDesc: "Color is our most powerful tool. The right hue triggers memory, emotion, and action simultaneously.",
    backCta: "Explore Color",
    accent: "#ef4444",
  },
];

function FlipCard({ card, isFlipped, onFlip }) {
  return (
    <div
      onClick={onFlip}
      style={{
        width: "100%",
        height: "100%",
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.75s cubic-bezier(0.23,1,0.32,1)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        }}>
          <img src={card.image} alt={card.frontTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px" }}>
            <div style={{ width: 40, height: 3, background: card.accent, borderRadius: 2, marginBottom: 12 }} />
            <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 6, fontFamily: "'Georgia',serif" }}>{card.frontTitle}</h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{card.frontDesc}</p>
            <p style={{ color: card.accent, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 14 }}>Click to flip →</p>
          </div>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          borderRadius: 20, overflow: "hidden",
          transform: "rotateY(180deg)",
          background: `linear-gradient(135deg,#0f0f1a,#1a1a2e)`,
          border: `1px solid ${card.accent}40`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${card.accent}20`,
          display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 28px",
        }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: `${card.accent}20`, border: `1px solid ${card.accent}60`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 22 }}>✦</div>
          <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 14, fontFamily: "'Georgia',serif", lineHeight: 1.2 }}>{card.backTitle}</h3>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>{card.backDesc}</p>
          <button style={{ background: card.accent, color: "#000", border: "none", borderRadius: 50, padding: "12px 28px", fontWeight: 800, fontSize: 13, cursor: "pointer", width: "fit-content", letterSpacing: "0.05em" }}>{card.backCta}</button>
        </div>
      </div>
    </div>
  );
}

export default function Carousel2({ cards = defaultCards, autoPlay = false }) {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState({});
  const total = cards.length;

  const next = () => setActive((p) => (p + 1) % total);
  const prev = () => setActive((p) => (p - 1 + total) % total);

  const getStyle = (i) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const abs = Math.abs(diff);
    if (abs > 2) return { opacity: 0, pointerEvents: "none" };

    const tx = diff * 320;
    const tz = abs === 0 ? 0 : -180 - abs * 50;
    const ry = diff * -22;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.65;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.35;
    const zIndex = 50 - abs * 10;

    return {
      position: "absolute",
      left: "50%", top: "50%",
      width: 340, height: 420,
      marginLeft: -170, marginTop: -210,
      transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
    };
  };

  return (
    <section style={{ minHeight: "100vh", background: "#080810", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "80px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Interactive Cards</span>
        <h2 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>
          Flip to <em style={{ color: "#f59e0b", fontStyle: "italic" }}>Discover</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 10 }}>Click any card to reveal what's behind</p>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 900, height: 450, perspective: 1300, transformStyle: "preserve-3d" }}>
        {cards.map((card, i) => (
          <div key={card.id} style={getStyle(i)}>
            <FlipCard card={card} isFlipped={!!flipped[card.id]} onFlip={() => setFlipped(f => ({ ...f, [card.id]: !f[card.id] }))} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 50 }}>
        <button onClick={prev} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)", color: "#f59e0b", fontSize: 20, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}
        >‹</button>
        <div style={{ display: "flex", gap: 8 }}>
          {cards.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 32 : 8, height: 8, borderRadius: 4, background: i === active ? "#f59e0b" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0 }} />
          ))}
        </div>
        <button onClick={next} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)", color: "#f59e0b", fontSize: 20, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}
        >›</button>
      </div>
    </section>
  );
}
