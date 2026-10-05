"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { springs, PageTransition } from "@/components/animations/GenGPulseAnimations";

export default function AmbassadorPage() {
  const router = useRouter();

  return (
    <PageTransition pageKey="ambassador">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", padding: "40px 20px 100px", fontFamily: "'Epilogue', sans-serif", color: "#F8F8FF" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 44, height: 44, color: "#F8F8FF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Ambassador <span style={{ color: "#7C3AED" }}>Portal</span></span>
          <div style={{ width: 44 }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, marginBottom: 12, lineHeight: 1.1 }}>
            Lead Gen Z Pulse at <span style={{ color: "#10F5A0" }}>Your Campus</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.5, maxWidth: 320, margin: "0 auto" }}>
            Get verified, earn free PRO, exclusive merch, and add serious leadership experience to your resume.
          </p>
        </motion.div>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ...springs.bouncy as any }}
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(16,245,160,0.05))", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 24, padding: 32, maxWidth: 400, margin: "0 auto 40px" }}
        >
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Your Invite Link</h3>
          <p style={{ color: "#94A3B8", fontSize: 13, marginBottom: 20 }}>
            Share this with classmates. You get 1 free month of PRO for every 3 signups.
          </p>

          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "14px", borderRadius: 12, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, display: "flex", alignItems: "center" }}>
              gengpulse.in/invite/gzr89
            </div>
            <button
              onClick={() => alert("Link copied!")}
              style={{ background: "#7C3AED", color: "#fff", border: "none", borderRadius: 12, padding: "0 20px", fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Copy
            </button>
          </div>

          {/* Progress */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>Signups this month</span>
              <span style={{ fontSize: 13, color: "#10F5A0", fontWeight: 700 }}>2 / 3</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "66%", background: "linear-gradient(90deg, #7C3AED, #10F5A0)", borderRadius: 3 }} />
            </div>
          </div>
        </motion.div>

        {/* Perks */}
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 20 }}>Ambassador Perks</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(16,245,160,0.1)", color: "#10F5A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✨</div>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>Free PRO Access</p>
                <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>Unlimited deep dives forever.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center", background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,45,85,0.1)", color: "#FF2D55", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👕</div>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>Exclusive Merch</p>
                <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>Unlock the Gen Z Pulse hoodie at 50 signups.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
