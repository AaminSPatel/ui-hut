"use client";
import { useState, useRef, useCallback } from "react";

const defaultPages = [
  { id: 1, leftBg: "#1a0a00", rightBg: "#0d0015", leftImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80", rightImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&q=80", leftTitle: "Chapter One", leftText: "The ancient art of storytelling began long before written language — in firelight and shadow, in gesture and breath.", rightTitle: "The Beginning", rightText: "Every great narrative starts with a single question: What if? Two words that have launched a thousand worlds.", leftPage: "02", rightPage: "03" },
  { id: 2, leftBg: "#00100a", rightBg: "#001018", leftImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80", rightImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", leftTitle: "Chapter Two", leftText: "Rising action builds tension the way storms build on the horizon — slowly, inevitably, beautifully terrifying.", rightTitle: "The Climb", rightText: "Conflict is not the enemy of story. It is the story. Without friction, there is no forward motion.", leftPage: "04", rightPage: "05" },
  { id: 3, leftBg: "#100010", rightBg: "#100005", leftImage: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80", rightImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80", leftTitle: "Chapter Three", leftText: "The climax is a promise kept — every thread of tension finally meeting at a single, perfect point of release.", rightTitle: "The Peak", rightText: "Great endings don't surprise. They feel inevitable in retrospect, as though they could not have been otherwise.", leftPage: "06", rightPage: "07" },
];

export default function Carousel12({ pages = defaultPages, bookW = 700, bookH = 440 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null); // 'next' | 'prev'
  const total = pages.length;

  const flip = useCallback((dir) => {
    if (flipping) return;
    if (dir === "next" && currentPage >= total - 1) return;
    if (dir === "prev" && currentPage <= 0) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage(p => p + (dir === "next" ? 1 : -1));
      setFlipping(false);
      setFlipDir(null);
    }, 700);
  }, [flipping, currentPage, total]);

  const page = pages[currentPage];

  const HALF = bookW / 2;

  return (
    <section style={{ minHeight: "100vh", background: "#0a0609", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", fontFamily: "system-ui,sans-serif", padding: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Interactive Book</span>
        <h2 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, fontFamily: "'Georgia',serif", letterSpacing: "-0.03em", marginTop: 8 }}>
          Turn the <em style={{ color: "#d97706", fontStyle: "italic" }}>Pages</em>
        </h2>
      </div>

      {/* Book */}
      <div style={{ perspective: 1800, marginBottom: 40 }}>
        <div style={{
          width: bookW,
          height: bookH,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(8deg)",
          maxWidth: "calc(100vw - 40px)",
          boxShadow: "0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
          borderRadius: 4,
        }}>
          {/* Left page */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: HALF, height: bookH,
            borderRadius: "4px 0 0 4px",
            overflow: "hidden",
            background: page.leftBg,
            borderRight: "1px solid rgba(0,0,0,0.5)",
          }}>
            <img src={page.leftImage} alt="" style={{ width: "100%", height: "50%", objectFit: "cover", opacity: 0.5 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.7) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>{page.leftTitle}</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.8, fontStyle: "italic" }}>{page.leftText}</p>
            </div>
            {/* Page number */}
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 700 }}>{page.leftPage}</div>
            {/* Spine shadow */}
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 20, background: "linear-gradient(to left,rgba(0,0,0,0.4),transparent)" }} />
          </div>

          {/* Right page */}
          <div style={{
            position: "absolute", right: 0, top: 0,
            width: HALF, height: bookH,
            borderRadius: "0 4px 4px 0",
            overflow: "hidden",
            background: page.rightBg,
          }}>
            <img src={page.rightImage} alt="" style={{ width: "100%", height: "50%", objectFit: "cover", opacity: 0.5 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.7) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>{page.rightTitle}</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.8, fontStyle: "italic" }}>{page.rightText}</p>
            </div>
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 700 }}>{page.rightPage}</div>
            {/* Spine shadow */}
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 20, background: "linear-gradient(to right,rgba(0,0,0,0.4),transparent)" }} />
          </div>

          {/* Book spine */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 4, marginLeft: -2, background: "linear-gradient(to right,#000,#1a1a1a,#000)", zIndex: 5 }} />

          {/* Flip animation overlay */}
          {flipping && (
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              [flipDir === "next" ? "right" : "left"]: 0,
              width: HALF,
              transformOrigin: flipDir === "next" ? "left" : "right",
              animation: flipDir === "next" ? "flipPageNext 0.7s cubic-bezier(0.23,1,0.32,1) both" : "flipPagePrev 0.7s cubic-bezier(0.23,1,0.32,1) both",
              background: "linear-gradient(135deg,#1a1010,#0a0505)",
              borderRadius: flipDir === "next" ? "0 4px 4px 0" : "4px 0 0 4px",
              zIndex: 10,
              boxShadow: "inset -10px 0 30px rgba(0,0,0,0.5)",
              backfaceVisibility: "hidden",
            }} />
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button
          onClick={() => flip("prev")}
          disabled={current <= 0 || flipping}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: current <= 0 ? "rgba(255,255,255,0.2)" : "#fff", borderRadius: 50, padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: current <= 0 ? "not-allowed" : "pointer", transition: "all 0.3s", letterSpacing: "0.04em" }}
        >← Previous</button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {pages.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === current ? "#d97706" : "rgba(255,255,255,0.2)", transition: "all 0.3s", transform: i === current ? "scale(1.4)" : "scale(1)" }} />
          ))}
        </div>

        <button
          onClick={() => flip("next")}
          disabled={current >= total - 1 || flipping}
          style={{ background: current >= total - 1 ? "rgba(255,255,255,0.04)" : "#d97706", border: "none", color: current >= total - 1 ? "rgba(255,255,255,0.2)" : "#000", borderRadius: 50, padding: "12px 28px", fontSize: 13, fontWeight: 800, cursor: current >= total - 1 ? "not-allowed" : "pointer", transition: "all 0.3s", letterSpacing: "0.04em" }}
        >Next →</button>
      </div>

      <style>{`
        @keyframes flipPageNext {
          from { transform: perspective(1200px) rotateY(0deg); }
          50% { transform: perspective(1200px) rotateY(-90deg); opacity:0.5; }
          to { transform: perspective(1200px) rotateY(-180deg); opacity:0; }
        }
        @keyframes flipPagePrev {
          from { transform: perspective(1200px) rotateY(0deg); }
          50% { transform: perspective(1200px) rotateY(90deg); opacity:0.5; }
          to { transform: perspective(1200px) rotateY(180deg); opacity:0; }
        }
      `}</style>
    </section>
  );
}
