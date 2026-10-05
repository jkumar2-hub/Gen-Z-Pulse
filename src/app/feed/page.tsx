"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { PageTransition, PulseBadge, springs } from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";
import SwipeFeed from "@/components/feed/SwipeFeed";
import AISummaryModal from "@/components/ui/AISummaryModal";
import { STORIES, type Story } from "@/data/stories";

export default function FeedPage() {
  const [viewMode, setViewMode] = useState<"swipe" | "list">("swipe");
  const [selectedAIStory, setSelectedAIStory] = useState<Story | null>(null);

  return (
    <PageTransition pageKey="feed">
      <div style={{ height: "100dvh", background: "#0A0A0F", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── TOP NAV ── */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.smooth}
          style={{
            flexShrink: 0,
            background: "rgba(10,10,15,0.95)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F8F8FF" }}>
                Gen G <span style={{ color: "#FF2D55" }}>Pulse</span>
              </span>
            </Link>
            <PulseBadge label="LIVE" />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* View toggle */}
            <div style={{
              display: "flex", background: "rgba(255,255,255,0.05)",
              borderRadius: 10, padding: 3, gap: 2,
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {(["swipe", "list"] as const).map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                    padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                    background: viewMode === mode ? "#FF2D55" : "transparent",
                    color: viewMode === mode ? "#fff" : "#475569",
                    transition: "all 0.18s ease",
                  }}
                >
                  {mode === "swipe" ? "↕ Swipe" : "≡ List"}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* ── FEED AREA ── */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {viewMode === "swipe" ? (
              <motion.div
                key="swipe"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <SwipeFeed stories={STORIES} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={springs.smooth}
                style={{ position: "absolute", inset: 0, overflowY: "auto", padding: "14px 16px 100px" }}
              >
                <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
                  {STORIES.map((story, i) => {
                    const catColor: Record<string, string> = {
                      breaking: "#FF2D55", tech: "#3B82F6", campus: "#F97316",
                      world: "#10F5A0", finance: "#10F5A0", climate: "#06B6D4", politics: "#7C3AED",
                    };
                    const c = catColor[story.category] || "#FF2D55";
                    return (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 14, padding: "16px",
                          display: "flex", flexDirection: "column", gap: 10,
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{
                            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10,
                            letterSpacing: "0.1em", textTransform: "uppercase", color: c,
                          }}>{story.category === "breaking" ? "🔴 " : ""}{story.category}</span>
                          <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#475569" }}>{story.time}</span>
                        </div>

                        <Link href={`/story/${story.id}`} style={{ textDecoration: "none" }}>
                          <p style={{
                            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15,
                            color: "#F8F8FF", lineHeight: 1.35, marginBottom: 6,
                          }}>
                            {story.headline}
                          </p>
                          <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.55 }}>
                            {story.summary}
                          </p>
                        </Link>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#64748B" }}>
                              {story.source} · {story.readTime} min
                            </span>
                            {story.isBlindspot && (
                              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: "#F59E0B" }}>📍 Blindspot</span>
                            )}
                            {story.arcId && (
                              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: "#A78BFA" }}>🧵 Arc</span>
                            )}
                          </div>

                          {/* Action pills */}
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <button
                              onClick={() => setSelectedAIStory(story)}
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                                padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(167,139,250,0.4)",
                                background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.25))",
                                color: "#E9D5FF", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4,
                              }}
                            >
                              <span>✨ AI Summary</span>
                            </button>
                            <a
                              href={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
                                padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(59,130,246,0.35)",
                                background: "rgba(59,130,246,0.12)", color: "#93C5FD", textDecoration: "none",
                                display: "inline-flex", alignItems: "center", gap: 4,
                              }}
                            >
                              <span>Full Article</span>
                              <span>↗</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Summary Modal */}
        <AISummaryModal
          story={selectedAIStory}
          isOpen={!!selectedAIStory}
          onClose={() => setSelectedAIStory(null)}
        />

        <BottomNav active="feed" />
      </div>
    </PageTransition>
  );
}
