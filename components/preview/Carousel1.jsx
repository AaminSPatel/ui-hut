"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultFaces = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&q=80",
    label: "Abstract Art",
    description: "Where chaos meets precision",
    badge: "01",
    color: "#ec4899",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=700&q=80",
    label: "Urban Pulse",
    description: "City lights never sleep",
    badge: "02",
    color: "#06b6d4",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=700&q=80",
    label: "Storm Force",
    description: "Nature's raw power unleashed",
    badge: "03",
    color: "#84cc16",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80",
    label: "Earth Tones",
    description: "Grounded in ancient beauty",
    badge: "04",
    color: "#f97316",
  },
];

export default function Carousel3({ faces = defaultFaces, size = 340 }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = 4;
  const half = size / 2;

  const angles = [0, -90, -180, -270];

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(p => (p + dir + total) % total);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const rotateY = angles[current];

  const faceTransforms = [
    `translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(270deg) translateZ(${half}px)`,
  ];

  return (
    <section style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0d0d0d,#111827)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", fontFamily: "'Georgia',serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60, zIndex: 2, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ height: 1, width: 60, background: "rgba(236,72,153,0.5)" }} />
          <span style={{ color: "#ec4899", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Cube Carousel</span>
          <div style={{ height: 1, width: 60, background: "rgba(236,72,153,0.5)" }} />
        </div>
        <h2 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, letterSpacing: "-0.02em" }}>
          Spin the <em style={{ color: "#ec4899", fontStyle: "italic" }}>Cube</em>
        </h2>
      </div>

      {/* Cube */}
      <div style={{ perspective: 1200, marginBottom: 50 }}>
        <div style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotateY}deg) scale(0.8)`,
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        }}>
          {faces.slice(0, 4).map((face, i) => (
            <div key={face.id} style={{
              position: "absolute",
              width: size,
              height: size,
              transform: faceTransforms[i],
              backfaceVisibility: "hidden",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <img src={face.image} alt={face.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.15) 55%,transparent 100%)" }} />
              {/* Face content */}
              <div style={{ position: "absolute", top: 20, right: 20, width: 44, height: 44, borderRadius: "50%", background: `${face.color}25`, border: `1px solid ${face.color}60`, display: "flex", alignItems: "center", justifyContent: "center", color: face.color, fontSize: 12, fontWeight: 800, letterSpacing: "0.05em" }}>{face.badge}</div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 22px" }}>
                <div style={{ width: 30, height: 3, background: face.color, borderRadius: 2, marginBottom: 10 }} />
                <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 6, lineHeight: 1.2 }}>{face.label}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{face.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <span style={{ color: faces[current].color, fontSize: 36, fontWeight: 800, display: "block", lineHeight: 1 }}>{faces[current].badge}</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>{faces[current].label}</span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 16 }}>
        <button
          onClick={() => go(-1)}
          disabled={isAnimating}
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", borderRadius: 50, padding: "12px 32px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = `${faces[current].color}30`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >← Prev</button>
        <button
          onClick={() => go(1)}
          disabled={isAnimating}
          style={{ background: faces[current].color, border: "none", color: "#000", borderRadius: 50, padding: "12px 32px", fontSize: 13, fontWeight: 800, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.3s" }}
        >Next →</button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
        {faces.map((f, i) => (
          <div key={i} onClick={() => { if (!isAnimating) { setIsAnimating(true); setCurrent(i); setTimeout(() => setIsAnimating(false), 800); } }} style={{ width: 10, height: 10, borderRadius: "50%", background: i === current ? faces[current].color : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.4s", transform: i === current ? "scale(1.4)" : "scale(1)" }} />
        ))}
      </div>
    </section>
  );
}
