"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStoryById, getArcById } from "@/data/stories";
import {
  DepthDial, StoryArcTimeline, PulseBadge, MagneticButton,
  PageTransition, springs,
} from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";
import AudioPlayer from "@/components/ui/AudioPlayer";
import BiasMeter from "@/components/ui/BiasMeter";
import AISummaryModal from "@/components/ui/AISummaryModal";
import { useAuth } from "@/context/AuthContext";
import { analytics } from "@/lib/analytics";

const categoryColors: Record<string, string> = {
  breaking: "#FF2D55", developing: "#F59E0B", tech: "#3B82F6",
  politics: "#7C3AED", world: "#10F5A0", campus: "#F97316",
  finance: "#10F5A0", climate: "#F59E0B",
};

const leanColors: Record<string, string> = {
  left: "#3B82F6", center: "#10F5A0", right: "#EF4444", none: "#94A3B8",
};

function ActionCard({ pathway }: { pathway: { type: string; label: string; description: string; url?: string } }) {
  const icons: Record<string, string> = { learn: "📖", career: "💼", act: "⚡" };
  const colors: Record<string, string> = { learn: "#3B82F6", career: "#7C3AED", act: "#10F5A0" };
  const color = colors[pathway.type] || "#FF2D55";

  return (
    <motion.a
      href={pathway.url || "#"}
      target={pathway.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, transition: springs.snappy }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex", gap: 14, alignItems: "flex-start",
        background: `rgba(${color === "#3B82F6" ? "59,130,246" : color === "#7C3AED" ? "124,58,237" : "16,245,160"}, 0.06)`,
        border: `1px solid rgba(${color === "#3B82F6" ? "59,130,246" : color === "#7C3AED" ? "124,58,237" : "16,245,160"}, 0.15)`,
        borderRadius: 12, padding: "14px 16px",
        textDecoration: "none", cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icons[pathway.type]}</span>
      <div>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F8F8FF", marginBottom: 4 }}>
          {pathway.label}
        </p>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>
          {pathway.description}
        </p>
      </div>
    </motion.a>
  );
}

function ConsequencePill({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.bouncy, delay: index * 0.06 }}
      style={{
        display: "flex", gap: 10, alignItems: "flex-start",
        padding: "10px 14px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
      }}
    >
      <span style={{ color: "#FF2D55", fontWeight: 700, flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif" }}>→</span>
      <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#94A3B8", lineHeight: 1.5 }}>{text}</p>
    </motion.div>
  );
}

