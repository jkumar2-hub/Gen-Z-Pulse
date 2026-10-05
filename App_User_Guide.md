# Gen Z Pulse — Complete Application Guide

This document serves as the master reference for all features, buttons, and mechanics built into the Gen Z Pulse demo application, mapping them directly to the original strategy provided in the product case study.

---

## 📱 Part 1: Feature & Button Guide

### 1. The Landing Page (`/`)
The entry point of the application, designed to showcase the value proposition.
* **"Start Swiping" Button:** Immediately prompts the user to join the waitlist or log in. (Protected by the AuthWall).
* **"Watch Demo" Button:** Currently opens a UI placeholder for a marketing video. 
* **What's Happening (News Previews):** Displays the top 4 news stories with a strict 2-line summary constraint. Clicking any story triggers the AuthWall, enforcing the "login-first" policy.
* **Reliability:** Fully functional UI, responsive on all devices. Authentication is mocked via `localStorage` for the demo.

### 2. Authentication Wall (AuthWall)
* **Location:** Appears instantly if an unauthenticated user tries to click away from the landing page.
* **"Join Waitlist" / "Login" Toggle:** Switches the modal state.
* **"← Back" Button:** Added to the top-left to allow users to return to the landing page if they get stuck.
* **Reliability:** Demo-functional. It uses a mocked timeout to simulate API latency before logging the user in and saving their session to `localStorage`.

### 3. The Swipe Feed (`/feed`)
The core consumption engine, combining social media engagement with journalistic integrity.
* **Swipe Gestures:** Swipe left/right or up/down (simulated via Framer Motion) to quickly cycle through 60-word news briefs.
* **Depth Dial™ Button:** A button on the news card that expands the 60-word brief into a 300-word "Why it matters" context, and a 1500-word deep dive.
* **Source DNA / Bias Meter:** A visual indicator showing the political lean (Left/Center/Right) and credibility score of the publisher.
* **Audio TTS Button:** A play icon that initiates an AI-generated audio digest of the article.
* **Reliability:** High-fidelity UI prototype. Data is currently pulled from a static mock file (`src/data/stories.ts`) rather than a live news API. Swipe mechanics and Depth Dial state are fully functional.

### 4. Explore & Discovery (`/explore`)
* **Category Pills:** Horizontal scrolling buttons (Tech, Business, Politics) that instantly filter the news feed.
* **Blindspot Feed Toggle:** A specialized switch that overrides the user's preferences to show them highly-rated stories from opposing viewpoints to burst their filter bubble.
* **Search Bar:** Real-time text filtering against story headlines and summaries.
* **Reliability:** Fully functional local filtering based on the mock data array.

### 5. News IQ™ (`/iq`)
The gamification engine that drives retention and viral campus growth.
* **Weekly Quiz Cards:** Multiple-choice questions dynamically generated based on the week's top stories.
* **Scoring System:** Users are timed, and correct answers contribute to their personal score and their College's leaderboard rank.
* **Reliability:** Fully functional state-machine for the quiz logic. Questions are hardcoded for the demo.

### 6. Profile & Settings (`/profile`)
* **Daily Streak (🔥):** Visual tracking of consecutive days read.
* **Campus Ambassador Card:** A referral link component encouraging users to invite 3 friends to earn "Pulse PRO" for free.
* **Toggle Theme (🌓):** Located at the bottom next to "Log out." Flips the entire application into a crisp Light Mode using CSS inversion, without breaking image colors.
* **Admin Demo Login (Secret Button):** A tiny, hidden `admin_demo` text button at the very bottom. Clicking it instantly elevates the user to Admin status, revealing hidden dashboards.
* **Reliability:** Functional UI. The Theme Toggle and Admin State accurately manipulate the DOM and React Context.

### 7. B2B & Admin Dashboards (Hidden)
* **Pulse Brands B2B (`/b2b`):** A dashboard showing aggregated Gen Z sentiment, swipe velocity, and dwell time.
* **Investor Data Room (`/admin/investor`):** A dashboard visualizing User Acquisition Cost (CAC), Lifetime Value (LTV), and conversion metrics.
* **Reliability:** Uses `recharts` to render beautiful, interactive data visualizations. Data is mocked for the presentation.

---

## 🧬 Part 2: How the Case Study was Embedded

The foundational PDF / Case Study provided a clear mandate: **"Stay informed without feeling overwhelmed,"** merging social media speed with journalistic depth. Here is exactly how that strategy was engineered into the app:

1. **Short-Form & Context Balance:** 
   The case study requested "Short-form news" AND "Context behind the news". We achieved this seemingly contradictory goal by engineering the **Depth Dial™**. Users are served the 60-second brief by default (speed), but can tap to read "Why It Matters" (context) without leaving the feed.
   
2. **Combating Fake News:**
   The mandate for "Source verification" and showing "Fact or Opinion" was directly translated into the **Source DNA** UI. By attaching a Bias Meter and Credibility Score to the bottom of *every* card, we fulfilled the requirement of proving reliability at a glance.

3. **Behavioral Personalization vs. Filter Bubbles:**
   The case study noted that personalization should learn from "Dwell time, Swipe behavior, and Deep-dive taps." We built the analytics tracking engine (`src/utils/analytics.ts`) to capture these exact metrics. However, to prevent toxic echo chambers, we proactively added the **Blindspot Feed** (News You Should Know) to ensure algorithmic responsibility.

4. **Monetization & B2B Integration:**
   The strategy outlined premium subscriptions and B2B institutional data. We embedded this by building a **Pulse PRO Paywall** (triggering after 5 free reads) and engineering the **Pulse Brands** dashboard, proving to investors that Gen Z Pulse isn't just an app—it's a highly monetizable data engine.

5. **Gamified Growth Engine:**
   To secure organic growth (as outlined in the development path), we embedded the **News IQ™** system and the **Campus Ambassador** referral loop directly into the user profile, turning news consumption into a competitive, viral social status symbol among college students.
