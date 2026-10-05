"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition, springs, NewsIQScoreCard } from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";
import { STORIES } from "@/data/stories";

const SAVED_STORIES = STORIES.slice(0, 2); // mock saved stories

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy as any}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14, padding: "18px 16px",
        textAlign: "center", flex: 1, minWidth: 80,
      }}
    >
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color, marginBottom: 4, lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </p>
    </motion.div>
  );
}

function StreakRow({ day, active }: { day: string; active: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <motion.div
        animate={active ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          width: 32, height: 32, borderRadius: "50%",
          background: active ? "linear-gradient(135deg, #FF2D55, #FF6B6B)" : "rgba(255,255,255,0.04)",
          border: active ? "none" : "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}
      >
        {active ? "🔥" : ""}
      </motion.div>
      <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 10, color: active ? "#FF2D55" : "#475569" }}>
        {day}
      </span>
    </div>
  );
}
import { useAuth } from "@/context/AuthContext";

const ALL_TOPICS = [
  { id: "education",     label: "Educational",     emoji: "📚", color: "#F97316" },
  { id: "finance",       label: "Financial",       emoji: "📈", color: "#10F5A0" },
  { id: "tech",          label: "Tech & AI",       emoji: "💻", color: "#3B82F6" },
  { id: "campus",        label: "Campus Life",     emoji: "🎓", color: "#EC4899" },
  { id: "startups",      label: "Startups & VC",   emoji: "🚀", color: "#8B5CF6" },
  { id: "politics",      label: "Politics & Policy",emoji: "🏛️", color: "#EF4444" },
  { id: "climate",       label: "Climate & Future", emoji: "🌱", color: "#06B6D4" },
  { id: "world",         label: "World Affairs",   emoji: "🌍", color: "#F59E0B" },
  { id: "science",       label: "Science & Space", emoji: "🔬", color: "#6366F1" },
  { id: "entertainment", label: "Pop Culture",     emoji: "🎬", color: "#E11D48" },
  { id: "sports",        label: "Sports & F1",     emoji: "🏆", color: "#14B8A6" },
  { id: "health",        label: "Health & Mind",   emoji: "❤️", color: "#F43F5E" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { logout, isPro, isAdmin, adminLogin, topics, updateTopics } = useAuth();
  const [isEditingTopics, setIsEditingTopics] = useState(false);
  const currentTopics = topics && topics.length > 0 ? topics : ["education", "finance", "tech"];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const streak = [true, true, true, true, true, false, false]; // mock streak

  const toggleProfileTopic = (id: string) => {
    const updated = currentTopics.includes(id)
      ? currentTopics.filter(t => t !== id)
      : [...currentTopics, id];
    updateTopics(updated);
  };

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("light-theme");
    }
  };

  return (
    <PageTransition pageKey="profile">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 80 }}>
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.smooth as any}
          style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,10,15,0.9)", backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: "#F8F8FF" }}>
            Profile
          </h1>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11,
            color: isPro ? "#FF2D55" : "#10F5A0", background: isPro ? "rgba(255,45,85,0.1)" : "rgba(16,245,160,0.1)",
            padding: "4px 10px", borderRadius: 20, letterSpacing: "0.06em", border: isPro ? "1px solid rgba(255,45,85,0.3)" : "none"
          }}>
            {isPro ? "PRO MEMBER" : "FREE PLAN"}
          </span>
        </motion.header>

        <div style={{ maxWidth: 520, margin: "0 auto", padding: "28px 20px" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            {/* Avatar + Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springs.smooth as any}
              style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #FF2D55)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}
              >
                🎓
              </motion.div>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F8F8FF", marginBottom: 2 }}>
                  Gen Z Reader
                </p>
                <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>
                  GITAM University · Joined Oct 2025
                </p>
              </div>
            </motion.div>
            
            {!isPro && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                style={{ marginBottom: 28 }}
              >
                <button
                  onClick={() => router.push("/subscribe")}
                  style={{
                    width: "100%", padding: 14,
                    background: "linear-gradient(135deg, #FF2D55, #7C3AED)",
                    color: "#fff", border: "none", borderRadius: 12,
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                >
                  <span>Upgrade to Pulse PRO</span>
                  <span>→</span>
                </button>
              </motion.div>
            )}

            {/* Stats row */}
            <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              <StatCard value="5" label="Day Streak" color="#FF2D55" />
              <StatCard value="87" label="IQ Score" color="#10F5A0" />
              <StatCard value="12" label="Stories Read" color="#7C3AED" />
              <StatCard value="3" label="Arcs Tracked" color="#3B82F6" />
            </div>

            {/* Reading streak */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "18px 20px", marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F8F8FF" }}>
                  🔥 This Week's Streak
                </p>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#FF2D55" }}>
                  5 days
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                {days.map((d, i) => <StreakRow key={i} day={d} active={streak[i]} />)}
              </div>
            </motion.section>

            {/* Referral / Ambassador Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: "linear-gradient(135deg, rgba(255,45,85,0.05), rgba(124,58,237,0.05))",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: 16, padding: "20px", marginBottom: 24,
                position: "relative", overflow: "hidden"
              }}
            >
              <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
              
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F8F8FF", marginBottom: 6 }}>
                Campus Ambassador
              </h3>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", marginBottom: 16, lineHeight: 1.5 }}>
                Invite 3 friends from your college. Get Gen Z Pulse Pro free for 1 month!
              </p>

              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "10px 14px", borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#F8F8FF", display: "flex", alignItems: "center" }}>
                  gengpulse.in/invite/gzr89
                </div>
                <button
                  onClick={() => alert("Link copied!")}
                  style={{ background: "#7C3AED", color: "#fff", border: "none", borderRadius: 8, padding: "0 16px", fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Copy
                </button>
              </div>
              <div style={{ marginTop: 12 }}>
                <Link href="/ambassador" style={{ color: "#10F5A0", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textDecoration: "none" }}>
                  View Ambassador Program →
                </Link>
              </div>
            </motion.div>

            {/* Student Journalist Network */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                background: "linear-gradient(135deg, rgba(16,245,160,0.05), rgba(59,130,246,0.05))",
                border: "1px solid rgba(16,245,160,0.3)",
                borderRadius: 16, padding: "20px", marginBottom: 24,
              }}
            >
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F8F8FF", marginBottom: 6 }}>
                ✍️ Student Journalist
              </h3>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", marginBottom: 16, lineHeight: 1.5 }}>
                Got a tip? Pitch stories to the Gen Z Pulse editorial board and earn the exclusive Campus Editor badge.
              </p>
              <button
                onClick={() => router.push("/contribute")}
                style={{ width: "100%", padding: 14, background: "rgba(16,245,160,0.1)", color: "#10F5A0", border: "1px solid rgba(16,245,160,0.3)", borderRadius: 12, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}
              >
                Pitch a Story
              </button>
            </motion.div>

            {/* Preferred Topics / Interests (Pinterest-style) */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "20px", marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#F8F8FF", margin: 0 }}>
                    🎯 Your Preferred Topics
                  </h3>
                  <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#94A3B8", margin: "2px 0 0" }}>
                    Pinterest-curated topics shaping your feed
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingTopics(!isEditingTopics)}
                  style={{
                    background: isEditingTopics ? "#FF2D55" : "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10, color: "#fff", fontSize: 12, fontWeight: 700,
                    padding: "6px 14px", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  {isEditingTopics ? "Done" : "Edit Topics"}
                </button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(isEditingTopics ? ALL_TOPICS : ALL_TOPICS.filter(t => currentTopics.includes(t.id))).map(topic => {
                  const active = currentTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => isEditingTopics && toggleProfileTopic(topic.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "7px 12px", borderRadius: 20,
                        border: active ? `1px solid ${topic.color}` : "1px solid rgba(255,255,255,0.08)",
                        background: active ? `${topic.color}22` : "rgba(255,255,255,0.02)",
                        color: active ? "#F8F8FF" : "#64748B",
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                        cursor: isEditingTopics ? "pointer" : "default",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <span>{topic.emoji}</span>
                      <span>{topic.label}</span>
                      {isEditingTopics && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: active ? topic.color : "#64748B" }}>
                          {active ? "✓" : "+"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.section>

            {/* IQ Score card */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: 24 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                Latest IQ Score
              </p>
              <Link href="/iq" style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ scale: 1.01 }} transition={springs.snappy as any}>
                  <NewsIQScoreCard score={87} rank="Top 12%" college="GITAM University" />
                </motion.div>
              </Link>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 10, textAlign: "center" }}>
                <Link href="/iq">
                  <button className="btn btn-secondary" style={{ fontSize: 13 }}>Take This Week's Quiz →</button>
                </Link>
              </motion.div>
            </motion.section>

            {/* Saved Stories */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: 24 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                Saved Stories
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SAVED_STORIES.map((story, i) => (
                  <Link key={story.id} href={`/story/${story.id}`} style={{ textDecoration: "none" }}>
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...springs.bouncy, delay: 0.45 + i * 0.06 } as any}
                      whileHover={{ x: 4 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 12, padding: "14px 16px",
                        display: "flex", gap: 12, alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>🔖</span>
                      <div>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: "#F8F8FF", lineHeight: 1.35, marginBottom: 4 }}>
                          {story.headline}
                        </p>
                        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#64748B" }}>
                          {story.source} · {story.time} · {story.readTime} min read
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* Admin Links */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                style={{
                  background: "rgba(124,58,237,0.05)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: 16, padding: "20px", marginBottom: 24,
                  textAlign: "center", display: "flex", flexDirection: "column", gap: 12
                }}
              >
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#A78BFA", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Admin Dashboard
                </h3>
                <Link href="/b2b" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#F8F8FF", textDecoration: "none", background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: 8 }}>
                  Pulse Brands (B2B)
                </Link>
                <Link href="/admin/investor" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#F8F8FF", textDecoration: "none", background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: 8 }}>
                  Investor Data Room
                </Link>
              </motion.div>
            )}

            {/* Logout CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ textAlign: "center", marginTop: 40 }}
            >
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                <button
                  type="button"
                  onClick={toggleTheme}
                  style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94A3B8", borderRadius: 20, padding: "8px 24px",
                    fontFamily: "'Epilogue', sans-serif", fontSize: 13, cursor: "pointer",
                  }}
                >
                  Toggle Theme 🌓
                </button>
                <button
                  type="button"
                  onClick={logout}
                  style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FF2D55", borderRadius: 20, padding: "8px 24px",
                    fontFamily: "'Epilogue', sans-serif", fontSize: 13, cursor: "pointer",
                  }}
                >
                  Log Out
                </button>
              </div>
              {!isAdmin && (
                <div style={{ marginTop: 24 }}>
                  <button onClick={adminLogin} style={{ 
                    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", 
                    color: "#A78BFA", borderRadius: 20, padding: "8px 24px",
                    fontFamily: "'Epilogue', sans-serif", fontSize: 13, cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 8
                  }}>
                    <span>⚙️</span> Enter Admin Demo
                  </button>
                </div>
              )}
            </motion.div>

          </motion.div>
        </div>

        <BottomNav active="profile" />
      </div>
    </PageTransition>
  );
}