function SourceDNA({ score, source }: { score: number; source: string }) {
  const [expanded, setExpanded] = useState(false);
  const color = score >= 8 ? "#10F5A0" : score >= 6 ? "#F59E0B" : "#FF2D55";
  
  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      style={{ cursor: "pointer", background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>🧬</span>
        <span style={{ flex: 1, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#F8F8FF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Source DNA
        </span>
        <div style={{ width: 100, background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 4, overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score * 10}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ height: "100%", background: color, borderRadius: 4 }}
          />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color }}>{score}/10</span>
        <span style={{ color: "#475569", fontSize: 10 }}>{expanded ? "▲" : "▼"}</span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden", marginTop: 16 }}
          >
            <div style={{ padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 12 }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8" }}>Publisher Track Record</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#10F5A0", fontWeight: 700 }}>High Reliability</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8" }}>Primary Citations</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#10F5A0", fontWeight: 700 }}>Verified (3)</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8" }}>Fact-Check Consensus</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: score >= 6 ? "#10F5A0" : "#FF2D55", fontWeight: 700 }}>{score >= 6 ? "Passed" : "Flagged"}</span>
              </div>

              <div style={{ background: "rgba(16,245,160,0.05)", padding: 10, borderRadius: 8, marginTop: 4 }}>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#10F5A0", lineHeight: 1.4 }}>
                  <strong>Transparency Note:</strong> {source} adheres to standard editorial guidelines. The story arc contains cross-referenced viewpoints.
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const story = getStoryById(params?.id as string);
  const arc = story?.arcId ? getArcById(story.arcId) : null;
  const [saved, setSaved] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const { incrementReadCount } = useAuth();
  const [canRead, setCanRead] = useState<boolean | null>(null);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    const allowed = incrementReadCount();
    setCanRead(allowed);
    if (!allowed) {
      analytics.trackEvent("Paywall_Hit", { storyId: params?.id });
      // If paywall hit, redirect back after a brief delay so they don't see the story content
      const timer = setTimeout(() => router.back(), 500);
      return () => clearTimeout(timer);
    } else {
      analytics.trackEvent("Story_Read", { storyId: params?.id, category: story?.category });
    }
  }, []);

  if (!story) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A0F", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#94A3B8", fontFamily: "'Space Grotesk', sans-serif" }}>Story not found</p>
      </div>
    );
  }

  // If hit paywall, just show a dark screen while it redirects back
  if (canRead === false) {
    return <div style={{ minHeight: "100vh", background: "#0A0A0F" }} />;
  }

  const color = categoryColors[story.category] || "#FF2D55";

  return (
    <PageTransition pageKey={`story-${story.id}`}>
      <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 80 }}>

        {/* Sticky header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.smooth as any}
          style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,10,15,0.9)", backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "14px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14 }}
          >
            ← Back
          </button>
          <span className="tag" style={{ color, background: `rgba(${color === "#FF2D55" ? "255,45,85" : "59,130,246"}, 0.12)` }}>
            {story.category}
          </span>
          <motion.button
            onClick={() => setSaved(!saved)}
            whileTap={{ scale: 0.85 }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}
          >
            {saved ? "🔖" : "📌"}
          </motion.button>
        </motion.header>

        <article style={{ maxWidth: 620, margin: "0 auto", padding: "32px 20px" }}>

          {/* Breaking badge */}
          {story.category === "breaking" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 16 }}>
              <PulseBadge label="BREAKING" />
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.smooth, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.2,
              color: "#F8F8FF", marginBottom: 16,
            }}
          >
            {story.headline}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}
          >
            <a
              href={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#60A5FA",
                textDecoration: "underline", textUnderlineOffset: 3, display: "inline-flex", alignItems: "center", gap: 3
              }}
            >
              <span>{story.source}</span>
              <span style={{ fontSize: 11 }}>↗</span>
            </a>
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>·</span>
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>{story.time}</span>
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>·</span>
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>{story.readTime} min read</span>
            {story.isBlindspot && (
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#F59E0B", background: "rgba(245,158,11,0.12)",
                padding: "2px 8px", borderRadius: 4,
              }}>
                📍 Outside Your Bubble
              </span>
            )}
          </motion.div>

          {/* Credibility + bias */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "20px", marginBottom: 28,
              display: "flex", flexDirection: "column", gap: 20,
            }}
          >
            <SourceDNA score={story.credibilityScore} source={story.source} />
            <BiasMeter lean={story.politicalLean as any} />
          </motion.div>

          {/* Morning Pulse Audio */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            <AudioPlayer headline={story.headline} text={story.summary} />
          </motion.div>

          {/* AI Summary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.29 }}
            style={{ marginBottom: 24 }}
          >
            <motion.button
              onClick={() => setShowAISummary(true)}
              whileHover={{ scale: 1.01, borderColor: "rgba(167,139,250,0.6)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: "1px solid rgba(124,58,237,0.35)",
                background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(255,45,85,0.1))",
                boxShadow: "0 4px 20px rgba(124,58,237,0.15)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22 }}>✨</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F8F8FF", margin: 0 }}>
                    Generate AI Summary & TL;DR
                  </p>
                  <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#C4B5FD", margin: "2px 0 0" }}>
                    30-sec skim · No-Cap take · Strategic breakdown
                  </p>
                </div>
              </div>
              <span style={{
                background: "rgba(124,58,237,0.3)", color: "#E9D5FF", padding: "4px 10px", borderRadius: 8,
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12
              }}>
                Instant ⚡
              </span>
            </motion.button>
          </motion.div>

          {/* Depth Dial — core reading experience */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...springs.smooth }}
          >
            <DepthDial
              pulseText={story.summary}
              contextText={story.context}
              deepText={story.deepDive}
              sourceUrl={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
              sourceName={story.source}
            />
          </motion.div>

          {/* Dual Action Article Links CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
            <motion.a
              href={story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01, borderColor: "rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 12, padding: "16px 20px",
                background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(124,58,237,0.1))",
                border: "1px solid rgba(59,130,246,0.35)",
                borderRadius: 14, textDecoration: "none",
                boxShadow: "0 4px 20px rgba(59,130,246,0.1)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0
                }}>
                  📰
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F8F8FF", margin: 0 }}>
                    Read Full Article on {story.source}
                  </p>
                  <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#93C5FD", margin: "2px 0 0" }}>
                    Verified original source publication · Instant access
                  </p>
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#2563EB", padding: "8px 14px", borderRadius: 8,
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#FFFFFF"
              }}>
                <span>Open Article</span>
                <span style={{ fontSize: 13 }}>↗</span>
              </div>
            </motion.a>

            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px", borderRadius: 10,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                color: "#94A3B8", textDecoration: "none", fontSize: 12,
                fontFamily: "'Epilogue', sans-serif",
                cursor: "pointer",
              }}
            >
              <span>🔍 View all syndicated coverage on Google News</span>
              <span style={{ color: "#60A5FA" }}>Search ↗</span>
            </a>
          </div>

          {/* Why This Matters */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springs.smooth as any}
            style={{
              margin: "32px 0",
              background: `rgba(${color === "#FF2D55" ? "255,45,85" : "59,130,246"}, 0.05)`,
              border: `1px solid rgba(${color === "#FF2D55" ? "255,45,85" : "59,130,246"}, 0.15)`,
              borderRadius: 14, padding: "20px 20px",
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color, marginBottom: 10 }}>
              Why This Matters To You
            </p>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 15, lineHeight: 1.65, color: "#F8F8FF" }}>
              {story.whyItMatters}
            </p>
          </motion.section>

          {/* Consequence Engine */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: 32 }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#475569", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ⚠ What Happens Next
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {story.consequences.map((c, i) => <ConsequencePill key={i} text={c} index={i} />)}
            </div>
          </motion.section>

          {/* Story Arc */}
          {arc && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springs.smooth as any}
              style={{
                background: "rgba(124,58,237,0.05)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 16, padding: "20px",
                marginBottom: 32,
              }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C3AED", marginBottom: 4 }}>
                Story Arc™
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#F8F8FF", marginBottom: 16 }}>
                {arc.title}
              </p>
              <StoryArcTimeline stages={arc.stages} />
            </motion.section>
          )}

          {/* Action Pathways */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#475569", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              News → Action
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {story.actionPathways.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...springs.bouncy, delay: i * 0.07 }}>
                  <ActionCard pathway={p} />
                </motion.div>
              ))}
            </div>
          </motion.section>

        </article>

        <BottomNav active="home" />

        {/* AI Summary Modal */}
        <AISummaryModal
          story={story}
          isOpen={showAISummary}
          onClose={() => setShowAISummary(false)}
        />
      </div>
    </PageTransition>
  );
}
