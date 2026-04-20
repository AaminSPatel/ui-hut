"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const defaultItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", title: "Amazon Rainforest", stat: "2.7M mi²", label: "Area Covered" },
  { id: 2, image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80", title: "Kilauea Volcano", stat: "1,247°C", label: "Lava Temp" },
  { id: 3, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", title: "K2 Peak", stat: "8,611m", label: "Altitude" },
  { id: 4, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", title: "Maldives", stat: "1,200", label: "Islands" },
  { id: 5, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", title: "Grand Canyon", stat: "446km", label: "Length" },
  { id: 6, image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", title: "Swiss Alps", stat: "58,310", label: "Square km" },
  { id: 7, image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&q=80", title: "Arctic Storm", stat: "200km/h", label: "Wind Speed" },
  { id: 8, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", title: "Deep Ocean", stat: "11,034m", label: "Max Depth" },
];

export default function Carousel8({
  items = defaultItems,
  cardW = 200,
  cardH = 280,
  autoPlay = true,
  speed = 2500,
}) {
  const total = items.length;
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(null);
  const startAngle = useRef(0);
  const startX = useRef(0);
  const animRef = useRef(null);
  const rotRef = useRef(0);

  const RADIUS = Math.max(260, total * 38);
  const angleStep = 360 / total;

  useEffect(() => {
    rotRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    if (!autoPlay || isDragging) return;
    const id = setInterval(() => {
      setRotation(r => r - (360 / total) * 0.4);
    }, 80);
    return () => clearInterval(id);
  }, [autoPlay, isDragging, total]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startAngle.current = rotRef.current;
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX.current;
    setRotation(startAngle.current + diff * 0.5);
  };
  const onMouseUp = () => setIsDragging(false);

  const goTo = (i) => {
    const targetAngle = -i * angleStep;
    setRotation(targetAngle);
  };

  const activeIdx = Math.round((-rotation / angleStep) % total + total) % total;

  return (
    <section
      style={{ minHeight: "100vh", background: "linear-gradient(160deg,#020208 0%,#0a0a18 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", fontFamily: "system-ui,sans-serif" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60, position: "relative", zIndex: 2 }}>
        <span style={{ color: "#34d399", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>360° Experience</span>
        <h2 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, fontFamily: "'Georgia',serif", letterSpacing: "-0.03em", marginTop: 8 }}>
          Spin the <em style={{ color: "#34d399", fontStyle: "italic" }}>Ring</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 8 }}>Drag to rotate · Click to focus</p>
      </div>

      {/* 3D Ring */}
      <div style={{ position: "relative", width: "100%", height: 360, perspective: 1200, perspectiveOrigin: "50% 50%" }}>
        <div
          style={{
            position: "absolute", left: "50%", top: "50%",
            width: 0, height: 0,
            transformStyle: "preserve-3d",
            transform: `translateX(-50%) translateY(-50%) rotateX(-8deg) rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
          }}
        >
          {items.map((item, i) => {
            const angle = i * angleStep;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * RADIUS;
            const z = Math.cos(rad) * RADIUS;
            const isActive = i === activeIdx;

            return (
              <div
                key={item.id}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  width: cardW,
                  height: cardH,
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: isActive ? "0 20px 60px rgba(52,211,153,0.3), 0 0 0 2px rgba(52,211,153,0.5)" : "0 10px 40px rgba(0,0,0,0.5)",
                  transition: "box-shadow 0.4s, transform 0.3s",
                  cursor: "pointer",
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: isActive ? "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.1) 60%)" : "linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.5) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px" }}>
                  <div style={{ color: "#34d399", fontSize: 20, fontWeight: 900, lineHeight: 1 }}>{item.stat}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{item.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active item info */}
      <div style={{ textAlign: "center", marginTop: 40, height: 60 }}>
        <div key={activeIdx} style={{ animation: "popIn 0.3s cubic-bezier(0.23,1,0.32,1) both" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>{items[activeIdx]?.title}</div>
          <div style={{ color: "#34d399", fontSize: 13, fontWeight: 600 }}>{items[activeIdx]?.stat} {items[activeIdx]?.label}</div>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === activeIdx ? 24 : 7, height: 7, borderRadius: 4, background: i === activeIdx ? "#34d399" : "rgba(255,255,255,0.2)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.4s" }} />
        ))}
      </div>

      <style>{`@keyframes popIn { from{opacity:0;transform:scale(0.9) translateY(8px);} to{opacity:1;transform:scale(1) translateY(0);} }`}</style>
    </section>
  );
}
