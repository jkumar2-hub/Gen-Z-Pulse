"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { springs } from "@/components/animations/GenGPulseAnimations";

type AuthContextType = {
  isLoggedIn: boolean;
  isPro: boolean;
  readCount: number;
  topics: string[];
  login: (topics?: string[]) => void;
  logout: () => void;
  upgradeToPro: () => void;
  updateTopics: (topics: string[]) => void;
  incrementReadCount: () => boolean;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  isAdmin: boolean;
  adminLogin: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isPro: false,
  readCount: 0,
  topics: [],
  login: () => {},
  logout: () => {},
  upgradeToPro: () => {},
  updateTopics: () => {},
  incrementReadCount: () => true,
  showPaywall: false,
  setShowPaywall: () => {},
  isAdmin: false,
  adminLogin: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [readCount, setReadCount] = useState(0);
  const [topics, setTopics] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedAuth = localStorage.getItem("gengpulse_auth");
    if (savedAuth === "true") setIsLoggedIn(true);
    
    const savedPro = localStorage.getItem("gengpulse_pro");
    if (savedPro === "true") setIsPro(true);

    const savedCount = localStorage.getItem("gengpulse_reads");
    if (savedCount) setReadCount(parseInt(savedCount, 10));

    const savedAdmin = localStorage.getItem("gengpulse_admin");
    if (savedAdmin === "true") setIsAdmin(true);

    const savedTopics = localStorage.getItem("gengpulse_topics");
    if (savedTopics) {
      try {
        const parsed = JSON.parse(savedTopics);
        if (Array.isArray(parsed)) setTopics(parsed);
      } catch (e) {}
    }

    setHasHydrated(true);
  }, []);

  const login = (newTopics?: string[]) => {
    setIsLoggedIn(true);
    localStorage.setItem("gengpulse_auth", "true");
    if (newTopics && newTopics.length > 0) {
      setTopics(newTopics);
      localStorage.setItem("gengpulse_topics", JSON.stringify(newTopics));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsPro(false);
    setIsAdmin(false);
    localStorage.removeItem("gengpulse_auth");
    localStorage.removeItem("gengpulse_pro");
    localStorage.removeItem("gengpulse_admin");
    router.push("/");
  };

  const updateTopics = (newTopics: string[]) => {
    setTopics(newTopics);
    localStorage.setItem("gengpulse_topics", JSON.stringify(newTopics));
  };

  const upgradeToPro = () => {
    setIsPro(true);
    setShowPaywall(false);
    localStorage.setItem("gengpulse_pro", "true");
  };

  const adminLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    localStorage.setItem("gengpulse_auth", "true");
    localStorage.setItem("gengpulse_admin", "true");
  };

  const incrementReadCount = () => {
    if (isPro) return true; // Unlimited access
    if (readCount >= 5) {
      setShowPaywall(true);
      return false; // Paywall hit
    }
    const newCount = readCount + 1;
    setReadCount(newCount);
    localStorage.setItem("gengpulse_reads", newCount.toString());
    return true;
  };

  // During SSR, we can't know localStorage state, so we render public routes normally.
  // For protected routes, we render null to avoid hydration mismatch and flashing.
  if (!hasHydrated) {
    const isPublicRouteSSR = !pathname || pathname === "/";
      
    return (
      <AuthContext.Provider value={{ isLoggedIn, isPro, isAdmin, readCount, topics, login, logout, adminLogin, upgradeToPro, updateTopics, incrementReadCount, showPaywall, setShowPaywall }}>
        {isPublicRouteSSR ? children : null}
      </AuthContext.Provider>
    );
  }

  // Public routes that don't require auth
  const isPublicRoute = !pathname || pathname === "/";

  return (
    <AuthContext.Provider value={{ isLoggedIn, isPro, isAdmin, readCount, topics, login, logout, adminLogin, upgradeToPro, updateTopics, incrementReadCount, showPaywall, setShowPaywall }}>
      {(!isLoggedIn && !isPublicRoute) ? (
        <AuthWall onLogin={login} />
      ) : (
        <>
          {children}
          {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} onUpgrade={() => {
            router.push("/subscribe");
            setShowPaywall(false);
          }} />}
        </>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

const TOPICS = [
  { id: "education",     label: "Educational",     desc: "CUET, exams, study hacks & universities", emoji: "📚", color: "#F97316" },
  { id: "finance",       label: "Financial",       desc: "Markets, crypto, budgeting & loans",     emoji: "📈", color: "#10F5A0" },
  { id: "tech",          label: "Tech & AI",       desc: "Next-gen models, gadgets & coding",       emoji: "💻", color: "#3B82F6" },
  { id: "campus",        label: "Campus Life",     desc: "Hostels, student clubs & fests",          emoji: "🎓", color: "#EC4899" },
  { id: "startups",      label: "Startups & VC",   desc: "Founders, funding rounds & careers",      emoji: "🚀", color: "#8B5CF6" },
  { id: "politics",      label: "Politics & Policy",desc: "Youth policies, elections & laws",       emoji: "🏛️", color: "#EF4444" },
  { id: "climate",       label: "Climate & Future", desc: "Green tech, ecology & clean energy",     emoji: "🌱", color: "#06B6D4" },
  { id: "world",         label: "World Affairs",   desc: "Global diplomacy & breaking updates",     emoji: "🌍", color: "#F59E0B" },
  { id: "science",       label: "Science & Space", desc: "Space missions, physics & biotech",       emoji: "🔬", color: "#6366F1" },
  { id: "entertainment", label: "Pop Culture",     desc: "Movies, creators, streaming & music",     emoji: "🎬", color: "#E11D48" },
  { id: "sports",        label: "Sports & F1",     desc: "Cricket, football, racing & esports",     emoji: "🏆", color: "#14B8A6" },
  { id: "health",        label: "Health & Mind",   desc: "Mental wellness, fitness & nutrition",    emoji: "❤️", color: "#F43F5E" },
];

function AuthWall({ onLogin }: { onLogin: (topics?: string[]) => void }) {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"auth" | "topics">("auth");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Load previously saved topics if available
  useEffect(() => {
    const saved = localStorage.getItem("gengpulse_topics");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedTopics(parsed);
        }
      } catch (e) {}
    }
  }, []);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const selectAllTopics = () => {
    setSelectedTopics(TOPICS.map(t => t.id));
  };

  const clearTopics = () => {
    setSelectedTopics([]);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (authMode === "signup") {
      setStatus("loading");
      setErrorMessage("");
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        
        if (res.ok) {
          setStatus("success");
          // After signup, show Pinterest-style topic selection
          setTimeout(() => {
            setStatus("idle");
            setStep("topics");
          }, 800);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Failed to join waitlist");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage("Network error");
      }
    } else {
      // Login mode - authenticate and ask preferred topics like Pinterest!
      setStatus("loading");
      setTimeout(() => {
        setStatus("idle");
        setStep("topics");
      }, 400);
    }
  };

  const handleContinueWithTopics = (topicsToSave?: string[]) => {
    const finalTopics = topicsToSave && topicsToSave.length > 0
      ? topicsToSave
      : selectedTopics.length >= 3
        ? selectedTopics
        : ["education", "finance", "tech"]; // smart default fallback
        
    localStorage.setItem("gengpulse_topics", JSON.stringify(finalTopics));
    if (email) localStorage.setItem("gengpulse_user_email", email);
    onLogin(finalTopics);
  };

  // ── Topic Selection Step (Pinterest-style) ────────
  if (step === "topics") {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A0F", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springs.smooth as any}
          style={{
            width: "100%", maxWidth: 620,
            background: "rgba(18, 18, 26, 0.95)",
            backdropFilter: "blur(28px)",
            padding: "36px 32px",
            borderRadius: 28,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span style={{
              display: "inline-block",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#FF2D55",
              background: "rgba(255, 45, 85, 0.12)",
              padding: "4px 12px",
              borderRadius: 20,
              marginBottom: 10,
            }}>
              ✨ Pinterest-Style Feed Setup
            </span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 1.9rem)", color: "#F8F8FF", marginBottom: 8, lineHeight: 1.2 }}>
              What are your interests? 🎯
            </h2>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#94A3B8", maxWidth: 460, margin: "0 auto", lineHeight: 1.5 }}>
              Select educational, financial, or any 3+ topics to customize your daily news pulse.
            </p>
          </div>

          {/* Quick Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 20,
              background: selectedTopics.length >= 3 ? "rgba(16, 245, 160, 0.1)" : "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${selectedTopics.length >= 3 ? "rgba(16, 245, 160, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
            }}>
              <span style={{ fontSize: 13 }}>{selectedTopics.length >= 3 ? "✓" : "🎯"}</span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: selectedTopics.length >= 3 ? "#10F5A0" : "#94A3B8",
              }}>
                {selectedTopics.length >= 3
                  ? `${selectedTopics.length} topics selected — Perfect!`
                  : `Pick at least ${3 - selectedTopics.length} more topic${3 - selectedTopics.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                onClick={selectAllTopics}
                style={{
                  background: "none", border: "none", color: "#60A5FA",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                  cursor: "pointer", padding: "4px 8px",
                }}
              >
                Select All
              </button>
              {selectedTopics.length > 0 && (
                <button
                  type="button"
                  onClick={clearTopics}
                  style={{
                    background: "none", border: "none", color: "#64748B",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", padding: "4px 8px",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Pinterest Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: 12,
            marginBottom: 28,
            maxHeight: "44vh",
            overflowY: "auto",
            padding: "4px 2px",
            scrollbarWidth: "thin",
          }}>
            {TOPICS.map(topic => {
              const active = selectedTopics.includes(topic.id);
              return (
                <motion.div
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "16px 12px",
                    borderRadius: 16,
                    border: active ? `2px solid ${topic.color}` : "1px solid rgba(255,255,255,0.08)",
                    background: active ? `linear-gradient(145deg, ${topic.color}22, rgba(255,255,255,0.04))` : "rgba(255,255,255,0.03)",
                    boxShadow: active ? `0 0 16px ${topic.color}33` : "none",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                    transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {/* Floating Checkmark Pill */}
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    width: 20, height: 20, borderRadius: "50%",
                    background: active ? topic.color : "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: active ? "#000" : "#64748B",
                  }}>
                    {active ? "✓" : "+"}
                  </div>

                  <span style={{ fontSize: 28, marginBottom: 8 }}>{topic.emoji}</span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: active ? "#F8F8FF" : "#CBD5E1",
                    lineHeight: 1.2,
                    marginBottom: 4,
                  }}>
                    {topic.label}
                  </span>
                  <span style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: 10,
                    color: active ? "#94A3B8" : "#64748B",
                    lineHeight: 1.3,
                  }}>
                    {topic.desc}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Action Row */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <motion.button
              onClick={() => {
                if (selectedTopics.length < 3) return;
                handleContinueWithTopics();
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "16px",
                background: selectedTopics.length >= 3
                  ? "linear-gradient(135deg, #FF2D55, #7C3AED)"
                  : "rgba(255,255,255,0.06)",
                border: "none", borderRadius: 16,
                color: selectedTopics.length >= 3 ? "#fff" : "#475569",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15,
                cursor: selectedTopics.length >= 3 ? "pointer" : "not-allowed",
                boxShadow: selectedTopics.length >= 3 ? "0 8px 30px rgba(255,45,85,0.35)" : "none",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {selectedTopics.length < 3 ? (
                <span>Pick {3 - selectedTopics.length} more topic{3 - selectedTopics.length !== 1 ? "s" : ""} to continue</span>
              ) : (
                <span>Continue to Feed with {selectedTopics.length} topics →</span>
              )}
            </motion.button>

            <button
              type="button"
              onClick={() => handleContinueWithTopics(["education", "finance", "tech"])}
              style={{
                background: "none", border: "none", color: "#64748B",
                fontFamily: "'Epilogue', sans-serif", fontSize: 13,
                cursor: "pointer", textAlign: "center", padding: "6px",
              }}
            >
              Skip for now (browse with Educational, Financial & Tech)
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Auth Form ────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={springs.smooth as any}
        style={{ width: "100%", maxWidth: 400, background: "rgba(255,255,255,0.02)", padding: 32, borderRadius: 24, border: "1px solid rgba(255,255,255,0.05)", position: "relative" }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            position: "absolute", top: 20, left: 20,
            background: "none", border: "none", color: "#94A3B8",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
          }}
        >
          ← Back
        </button>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#F8F8FF", marginBottom: 8, textAlign: "center" }}>
          {authMode === "login" ? "Welcome Back" : "Join Gen Z Pulse"}
        </h2>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#94A3B8", textAlign: "center", marginBottom: 32 }}>
          {authMode === "login" 
            ? "Sign in to access your personalized feed." 
            : "Sign up to track your News IQ™ and save stories."}
        </p>

        {status === "success" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(16,245,160,0.1)", color: "#10F5A0", padding: 12, borderRadius: 12, marginBottom: 20, textAlign: "center", fontSize: 14, fontFamily: "'Epilogue', sans-serif" }}>
            ✓ Account created! Setting up your feed...
          </motion.div>
        )}
        {status === "error" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(255,45,85,0.1)", color: "#FF2D55", padding: 12, borderRadius: 12, marginBottom: 20, textAlign: "center", fontSize: 14, fontFamily: "'Epilogue', sans-serif" }}>
            {errorMessage}
          </motion.div>
        )}

        <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "14px 16px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, color: "#F8F8FF", fontSize: 15,
                fontFamily: "'Epilogue', sans-serif", outline: "none",
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%", padding: "14px 16px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, color: "#F8F8FF", fontSize: 15,
                fontFamily: "'Epilogue', sans-serif", outline: "none",
              }}
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 8, padding: "14px 0", fontSize: 16 }}
          >
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#475569", textTransform: "uppercase" }}>Or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <button
          type="button"
          onClick={() => setStep("topics")}
          style={{
            width: "100%", padding: "12px", background: "#fff", border: "none",
            borderRadius: 12, color: "#000", fontSize: 14, fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            cursor: "pointer", marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 18 }}>G</span> Continue with Google
        </button>
        
        <button
          type="button"
          onClick={() => setStep("topics")}
          style={{
            width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 18 }}></span> Continue with Apple
        </button>

        <p style={{ textAlign: "center", marginTop: 24, fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: "#94A3B8" }}>
          {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
            style={{ background: "none", border: "none", color: "#FF2D55", fontWeight: 600, cursor: "pointer", padding: 0 }}
          >
            {authMode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

function PaywallModal({ onClose, onUpgrade }: { onClose: () => void, onUpgrade: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)", padding: 20 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={springs.bouncy as any}
        style={{ width: "100%", maxWidth: 440, background: "linear-gradient(135deg, rgba(255,45,85,0.05), rgba(124,58,237,0.05))", padding: 40, borderRadius: 28, border: "1px solid rgba(255,45,85,0.2)", position: "relative", overflow: "hidden" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 24 }}>×</button>
        
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#F8F8FF", marginBottom: 12, textAlign: "center", lineHeight: 1.1 }}>
          You've Hit Your <span style={{ color: "#FF2D55" }}>Daily Limit</span>
        </h2>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 16, color: "#94A3B8", textAlign: "center", marginBottom: 32, lineHeight: 1.5 }}>
          Free tier allows 5 deep dives per day. Upgrade to Pro for unlimited access, ad-free reading, and the exclusive campus badge.
        </p>

        <button
          onClick={onUpgrade}
          style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #FF2D55, #FF6B6B)", borderRadius: 16, border: "none", color: "#fff", fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, boxShadow: "0 8px 30px rgba(255,45,85,0.3)" }}
        >
          View Pro Plans ⚡
        </button>

        <p style={{ textAlign: "center", fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#475569" }}>
          Or invite 3 friends to get a month free!
        </p>
      </motion.div>
    </div>
  );
}
