"use client";

/**
 * Gen Z Pulse — SwipeFeed v3
 * Fixed: card stays mid-air on dismiss, opacity flicker, drag fighting animation,
 *        buttons not clickable during transition, index desync
 */

import {
  motion, AnimatePresence,
  useMotionValue, useTransform,
  type PanInfo,
} from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORIES, getArcById, type Story } from "@/data/stories";
import AISummaryModal from "@/components/ui/AISummaryModal";

// ─── COLORS ──────────────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  breaking: "#FF2D55", developing: "#F59E0B", tech: "#3B82F6",
  politics: "#7C3AED", world: "#10F5A0", campus: "#F97316",
  finance: "#10F5A0", climate: "#06B6D4",
};
const LEAN_COLOR: Record<string, string> = {
  left: "#3B82F6", center: "#10F5A0", right: "#EF4444", none: "#64748B",
};

// ─── BOTTOM SHEET ────────────────────────────────────────────
function DepthSheet({ story, onClose, onAISummary }: { story: Story; onClose: () => void; onAISummary: (story: Story) => void }) {
  const [tab, setTab] = useState<"context" | "dive" | "act">("context");
  const arc = story.arcId ? getArcById(story.arcId) : null;
  const color = CAT_COLOR[story.category] || "#FF2D55";

  const TABS = [
    { key: "context" as const, label: "Context",  icon: "📖" },
    { key: "dive"    as const, label: "Deep Dive", icon: "🔬" },
    { key: "act"     as const, label: "Act On It", icon: "⚡" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "#111118",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "22px 22px 0 0",
          maxHeight: "82dvh",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Handle */}
        <div style={{ padding: "14px 0 8px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Headline */}
        <div style={{ padding: "4px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0 }}>
          <div style={{ flex: 1, paddingRight: 10 }}>
            <span style={{
              display: "block", marginBottom: 6,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase", color,
            }}>
              {story.category.toUpperCase()}
            </span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: "clamp(0.95rem, 3vw, 1.2rem)", lineHeight: 1.3, color: "#F8F8FF",
            }}>
              {story.headline}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
              width: 32, height: 32, cursor: "pointer", color: "#94A3B8", fontSize: 15,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 8, padding: "0 20px 12px", flexWrap: "wrap", flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
            color: story.credibilityScore >= 8 ? "#10F5A0" : "#F59E0B",
            background: story.credibilityScore >= 8 ? "rgba(16,245,160,0.1)" : "rgba(245,158,11,0.1)",
            padding: "4px 10px", borderRadius: 20,
          }}>✓ {story.credibilityScore}/10 credibility</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
            color: LEAN_COLOR[story.politicalLean], background: "rgba(255,255,255,0.05)",
            padding: "4px 10px", borderRadius: 20,
          }}>
            {story.politicalLean === "none" ? "Apolitical" : `${story.politicalLean} lean`}
          </span>
          {arc && (
            <Link href={`/arc/${story.arcId}`} onClick={onClose} style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                color: "#A78BFA", background: "rgba(124,58,237,0.15)",
                padding: "4px 10px", borderRadius: 20, cursor: "pointer",
              }}>🧵 Arc: {arc.currentStage}</span>
            </Link>
          )}
        </div>

        {/* Tab pills */}
        <div style={{
          display: "flex", gap: 8, padding: "0 20px 14px",
          overflowX: "auto", scrollbarWidth: "none", flexShrink: 0,
        }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
                padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                flexShrink: 0, transition: "all 0.18s ease",
                background: tab === t.key ? color : "rgba(255,255,255,0.07)",
                color: tab === t.key ? "#fff" : "#94A3B8",
                boxShadow: tab === t.key ? `0 0 14px ${color}55` : "none",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
          {tab === "context" && (
            <motion.div key="context" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
              <div style={{
                background: `${color}10`, border: `1px solid ${color}22`,
                borderRadius: 12, padding: "14px", marginBottom: 14,
              }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, color, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Why This Matters
                </p>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, lineHeight: 1.65, color: "#F8F8FF" }}>
                  {story.whyItMatters}
                </p>
              </div>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, lineHeight: 1.72, color: "#94A3B8", marginBottom: 16 }}>
                {story.context}
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>⚠ What Happens Next</p>
              {story.consequences.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ color: "#FF2D55", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                  <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.55 }}>{c}</p>
                </div>
              ))}
              <div style={{ height: 20 }} />
            </motion.div>
          )}
          {tab === "dive" && (
            <motion.div key="dive" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, lineHeight: 1.78, color: "#94A3B8", whiteSpace: "pre-line" }}>
                {story.deepDive}
              </p>
              <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 18px",
                    borderRadius: 12,
                    background: "rgba(59,130,246,0.18)",
                    border: "1px solid rgba(59,130,246,0.45)",
                    color: "#93C5FD",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>📰 Full Article on {story.source}</span>
                  <span>↗</span>
                </a>
                <a
                  href={`https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#CBD5E1",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>🔍 Google News</span>
                  <span>↗</span>
                </a>
              </div>
              <div style={{ height: 20 }} />
            </motion.div>
          )}
          {tab === "act" && (
            <motion.div key="act" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {story.actionPathways.map((p, i) => {
                  const icons: Record<string, string> = { learn: "📖", career: "💼", act: "⚡" };
                  const clr: Record<string, string> = { learn: "#3B82F6", career: "#7C3AED", act: "#10F5A0" };
                  const c = clr[p.type] || "#FF2D55";
                  return (
                    <a key={i} href={p.url || "#"} target={p.url ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        background: `${c}11`, border: `1px solid ${c}30`,
                        borderRadius: 12, padding: "14px", textDecoration: "none",
                      }}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{icons[p.type]}</span>
                      <div>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F8F8FF", marginBottom: 3 }}>{p.label}</p>
                        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>{p.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div style={{ height: 20 }} />
            </motion.div>
          )}
        </div>

        {/* Action bar */}
        <div style={{
          padding: "14px 20px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: 8, flexShrink: 0,
        }}>
          <Link href={`/story/${story.id}`} style={{ flex: 1, textDecoration: "none" }} onClick={onClose}>
            <button style={{
              width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 13, padding: "13px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
              color: "#F8F8FF", cursor: "pointer",
            }}>Read Story →</button>
          </Link>
          <button
            onClick={() => {
              onClose();
              onAISummary(story);
            }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
              padding: "13px 14px", borderRadius: 12,
              border: "1px solid rgba(167,139,250,0.45)",
              background: "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(236,72,153,0.35))",
              color: "#E9D5FF", cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span>✨ AI Summary</span>
          </button>
          <a
            href={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
              padding: "13px 14px", borderRadius: 12, border: "1px solid rgba(59,130,246,0.35)",
              background: "rgba(59,130,246,0.12)", color: "#93C5FD", cursor: "pointer", flexShrink: 0,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span>Full Article</span>
            <span>↗</span>
          </a>
          <button
            onClick={async () => {
              const text = `${story.headline}\n\n${story.summary}\n\nVia Gen Z Pulse 🧠`;
              try {
                if (navigator.share) await navigator.share({ title: story.headline, text });
                else { await navigator.clipboard.writeText(text); }
              } catch { /* user cancelled */ }
            }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
              padding: "13px 16px", borderRadius: 12, border: "none",
              background: "#25D366", color: "#fff", cursor: "pointer", flexShrink: 0,
            }}
          >📤 Share</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── INDIVIDUAL CARD ─────────────────────────────────────────
// Architecture: TWO separate layers
//   Layer 1 (z:1) — motion.div with drag="y" — ONLY the background image
//   Layer 2 (z:2) — plain div — content panel with buttons (NOT draggable)
// This ensures Framer Motion's pointer capture never blocks button clicks.
function Card({
  story, onSwipeUp, onSwipeDown, onExpand, onAISummary,
}: {
  story: Story;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onExpand: () => void;
  onAISummary: () => void;
}) {
  const y = useMotionValue(0);
  const bgOpacity = useTransform(y, [-140, 0, 140], [0.2, 1, 0.2]);
  const color = CAT_COLOR[story.category] || "#FF2D55";
  const [imgErr, setImgErr] = useState(false);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const THRESHOLD = 52;
    const VELOCITY  = 380;
    if (info.offset.y < -THRESHOLD || info.velocity.y < -VELOCITY)      onSwipeUp();
    else if (info.offset.y > THRESHOLD || info.velocity.y > VELOCITY)   onSwipeDown();
    else y.set(0); // spring back
  };

  return (
    /* Outer wrapper: static, clips both layers */
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

      {/* ── LAYER 1: Draggable image ── */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.38, bottom: 0.38 }}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        style={{
          position: "absolute", inset: 0,
          y,
          opacity: bgOpacity,
          touchAction: "none",
          cursor: "grab",
          zIndex: 1,
        }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Background image */}
        {!imgErr ? (
          <Image
            src={story.imageUrl}
            alt={story.headline}
            fill
            style={{ objectFit: "cover" }}
            onError={() => setImgErr(true)}
            priority
            unoptimized
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, ${color}44 0%, #0A0A0F 100%)`,
          }} />
        )}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 28%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.95) 82%, #000 100%)",
        }} />
      </motion.div>

      {/* ── LAYER 2: Static content — fully clickable ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        pointerEvents: "none", // transparent to drags by default
      }}>
        {/* Top badges — no clicks needed */}
        <div style={{
          position: "absolute", top: 16, left: 16, right: 62,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#fff", background: color, padding: "5px 12px", borderRadius: 7,
          }}>
            {story.category === "breaking" ? "🔴 " : ""}{story.category.toUpperCase()}
          </span>
          <span style={{
            fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)",
            background: "rgba(0,0,0,0.45)", padding: "5px 12px", borderRadius: 7,
            backdropFilter: "blur(8px)",
          }}>
            {story.time}
          </span>
        </div>

        {story.isBlindspot && (
          <div style={{
            position: "absolute", top: 56, left: 16,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10,
            color: "#F59E0B", background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(245,158,11,0.4)",
            padding: "4px 10px", borderRadius: 7,
          }}>📍 Outside Your Bubble</div>
        )}

        {/* Bottom content — re-enable pointer events here */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 16px 80px",
          pointerEvents: "auto", // clicks work inside this div
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
            <a
              href={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#60A5FA",
                display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none",
              }}
            >
              <span style={{ fontWeight: 600 }}>{story.source}</span>
              <span style={{ fontSize: 10 }}>↗</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>· {story.readTime} min read</span>
            </a>
            {story.sourceUrl && (
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700,
                  color: "#93C5FD", background: "rgba(59,130,246,0.18)",
                  border: "1px solid rgba(59,130,246,0.35)", padding: "3px 8px", borderRadius: 6,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3,
                }}
              >
                <span>Full Article</span>
                <span>↗</span>
              </a>
            )}
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.05rem, 4vw, 1.4rem)", lineHeight: 1.25,
            color: "#fff", marginBottom: 10,
            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
          }}>
            {story.headline}
          </h2>
          <p style={{
            fontFamily: "'Epilogue', sans-serif", fontSize: 14, lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)", marginBottom: 12,
          }}>
            {story.summary}
          </p>

          {/* Meta pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
              color: story.credibilityScore >= 8 ? "#10F5A0" : "#F59E0B",
              background: "rgba(0,0,0,0.55)", padding: "4px 10px", borderRadius: 7,
              backdropFilter: "blur(4px)",
            }}>✓ {story.credibilityScore}/10</span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
              color: LEAN_COLOR[story.politicalLean],
              background: "rgba(0,0,0,0.55)", padding: "4px 10px", borderRadius: 7,
              backdropFilter: "blur(4px)",
            }}>
              {story.politicalLean === "none" ? "Apolitical" : story.politicalLean}
            </span>
            {story.arcId && (
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                color: "#A78BFA", background: "rgba(0,0,0,0.55)",
                padding: "4px 10px", borderRadius: 7, backdropFilter: "blur(4px)",
              }}>🧵 Arc</span>
            )}
          </div>

          {/* ACTION BUTTONS — fully isolated from drag layer */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={onExpand}
              style={{
                flex: 1, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 14, padding: "14px 10px", borderRadius: 12, border: "none",
                background: color, color: "#fff", cursor: "pointer",
                boxShadow: `0 4px 20px ${color}55`,
                WebkitTapHighlightColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              Go Deeper ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAISummary();
              }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 13, padding: "14px 14px", borderRadius: 12,
                background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                display: "flex", alignItems: "center", gap: 6,
                WebkitTapHighlightColor: "transparent",
                flexShrink: 0,
              }}
            >
              <span>✨ AI Summary</span>
            </button>
            <button
              onClick={async () => {
                const text = `${story.headline}\n\n${story.summary}\n\nVia Gen Z Pulse 🧠`;
                try {
                  if (navigator.share) await navigator.share({ title: story.headline, text });
                  else await navigator.clipboard.writeText(text);
                } catch { /* cancelled */ }
              }}
              style={{
                width: 48, height: 48, borderRadius: 12, border: "none",
                background: "#25D366", cursor: "pointer", fontSize: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, WebkitTapHighlightColor: "transparent",
              }}
            >📤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function SwipeFeed({ stories = STORIES }: { stories?: Story[] }) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState<Story | null>(null);
  const [aiSummaryStory, setAiSummaryStory] = useState<Story | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goNext = useCallback(() => {
    if (transitioning) return;
    setIdx((i) => {
      if (i >= stories.length - 1) return i;
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 380);
      return i + 1;
    });
  }, [stories.length, transitioning]);

  const goPrev = useCallback(() => {
    if (transitioning) return;
    setIdx((i) => {
      if (i <= 0) return i;
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 380);
      return i - 1;
    });
  }, [transitioning]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp")   goNext();
      if (e.key === "ArrowDown") goPrev();
      if (e.key === "Escape")    setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const story = stories[idx];
  const color = CAT_COLOR[story?.category] || "#FF2D55";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#000", overflow: "hidden" }}>

      {/* AnimatePresence handles mount/unmount transitions */}
      <AnimatePresence mode="wait">
        <Card
          key={story.id}
          story={story}
          onSwipeUp={goNext}
          onSwipeDown={goPrev}
          onExpand={() => setExpanded(story)}
          onAISummary={() => setAiSummaryStory(story)}
        />
      </AnimatePresence>

      {/* Progress dots */}
      <div style={{
        position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 5, zIndex: 50, pointerEvents: "none",
      }}>
        {stories.map((_, i) => (
          <div key={i} style={{
            height: 4, borderRadius: 2, transition: "all 0.3s ease",
            width: i === idx ? 22 : 5,
            background: i === idx ? color : "rgba(255,255,255,0.28)",
          }} />
        ))}
      </div>

      {/* Counter */}
      <div style={{
        position: "absolute", bottom: 72, left: 16, zIndex: 50,
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12,
        color: "rgba(255,255,255,0.35)", pointerEvents: "none",
      }}>
        {idx + 1} / {stories.length}
      </div>

      {/* Arrow nav (desktop) */}
      <div style={{
        position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 8, zIndex: 50,
      }}>
        {[
          { label: "↑", action: goPrev, disabled: idx === 0 },
          { label: "↓", action: goNext, disabled: idx === stories.length - 1 },
        ].map(({ label, action, disabled }) => (
          <motion.button
            key={label}
            onClick={action}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.88 } : {}}
            disabled={disabled}
            style={{
              width: 38, height: 38, borderRadius: 10, border: "none",
              background: disabled ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.14)",
              color: disabled ? "rgba(255,255,255,0.18)" : "#fff",
              cursor: disabled ? "default" : "pointer", fontSize: 15,
              backdropFilter: "blur(8px)",
            }}
          >{label}</motion.button>
        ))}
      </div>

      {/* First-load swipe hint */}
      {idx === 0 && (
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          style={{
            position: "absolute", top: "45%", left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            zIndex: 5, pointerEvents: "none",
          }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: 3, duration: 0.9, ease: "easeInOut" }}
            style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}
          >↑</motion.div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
            color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase",
          }}>Swipe up for next</span>
        </motion.div>
      )}

      {/* Depth sheet */}
      <AnimatePresence>
        {expanded && (
          <DepthSheet
            story={expanded}
            onClose={() => setExpanded(null)}
            onAISummary={(st) => setAiSummaryStory(st)}
          />
        )}
      </AnimatePresence>

      {/* AI Summary Modal */}
      <AISummaryModal
        story={aiSummaryStory}
        isOpen={!!aiSummaryStory}
        onClose={() => setAiSummaryStory(null)}
      />
    </div>
  );
}
