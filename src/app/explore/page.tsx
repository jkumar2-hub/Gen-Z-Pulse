"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { STORIES, CATEGORIES, getBlindspotStories, type StoryCategory } from "@/data/stories";
import { StoryCard, PageTransition, springs } from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";

function CategoryPill({
  label, color, active, onClick,
}: { label: string; color: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={springs.snappy}
      style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase",
        padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer",
        background: active ? color : "rgba(255,255,255,0.05)",
        color: active ? "#fff" : "#94A3B8",
        boxShadow: active ? `0 0 16px rgba(${color === "#FF2D55" ? "255,45,85" : color === "#3B82F6" ? "59,130,246" : color === "#10F5A0" ? "16,245,160" : color === "#7C3AED" ? "124,58,237" : "245,158,11"}, 0.35)` : "none",
        transition: "background 0.2s ease, color 0.2s ease",
        flexShrink: 0,
      }}
    >
      {label}
    </motion.button>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.smooth}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "10px 16px",
        marginBottom: 20,
      }}
    >
      <span style={{ color: "#475569", fontSize: 16 }}>🔍</span>
      <input
        type="text"
        placeholder="Search stories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1, background: "none", border: "none", outline: "none",
          fontFamily: "'Epilogue', sans-serif", fontSize: 15,
          color: "#F8F8FF",
        }}
      />
      {value && (
        <motion.button
          onClick={() => onChange("")}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 14 }}
        >
          ✕
        </motion.button>
      )}
    </motion.div>
  );
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState<StoryCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlindspot, setShowBlindspot] = useState(false);

  const filtered = STORIES.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch = !searchQuery ||
      s.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBlindspot = !showBlindspot || s.isBlindspot;
    return matchCat && matchSearch && matchBlindspot;
  });

  return (
    <PageTransition pageKey="explore">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 80 }}>

        {/* Header */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.smooth}
          style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,10,15,0.9)", backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 20px",
          }}
        >
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20,
            color: "#F8F8FF", marginBottom: 0,
          }}>
            Explore
          </h1>
        </motion.header>

        <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px" }}>

          {/* Search */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Blindspot toggle */}
          <motion.button
            onClick={() => setShowBlindspot(!showBlindspot)}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{
              width: "100%", marginBottom: 20,
              background: showBlindspot ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${showBlindspot ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 12, padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🌊</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: showBlindspot ? "#F59E0B" : "#F8F8FF" }}>
                  Blindspot Feed
                </p>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#475569" }}>
                  Stories outside your usual interests
                </p>
              </div>
            </div>
            <motion.div
              animate={{ background: showBlindspot ? "#F59E0B" : "rgba(255,255,255,0.08)" }}
              style={{ width: 36, height: 20, borderRadius: 10, position: "relative" }}
            >
              <motion.div
                animate={{ x: showBlindspot ? 16 : 2 }}
                transition={springs.snappy}
                style={{ position: "absolute", top: 2, width: 16, height: 16, borderRadius: "50%", background: "#fff" }}
              />
            </motion.div>
          </motion.button>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 20, scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.key}
                label={cat.label}
                color={cat.color}
                active={activeCategory === cat.key && !showBlindspot}
                onClick={() => { setActiveCategory(cat.key as StoryCategory | "all"); setShowBlindspot(false); }}
              />
            ))}
          </div>

          {/* Results header */}
          <motion.div
            key={`${activeCategory}-${showBlindspot}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginBottom: 16 }}
          >
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
              {searchQuery && ` for "${searchQuery}"`}
              {showBlindspot && " · Blindspot mode"}
            </p>
          </motion.div>

        {/* Story Grid (Instagram Explore Style) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${showBlindspot}-${searchQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={springs.smooth}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 8,
              }}
            >
              {filtered.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 0" }}>
                  <p style={{ fontSize: 32, marginBottom: 12 }}>🤔</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: "#F8F8FF", marginBottom: 8 }}>
                    No stories found
                  </p>
                  <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#475569" }}>
                    Try a different category or search term
                  </p>
                </div>
              ) : (
                filtered.map((story, i) => {
                  const catColor: Record<string, string> = {
                    breaking: "#FF2D55", tech: "#3B82F6", campus: "#F97316",
                    world: "#7C3AED", finance: "#10F5A0", climate: "#F59E0B", politics: "#EC4899",
                  };
                  const color = catColor[story.category] || "#FF2D55";

                  return (
                    <Link key={story.id} href={`/story/${story.id}`} style={{ textDecoration: "none" }}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          position: "relative",
                          aspectRatio: "4/5",
                          borderRadius: 12,
                          overflow: "hidden",
                          background: "#1E1E28",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={story.imageUrl}
                          alt={story.headline}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        {/* Gradient for text readability */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)",
                        }} />
                        
                        {/* Badges */}
                        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4 }}>
                          <span style={{
                            background: color, color: "#fff",
                            fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                            textTransform: "uppercase", letterSpacing: "0.05em",
                          }}>
                            {story.category === "breaking" ? "🔴 " : ""}{story.category}
                          </span>
                          {story.isBlindspot && (
                            <span style={{ background: "#F59E0B", color: "#000", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                              📍
                            </span>
                          )}
                        </div>

                        {/* Caption */}
                        <div style={{
                          position: "absolute", bottom: 8, left: 8, right: 8,
                        }}>
                          <p style={{
                            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                            fontSize: 12, lineHeight: 1.3, color: "#F8F8FF",
                            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                          }}>
                            {story.headline}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        <BottomNav active="explore" />
      </div>
    </PageTransition>
  );
}
