/**
 * Gen Z Pulse — Official Demo Video & Voiceover Timeline
 * Used for automated subtitle rendering, Remotion video timelines, and voiceover tracking.
 */

export interface VoiceoverCue {
  id: string;
  startTime: string; // MM:SS
  endTime: string;   // MM:SS
  startSeconds: number;
  endSeconds: number;
  screenTarget: string;
  actionSummary: string;
  speakerText: string;
  toneDirection: "energetic" | "informative" | "authoritative" | "motivating" | "outro";
}

export const DEMO_VOICEOVER_TIMELINE: VoiceoverCue[] = [
  {
    id: "scene-1-hook",
    startTime: "00:00",
    endTime: "00:09",
    startSeconds: 0,
    endSeconds: 9,
    screenTarget: "Landing Hero (/)",
    actionSummary: "Pushes in on neo-brutalist headline with typing SVG",
    speakerText:
      "Gen Z doesn't read traditional news. We’re buried in clickbait, paywalls, and partisan noise. This is Gen Z Pulse — India’s first real-time context engine built specifically for our generation’s attention span.",
    toneDirection: "energetic",
  },
  {
    id: "scene-1-problem-solution",
    startTime: "00:09",
    endTime: "00:18",
    startSeconds: 9,
    endSeconds: 18,
    screenTarget: "Landing Stats Counter & Auth Button",
    actionSummary: "Hover over live stats and click 'Sign In / Join Pulse'",
    speakerText:
      "Instead of doom-scrolling, imagine getting verified news with zero bias, instant AI breakdowns, and direct source transparency — in under fifteen seconds.",
    toneDirection: "informative",
  },
  {
    id: "scene-2-onboarding",
    startTime: "00:18",
    endTime: "00:27",
    startSeconds: 18,
    endSeconds: 27,
    screenTarget: "Auth Modal Topic Grid",
    actionSummary: "Select visual topic cards (Finance, AI, Campus, Climate)",
    speakerText:
      "Onboarding takes five seconds. Just like Pinterest, you select your personal pulse — from high-finance and frontier AI to campus career moves and climate resilience.",
    toneDirection: "informative",
  },
  {
    id: "scene-2-launch-feed",
    startTime: "00:27",
    endTime: "00:36",
    startSeconds: 27,
    endSeconds: 36,
    screenTarget: "Transition to /feed",
    actionSummary: "Click 'Launch Feed'; streak initialized",
    speakerText:
      "The app customizes your feed instantly, storing your preferences and reading streaks directly to your profile.",
    toneDirection: "energetic",
  },
  {
    id: "scene-3-swipe-feed",
    startTime: "00:36",
    endTime: "00:48",
    startSeconds: 36,
    endSeconds: 48,
    screenTarget: "SwipeFeed (/feed)",
    actionSummary: "Vertical card swipe with Framer Motion spring physics",
    speakerText:
      "Welcome to the Swipe Feed. It feels just like TikTok or Reels, powered by Framer Motion spring physics. Every story is verified from accredited publications with a direct link back to the original source.",
    toneDirection: "energetic",
  },
  {
    id: "scene-3-ai-card-btn",
    startTime: "00:48",
    endTime: "01:00",
    startSeconds: 48,
    endSeconds: 60,
    screenTarget: "Swipe Card Action Button",
    actionSummary: "Click '✨ AI Summary' button on card; modal pops up",
    speakerText:
      "Need the facts immediately? Tap 'AI Summary' right from the card. In less than a second, our synthesis engine delivers an executive three-point TL;DR, complete with a fact-consistency score.",
    toneDirection: "authoritative",
  },
  {
    id: "scene-3-depth-sheet",
    startTime: "01:00",
    endTime: "01:10",
    startSeconds: 60,
    endSeconds: 70,
    screenTarget: "Depth Dial Sheet",
    actionSummary: "Swipe up sheet; toggle Pulse -> Context -> Deep Dive -> Action",
    speakerText:
      "Swipe up on any card to reveal the Depth Sheet. Switch from a 15-second executive pulse to a 60-second context breakdown, or dive into full structural analysis with actionable career pathways.",
    toneDirection: "informative",
  },
  {
    id: "scene-4-audio-player",
    startTime: "01:10",
    endTime: "01:22",
    startSeconds: 70,
    endSeconds: 82,
    screenTarget: "Story Page (/story/story-1)",
    actionSummary: "Click Play on Morning Pulse audio player; scrub bar animates",
    speakerText:
      "Opening the story gives you our full cognitive toolkit. Commuting to college or work? Tap play on the Morning Pulse audio player for real-time speech synthesis.",
    toneDirection: "informative",
  },
  {
    id: "scene-4-source-dna",
    startTime: "01:22",
    endTime: "01:34",
    startSeconds: 82,
    endSeconds: 94,
    screenTarget: "Source DNA & Bias Meter",
    actionSummary: "Inspect 9.6/10 credibility rating and center-bias meter",
    speakerText:
      "We fight fake news at the root with Source DNA™ — rating publisher credibility on a ten-point scale and visualizing political leanings with our bias radar.",
    toneDirection: "authoritative",
  },
  {
    id: "scene-4-ai-modal",
    startTime: "01:34",
    endTime: "01:46",
    startSeconds: 94,
    endSeconds: 106,
    screenTarget: "AI Summary Modal Tabs",
    actionSummary: "Toggle to 'No-Cap Take' & 'Career Impact', click Copy button",
    speakerText:
      "Our standout feature is the Multi-Angle AI Engine. Switch to the 'No-Cap Take' for straight talk without corporate jargon, or 'Career Impact' to see how rate cuts or tech policies create hiring opportunities. One tap copies it straight to your clipboard.",
    toneDirection: "energetic",
  },
  {
    id: "scene-4-article-links",
    startTime: "01:46",
    endTime: "01:58",
    startSeconds: 106,
    endSeconds: 118,
    screenTarget: "Dual Action Article CTA",
    actionSummary: "Hover verified Economic Times link & Google News button",
    speakerText:
      "And when you want the primary reporting? The 'Full Article' button takes you directly to the verified publisher with zero 404s, backed by a one-click Google News syndication hub.",
    toneDirection: "authoritative",
  },
  {
    id: "scene-5-blindspot-arcs",
    startTime: "01:58",
    endTime: "02:10",
    startSeconds: 118,
    endSeconds: 130,
    screenTarget: "Explore & Story Arcs (/explore, /arc/[id])",
    actionSummary: "Filter by 'Outside Your Bubble' & open 5-stage Story Arc",
    speakerText:
      "Our Blindspot Radar actively alerts you to critical events underreported in your algorithmic echo chamber, while Story Arcs connect isolated news items into continuous chronological narratives.",
    toneDirection: "informative",
  },
  {
    id: "scene-6-news-iq",
    startTime: "02:10",
    endTime: "02:22",
    startSeconds: 130,
    endSeconds: 142,
    screenTarget: "News IQ Challenge (/iq)",
    actionSummary: "Click quiz answer (turns green) & scroll to Campus Leaderboard",
    speakerText:
      "Think you’re well-informed? Prove it on News IQ. Take the weekly five-question comprehension challenge and compete on leaderboards alongside students from IITs, BITS, and Delhi University.",
    toneDirection: "motivating",
  },
  {
    id: "scene-7-profile",
    startTime: "02:22",
    endTime: "02:35",
    startSeconds: 142,
    endSeconds: 155,
    screenTarget: "User Profile (/profile)",
    actionSummary: "Showcase reading streak 🔥, saved bookmarks, and category prefs",
    speakerText:
      "Track your daily reading streak, manage your bookmarks, and customize your interests right from your profile.",
    toneDirection: "informative",
  },
  {
    id: "scene-8-outro",
    startTime: "02:35",
    endTime: "02:45",
    startSeconds: 155,
    endSeconds: 165,
    screenTarget: "Responsive Frame & Live URL",
    actionSummary: "Zoom out to responsive device mockups and show vercel URL",
    speakerText:
      "Gen Z Pulse is live in production right now at gen-z-pulse-kappa.vercel.app. Fast, verified, and built for how our generation actually consumes information. Try it today!",
    toneDirection: "outro",
  },
];
