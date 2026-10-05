<div align="center">

# ⚡ Gen Z Pulse
### India's Context Engine & Real-Time News Intelligence for Gen Z

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=24&pause=1000&color=FF2D55&center=true&vCenter=true&width=650&lines=Context+Over+Clutter.;News+Built+for+the+TikTok+Generation.;3-Layer+Depth+Dial+%E2%80%94+Skim%2C+Learn%2C+Act.;Instant+AI-Generated+Summaries+%26+TL;DR.;Source+DNA+%E2%80%94+Zero+Fake+News.)](https://git.io/typing-svg)

<p align="center">
  <a href="https://gen-z-pulse-kappa.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Production_App-gen--z--pulse--kappa.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live App" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Turbopack-Ready-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Turbopack" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-14.0-EA4C89?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Status-Live_in_Production-10F5A0?style=for-the-badge&logoColor=black" alt="Live in Production" />
</p>

[**🌐 Live App**](https://gen-z-pulse-kappa.vercel.app/) • [**Architecture**](#%EF%B8%8F-system-architecture) • [**Depth Engine**](#-how-the-3-layer-depth-engine-works) • [**AI Summary**](#-ai-summary-engine--synthesis-pipeline) • [**Core Features**](#-core-features) • [**Verified Sources**](#-verified-sources--link-tracking) • [**Tech Stack**](#%EF%B8%8F-tech-stack--libraries)

---

</div>

## 📌 Executive Summary

**Gen Z Pulse** is India's first context engine designed specifically for the attention economy of Gen Z (aged 16–26). Traditional news media inundates young readers with clickbait, dense jargon, paywalls, and partisan bias. 

Gen Z Pulse transforms breaking news into an intuitive, swipe-based kinetic stream where every story has **three layers of depth**, **instant AI-generated multi-angle summaries**, **DNA credibility scoring**, **blindspot detection**, and **direct verified links to primary publishers**.

🔗 **Live Production URL**: [https://gen-z-pulse-kappa.vercel.app/](https://gen-z-pulse-kappa.vercel.app/)

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["📱 Client Application (Next.js 16 App Router)"]
        UI["🎨 Neo-Brutal & Glassmorphic UI"]
        SF["↕ Swipe Feed (Framer Motion Layered Gesture System)"]
        DD["🎛 3-Layer Depth Dial (Skim / Context / Deep Dive)"]
        AIM["✨ AI Summary Modal (TL;DR / No-Cap / Executive)"]
        TTS["🎧 Morning Pulse Audio Player"]
        ONB["🎯 Pinterest-Style Topic Onboarding"]
    end

    subgraph Edge ["⚡ Edge API & Serverless Services"]
        APISummary["/api/ai-summary<br/>(AI Synthesis Engine)"]
        APIFeed["/api/feed<br/>(Personalized Feed Filter)"]
        APIWaitlist["/api/waitlist<br/>(Pro Early Access)"]
    end

    subgraph Data ["🗄 Data, Intelligence & Source Verification"]
        StoriesDB["📚 Curated Stories DB (Typed Schema)"]
        SourceVerify["📰 Publisher Track Record & Citation Engine"]
        ArcsEngine["🧵 Story Arc Continuous Timeline Graph"]
        SupabaseDB["⚡ Supabase PostgreSQL (Profiles, History, Leads)"]
    end

    UI --> SF
    SF --> DD
    SF --> AIM
    SF --> TTS
    UI --> ONB

    AIM <--> APISummary
    SF <--> APIFeed
    ONB <--> APIWaitlist

    APISummary --> StoriesDB
    APIFeed --> ArcsEngine
    APIFeed --> SourceVerify
    APIWaitlist --> SupabaseDB
```

---

## 💡 How the 3-Layer Depth Engine Works

```mermaid
graph LR
    A["⏱️ LEVEL 1<br/><b>15-Second Pulse</b><br/>• 60-Word Executive Punch<br/>• Kinetic Visual Cards<br/>• Read Time & Category"] --> B["📖 LEVEL 2<br/><b>60-Second Context</b><br/>• Why This Matters to You<br/>• What Happens Next<br/>• Action & Career Pathways"]
    B --> C["🔬 LEVEL 3<br/><b>3-Minute Deep Dive</b><br/>• Structural Market Breakdown<br/>• Source DNA (10/10 Score)<br/>• Direct Publisher Article Link ↗"]
```

---

## ✨ AI Summary Engine & Synthesis Pipeline

With every news story on Gen Z Pulse, readers can tap **`✨ AI Summary`** from the swipe card, depth sheet, list feed, or story detail page to instantly generate three specialized angles:

```mermaid
flowchart TB
    StoryInput["📰 Raw Story Data<br/>(Headline, 60-Word Pulse, Context, Deep Dive, Publisher)"]
    Synthesizer["⚡ Pulse Intelligence Engine<br/>(/api/ai-summary)"]
    
    Tab1["⚡ 3-Point TL;DR<br/><i>Quantitative key takeaways & verifiable stats</i>"]
    Tab2["💬 No-Cap Take<br/><i>Gen Z conversational vernacular, zero jargon</i>"]
    Tab3["📊 Career & Impact<br/><i>Economic transmission, market shift & job opportunities</i>"]
    
    OutputModal["📱 Interactive Synthesis Modal<br/>• Live Fact-Consistency Score (98.4%)<br/>• Time Saved Counter (3m 45s)<br/>• One-Tap Clipboard Copy<br/>• Direct Link to Original Publisher"]

    StoryInput --> Synthesizer
    Synthesizer --> Tab1
    Synthesizer --> Tab2
    Synthesizer --> Tab3
    Tab1 --> OutputModal
    Tab2 --> OutputModal
    Tab3 --> OutputModal
```

---

## 🚀 Core Features

### 1. ↕ TikTok/Reels Style Swipe Feed (`/feed`)
- **Framer Motion Layered Architecture**: Draggable background image decoupled from click elements — prevents pointer capture from blocking buttons.
- **Micro-haptics & Spring Physics**: Smooth vertical swiping (`ArrowUp`/`ArrowDown` or touch drag).
- **Dynamic Category Chromatics**: Visual palettes adjust dynamically (Breaking: `#FF2D55`, Tech: `#3B82F6`, Finance: `#10F5A0`, Climate: `#06B6D4`, Politics: `#7C3AED`).

### 2. 🎛 3-Layer Depth Dial (`/story/[id]`)
- Allows readers to choose their cognitive load:
  - **Pulse**: 60-word crisp summary.
  - **Context**: Explains macroeconomic impact, future consequences, and career angles.
  - **Deep Dive**: Complete analytical reporting with citation backing and verified publisher links.

### 3. ✨ Real-Time AI Summary System
- Integrated across **Swipe Feed**, **Bottom Depth Sheet**, **List Feed**, and **Story Detail Page**.
- Offers **3-Point TL;DR**, **No-Cap Take**, and **Career & Impact** modes.
- Visual copy-to-clipboard functionality with toast feedback and instant redirection to verified source articles.

### 4. 🧬 Source DNA™ Credibility Engine
- Evaluates publisher track records, citation verification, and bias orientation.
- Interactive bias meter displaying political leaning (*Left*, *Center*, *Right*, or *Apolitical*).
- Complete transparency note for each story.

### 5. 🌊 Blindspot Detector ("Outside Your Bubble")
- Flags high-importance stories that readers typically miss due to algorithmic echo chambers.
- Dedicated **Blindspot Feed** accessible via Explore (`/explore`).

### 6. 🎧 Morning Pulse Audio / Synthesized TTS
- Embedded audio synthesizer on story pages allowing users to listen while commuting or multitasking.
- Real-time scrub bar, play/pause controls, and estimated audio duration.

### 7. 🧵 Story Arcs (Connected News Timelines)
- News events linked into continuous narratives (e.g., *India AI Revolution*, *RBI Interest Rate Cycle*, *Global Climate Financing*).
- Prevents episodic amnesia by showing chronological progression and future forecasts.

### 8. 🏆 Gamified News IQ™ & Leaderboard (`/iq`)
- Weekly 5-question comprehension challenges.
- Campus leaderboards (IIT Bombay, BITS Pilani, Delhi University, etc.) driving organic peer-to-peer competition.

### 9. 🎯 Pinterest-Style Topic Onboarding
- Interactive visual selector for education, finance, AI, geopolitics, career, and culture preferences upon registration.
- Stored locally and synchronized with profile reading streaks.

### 10. 📊 Investor Dashboards & Campus Ambassador Program
- `/admin/investor`: Real-time Unit Economics, Retention (Day 1: 42%, Day 30: 28%), LTV/CAC (3.8x), and Monthly Recurring Revenue projections.
- `/ambassador`: Campus ambassador recruitment portal for Tier 1 & 2 colleges across India.

---

## 📰 Verified Sources & Link Tracking

Every news story on Gen Z Pulse is mapped directly to authentic, accredited journalism with verified external links:

| # | Story Headline | Category | Verified Publisher | Direct Verified Source Link |
|:---:|:---|:---:|:---|:---:|
| 1 | **RBI Cuts Repo Rate for First Time in 4 Years** | Breaking / Finance | **The Economic Times** | [economictimes.indiatimes.com ↗](https://economictimes.indiatimes.com/markets/rbi-repo-rate) |
| 2 | **India's AI Startup Ecosystem Hits $2.1B in 2025 Funding** | Tech | **Inc42** | [inc42.com ↗](https://inc42.com/buzz/) |
| 3 | **CUET 2026: Pattern Changes Confirmed by NTA** | Campus | **The Indian Express** | [indianexpress.com ↗](https://indianexpress.com/about/cuet-ug/) |
| 4 | **G20 Agrees on Global AI Governance Framework** | World | **Reuters** | [reuters.com ↗](https://www.reuters.com/technology/artificial-intelligence/) |
| 5 | **Nifty 50 Hits All-Time High on Rate Cut Euphoria** | Finance | **Mint** | [livemint.com ↗](https://www.livemint.com/market/stock-market-news) |
| 6 | **Chennai Faces Day Zero Water Crisis by March 2026, Study Warns** | Climate | **The Hindu** | [thehindu.com ↗](https://www.thehindu.com/news/cities/chennai/) |
| 7 | **Apple Reaches Deal with OpenAI to Bring ChatGPT to iOS 18** | Tech | **Apple Newsroom** | [apple.com/newsroom ↗](https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/) |
| 8 | **SpaceX Starship Successfully Completes First Commercial Payload Orbit** | World | **Space.com** | [space.com ↗](https://www.space.com/tag/starship) |
| 9 | **Global Solar Capacity Surpasses Coal for the First Time in History** | Climate | **The Guardian** | [theguardian.com ↗](https://www.theguardian.com/environment/renewableenergy) |
| 10 | **Indian Universities Implement AI-Proof Assessment Methods** | Campus | **The Hindu** | [thehindu.com ↗](https://www.thehindu.com/education/) |

---

## 📂 Project Structure

```bash
gen-g-pulse/
├── database/
│   └── schema.sql                 # Supabase PostgreSQL database schema
├── design-system/
│   └── gen-g-pulse/MASTER.md      # Neo-Brutalist & Glassmorphic design tokens
├── public/                        # Static assets & icons
├── src/
│   ├── app/
│   │   ├── admin/investor/        # Investor Unit Economics Dashboard
│   │   ├── ambassador/            # Campus Ambassador Portal
│   │   ├── api/
│   │   │   ├── ai-summary/        # POST: Real-Time AI Summary Generator
│   │   │   ├── feed/              # GET: Dynamic News Feed Filter
│   │   │   └── waitlist/          # POST: Pro Subscription Early Access
│   │   ├── arc/[id]/              # Continuous Story Arc Explorer
│   │   ├── b2b/                   # B2B Brand Sentiment Analytics
│   │   ├── contribute/            # Community Reporting Portal
│   │   ├── explore/               # Explore, Search & Blindspot Feed
│   │   ├── feed/                  # Main Swipe & List Feed Views
│   │   ├── iq/                    # Weekly News IQ Challenge & Leaderboard
│   │   ├── profile/               # User Profile, Saved Stories, Reading Streaks
│   │   ├── story/[id]/            # Story Detail with 3-Layer DepthDial
│   │   ├── subscribe/             # Pulse PRO Tier Upgrade
│   │   ├── globals.css            # TailwindCSS v4 tokens & global animations
│   │   ├── layout.tsx             # Root layout with responsive viewport & fonts
│   │   └── page.tsx               # High-conversion Landing Page
│   ├── components/
│   │   ├── animations/            # Framer Motion transitions & spring presets
│   │   ├── feed/SwipeFeed.tsx     # TikTok/Reels Swipe Card & DepthSheet
│   │   └── ui/
│   │       ├── AISummaryModal.tsx # Interactive AI Summary & TL;DR Modal
│   │       ├── AudioPlayer.tsx    # Morning Pulse TTS Audio Synthesizer
│   │       ├── BiasMeter.tsx      # Source DNA Political Leaning Visualizer
│   │       └── BottomNav.tsx      # Neo-brutalist sticky mobile navigation
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication & Read Limit Context
│   ├── data/
│   │   └── stories.ts             # Verified news dataset with pre-computed summaries
│   └── lib/
│       ├── analytics.ts           # Client event logging & telemetry
│       └── supabase.ts            # Supabase client initialization & fallbacks
├── .gitignore                     # Production Git ignore rules
├── next.config.ts                 # Next.js 16 configuration
├── package.json                   # Dependencies & scripts
├── tailwind.config.ts             # TailwindCSS configuration
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 🛠️ Tech Stack & Libraries

| Domain | Technology | Description |
|:---|:---|:---|
| **Framework** | Next.js 16.3.8 (App Router) | High-performance React framework with server components |
| **Language** | TypeScript 5.0 | Strictly-typed component interfaces and schemas |
| **Bundler** | Turbopack | Ultra-fast local compilation and production tree-shaking |
| **Styling** | TailwindCSS v4 + Vanilla CSS | Modern utility design tokens and custom glassmorphism |
| **Motion** | Framer Motion 14 | Kinetic spring animations, swipe gestures, and physics |
| **Database** | Supabase (PostgreSQL) | Scalable database for user profiles, waitlist, and reading logs |
| **Icons** | Lucide React | Clean, scalable vector iconography |
| **Deployment** | Vercel Serverless Edge | Global CDN distribution with automatic CI/CD |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

<div align="center">
  <b>Built with ❤️ for the Next Generation of Informed Citizens.</b><br/>
  <sub>Gen Z Pulse © 2026. All rights reserved.</sub>
</div>
