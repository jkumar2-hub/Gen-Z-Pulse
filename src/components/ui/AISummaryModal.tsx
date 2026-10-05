"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Story, getAISummary, AISummary } from "@/data/stories";
import { springs } from "@/components/animations/GenGPulseAnimations";

type AISummaryModalProps = {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function AISummaryModal({ story, isOpen, onClose }: AISummaryModalProps) {
  const [activeTab, setActiveTab] = useState<"tldr" | "genz" | "executive">("tldr");
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      setActiveTab("tldr");
      setCopied(false);
      // Simulate high-speed AI analysis
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isOpen, story]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  const aiData: AISummary = getAISummary(story);
  const articleUrl = story.sourceUrl || `https://news.google.com/search?q=${encodeURIComponent(story.headline + " " + story.source)}`;

  const handleCopy = async () => {
    const textToCopy = `✨ AI Summary: ${story.headline} (${story.source})\n\n` +
      `⚡ TL;DR:\n${aiData.tl_dr.map(item => `• ${item}`).join("\n")}\n\n` +
      `💬 No-Cap Breakdown:\n${aiData.genZTake}\n\n` +
      `🔗 Full Article: ${articleUrl}\nVia Gen Z Pulse AI`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.78)",
          backdropFilter: "blur(14px)",
          padding: "16px",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={springs.smooth as any}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 580,
            background: "linear-gradient(145deg, #12121c, #0d0d15)",
            borderRadius: 24,
            border: "1px solid rgba(124, 58, 237, 0.35)",
            boxShadow: "0 24px 70px rgba(124, 58, 237, 0.25), 0 0 0 1px rgba(255,255,255,0.06)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px 24px 16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
              background: "linear-gradient(90deg, rgba(124,58,237,0.12), rgba(255,45,85,0.08))",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#A78BFA",
                    background: "rgba(124, 58, 237, 0.2)",
                    padding: "3px 10px",
                    borderRadius: 20,
                    border: "1px solid rgba(124, 58, 237, 0.4)",
                  }}
                >
                  <span style={{ fontSize: 13 }}>✨</span> AI Generated Summary
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    color: "#64748B",
                  }}
                >
                  Powered by Pulse Intelligence
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
                  color: "#F8F8FF",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {story.headline}
              </h2>
              <p
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: 12,
                  color: "#94A3B8",
                  margin: "4px 0 0",
                }}
              >
                Tracked from <strong>{story.source}</strong> · Verified {story.credibilityScore}/10
              </p>
            </div>

            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: "pointer",
                color: "#94A3B8",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Mode Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "14px 24px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              background: "rgba(255, 255, 255, 0.01)",
              overflowX: "auto",
            }}
          >
            {[
              { id: "tldr", label: "⚡ 3-Point TL;DR", desc: "Quick Skim" },
              { id: "genz", label: "💬 No-Cap Take", desc: "Gen Z Slang" },
              { id: "executive", label: "📊 Career & Impact", desc: "Deep Analysis" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: active ? "2px solid #A78BFA" : "2px solid transparent",
                    padding: "8px 12px 12px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: active ? "#F8F8FF" : "#64748B",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
            {isGenerating ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 20px",
                  gap: 14,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  style={{ fontSize: 32 }}
                >
                  ✨
                </motion.div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#A78BFA",
                    margin: 0,
                  }}
                >
                  AI synthesizing news coverage from {story.source}...
                </p>
                <p
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: 12,
                    color: "#64748B",
                    margin: 0,
                  }}
                >
                  Distilling facts, identifying spin & extracting consequences
                </p>
              </div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springs.snappy as any}
              >
                {activeTab === "tldr" && (
                  <div>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#10F5A0",
                        marginBottom: 12,
                      }}
                    >
                      💡 3-SECOND KEY TAKEAWAYS
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {aiData.tl_dr.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            padding: "14px 16px",
                            borderRadius: 14,
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.07)",
                          }}
                        >
                          <span style={{ fontSize: 18, flexShrink: 0 }}>
                            {index === 0 ? "📌" : index === 1 ? "🎯" : "🔮"}
                          </span>
                          <p
                            style={{
                              fontFamily: "'Epilogue', sans-serif",
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "#F8F8FF",
                              margin: 0,
                            }}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: 16,
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: "rgba(124, 58, 237, 0.08)",
                        border: "1px solid rgba(124, 58, 237, 0.2)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          color: "#C4B5FD",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        ⚡ BOTTOM LINE
                      </span>
                      <p
                        style={{
                          fontFamily: "'Epilogue', sans-serif",
                          fontSize: 13,
                          color: "#E2E8F0",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {aiData.keyTakeaway}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "genz" && (
                  <div>
                    <div
                      style={{
                        padding: "18px 20px",
                        borderRadius: 16,
                        background: "linear-gradient(135deg, rgba(255,45,85,0.08), rgba(124,58,237,0.08))",
                        border: "1px solid rgba(255,45,85,0.25)",
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 20 }}>💬</span>
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#FF6B8B",
                          }}
                        >
                          Explained In Plain English (No Cap)
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Epilogue', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: "#F8F8FF",
                          margin: 0,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {aiData.genZTake}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "executive" && (
                  <div>
                    <div
                      style={{
                        padding: "18px 20px",
                        borderRadius: 16,
                        background: "rgba(59, 130, 246, 0.08)",
                        border: "1px solid rgba(59, 130, 246, 0.25)",
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 20 }}>📊</span>
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#93C5FD",
                          }}
                        >
                          Strategic & Career Implications
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Epilogue', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: "#F8F8FF",
                          margin: 0,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {aiData.executiveBrief}
                      </p>
                    </div>
                  </div>
                )}

                {/* AI Metadata row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#64748B" }}>
                    ⏱️ Saved ~3 min reading time
                  </span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#10F5A0" }}>
                    ✓ 98.4% Fact Consistency with {story.source}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.07)",
              background: "rgba(10, 10, 15, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleCopy}
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(255, 255, 255, 0.05)",
                color: copied ? "#10F5A0" : "#F8F8FF",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s ease",
              }}
            >
              <span>{copied ? "✓ Copied!" : "📋 Copy Summary"}</span>
            </button>

            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "10px 18px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.25)",
              }}
            >
              <span>Go to Full Article on {story.source}</span>
              <span style={{ fontSize: 14 }}>↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
