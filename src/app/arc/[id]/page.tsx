"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getArcById, getStoriesForArc } from "@/data/stories";
import { StoryArcTimeline, StoryCard, PageTransition, springs } from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";

const stageColors: Record<string, string> = {
  Breaking: "#FF2D55",
  Developing: "#F59E0B",
  Context: "#3B82F6",
  Impact: "#7C3AED",
  Resolved: "#10F5A0",
};

export default function StoryArcPage() {
  const params = useParams();
  const router = useRouter();
  const arc = getArcById(params?.id as string);
  const relatedStories = arc ? getStoriesForArc(arc.id) : [];

  if (!arc) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A0F", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#94A3B8", fontFamily: "'Space Grotesk', sans-serif" }}>Arc not found</p>
      </div>
    );
  }

  const currentColor = stageColors[arc.currentStage] || "#7C3AED";
  const completedCount = arc.stages.findIndex((s) => s.label === arc.currentStage) + 1;
  const progressPct = Math.round((completedCount / arc.stages.length) * 100);

  return (
    <PageTransition pageKey={`arc-${arc.id}`}>
      <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 80 }}>

        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.smooth}
          style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,10,15,0.9)", backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "14px 20px",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14 }}
          >
            ←
          </button>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#7C3AED", background: "rgba(124,58,237,0.12)",
            padding: "3px 10px", borderRadius: 4,
          }}>
            Story Arc™
          </span>
        </motion.header>

        <div style={{ maxWidth: 620, margin: "0 auto", padding: "32px 20px" }}>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.smooth, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.4rem, 4vw, 2rem)", lineHeight: 1.2,
              color: "#F8F8FF", marginBottom: 20,
            }}
          >
            {arc.title}
          </motion.h1>

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "14px 16px",
              marginBottom: 28, display: "flex", flexDirection: "column", gap: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8" }}>
                Current Stage
              </span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
                color: currentColor,
                background: `rgba(${currentColor === "#FF2D55" ? "255,45,85" : currentColor === "#F59E0B" ? "245,158,11" : currentColor === "#3B82F6" ? "59,130,246" : currentColor === "#7C3AED" ? "124,58,237" : "16,245,160"}, 0.12)`,
                padding: "3px 10px", borderRadius: 20,
              }}>
                {arc.currentStage}
              </span>
            </div>
            {/* Progress bar */}
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
                style={{ height: "100%", background: `linear-gradient(90deg, #7C3AED, ${currentColor})`, borderRadius: 4 }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#475569" }}>
                {completedCount} of {arc.stages.length} stages
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: currentColor }}>
                {progressPct}% complete
              </span>
            </div>
          </motion.div>

          {/* Full timeline */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...springs.smooth }}
            style={{ marginBottom: 40 }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Full Timeline
            </p>
            <StoryArcTimeline stages={arc.stages} />
          </motion.section>

          {/* Related stories */}
          {relatedStories.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
                Stories In This Arc
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {relatedStories.map((story, i) => (
                  <Link key={story.id} href={`/story/${story.id}`} style={{ textDecoration: "none" }}>
                    <StoryCard story={story} index={i} onClick={() => {}} />
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

        </div>

        <BottomNav active="arc" />
      </div>
    </PageTransition>
  );
}
