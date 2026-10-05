/**
 * Gen Z Pulse — Framer Motion Animation Showcase
 * Style: Neo-Brutalism + Dark Glassmorphism | Motion: 9/10 (Complex)
 * Typography: Space Grotesk + Epilogue
 * Colors: #0A0A0F base | #FF2D55 Pulse Red | #7C3AED Purple | #10F5A0 Neon Green
 */

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// 1. SPRING PRESETS  (use everywhere, never hardcode)
// ─────────────────────────────────────────────
/** @type {{ snappy: import("framer-motion").Transition, bouncy: import("framer-motion").Transition, smooth: import("framer-motion").Transition, heavy: import("framer-motion").Transition }} */
export const springs = {
  snappy:  { type: "spring", stiffness: 400, damping: 30, mass: 1 },
  bouncy:  { type: "spring", stiffness: 300, damping: 20, mass: 1 },
  smooth:  { type: "spring", stiffness: 200, damping: 25, mass: 1 },
  heavy:   { type: "spring", stiffness: 150, damping: 28, mass: 1.5 },
};

// ─────────────────────────────────────────────
// 2. KINETIC HEADLINE  (char-by-char reveal)
// ─────────────────────────────────────────────
export function KineticHeadline({ text, className = "" }) {
  // Split into WORDS — each word is a nowrap unit, chars animate within it
  const words = text.split(" ");
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.015, delayChildren: 0.1 } },
  };
  const charVariant = {
    hidden:  { opacity: 0, y: 24, rotateX: -40 },
    visible: { opacity: 1, y: 0,  rotateX: 0,
      transition: { ...springs.bouncy, duration: 0.55 } },
  };

  // Flatten: track global char index for stagger continuity across words
  let charIdx = 0;
  const wordElements = words.map((word, wi) => {
    const chars = word.split("");
    const el = (
      <span
        key={wi}
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
      >
        {chars.map((c) => {
          const idx = charIdx++;
          return (
            <motion.span
              key={idx}
              variants={charVariant}
              style={{ display: "inline-block" }}
            >
              {c}
            </motion.span>
          );
        })}
      </span>
    );
    charIdx++; // account for the space between words
    return el;
  });

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={`kinetic-headline ${className}`}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(2rem, 6vw, 5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: "#F8F8FF",
        perspective: "600px",
        display: "block",
        wordBreak: "keep-all",
        overflowWrap: "normal",
      }}
    >
      {wordElements.map((el, i) => (
        <span key={i}>
          {el}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.h1>
  );
}

// ─────────────────────────────────────────────
// 3. STORY CARD  (glass + stagger entrance)
// ─────────────────────────────────────────────
const categoryColors = {
  breaking:   "#FF2D55",
  developing: "#F59E0B",
  tech:       "#3B82F6",
  politics:   "#7C3AED",
  world:      "#10F5A0",
  campus:     "#F97316",
};

export function StoryCard({ story, index = 0, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[story.category] || "#FF2D55";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.bouncy, delay: index * 0.06 }}
      whileHover={{ y: -4, transition: springs.snappy }}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: `3px solid ${color}`,
        borderRadius: 16,
        padding: "20px 20px 20px 24px",
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 8px 40px rgba(${hexToRgb(color)}, 0.15), 0 2px 8px rgba(0,0,0,0.4)`
          : "0 2px 8px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Glow shimmer on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 20% 50%, rgba(${hexToRgb(color)}, 0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Category tag */}
      <motion.span
        style={{
          display: "inline-block",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color,
          background: `rgba(${hexToRgb(color)}, 0.12)`,
          padding: "3px 8px",
          borderRadius: 4,
          marginBottom: 10,
        }}
      >
        {story.category}
      </motion.span>

      {/* Headline */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: 17,
        lineHeight: 1.35,
        color: "#F8F8FF",
        margin: "0 0 10px 0",
      }}>
        {story.headline}
      </p>

      {/* Summary */}
      <p style={{
        fontFamily: "'Epilogue', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.6,
        color: "#94A3B8",
        margin: "0 0 16px 0",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {story.summary}
      </p>

      {/* Mini Bias Meter */}
      {story.politicalLean && story.politicalLean !== "none" && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Bias Lean</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: story.politicalLean === "left" ? "#3B82F6" : story.politicalLean === "right" ? "#FF2D55" : "#10F5A0", textTransform: "uppercase" }}>{story.politicalLean}</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, background: "linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(16,245,160,0.5) 50%, rgba(255,45,85,0.5) 100%)", opacity: 0.6, borderRadius: 2 }} />
            <div style={{ position: "absolute", top: -2, bottom: -2, width: 8, borderRadius: 4, background: "#fff", left: story.politicalLean === "left" ? "15%" : story.politicalLean === "right" ? "85%" : "50%", transform: "translateX(-50%)" }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: 12,
          color: "#475569",
        }}>
          {story.source}
        </span>
        <span style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: 12,
          color: "#475569",
        }}>
          {story.time}
        </span>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// 4. STORY FEED  (staggered card list)
// ─────────────────────────────────────────────
export function StoryFeed({ stories }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {stories.map((story, i) => (
        <StoryCard key={story.id} story={story} index={i} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. STORY ARC TIMELINE
// ─────────────────────────────────────────────
const arcStageColors = {
  Breaking:   "#FF2D55",
  Developing: "#F59E0B",
  Context:    "#3B82F6",
  Impact:     "#7C3AED",
  Resolved:   "#10F5A0",
};

export function StoryArcTimeline({ stages }) {
  const [activeIdx, setActiveIdx] = useState(stages.length - 1);

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Timeline track */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
        {stages.map((stage, i) => {
          const color = arcStageColors[stage.label] || "#FF2D55";
          const isActive = i === activeIdx;
          const isPast = i < activeIdx;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < stages.length - 1 ? 1 : 0 }}>
              {/* Node */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...springs.bouncy, delay: i * 0.08 + 0.2 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setActiveIdx(i);
                  document.getElementById(`arc-stage-${i}`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                style={{
                  width: isActive ? 36 : 24,
                  height: isActive ? 36 : 24,
                  borderRadius: "50%",
                  background: isActive ? color : isPast ? `rgba(${hexToRgb(color)},0.4)` : "rgba(255,255,255,0.1)",
                  border: `2px solid ${isActive ? color : isPast ? `rgba(${hexToRgb(color)},0.6)` : "rgba(255,255,255,0.15)"}`,
                  boxShadow: isActive ? `0 0 20px rgba(${hexToRgb(color)}, 0.5)` : "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                }}
              />
              {/* Connector line */}
              {i < stages.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.3, ease: "easeOut" }}
                  style={{
                    flex: 1, height: 2,
                    background: isPast
                      ? `linear-gradient(90deg, ${color}, ${arcStageColors[stages[i+1]?.label] || "#3B82F6"})`
                      : "rgba(255,255,255,0.08)",
                    transformOrigin: "left",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Stage labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        {stages.map((stage, i) => {
          const color = arcStageColors[stage.label] || "#FF2D55";
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.4 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: i === activeIdx ? 700 : 500,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: i === activeIdx ? color : "#475569",
                cursor: "pointer",
                textAlign: "center",
                flex: 1,
              }}
              onClick={() => setActiveIdx(i)}
            >
              {stage.label}
            </motion.span>
          );
        })}
      </div>

      {/* Active stage content — Swipable Carousel */}
      <div
        id="arc-carousel-container"
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE
          paddingBottom: 8,
          scrollBehavior: "smooth",
        }}
        ref={(el) => {
          if (el) el.style.setProperty("::-webkit-scrollbar", "display: none");
        }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const index = Math.round(el.scrollLeft / el.clientWidth);
          if (index !== activeIdx) setActiveIdx(index);
        }}
      >
        {stages.map((stage, i) => {
          const color = arcStageColors[stage.label] || "#FF2D55";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                flex: "0 0 100%", // each card takes full width
                scrollSnapAlign: "center",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
                borderRadius: 12,
                padding: "16px 20px",
              }}
              id={`arc-stage-${i}`}
            >
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#F8F8FF",
                margin: "0 0 6px 0",
              }}>
                {stage.date}
              </p>
              <p style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: "#94A3B8",
                margin: 0,
              }}>
                {stage.summary}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 6. NEWS IQ SCORE COUNTER  (animated number)
// ─────────────────────────────────────────────
function useAnimatedNumber(target, duration = 1.2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubicOut
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export function NewsIQScoreCard({ score = 87, rank = "Top 12%", college = "GITAM University" }) {
  const animatedScore = useAnimatedNumber(score, 1.4);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 300); return () => clearTimeout(t); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy}
      style={{
        background: "linear-gradient(135deg, #0F0F1A 0%, #1A0E2E 50%, #0A1A0F 100%)",
        border: "1px solid rgba(16,245,160,0.2)",
        borderRadius: 20,
        padding: "32px 28px",
        maxWidth: 340,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 200, height: 200,
        background: "radial-gradient(circle, rgba(16,245,160,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <p style={{
        fontFamily: "'Epilogue', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#475569",
        margin: "0 0 16px 0",
      }}>
        Weekly News IQ
      </p>

      {/* Big score */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 8 }}>
        <motion.span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 80,
            lineHeight: 1,
            color: "#10F5A0",
            display: "block",
          }}
        >
          {animatedScore}
        </motion.span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: 20,
          color: "rgba(16,245,160,0.5)",
          paddingBottom: 12,
        }}>
          /100
        </span>
      </div>

      {/* Rank */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, ...springs.smooth }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(16,245,160,0.1)",
          border: "1px solid rgba(16,245,160,0.2)",
          borderRadius: 20,
          padding: "4px 12px",
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 8, color: "#10F5A0" }}>▲</span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          color: "#10F5A0",
        }}>
          {rank} in {college}
        </span>
      </motion.div>

      {/* Progress bar */}
      <div style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: 4,
        height: 6,
        overflow: "hidden",
        marginBottom: 20,
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #10F5A0, #7C3AED)",
            borderRadius: 4,
          }}
        />
      </div>

      {/* Gen Z Pulse logo line */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        color: "#475569",
        margin: 0,
        letterSpacing: "-0.01em",
      }}>
        Gen G <span style={{ color: "#FF2D55" }}>Pulse</span>
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 7. PULSE BADGE  (animated breaking news pill)
// ─────────────────────────────────────────────
export function PulseBadge({ label = "BREAKING" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* Pulsing dot */}
      <div style={{ position: "relative", width: 8, height: 8 }}>
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            background: "rgba(255,45,85,0.4)",
          }}
        />
        <div style={{
          position: "absolute", inset: 2,
          borderRadius: "50%",
          background: "#FF2D55",
        }} />
      </div>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.15em",
        color: "#FF2D55",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// 8. DEPTH DIAL  (expand/collapse reading depth)
// ─────────────────────────────────────────────
const depthLevels = [
  { label: "Pulse", words: "60 words", key: "pulse" },
  { label: "Context", words: "300 words", key: "context" },
  { label: "Deep Dive", words: "1500+ words", key: "deep" },
];

export function DepthDial({ pulseText, contextText, deepText, sourceUrl, sourceName }) {
  const [depth, setDepth] = useState(0);
  const texts = [pulseText, contextText, deepText];
  const colors = ["#FF2D55", "#7C3AED", "#3B82F6"];

  return (
    <div>
      {/* Depth selector */}
      <div style={{
        display: "flex",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: 4,
        gap: 2,
        marginBottom: 20,
      }}>
        {depthLevels.map((d, i) => (
          <motion.button
            key={d.key}
            onClick={() => setDepth(i)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: 8,
              border: "none",
              background: depth === i ? colors[i] : "transparent",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ background: depth !== i ? "rgba(255,255,255,0.06)" : colors[i] }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: depth === i ? "#fff" : "#94A3B8",
              margin: 0,
              textAlign: "center",
            }}>
              {d.label}
            </p>
            <p style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 9,
              color: depth === i ? "rgba(255,255,255,0.7)" : "#475569",
              margin: "2px 0 0 0",
              textAlign: "center",
            }}>
              {d.words}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Animated content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={depth}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={springs.smooth}
        >
          <p style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: depth === 0 ? 16 : depth === 1 ? 15 : 14,
            lineHeight: depth === 0 ? 1.5 : 1.65,
            color: "#94A3B8",
            margin: 0,
            whiteSpace: "pre-line",
          }}>
            {texts[depth]}
          </p>

          {sourceUrl && depth === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 20px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(124,58,237,0.18))",
                  border: "1px solid rgba(59,130,246,0.4)",
                  color: "#93C5FD",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.15)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>📰 Read Full Article on {sourceName || "Source"}</span>
                <span style={{ fontSize: 16 }}>↗</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// 9. PAGE TRANSITION WRAPPER
// ─────────────────────────────────────────────
export function PageTransition({ children, pageKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={springs.smooth}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// 10. MAGNETIC BUTTON  (cursor attraction effect)
// ─────────────────────────────────────────────
export function MagneticButton({ children, onClick, variant = "primary" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const styles = {
    primary: {
      background: "linear-gradient(135deg, #FF2D55, #FF6B6B)",
      color: "#fff",
      border: "none",
    },
    secondary: {
      background: "rgba(255,255,255,0.05)",
      color: "#F8F8FF",
      border: "1px solid rgba(255,255,255,0.12)",
    },
    purple: {
      background: "linear-gradient(135deg, #7C3AED, #9B59B6)",
      color: "#fff",
      border: "none",
    },
  };

  return (
    <motion.button
      ref={ref}
      style={{
        ...styles[variant],
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: "0.02em",
        padding: "14px 28px",
        borderRadius: 12,
        cursor: "pointer",
        x: springX,
        y: springY,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
    >
      {children}
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// 11. FULL DEMO PAGE  (Framer Motion showcase)
// ─────────────────────────────────────────────
const DEMO_STORIES = [
  {
    id: 1, category: "breaking", headline: "RBI Cuts Repo Rate for First Time in 4 Years",
    summary: "The Reserve Bank of India slashed the repo rate by 25bps to 6.25%, its first cut since 2020, as inflation eases below 4% for two consecutive months.",
    source: "Gen Z Pulse", time: "2 min ago",
  },
  {
    id: 2, category: "tech", headline: "India's AI Startup Ecosystem Hits $2.1B in 2025 Funding",
    summary: "Indian AI startups attracted record $2.1B in 2025 across 200+ deals, outpacing last year by 3x. Bangalore leads with 40% of all AI venture activity.",
    source: "Gen Z Pulse", time: "18 min ago",
  },
  {
    id: 3, category: "campus", headline: "CUET 2026: Pattern Changes Confirmed by NTA",
    summary: "NTA confirms CUET 2026 will have 40% fewer sections and 30 minutes shorter duration. Science students get dedicated domain paper revamp.",
    source: "Gen Z Pulse", time: "1 hr ago",
  },
];

const DEMO_ARC = [
  { label: "Breaking", date: "Sep 15, 2025", summary: "RBI Governor hints at rate cut if inflation stays below 4% for two months." },
  { label: "Developing", date: "Oct 1, 2025", summary: "Inflation data released: 3.8% for September — second consecutive month below target." },
  { label: "Context", date: "Oct 5, 2025", summary: "Economists weigh in: A 25bps cut likely, but RBI may hold for US Fed decision first." },
  { label: "Impact", date: "Oct 8, 2025", summary: "Markets rally 400 points on rate cut expectations. Housing loan EMIs may drop by ₹400/month." },
  { label: "Resolved", date: "Oct 9, 2025", summary: "RBI MPC votes 5-1 to cut repo rate by 25bps. EMI relief for 8.4 crore home loan borrowers." },
];

export default function GenGPulseAnimationShowcase() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      fontFamily: "'Epilogue', sans-serif",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Epilogue:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0F; }
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* NAV */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...springs.smooth, delay: 0.1 }}
        style={{
          position: "sticky", top: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: 20,
          color: "#F8F8FF", letterSpacing: "-0.02em",
        }}>
          Gen G <span style={{ color: "#FF2D55" }}>Pulse</span>
        </span>
        <PulseBadge label="LIVE" />
        <MagneticButton variant="primary">Get Early Access</MagneticButton>
      </motion.nav>

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: 24 }}
        >
          <PulseBadge label="INDIA'S CONTEXT ENGINE FOR GEN Z" />
        </motion.div>

        <KineticHeadline text="Important Doesn't Always Mean Trending." />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, ...springs.smooth }}
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: 18, lineHeight: 1.6,
            color: "#94A3B8",
            margin: "28px 0 40px",
          }}
        >
          AI-curated news that tells you what happened, why it matters,
          what comes next — and what you can actually do about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <MagneticButton variant="primary">Start Reading Free</MagneticButton>
          <MagneticButton variant="secondary">Watch Demo</MagneticButton>
        </motion.div>
      </section>

      {/* STORY FEED DEMO */}
      <section style={{ padding: "40px 24px", maxWidth: 480, margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 22,
            color: "#F8F8FF", marginBottom: 20,
          }}
        >
          Today's Pulse
        </motion.h2>
        <StoryFeed stories={DEMO_STORIES} />
      </section>

      {/* STORY ARC DEMO */}
      <section style={{
        padding: "40px 24px", maxWidth: 560, margin: "0 auto 40px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#7C3AED",
            background: "rgba(124,58,237,0.12)",
            padding: "3px 8px", borderRadius: 4,
            marginBottom: 12, display: "inline-block",
          }}>
            Story Arc™
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 18,
            color: "#F8F8FF", marginBottom: 0,
          }}>
            RBI Rate Cut — Full Story
          </h2>
        </motion.div>
        <StoryArcTimeline stages={DEMO_ARC} />
      </section>

      {/* NEWS IQ DEMO */}
      <section style={{ padding: "40px 24px", maxWidth: 400, margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 22,
            color: "#F8F8FF", marginBottom: 24,
          }}
        >
          Your News IQ™
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={springs.bouncy}
        >
          <NewsIQScoreCard score={87} rank="Top 12%" college="GITAM University" />
        </motion.div>
      </section>

      {/* DEPTH DIAL DEMO */}
      <section style={{
        padding: "40px 24px", maxWidth: 520, margin: "0 auto 80px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
      }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 18,
            color: "#F8F8FF", marginBottom: 20,
          }}
        >
          Depth Dial™ — You Choose How Deep
        </motion.h2>
        <DepthDial
          pulseText="RBI cuts repo rate by 25bps to 6.25% — first cut in 4 years. Home loan EMIs may drop ~₹400/month."
          contextText="The Monetary Policy Committee voted 5-1 in favour of a 25bps repo rate cut, citing two consecutive months of headline CPI inflation below 4%. This is the first rate cut since May 2020. The decision was broadly in line with market expectations after September inflation printed at 3.8%. Governor Malhotra flagged that global uncertainties remain a watch factor."
          deepText="Background: India's repo rate had been held at 6.5% since February 2023, as the RBI prioritized inflation management over growth stimulation. The global rate cycle turned first in the US, where the Federal Reserve began cutting in September 2024. India's CPI inflation crossed below the 4% target in August 2025 (3.9%) and stayed there in September (3.8%), giving the MPC enough comfort to act.

The 5-1 vote saw the dissent from external member Prof. Jayanth Varma, who argued for a larger 50bps cut given the food price normalization and benign core inflation. The majority chose caution, wary of El Niño-driven vegetable price volatility in Q4.

Impact on borrowers: ~8.4 crore home loan accounts in India are on floating rate contracts linked to the repo rate. A 25bps cut, if fully transmitted, reduces a ₹40L, 20-year loan's EMI by approximately ₹390/month. Banks typically transmit repo cuts within 1-3 months for EBLR-linked loans.

What to watch next: The December 2025 MPC meeting — if October-November inflation stays below 4.5%, a second 25bps cut becomes probable. Markets are pricing in a total of 75bps of easing over the current cycle."
        />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "255,45,85";
}
