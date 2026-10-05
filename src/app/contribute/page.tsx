"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition, springs } from "@/components/animations/GenGPulseAnimations";
import { useAuth } from "@/context/AuthContext";

export default function ContributePage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    headline: "",
    category: "campus",
    content: "",
    sources: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please sign in to submit a story.");
      login(); // Prompt login mock
      return;
    }
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <PageTransition pageKey="contribute">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", padding: "40px 20px 100px", fontFamily: "'Epilogue', sans-serif", color: "#F8F8FF" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
          <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 44, height: 44, color: "#F8F8FF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Student <span style={{ color: "#10F5A0" }}>Journalist</span></span>
          <div style={{ width: 44 }} />
        </div>

        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, marginBottom: 12, lineHeight: 1.1 }}>
              Pitch a Story
            </h1>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.5 }}>
              Spotted something important on campus or in tech? Pitch it to our editorial board. Published writers earn the exclusive Editor badge.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springs.bouncy as any}
              style={{ background: "rgba(16,245,160,0.1)", border: "1px solid rgba(16,245,160,0.3)", borderRadius: 24, padding: 40, textAlign: "center" }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🚀</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, color: "#10F5A0", marginBottom: 8 }}>Pitch Submitted!</h2>
              <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 24 }}>
                Our editorial team is reviewing your story. We'll notify you if it gets published on the main feed.
              </p>
              <button
                onClick={() => router.push("/")}
                style={{ background: "#10F5A0", color: "#000", border: "none", borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, cursor: "pointer" }}
              >
                Back to Feed
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hostels to enforce new curfew..."
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  style={{ width: "100%", padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8F8FF", fontSize: 15, outline: "none", fontFamily: "'Epilogue', sans-serif" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: "100%", padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8F8FF", fontSize: 15, outline: "none", fontFamily: "'Epilogue', sans-serif", appearance: "none" }}
                >
                  <option value="campus">Campus News</option>
                  <option value="tech">Tech & AI</option>
                  <option value="career">Career / Placements</option>
                  <option value="world">World</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>The Story & Why It Matters</label>
                <textarea
                  required
                  placeholder="Give us the 60-word pulse on what happened and the consequence..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: "100%", padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8F8FF", fontSize: 15, outline: "none", fontFamily: "'Epilogue', sans-serif", minHeight: 120, resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>Sources / Links (Optional)</label>
                <input
                  type="text"
                  placeholder="Twitter links, circular PDFs, etc."
                  value={formData.sources}
                  onChange={(e) => setFormData({ ...formData, sources: e.target.value })}
                  style={{ width: "100%", padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8F8FF", fontSize: 15, outline: "none", fontFamily: "'Epilogue', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{ width: "100%", padding: 18, marginTop: 10, background: "linear-gradient(135deg, #10F5A0, #0CBF7D)", border: "none", borderRadius: 12, color: "#000", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, cursor: status === "submitting" ? "not-allowed" : "pointer", opacity: status === "submitting" ? 0.7 : 1 }}
              >
                {status === "submitting" ? "Sending Pitch..." : "Submit Pitch"}
              </button>
            </motion.form>
          )}
        </div>

      </div>
    </PageTransition>
  );
}
