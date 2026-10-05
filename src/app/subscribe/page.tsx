"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { springs, PageTransition } from "@/components/animations/GenGPulseAnimations";
import { useAuth } from "@/context/AuthContext";
import { analytics } from "@/lib/analytics";

export default function SubscribePage() {
  const router = useRouter();
  const { upgradeToPro } = useAuth();

  const handleCheckout = (planId: string) => {
    // In a real implementation, this would call /api/checkout to generate an order
    // and then open the Razorpay modal. For the MVP, we just mock the success.
    console.log(`Checking out with plan: ${planId}`);
    alert("This is a mock Razorpay checkout flow. Upgrading you to PRO now!");
    analytics.trackEvent("Checkout_Completed", { planId });
    upgradeToPro();
    router.push("/");
  };

  return (
    <PageTransition pageKey="subscribe">
      <div style={{ minHeight: "100vh", background: "#0A0A0F", padding: "40px 20px 100px", fontFamily: "'Epilogue', sans-serif", color: "#F8F8FF" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 44, height: 44, color: "#F8F8FF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ←
          </button>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Gen Z Pulse <span style={{ color: "#FF2D55" }}>PRO</span></span>
          <div style={{ width: 44 }} />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 36, textAlign: "center", marginBottom: 16, lineHeight: 1.1 }}
        >
          Never hit a blindspot again.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: "center", color: "#94A3B8", fontSize: 16, marginBottom: 40 }}
        >
          Unlimited deep dives, ad-free reading, and premium Campus Ambassador perks.
        </motion.p>

        {/* Pricing Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400, margin: "0 auto" }}>
          
          {/* Monthly Plan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...springs.bouncy as any }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32, cursor: "pointer" }}
            onClick={() => handleCheckout("plan_monthly")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, margin: 0 }}>Monthly</h3>
                <p style={{ color: "#94A3B8", fontSize: 14, margin: "4px 0 0" }}>Billed every month</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#10F5A0" }}>₹49</span>
                <span style={{ color: "#475569", fontSize: 14 }}>/mo</span>
              </div>
            </div>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", color: "#94A3B8", fontSize: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <li>✓ Unlimited Deep Dives</li>
              <li>✓ Full Story Arcs Access</li>
              <li>✓ Ad-free experience</li>
            </ul>

            <button style={{ width: "100%", padding: 16, background: "rgba(16,245,160,0.1)", color: "#10F5A0", border: "1px solid rgba(16,245,160,0.3)", borderRadius: 12, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, cursor: "pointer" }}>
              Subscribe Monthly
            </button>
          </motion.div>

          {/* Yearly Plan - Recommended */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, ...springs.bouncy as any }}
            style={{ background: "linear-gradient(135deg, rgba(255,45,85,0.1), rgba(124,58,237,0.1))", border: "1px solid rgba(255,45,85,0.3)", borderRadius: 24, padding: 32, position: "relative", cursor: "pointer" }}
            onClick={() => handleCheckout("plan_yearly")}
          >
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #FF2D55, #7C3AED)", padding: "6px 16px", borderRadius: 20, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Most Popular
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, margin: 0 }}>Yearly</h3>
                <p style={{ color: "#94A3B8", fontSize: 14, margin: "4px 0 0" }}>Save 15%</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: "#FF2D55" }}>₹499</span>
                <span style={{ color: "#475569", fontSize: 14 }}>/yr</span>
              </div>
            </div>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", color: "#F8F8FF", fontSize: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <li>✓ All Monthly Features</li>
              <li>✓ Exclusive Campus Ambassador App</li>
              <li>✓ Priority Event Access</li>
              <li>✓ Exclusive Pro Badge</li>
            </ul>

            <button style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #FF2D55, #7C3AED)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, cursor: "pointer", boxShadow: "0 8px 30px rgba(255,45,85,0.3)" }}>
              Subscribe Yearly
            </button>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
