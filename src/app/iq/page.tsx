"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { NewsIQScoreCard, PageTransition, springs } from "@/components/animations/GenGPulseAnimations";
import BottomNav from "@/components/ui/BottomNav";
import { analytics } from "@/lib/analytics";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    storyRef: "RBI Rate Cut",
    question: "What was the RBI's repo rate BEFORE the October 2025 cut?",
    options: ["6.0%", "6.25%", "6.5%", "6.75%"],
    correct: 2,
    explanation: "The repo rate was held at 6.5% since February 2023 before the 25bps cut brought it to 6.25%.",
  },
  {
    id: 2,
    storyRef: "India AI Ecosystem",
    question: "What percentage of India's 2025 AI deals went to Bangalore?",
    options: ["20%", "30%", "40%", "50%"],
    correct: 2,
    explanation: "Bangalore leads India's AI activity with 40% of all venture deals in 2025.",
  },
  {
    id: 3,
    storyRef: "CUET 2026",
    question: "How many sections will CUET 2026 have (down from 14)?",
    options: ["6", "8", "10", "12"],
    correct: 1,
    explanation: "The number of test sections drops from 14 to 8, with 1 optional general test.",
  },
  {
    id: 4,
    storyRef: "G20 AI Framework",
    question: "What compute threshold triggers mandatory AI transparency under the G20 accord?",
    options: ["10²⁰ FLOPs", "10²² FLOPs", "10²⁴ FLOPs", "10²⁶ FLOPs"],
    correct: 2,
    explanation: "Models trained above 10²⁴ FLOPs must disclose training data sources to the G20 repository.",
  },
  {
    id: 5,
    storyRef: "Chennai Water Crisis",
    question: "When did Chennai last experience a Day Zero water crisis?",
    options: ["2017", "2018", "2019", "2021"],
    correct: 2,
    explanation: "Chennai's last Day Zero was June 2019 when the city flew in water by train from Vellore.",
  },
];

const LEADERBOARD_DATA = [
  { rank: 1, college: "GITAM University", score: 89400, active: 420, trend: "up" },
  { rank: 2, college: "SRM Institute", score: 82100, active: 380, trend: "up" },
  { rank: 3, college: "VIT Vellore", score: 79500, active: 395, trend: "down" },
  { rank: 4, college: "Manipal (MAHE)", score: 74200, active: 310, trend: "up" },
  { rank: 5, college: "Delhi University", score: 68900, active: 290, trend: "same" },
];

function CollegeLeaderboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={springs.smooth as any}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, color: "#F8F8FF", marginBottom: 8 }}>
          College Leaderboard
        </h2>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8" }}>
          Rankings based on cumulative News IQ scores this week.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {LEADERBOARD_DATA.map((item, i) => (
          <motion.div
            key={item.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, ...(springs.bouncy as any) }}
            style={{
              display: "flex", alignItems: "center", gap: 16,
              background: item.rank === 1 ? "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.02))" : "rgba(255,255,255,0.03)",
              border: item.rank === 1 ? "1px solid rgba(255,215,0,0.3)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "16px",
            }}
          >
            <div style={{ width: 32, fontSize: 18, fontWeight: 700, color: item.rank === 1 ? "#FFD700" : item.rank === 2 ? "#C0C0C0" : item.rank === 3 ? "#CD7F32" : "#94A3B8", textAlign: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
              #{item.rank}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: item.rank === 1 ? "#FFD700" : "#F8F8FF", marginBottom: 4 }}>
                {item.college}
              </p>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#475569" }}>
                {item.active} active readers
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#10F5A0" }}>
                {item.score.toLocaleString()}
              </p>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#475569", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                {item.trend === "up" ? "▲" : item.trend === "down" ? "▼" : "−"} IQ Points
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 16, padding: "20px", textAlign: "center" }}
      >
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#F8F8FF", marginBottom: 8 }}>
          Put Your College on the Map
        </p>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", marginBottom: 16 }}>
          Link your .edu email to contribute to your college's score.
        </p>
        <button style={{ width: "100%", padding: 14, background: "#7C3AED", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}>
          Verify College Email
        </button>
      </motion.div>
    </motion.div>
  );
}

function useAnimatedNumber(target: number, duration = 1.2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function QuizCard({
  q, onAnswer, answered, selected,
}: {
  q: typeof QUIZ_QUESTIONS[0];
  onAnswer: (i: number) => void;
  answered: boolean;
  selected: number | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springs.smooth}
      style={{ width: "100%" }}
    >
      {/* Story reference */}
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#FF2D55", background: "rgba(255,45,85,0.1)",
        padding: "3px 8px", borderRadius: 4, marginBottom: 14, display: "inline-block",
      }}>
        From: {q.storyRef}
      </span>

      <p style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: "clamp(1rem, 3vw, 1.25rem)", lineHeight: 1.35,
        color: "#F8F8FF", marginBottom: 20,
      }}>
        {q.question}
      </p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          const showResult = answered;

          let bg = "rgba(255,255,255,0.04)";
          let border = "1px solid rgba(255,255,255,0.08)";
          let textColor = "#F8F8FF";

          if (showResult) {
            if (isCorrect) { bg = "rgba(16,245,160,0.1)"; border = "1px solid rgba(16,245,160,0.4)"; textColor = "#10F5A0"; }
            else if (isSelected) { bg = "rgba(255,45,85,0.1)"; border = "1px solid rgba(255,45,85,0.4)"; textColor = "#FF2D55"; }
          } else if (isSelected) {
            bg = "rgba(124,58,237,0.15)"; border = "1px solid rgba(124,58,237,0.4)"; textColor = "#A78BFA";
          }

          return (
            <motion.button
              key={i}
              onClick={() => !answered && onAnswer(i)}
              whileHover={!answered ? { x: 4 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              transition={springs.snappy}
              style={{
                background: bg, border, borderRadius: 10,
                padding: "14px 16px", cursor: answered ? "default" : "pointer",
                textAlign: "left", width: "100%",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
                color: showResult && isCorrect ? "#10F5A0" : showResult && isSelected ? "#FF2D55" : "#475569",
                width: 20, flexShrink: 0,
              }}>
                {showResult ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, color: textColor, lineHeight: 1.4 }}>{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={springs.smooth}
            style={{
              marginTop: 16, background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, padding: "12px 14px", overflow: "hidden",
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Context
            </p>
            <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>
              {q.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function IQModePage() {
  const [activeTab, setActiveTab] = useState<"quiz" | "leaderboard">("quiz");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const correctCount = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;
  const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const animatedScore = useAnimatedNumber(finished ? score : 0, 1.4);

  const handleAnswer = (optionIdx: number) => {
    const updated = [...answers];
    updated[questionIdx] = optionIdx;
    setAnswers(updated);
    setAnswered(true);
  };

  const handleNext = () => {
    if (questionIdx < QUIZ_QUESTIONS.length - 1) {
      setQuestionIdx(questionIdx + 1);
      setAnswered(false);
    } else {
      setFinished(true);
      const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      analytics.trackEvent("IQ_Quiz_Completed", { score: finalScore });
    }
  };

  return (
    <PageTransition pageKey="iq">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", paddingBottom: 80 }}>

        {/* Header */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.smooth as any}
          style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,10,15,0.9)", backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 20px",
            display: "flex", flexDirection: "column", gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: "#F8F8FF" }}>
              News IQ™
            </h1>
            {!finished && activeTab === "quiz" && (
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: "#475569" }}>
                {questionIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
            )}
          </div>
          
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setActiveTab("quiz")}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, background: activeTab === "quiz" ? "rgba(124,58,237,0.15)" : "transparent", color: activeTab === "quiz" ? "#A78BFA" : "#475569" }}
            >
              Weekly Quiz
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, background: activeTab === "leaderboard" ? "rgba(16,245,160,0.15)" : "transparent", color: activeTab === "leaderboard" ? "#10F5A0" : "#475569" }}
            >
              Leaderboard
            </button>
          </div>
        </motion.header>

        <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 20px" }}>

          {activeTab === "leaderboard" ? (
            <CollegeLeaderboard />
          ) : !finished ? (
            <>
              {/* Progress bar */}
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 4, marginBottom: 32, overflow: "hidden" }}>
                <motion.div
                  animate={{ width: `${((questionIdx + (answered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #FF2D55, #7C3AED)", borderRadius: 4 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <QuizCard
                  key={questionIdx}
                  q={QUIZ_QUESTIONS[questionIdx]}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selected={answers[questionIdx]}
                />
              </AnimatePresence>

              {answered && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNext}
                  className="btn btn-primary"
                  style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
                >
                  {questionIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question →" : "See My Score"}
                </motion.button>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springs.bouncy}
              style={{ textAlign: "center" }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#475569", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Your Result
              </p>
              <NewsIQScoreCard score={score} rank={score >= 80 ? "Top 15%" : score >= 60 ? "Top 40%" : "Keep Reading!"} college="Gen Z Pulse" />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
              >
                <button
                  className="btn btn-secondary"
                  onClick={() => { setQuestionIdx(0); setAnswers(Array(QUIZ_QUESTIONS.length).fill(null)); setAnswered(false); setFinished(false); }}
                >
                  Try Again
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    const text = `I scored ${score}/100 on Gen Z Pulse News IQ™ this week! Can you beat me? 🧠\nhttps://gengpulse.com/iq`;
                    if (navigator.share) {
                      await navigator.share({ title: "My News IQ™ Score", text });
                    } else {
                      await navigator.clipboard.writeText(text);
                      alert("Score copied to clipboard! Share it anywhere 🔥");
                    }
                  }}
                >
                  Share Score 🔗
                </button>
              </motion.div>

              {/* Breakdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                style={{ marginTop: 32, textAlign: "left" }}
              >
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#475569", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Breakdown
                </p>
                {QUIZ_QUESTIONS.map((q, i) => {
                  const correct = answers[i] === q.correct;
                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + i * 0.07 }}
                      style={{
                        display: "flex", gap: 12, alignItems: "center",
                        padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{correct ? "✅" : "❌"}</span>
                      <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, color: "#94A3B8", flex: 1 }}>{q.question}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </div>

        <BottomNav active="iq" />
      </div>
    </PageTransition>
  );
}
