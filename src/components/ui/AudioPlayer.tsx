"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { springs } from "@/components/animations/GenGPulseAnimations";
import { Play, Pause, VolumeX } from "lucide-react";

export default function AudioPlayer({ text, headline }: { text: string; headline: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      // If already paused, resume
      if (synthRef.current.paused) {
        synthRef.current.resume();
        setIsPlaying(true);
        return;
      }

      // Start new speech
      synthRef.current.cancel(); // clear queue
      const fullText = `Morning Pulse. ${headline}. ${text}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      
      // Try to find a good English voice
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(v => v.lang === "en-IN" || v.lang === "en-GB") || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.rate = 1.05; // Slightly faster for Gen Z

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        setHasError(true);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
      setIsPlaying(true);
      setHasError(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
      <button 
        onClick={togglePlay}
        style={{
          width: 44, height: 44, borderRadius: "50%",
          background: isPlaying ? "rgba(124, 58, 237, 0.15)" : "#F8F8FF",
          border: isPlaying ? "1px solid #7C3AED" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: isPlaying ? "#7C3AED" : "#0A0A0F"
        }}
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: 3 }} />}
      </button>

      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: "#F8F8FF", marginBottom: 2 }}>
          {hasError ? "Audio Unavailable" : "Morning Pulse Audio"}
        </p>
        <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, color: "#94A3B8" }}>
          {isPlaying ? "Playing AI summary..." : hasError ? "Web Speech API blocked" : "Listen to this story"}
        </p>
      </div>

      {isPlaying && (
        <div style={{ display: "flex", gap: 3, alignItems: "center", height: 24 }}>
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ height: ["20%", "100%", "20%"] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
              style={{ width: 3, background: "#7C3AED", borderRadius: 2 }}
            />
          ))}
        </div>
      )}
      {hasError && <VolumeX size={18} color="#FF2D55" />}
    </div>
  );
}
