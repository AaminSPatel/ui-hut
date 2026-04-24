"use client";
import { useState, useRef, useCallback } from "react";

const defaultCards = [
  { id: 1, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", name: "Aria Chen", role: "Creative Director", company: "Fable Studio", quote: "Design is not just what it looks like. Design is how it works.", avatar: "AC", color: "#ec4899" },
  { id: 2, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", name: "Marcus Reid", role: "Lead Engineer", company: "Orbit Labs", quote: "Code is poetry written for machines, but read by humans.", avatar: "MR", color: "#6366f1" },
  { id: 3, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80", name: "Sofia Park", role: "Product Designer", company: "Drift Co.", quote: "Every great product begins with deep empathy for the user.", avatar: "SP", color: "#f59e0b" },
  { id: 4, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=80", name: "Ethan Moore", role: "CTO", company: "Nexus AI", quote: "The best technology disappears — it just makes life feel easier.", avatar: "EM", color: "#10b981" },
  { id: 5, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80", name: "Luna Reyes", role: "Brand Strategist", company: "Volta Studio", quote: "A brand is a living thing — it needs care, story, and soul.", avatar: "LR", color: "#a78bfa" },
];

export default function Carousel7({
  cards = defaultCards,
  cardWidth = 340,
  cardHeight = 460,
}) {
  const [stack, setStack] = useState(cards.map((c, i) => ({ ...c, _key: i })));
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [thrown, setThrown] = useState(null); // 'left' | 'right'
  const startPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const topCard = stack[stack.length - 1];
  const SWIPE_THRESHOLD = 80;

  const onStart = (clientX, clientY) => {
    setDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };
  const onMove = (clientX, clientY) => {
    if (!dragging) return;
    setDragX(clientX - startPos.current.x);
    setDragY(clientY - startPos.current.y);
  };
  const onEnd = () => {
    if (!dragging) return;
    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      const dir = dragX > 0 ? "right" : "left";
      setThrown(dir);
      setTimeout(() => {
        setStack(prev => {
          const next = [...prev];
          next.pop();
          return next;
        });
        setThrown(null);
        setDragX(0);
        setDragY(0);
      }, 420);
    } else {
      setDragX(0);
      setDragY(0);
    }
    setDragging(false);
  };

  const skipCard = (dir) => {
    setDragging(false);
    setDragX(dir === "right" ? 150 : -150);
    setDragY(-30);
    setThrown(dir);
    setTimeout(() => {
      setStack(prev => { const n = [...prev]; n.pop(); return n; });
      setThrown(null);
      setDragX(0);
      setDragY(0);
    }, 420);
  };

  const reset = () => setStack(cards.map((c, i) => ({ ...c, _key: i })));

  const getCardTransform = (i, total) => {
    const posFromTop = total - 1 - i;
    if (posFromTop === 0) {
      // Top card
      let tx = dragging || thrown ? dragX : 0;
      let ty = dragging || thrown ? dragY * 0.3 : 0;
      if (thrown === "left") tx = -500;
      if (thrown === "right") tx = 500;
      const rot = tx * 0.12;
      return { tx, ty, rot, scale: 1, zIndex: total + 10, opacity: 1 };
    }
    const offset = Math.min(posFromTop, 4);
    const dragEffect = dragging ? Math.abs(dragX) / SWIPE_THRESHOLD : 0;
    const scale = 1 - offset * 0.055 + dragEffect * 0.02 * (offset === 1 ? 1 : 0);
    const ty = offset * 16 - dragEffect * 8 * (offset === 1 ? 1 : 0);
    return { tx: 0, ty, rot: 0, scale: Math.max(0.7, scale), zIndex: total - posFromTop, opacity: offset > 3 ? 0 : 1 };
  };

  if (stack.length === 0) return (
    <section style={{ minHeight: "100vh", background: "#08080f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
      <div style={{ fontSize: 60 }}>🎉</div>
      <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>You've seen them all!</h2>
      <button onClick={reset} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 50, padding: "14px 36px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>Shuffle Again</button>
    </section>
  );

  return (
    <section style={{ minHeight: "100vh", background: "#08080f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", userSelect: "none", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Swipe Cards</span>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 900, marginTop: 8, fontFamily: "'Georgia',serif", letterSpacing: "-0.03em" }}>Drag to Explore</h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 6 }}>{stack.length} cards remaining</p>
      </div>

      {/* Stack */}
      <div style={{ position: "relative", width: cardWidth, height: cardHeight, marginBottom: 40 }}>
        {stack.map((card, i) => {
          const { tx, ty, rot, scale, zIndex, opacity } = getCardTransform(i, stack.length);
          const isTop = i === stack.length - 1;
          const swipeIndicator = isTop && Math.abs(dragX) > 30;
          const swipeDir = dragX > 0 ? "right" : "left";

          return (
            <div
              key={card._key}
              ref={isTop ? cardRef : null}
              onMouseDown={isTop ? (e) => onStart(e.clientX, e.clientY) : undefined}
              onMouseMove={isTop ? (e) => onMove(e.clientX, e.clientY) : undefined}
              onMouseUp={isTop ? onEnd : undefined}
              onMouseLeave={isTop ? onEnd : undefined}
              onTouchStart={isTop ? (e) => onStart(e.touches[0].clientX, e.touches[0].clientY) : undefined}
              onTouchMove={isTop ? (e) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); } : undefined}
              onTouchEnd={isTop ? onEnd : undefined}
              style={{
                position: "absolute", width: cardWidth, height: cardHeight,
                borderRadius: 24, overflow: "hidden",
                transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`,
                zIndex,
                opacity,
                cursor: isTop ? (dragging ? "grabbing" : "grab") : "default",
                transition: dragging || thrown ? (thrown ? "transform 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.4s" : "none") : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                boxShadow: isTop ? "0 30px 80px rgba(0,0,0,0.6)" : "0 10px 40px rgba(0,0,0,0.4)",
                willChange: "transform",
              }}
            >
              <img src={card.image} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />

              {/* Swipe indicators */}
              {isTop && swipeIndicator && (
                <>
                  <div style={{ position: "absolute", top: 24, left: 24, background: "#10b981", color: "#fff", fontWeight: 900, fontSize: 18, padding: "8px 18px", borderRadius: 8, border: "3px solid #fff", opacity: swipeDir === "right" ? Math.min(1, (dragX - 30) / 80) : 0, transform: "rotate(-15deg)", letterSpacing: "0.1em" }}>LIKE ♥</div>
                  <div style={{ position: "absolute", top: 24, right: 24, background: "#ef4444", color: "#fff", fontWeight: 900, fontSize: 18, padding: "8px 18px", borderRadius: 8, border: "3px solid #fff", opacity: swipeDir === "left" ? Math.min(1, (-dragX - 30) / 80) : 0, transform: "rotate(15deg)", letterSpacing: "0.1em" }}>SKIP ✕</div>
                </>
              )}

              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#000", flexShrink: 0 }}>{card.avatar}</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: 15, fontWeight: 800 }}>{card.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{card.role} · {card.company}</div>
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>"{card.quote}"</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <button onClick={() => skipCard("left")} style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.4)", color: "#ef4444", fontSize: 22, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
        >✕</button>
        <button onClick={reset} style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontSize: 16, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          title="Reset"
        >↺</button>
        <button onClick={() => skipCard("right")} style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.4)", color: "#10b981", fontSize: 22, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.1)"}
        >♥</button>
      </div>
    </section>
  );
}
