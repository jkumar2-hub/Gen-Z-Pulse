"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  KineticHeadline,
  StoryFeed,
  StoryArcTimeline,
  NewsIQScoreCard,
  PulseBadge,
  MagneticButton,
  PageTransition,
  springs,
} from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";
import { STORIES, STORY_ARCS } from "@/data/stories";

const FEATURED_ARC  = STORY_ARCS[0];
const PREVIEW_STORIES = STORIES.slice(0, 4);

/* ── SECTION HEADER ── */
function SectionHeader({ label, title, color }: { label: string; title: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springs.smooth}
      style={{ marginBottom: 20 }}
    >
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10,
        letterSpacing: "0.14em", textTransform: "uppercase", color,
        display: "block", marginBottom: 6,
      }}>{label}</span>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: "clamp(1.2rem, 3vw, 1.7rem)", color: "#F8F8FF",
      }}>{title}</h2>
    </motion.div>
  );
}

/* ── STAT PILL ── */
function StatPill({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy}
      style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "16px 20px", textAlign: "center", flex: 1, minWidth: 90,
      }}
    >
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color, lineHeight: 1 }}>{value}</p>
      <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#475569", marginTop: 4 }}>{label}</p>
    </motion.div>
  );
}

/* ── FEATURE ROW ── */
function FeatureRow({ icon, label, desc }: { icon: string; label: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={springs.bouncy}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 12, padding: "14px 16px", marginBottom: 10,
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0, width: 30 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F8F8FF", marginBottom: 3 }}>{label}</p>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#94A3B8" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ── MAIN PAGE ── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <PageTransition pageKey="home">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 90 }}>

        {/* ── NAV ── */}
        <motion.nav
          className="sticky-nav"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springs.smooth, delay: 0.05 }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: "#F8F8FF", letterSpacing: "-0.02em" }}>
            Gen Z <span style={{ color: "#FF2D55" }}>Pulse</span>
          </span>
          <PulseBadge label="LIVE" />
          <MagneticButton variant="primary" onClick={() => router.push("/feed")}>
            Start Reading ↑
          </MagneticButton>
        </motion.nav>

        {/* ── HERO ── */}
        <section style={{ padding: "72px 24px 56px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: 20 }}>
            <PulseBadge label="India's Context Engine for Gen Z" />
          </motion.div>

          <KineticHeadline text="Important Doesn't Always Mean Trending." />

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, ...springs.smooth }}
            style={{ fontFamily: "'Epilogue', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", lineHeight: 1.65, color: "#94A3B8", margin: "24px auto 36px", maxWidth: 560 }}
          >
            The fast-paced swipe feed — but with <em>why it matters</em>, <em>what comes next</em>, and <em>what you can do about it</em>. Swipe-card news built for Gen Z India.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton variant="primary" onClick={() => router.push("/feed")}>
              Start Swiping ↕ — Free
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => setShowDemo(true)}>Watch Demo ▶</MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            style={{ display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap" }}>
            <StatPill value="60w" label="Pulse Summary" color="#FF2D55" />
            <StatPill value="3×"  label="Depth Levels"  color="#7C3AED" />
            <StatPill value="DNA" label="Credibility Score" color="#10F5A0" />
            <StatPill value="AI"   label="Context Engine"   color="#3B82F6" />
          </motion.div>
        </section>

        {/* ── CORE FEATURES ── */}
        <section style={{ padding: "0 20px 48px", maxWidth: 580, margin: "0 auto" }}>
          <SectionHeader label="Platform Features" title="Built for the Next Generation" color="#FF2D55" />
          {[
            { icon: "↕", label: "Full-Screen Swipe Feed", desc: "Fast-paced content delivery, no filler." },
            { icon: "📖", label: "Depth Dial™", desc: "60w → 300w → 1500w in one tap." },
            { icon: "🧵", label: "Story Arc™", desc: "Breaking → Developing → Resolved timeline." },
            { icon: "🎯", label: "Bias Meter", desc: "Political lean + credibility score on every card." },
            { icon: "⚡", label: "Action Pathways", desc: "Learn · Career · Act — news to action in 1 tap." },
            { icon: "🧠", label: "News IQ™", desc: "Weekly quiz, score, and college ranking." },
            { icon: "🌊", label: "Blindspot Feed", desc: "Stories outside your filter bubble, flagged." },
          ].map((f, i) => <FeatureRow key={i} {...f} />)}
        </section>

        {/* ── STORY PREVIEW ── */}
        <section style={{ padding: "0 20px 48px", maxWidth: 580, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
            <SectionHeader label="Today's Top Stories" title="What's Happening" color="#3B82F6" />
            <Link href="/feed" style={{ textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#FF2D55" }}>
              View All →
            </Link>
          </div>
          <StoryFeed stories={PREVIEW_STORIES} />
        </section>

        {/* ── STORY ARC ── */}
        <section style={{ padding: "0 20px 48px", maxWidth: 580, margin: "0 auto" }}>
          <SectionHeader label="Story Arc™" title="Follow the Full Picture" color="#7C3AED" />
          <StoryArcTimeline stages={FEATURED_ARC.stages} />
        </section>

        {/* ── IQ SCORE TEASER ── */}
        <section style={{ padding: "0 20px 48px", maxWidth: 400, margin: "0 auto" }}>
          <SectionHeader label="This Week" title="Your News IQ™" color="#10F5A0" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={springs.bouncy}>
            <NewsIQScoreCard score={87} rank="Top 12%" college="GITAM University" />
          </motion.div>
          <div style={{ marginTop: 14, textAlign: "center" }}>
            <Link href="/iq">
              <button className="btn btn-purple" style={{ fontSize: 13 }}>Take This Week's Quiz →</button>
            </Link>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={springs.smooth}
          style={{ padding: "48px 24px", maxWidth: 560, margin: "0 auto", textAlign: "center" }}
        >
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#F8F8FF", marginBottom: 16 }}>
            Read smarter.<br />
            <span style={{ color: "#FF2D55" }}>Stay curious.</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 28, fontFamily: "'Epilogue', sans-serif" }}>
            Join 500+ students already on the early access list.
          </p>
          <MagneticButton variant="primary" onClick={() => router.push("/feed")}>
            Start Swiping ↕ — Free
          </MagneticButton>
        </motion.section>

        {/* ── DEMO MODAL ── */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDemo(false)}
              style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            >
              <motion.div
                initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }}
                transition={springs.bouncy}
                onClick={(e) => e.stopPropagation()}
                style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "36px 28px", maxWidth: 400, width: "100%", textAlign: "center" }}
              >
                <span style={{ fontSize: 40, display: "block", marginBottom: 16 }}>🎬</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: "#F8F8FF", marginBottom: 10 }}>Demo Coming Soon</h3>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#94A3B8", lineHeight: 1.6, marginBottom: 24 }}>
                  A 3-minute walkthrough is coming. Try the app while you wait!
                </p>
                <MagneticButton variant="primary" onClick={() => { setShowDemo(false); router.push("/feed"); }}>
                  Try the Swipe Feed Instead ↕
                </MagneticButton>
                <button onClick={() => setShowDemo(false)} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", color: "#475569", cursor: "pointer", fontFamily: "'Epilogue', sans-serif", fontSize: 13 }}>Dismiss</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav active="home" />
      </div>
    </PageTransition>
  );
}
