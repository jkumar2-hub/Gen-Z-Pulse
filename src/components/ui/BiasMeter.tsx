"use client";

import React from "react";
import { motion } from "framer-motion";
import { springs } from "@/components/animations/GenGPulseAnimations";

type LeanType = "left" | "center" | "right" | "none";

export default function BiasMeter({ lean }: { lean: LeanType }) {
  if (lean === "none") return null;

  // Position the dial based on lean (0% to 100%)
  const positionMap = {
    left: "15%",
    center: "50%",
    right: "85%",
  };

  const dialPosition = positionMap[lean] || "50%";
  const dialColor = lean === "left" ? "#3B82F6" : lean === "right" ? "#FF2D55" : "#10F5A0";

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#F8F8FF" }}>
          Source Bias
        </p>
        <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {lean} Leaning
        </span>
      </div>

      <div style={{ position: "relative", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "visible" }}>
        {/* Gradient Spectrum Background */}
        <div 
          style={{ 
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 4,
            background: "linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(16,245,160,0.5) 50%, rgba(255,45,85,0.5) 100%)",
            opacity: 0.6
          }} 
        />
        
        {/* Animated Dial */}
        <motion.div
          initial={{ left: "50%", scale: 0 }}
          animate={{ left: dialPosition, scale: 1 }}
          transition={{ ...springs.bouncy, delay: 0.2 } as any}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 16, height: 16,
            borderRadius: "50%",
            background: "#fff",
            border: `3px solid ${dialColor}`,
            boxShadow: `0 0 10px ${dialColor}80`,
            zIndex: 2
          }}
        />

        {/* Markers */}
        <div style={{ position: "absolute", top: "100%", left: "15%", transform: "translateX(-50%)", marginTop: 4, fontSize: 10, color: "#94A3B8" }}>L</div>
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 4, fontSize: 10, color: "#94A3B8" }}>C</div>
        <div style={{ position: "absolute", top: "100%", left: "85%", transform: "translateX(-50%)", marginTop: 4, fontSize: 10, color: "#94A3B8" }}>R</div>
      </div>
    </div>
  );
}
