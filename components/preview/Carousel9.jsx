"use client";
import { useState, useRef } from "react";

const defaultProjects = [
  { id: 1, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80", title: "Prisma UI", tag: "Web Design", year: "2024", client: "Tech Corp", role: "Lead Designer", desc: "A comprehensive design system built for scale — 200+ components, dark/light modes, and a11y baked in from day one.", awards: ["Awwwards SOTD", "CSS Design Awards"], color: "#818cf8" },
  { id: 2, image: "https://images.unsplash.com/photo-1558618047-f1de3a9c0eb3?w=900&q=80", title: "Orbis App", tag: "Mobile", year: "2024", client: "Orbis Inc", role: "UX Lead", desc: "A fintech mobile app redesign that increased conversion by 340% through ruthless UX simplification and motion design.", awards: ["Apple Design Award"], color: "#34d399" },
  { id: 3, image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&q=80", title: "Nova Brand", tag: "Branding", year: "2023", client: "Nova Labs", role: "Art Director", desc: "Complete brand identity for an AI startup — logo, typography system, brand voice, and motion guidelines.", awards: ["D&AD Wood Pencil"], color: "#f59e0b" },
  { id: 4, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80", title: "Retro OS", tag: "Concept", year: "2023", client: "Personal", role: "Creator", desc: "A nostalgic but functional OS concept built with web tech — full window management, apps, and a pixel-perfect aesthetic.", awards: ["Trending on Dribbble"], color: "#f472b6" },
];

export default function Carousel9({ projects = defaultProjects }) {
  const [expanded, setExpanded] = useState(null);
  const [active, setActive] = useState(0);

  const CARD_W = 220;
  const CARD_H = 300;
  const GAP = 20;

  return (
    <section style={{ minHeight: "100vh", background: "#050509", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", fontFamily: "system-ui,sans-serif", padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Selected Work</span>
        <h2 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, fontFamily: "'Georgia',serif", letterSpacing: "-0.03em", marginTop: 8 }}>
          Click to <em style={{ color: projects[active]?.color, fontStyle: "italic", transition: "color 0.4s" }}>Expand</em>
        </h2>
      </div>

      <div style={{ position: "relative", display: "flex", gap: GAP, perspective: 1000, transformStyle: "preserve-3d" }}>
        {projects.map((project, i) => {
          const isExpanded = expanded === project.id;
          const isActive = active === i;
          const diff = i - active;

          return (
            <div
              key={project.id}
              onClick={() => { setActive(i); setExpanded(isExpanded ? null : project.id); }}
              style={{
                position: "relative",
                width: isExpanded ? Math.min(700, typeof window !== 'undefined' ? window.innerWidth - 40 : 700) : CARD_W,
                height: isExpanded ? 420 : CARD_H,
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.65s cubic-bezier(0.23,1,0.32,1)",
                transform: `translateZ(${isActive && !isExpanded ? 30 : 0}px) rotateY(${!isExpanded && diff !== 0 ? diff * -8 : 0}deg)`,
                boxShadow: isExpanded ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${project.color}40` : isActive ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.3)",
                filter: expanded && !isExpanded ? "brightness(0.3)" : "brightness(1)",
                zIndex: isExpanded ? 10 : isActive ? 5 : 1,
              }}
            >
              <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)", transform: isExpanded ? "scale(1.05)" : "scale(1)" }} />
              <div style={{ position: "absolute", inset: 0, background: isExpanded ? "linear-gradient(to right,rgba(0,0,0,0.92) 45%,rgba(0,0,0,0.2) 100%)" : "linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.15) 60%)" }} />

              {/* Collapsed state */}
              {!isExpanded && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
                  <div style={{ width: 30, height: 3, background: project.color, borderRadius: 2, marginBottom: 10 }} />
                  <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{project.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{project.tag}</div>
                </div>
              )}

              {/* Expanded state */}
              {isExpanded && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "36px 40px", animation: "expandIn 0.4s 0.2s both" }}>
                  <div style={{ maxWidth: 380 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                      <span style={{ background: project.color, color: "#000", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>{project.tag}</span>
                      <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>{project.year}</span>
                    </div>
                    <h3 style={{ color: "#fff", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, fontFamily: "'Georgia',serif", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 16 }}>{project.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{project.desc}</p>
                    <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                      <div><div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Client</div><div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{project.client}</div></div>
                      <div><div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Role</div><div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{project.role}</div></div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                      {project.awards.map((a, idx) => (
                        <span key={idx} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: 11, padding: "4px 12px", borderRadius: 20 }}>🏆 {a}</span>
                      ))}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); }} style={{ background: project.color, color: "#000", border: "none", borderRadius: 50, padding: "12px 28px", fontSize: 13, fontWeight: 800, cursor: "pointer", letterSpacing: "0.04em" }}>View Project →</button>
                  </div>
                </div>
              )}

              {/* Close btn */}
              {isExpanded && (
                <button onClick={(e) => { e.stopPropagation(); setExpanded(null); }} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Nav dots */}
      <div style={{ display: "flex", gap: 10, marginTop: 40 }}>
        {projects.map((p, i) => (
          <button key={i} onClick={() => { setActive(i); setExpanded(null); }} style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? projects[active].color : "rgba(255,255,255,0.2)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.4s" }} />
        ))}
      </div>
      <style>{`@keyframes expandIn { from{opacity:0;transform:translateX(-20px);} to{opacity:1;transform:translateX(0);} }`}</style>
    </section>
  );
}
