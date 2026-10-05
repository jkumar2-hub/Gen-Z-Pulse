"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { springs } from "@/components/animations/GenGPulseAnimations";

const NAV_ITEMS = [
  { key: "home",    label: "Home",    icon: HomeIcon,    route: "/" },
  { key: "feed",    label: "Swipe ↕", icon: SwipeIcon,   route: "/feed" },
  { key: "explore", label: "Explore", icon: CompassIcon, route: "/explore" },
  { key: "iq",      label: "IQ",      icon: BrainIcon,   route: "/iq" },
  { key: "profile", label: "Profile", icon: UserIcon,    route: "/profile" },
];

export default function BottomNav({ active }: { active: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeKey = (() => {
    if (!pathname) return active;
    if (pathname === "/")                return "home";
    if (pathname.startsWith("/feed"))    return "feed";
    if (pathname.startsWith("/explore")) return "explore";
    if (pathname.startsWith("/arc"))     return "explore"; // arcs live under explore
    if (pathname.startsWith("/iq"))      return "iq";
    if (pathname.startsWith("/profile")) return "profile";
    if (pathname.startsWith("/story"))   return "feed";
    return active;
  })();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = activeKey === item.key;
        const Icon = item.icon;
        return (
          <motion.button
            key={item.key}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            whileTap={{ scale: 0.88 }}
            transition={springs.snappy as any}
            onClick={() => router.push(item.route)}
            aria-label={item.label}
          >
            <motion.div
              animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                size={22}
                style={{
                  color: isActive ? "#FF2D55" : "#475569",
                  transition: "color 0.15s ease",
                }}
              />
            </motion.div>
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 700 : 500,
              letterSpacing: "0.06em",
              color: isActive ? "#FF2D55" : "#475569",
              transition: "color 0.15s ease",
            }}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

/* ── SVG ICON COMPONENTS (Lucide-style, inline SVG) ── */
function HomeIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CompassIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function SwipeIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="5" y="3" width="14" height="18" rx="3" />
      <path d="M12 7v10M9 10l3-3 3 3M9 14l3 3 3-3" />
    </svg>
  );
}


function BrainIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.36-4.62A2.5 2.5 0 0 1 3 12c0-1.07.54-2.01 1.35-2.57A2.5 2.5 0 0 1 7.5 5a2.5 2.5 0 0 1 2-2.5z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.36-4.62A2.5 2.5 0 0 0 21 12c0-1.07-.54-2.01-1.35-2.57A2.5 2.5 0 0 0 16.5 5a2.5 2.5 0 0 0-2-2.5z" />
    </svg>
  );
}

function UserIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
