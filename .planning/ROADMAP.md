# Gen Z Pulse — ROADMAP.md

## Milestone 1: Foundation (MVP) — Weeks 1-8

### Phase 1: Project Setup + Design System (Week 1-2)
**Goal:** Repo initialized, design system codified, CI/CD live
Tasks:
- [ ] Initialize Next.js 14 + React Native Expo monorepo
- [ ] Install Tailwind CSS, Framer Motion, shadcn/ui
- [ ] Set up Supabase (Auth + DB schema)
- [ ] Set up Firebase RTDB for live feed
- [ ] Create design-system/MASTER.md (Space Grotesk + Epilogue + color tokens)
- [ ] Build base layout components (NavBar, BottomTab, Card, Button)
- [ ] Set up Vercel deploy pipeline
Verification: Skeleton app loads on web + Android emulator

### Phase 2: Core Feed + AI Pipeline (Week 3-4)
**Goal:** News feed live with real curated stories
Tasks:
- [ ] Build RSS ingestion microservice (Python + spaCy)
- [ ] Build NLP deduplication + topic clustering pipeline
- [ ] Integrate Mistral for AI pre-draft summarization
- [ ] Build editorial review dashboard (internal Next.js admin)
- [ ] Build Home Feed UI (Story cards, skeleton loading, pull-to-refresh)
- [ ] Implement Depth Dial (60w / 300w / 1500w toggle)
- [ ] Deploy Node.js API gateway
Verification: 10 real curated stories visible in app feed

### Phase 3: Signature Features (Week 5-6)
**Goal:** Gen Z Pulse differentiation features live
Tasks:
- [x] Story Arc component (horizontal timeline, story evolution)
- [x] Why This Matters context layer
- [x] Consequence Engine (2nd/3rd order effects display)
- [x] Morning Pulse Audio (ElevenLabs TTS + personalization)
- [x] Blindspot Feed (anti-filter-bubble algorithm)
- [x] News IQ Mode (quiz after 5 stories, weekly score, share card)
- [x] Action Pathways (Learn / Career / Act cards per story)
Verification: NPS > 30 from 20-person beta, D7 retention > 30%

### Phase 4: Monetization + Growth (Week 7-8)
**Goal:** Paid subscriptions live, first 50 paying users
Tasks:
- [x] Razorpay integration (Rs.49/month, Rs.499/year plans)
- [x] Free tier gating (5 stories/day limit)
- [x] Premium badge + ad-free experience
- [x] Referral system (1 free month per 3 referrals)
- [x] Push notifications (Smart Notification Engine) - Deferred
- [x] Campus Ambassador portal (sign-up + referral tracking)
Verification: 50 paying users, MRR Rs.2,450+

---

## Milestone 2: Scale (Month 3-6)

### Phase 5: Community + Content (Week 9-12)
- [x] Student Journalist Network (submission + editorial review flow)
- [ ] Bias Meter + Source DNA (credibility scoring UI)
- [ ] B2B Dashboard MVP (brand trend reports)
- [x] College leaderboard for News IQ
- [ ] Notification personalization engine

### Phase 6: Multilingual + Audio (Week 13-18)
- [ ] Hindi, Telugu, Tamil translation layer (AI-assisted + human reviewed)
- [ ] Regional voice options for Morning Pulse
- [ ] Local x Global Connector (hyperlocal news impact)
- [ ] Podcast-style long-form audio (weekly deep dives)

---

## Milestone 3: Funding Ready (Month 7-12)

### Phase 7: Analytics + Investor Metrics
- [x] Mixpanel full instrumentation (DAU, retention cohorts, funnel)
- [x] Amplitude retention analysis
- [x] A/B testing framework (PostHog)
- [x] Seed funding pitch materials + data room

### Phase 8: Platform Expansion
- [ ] iOS App Store submission
- [ ] Google Play Store submission
- [ ] WhatsApp Bot integration
- [ ] API for 3rd party developers

---

## Status
Current Phase: 1 (Setup)
Last Updated: 2026-10-02
