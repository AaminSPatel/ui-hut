"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const defaultItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Timepieces",
    title: "Chrono Master Elite",
    price: "$4,200",
    rating: 4.9,
    reviews: 1240,
    tag: "Best Seller",
    tagColor: "#f59e0b",
    description: "Swiss-made precision with a titanium case and sapphire crystal.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    category: "Fragrance",
    title: "Noir Absolut",
    price: "$280",
    rating: 4.8,
    reviews: 892,
    tag: "New",
    tagColor: "#10b981",
    description: "A rare blend of oud, amber, and midnight jasmine. 100ml.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    category: "Footwear",
    title: "AeroStride Pro",
    price: "$320",
    rating: 4.7,
    reviews: 3100,
    tag: "Limited",
    tagColor: "#8b5cf6",
    description: "Carbon-fiber midsole meets full-grain leather upper.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    category: "Wearable",
    title: "Nexus Watch Pro",
    price: "$899",
    rating: 4.6,
    reviews: 2045,
    tag: "Sale",
    tagColor: "#ef4444",
    description: "Health monitoring, GPS, AMOLED display. 72hr battery life.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    category: "Bags",
    title: "Architect Tote",
    price: "$560",
    rating: 4.9,
    reviews: 670,
    tag: "Exclusive",
    tagColor: "#06b6d4",
    description: "Full-grain vegetable-tanned leather, hand-stitched in Italy.",
  },
];

function TiltCard({ item }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -22;
    const rotY = (x - 0.5) * 22;
    setTilt({ x: rotX, y: rotY, gx: x * 100, gy: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, gx: 50, gy: 50 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
        transition: hovered ? "transform 0.1s linear,box-shadow 0.3s" : "transform 0.6s cubic-bezier(0.23,1,0.32,1),box-shadow 0.3s",
        boxShadow: hovered ? "0 40px 100px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.04)" : "0 20px 50px rgba(0,0,0,0.3)",
        background: "#111",
        position: "relative",
      }}
    >
      {/* Shine */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 10, borderRadius: 20, pointerEvents: "none",
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }} />
      )}
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" }} />
        <span style={{ position: "absolute", top: 16, left: 16, background: item.tagColor, color: "#000", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20 }}>{item.tag}</span>
      </div>
      <div style={{ padding: "20px 22px 24px" }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{item.category}</p>
        <h3 style={{ color: "#fff", fontSize: 19, fontWeight: 800, marginBottom: 8, fontFamily: "'Georgia',serif" }}>{item.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{item.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
          <span style={{ color: "#f59e0b", fontSize: 13 }}>{'★'.repeat(Math.round(item.rating))}</span>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{item.rating}</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>({item.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{item.price}</span>
          <button style={{ background: "#fff", color: "#000", border: "none", borderRadius: 50, padding: "10px 22px", fontSize: 12, fontWeight: 800, cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = item.tagColor; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default function Carousel4({ items = defaultItems }) {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const CARD_W = 300;
  const GAP = 24;

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = offset;
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    const maxOffset = (items.length - 1) * (CARD_W + GAP);
    setOffset(Math.max(0, Math.min(maxOffset, scrollStart.current - diff)));
  };
  const onMouseUp = () => { isDragging.current = false; };

  const snap = (dir) => {
    const step = CARD_W + GAP;
    const maxOffset = (items.length - 1) * step;
    setOffset(p => Math.max(0, Math.min(maxOffset, Math.round(p / step + dir) * step)));
  };

  return (
    <section style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60, padding: "0 20px" }}>
        <span style={{ color: "#06b6d4", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Curated Collection</span>
        <h2 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, fontFamily: "'Georgia',serif" }}>
          Hover to <em style={{ color: "#06b6d4", fontStyle: "italic" }}>Feel</em> the Depth
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 10 }}>Tilt interactive 3D product cards</p>
      </div>

      {/* Track */}
      <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{ display: "flex", gap: GAP, padding: "20px 60px", transform: `translateX(-${offset}px)`, transition: isDragging.current ? "none" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)", cursor: isDragging.current ? "grabbing" : "grab", userSelect: "none" }}
        >
          {items.map(item => (
            <div key={item.id} style={{ flexShrink: 0, width: CARD_W, height: 460 }}>
              <TiltCard item={item} />
            </div>
          ))}
        </div>
        {/* Gradient fades */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right,#0a0a0a,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left,#0a0a0a,transparent)", pointerEvents: "none" }} />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
        <button onClick={() => snap(-1)} style={{ width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.08)", color: "#06b6d4", fontSize: 20, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(6,182,212,0.08)"}
        >‹</button>
        <button onClick={() => snap(1)} style={{ width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.08)", color: "#06b6d4", fontSize: 20, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(6,182,212,0.08)"}
        >›</button>
      </div>
    </section>
  );
}
