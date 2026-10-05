# Gen Z Pulse — Production Readiness Plan

## Objective
Transition Gen Z Pulse from a high-fidelity front-end prototype (mock data, local state) into a fully functional, scalable production application ready for real users, real payments, and live news data.

---

## Phase 1: Real Database & Content Management (Backend)
Currently, all stories, arcs, and News IQ questions are hardcoded in `src/data/stories.ts`.
* **Action:** Setup **Supabase (PostgreSQL)** as our database.
* **Architecture:**
  * `stories` table: Stores headline, 60-word summary, deep dive content, category, and source DNA.
  * `arcs` table: Tracks ongoing news timelines (e.g., "The AI Boom").
  * `news_iq` table: Stores the weekly quiz questions and answers.
* **CMS / Ingestion:** Create a hidden admin panel (or simple API route) where our editorial team can publish new stories, bypassing the need for code updates.

## Phase 2: Real Authentication & Identity
Currently, `AuthContext.tsx` just toggles a boolean variable in local React state.
* **Action:** Integrate **Supabase Auth**.
* **Flow:**
  * Implement an Email/Password and Google OAuth login screen.
  * Protect the `/profile` page—users must log in to view saved stories, campus referrals, and their News IQ leaderboard standing.
  * **Role-Based Access Control (RBAC):** Assign `admin` roles to protect the Investor Data Room, and `b2b` roles to protect the Brands Dashboard.

## Phase 3: Real Payments (Razorpay Integration)
Currently, clicking "Subscribe" just shows a JavaScript alert and upgrades the local state.
* **Action:** Integrate the real **Razorpay Node.js SDK**.
* **Architecture:**
  * Build a secure Next.js API route (`/api/checkout`) to generate a Razorpay Order ID.
  * Open the actual Razorpay payment gateway modal in the browser.
  * Build a Webhook endpoint (`/api/webhooks/razorpay`) to listen for successful payments and securely update the user's `isPro` status in Supabase.

## Phase 4: Live Data & AI Pipelines
Currently, Bias Meter scores and Audio deep-dives are static.
* **Action:** Hook up real AI integrations.
* **Audio:** Connect **ElevenLabs API** to dynamically generate the "Morning Pulse" audio when a new story is published to the database.
* **Bias/Source DNA:** Optionally connect an LLM (like Gemini or OpenAI) to auto-score incoming news articles for bias and credibility before the editorial team approves them.

## Phase 5: Production Analytics & Hosting
Currently, `src/lib/analytics.ts` just prints to the developer console.
* **Action:** Integrate **PostHog** or **Mixpanel**.
* Replace the `console.log` trackers with real network requests to track DAU, paywall hits, and conversion rates.
* **Deployment:** Deploy the frontend to **Vercel** with custom domain routing (`gengpulse.com`), connecting it securely to the production Supabase database.

---
**Approval Request:**
Does this production plan align with your vision? If approved, we will begin with **Phase 1 & 2** (Setting up the Supabase Database and Real Authentication).
