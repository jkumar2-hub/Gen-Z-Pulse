"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PageTransition, springs } from "@/components/animations/GenGPulseAnimations";
import { useEffect, useState } from "react";

const RETENTION_DATA = [
  { week: "Week 0", active: 100, color: "#7C3AED" },
  { week: "Week 1", active: 78, color: "#10F5A0" },
  { week: "Week 2", active: 65, color: "#10F5A0" },
  { week: "Week 3", active: 62, color: "#10F5A0" },
  { week: "Week 4", active: 59, color: "#10F5A0" },
];

const FUNNEL_DATA = [
  { step: "App Opens", count: 25000, percentage: 100 },
  { step: "Free Story Read", count: 21500, percentage: 86 },
  { step: "Paywall Hit", count: 8400, percentage: 33 },
  { step: "Pro Subscribed", count: 1250, percentage: 5 },
];

export default function InvestorDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ background: "#050508", minHeight: "100vh" }} />;

  return (
    <PageTransition pageKey="investor">
      <div style={{ minHeight: "100vh", background: "#050508", padding: "40px 20px 100px", fontFamily: "'Epilogue', sans-serif", color: "#F8F8FF" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, maxWidth: 1000, margin: "0 auto 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, background: "rgba(124,58,237,0.1)", color: "#A78BFA", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              🔒
            </div>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20 }}>Investor <span style={{ color: "#A78BFA" }}>Data Room</span></span>
              <p style={{ fontSize: 11, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Gen Z Pulse Analytics</p>
            </div>
          </div>
          <button onClick={() => router.push("/")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "#F8F8FF", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13 }}>
            Close Room
          </button>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          
          {/* Key Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 40 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#94A3B8", textTransform: "uppercase" }}>Monthly Active</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#F8F8FF", margin: "8px 0" }}>14,204</p>
              <p style={{ fontSize: 13, color: "#10F5A0" }}>↑ 18% MoM</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#94A3B8", textTransform: "uppercase" }}>MRR (INR)</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#F8F8FF", margin: "8px 0" }}>₹61,250</p>
              <p style={{ fontSize: 13, color: "#10F5A0" }}>↑ 22% MoM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "#94A3B8", textTransform: "uppercase" }}>Avg Session</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#F8F8FF", margin: "8px 0" }}>8m 12s</p>
              <p style={{ fontSize: 13, color: "#94A3B8" }}>Top 1% in Media</p>
            </motion.div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32 }}>
            
            {/* Retention Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 32 }}
            >
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Cohort Retention</h2>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 32 }}>Percentage of users returning after first install.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {RETENTION_DATA.map((row, i) => (
                  <div key={row.week} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ width: 60, fontSize: 13, color: "#475569", fontWeight: 600 }}>{row.week}</span>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", height: 24, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.active}%` }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                        style={{ height: "100%", background: row.color, borderRadius: 4 }}
                      />
                      <span style={{ position: "absolute", left: 10, top: 4, fontSize: 12, fontWeight: 700, color: row.active > 50 ? "#050508" : "#F8F8FF" }}>
                        {row.active}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 24, fontSize: 13, color: "#10F5A0", fontWeight: 600, background: "rgba(16,245,160,0.1)", padding: "10px 16px", borderRadius: 8 }}>
                🔥 Day 30 Retention is 59%. Industry average is 14%.
              </p>
            </motion.div>

            {/* Funnel Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 32 }}
            >
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Conversion Funnel</h2>
              <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 32 }}>Activation to Monetization (Last 30 Days)</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {FUNNEL_DATA.map((row, i) => (
                  <div key={row.step} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ width: 120, fontSize: 13, color: "#475569", fontWeight: 600 }}>{row.step}</span>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", height: 24, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.percentage}%` }}
                        transition={{ delay: 0.6 + (i * 0.1), duration: 1, ease: "easeOut" }}
                        style={{ height: "100%", background: "#FF2D55", borderRadius: 4 }}
                      />
                      <span style={{ position: "absolute", right: 10, top: 4, fontSize: 12, fontWeight: 700, color: "#F8F8FF" }}>
                        {row.count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 24, fontSize: 13, color: "#FF2D55", fontWeight: 600, background: "rgba(255,45,85,0.1)", padding: "10px 16px", borderRadius: 8 }}>
                Paywall hit-to-convert ratio is 14.8%. Highly effective.
              </p>
            </motion.div>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
             <button style={{ background: "#F8F8FF", color: "#0A0A0F", border: "none", borderRadius: 8, padding: "14px 28px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, cursor: "pointer", boxShadow: "0 4px 14px rgba(255,255,255,0.2)" }}>
              Download Pitch Deck (PDF)
             </button>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
