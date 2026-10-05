"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PageTransition, springs } from "@/components/animations/GenGPulseAnimations";

const TRENDS = [
  { arc: "AI in Bangalore", sentiment: "positive", score: 92, demographics: "Tech, 18-21" },
  { arc: "EV Infrastructure", sentiment: "neutral", score: 65, demographics: "Tier 1, 20-25" },
  { arc: "Fast Fashion Backlash", sentiment: "negative", score: 28, demographics: "Campus, 18-24" }
];

export default function B2BDashboardPage() {
  const router = useRouter();

  return (
    <PageTransition pageKey="b2b">
      <div style={{ minHeight: "100vh", background: "#050508", padding: "40px 20px 100px", fontFamily: "'Epilogue', sans-serif", color: "#F8F8FF" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, maxWidth: 1000, margin: "0 auto 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, background: "rgba(16,245,160,0.1)", color: "#10F5A0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              N
            </div>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20 }}>Pulse <span style={{ color: "#10F5A0" }}>Brands</span></span>
              <p style={{ fontSize: 11, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Brand Intelligence MVP</p>
            </div>
          </div>
          <button onClick={() => router.push("/")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "#F8F8FF", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13 }}>
            Exit Dashboard
          </button>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 40 }}
          >
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, marginBottom: 12, lineHeight: 1.1 }}>
              Gen Z Attention Index
            </h1>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.5, maxWidth: 600 }}>
              Real-time insights into what Gen Z is reading, reacting to, and sharing across Gen Z Pulse. Uncover narrative arcs before they break into the mainstream.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 40 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, ...springs.smooth as any }}
              style={{ background: "linear-gradient(135deg, rgba(255,45,85,0.08), rgba(255,255,255,0.02))", border: "1px solid rgba(255,45,85,0.2)", borderRadius: 16, padding: 24 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8, textTransform: "uppercase" }}>Active Readers</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 36, color: "#F8F8FF", marginBottom: 4 }}>14,204</p>
              <p style={{ fontSize: 12, color: "#10F5A0" }}>↑ 12% vs last week</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, ...springs.smooth as any }}
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(255,255,255,0.02))", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 24 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8, textTransform: "uppercase" }}>Total Deep Dives</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 36, color: "#F8F8FF", marginBottom: 4 }}>89,531</p>
              <p style={{ fontSize: 12, color: "#10F5A0" }}>↑ 34% vs last week</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, ...springs.smooth as any }}
              style={{ background: "linear-gradient(135deg, rgba(16,245,160,0.08), rgba(255,255,255,0.02))", border: "1px solid rgba(16,245,160,0.2)", borderRadius: 16, padding: 24 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8, textTransform: "uppercase" }}>Avg Session Time</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 36, color: "#F8F8FF", marginBottom: 4 }}>8m 12s</p>
              <p style={{ fontSize: 12, color: "#94A3B8" }}>Stable</p>
            </motion.div>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, marginBottom: 20 }}>Trending Story Arcs</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TRENDS.map((trend, i) => (
              <motion.div
                key={trend.arc}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1), ...springs.bouncy as any }}
                style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, padding: "20px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap"
                }}
              >
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F8F8FF", marginBottom: 6 }}>{trend.arc}</p>
                  <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#94A3B8" }}>Demographics: {trend.demographics}</p>
                </div>
                
                <div style={{ width: 140 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sentiment</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", height: 6, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${trend.score}%`, background: trend.sentiment === "positive" ? "#10F5A0" : trend.sentiment === "negative" ? "#FF2D55" : "#F59E0B", borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: trend.sentiment === "positive" ? "#10F5A0" : trend.sentiment === "negative" ? "#FF2D55" : "#F59E0B" }}>{trend.score}%</span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push(`/arc/arc-india-ai-policy`)}
                  style={{ padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#F8F8FF", fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}>
                  View Deep Dive
                </button>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 60, textAlign: "center", padding: 40, border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 16 }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#F8F8FF", marginBottom: 8 }}>Want API Access?</p>
            <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>Export raw sentiment data directly to your BI tools via the Gen Z Pulse API.</p>
            <button style={{ background: "#7C3AED", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}>
              Request Enterprise API Key
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
