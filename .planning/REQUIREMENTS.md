# Gen Z Pulse — REQUIREMENTS.md

## Functional Requirements

### FR-001: News Feed
- System shall display personalized curated news stories in a card-based feed
- Each card shall show: headline, source, time, category tag, and 60-word summary
- Feed shall support infinite scroll with pagination (10 stories per load)
- Feed shall support pull-to-refresh

### FR-002: Depth Dial
- Every story shall have 3 reading depth levels: Surface (60w), Context (300w), Deep Dive (1500w+)
- User can toggle depth via a slider control within the story view
- Selected depth preference shall be remembered per user session

### FR-003: Story Arc
- Stories belonging to the same ongoing event shall be grouped into a Story Arc
- Story Arc UI: horizontal timeline showing Breaking → Developing → Resolved → Impact
- Users can subscribe to a Story Arc and receive updates via push notification

### FR-004: Morning Pulse Audio
- System shall generate a personalized 4-minute audio news briefing daily
- Audio shall be generated using ElevenLabs TTS from curated story summaries
- Available before 10 AM local time; downloadable for offline use
- Voice options: Calm / Energetic / Conversational

### FR-005: News IQ Mode
- After reading 5 stories, system presents a 3-question comprehension quiz
- Correct answers increment weekly News IQ score (0-100)
- Score card is shareable as an image (Instagram/WhatsApp)
- Weekly college leaderboard displayed in app

### FR-006: Blindspot Feed
- System shall analyze reading history and detect topic gaps
- 2-3 stories outside the user's regular interest clusters surfaced daily
- Each Blindspot story labeled with reason: "Outside Your Bubble"

### FR-007: Action Pathways
- Each story shall show 3 actionable cards: Learn More / Career Angle / Take Action
- Action links verified and curated by editorial team

### FR-008: Bias Meter + Source DNA
- Each story shall display: Credibility Score (0-10) + Political Lean + Ownership info
- Multi-perspective mode: show how Left/Center/Right outlets covered same event

### FR-009: Authentication
- Users can sign up with email or Google OAuth
- JWT-based session management via Supabase Auth
- Premium subscription status stored and checked server-side

### FR-010: Subscriptions
- Free tier: 5 stories/day, no audio, no Blindspot Feed
- Premium: Rs.49/month or Rs.499/year via Razorpay
- Annual plan shows Rs.100 savings vs monthly

## Non-Functional Requirements

### NFR-001: Performance
- First Contentful Paint < 1.5s on 4G connection
- Story feed load < 500ms (Redis cache layer)
- Audio generation < 30s overnight batch

### NFR-002: Accessibility
- WCAG AA compliant (contrast ratio 4.5:1 minimum)
- Screen reader support (ARIA labels on all interactive elements)
- prefers-reduced-motion respected (all animations skippable)

### NFR-003: Privacy & Data
- DPDPA (India) compliant
- No third-party ad tracking
- User reading history stored locally by default, optional cloud sync
- Explicit consent for personalization data use

### NFR-004: Security
- HTTPS everywhere
- Input sanitization on all API endpoints
- Rate limiting: 100 req/min per IP on public endpoints
- No PII in logs

### NFR-005: Availability
- 99.5% uptime SLA for web app
- Graceful degradation: app shows cached stories when API is unavailable

## Design Requirements

### DR-001: Design System
- Primary font: Space Grotesk (headings, bold, impactful)
- Body font: Epilogue (readable, modern)
- Dark base: #0A0A0F
- Pulse Red: #FF2D55 (CTAs, breaking news, energy)
- Electric Purple: #7C3AED (premium features, depth)
- Neon Green: #10F5A0 (positive signals, IQ scores, action)
- All colors WCAG AA compliant on dark background

### DR-002: Animation
- Framer Motion for all web animations
- Spring physics (stiffness: 300, damping: 30) for card interactions
- Kinetic text reveals for headlines (stagger 0.015s per char)
- Story card entrance: slide-up + fade (y: 20 → 0, opacity: 0 → 1)
- Depth Dial: smooth height expansion (spring, no layout thrashing)

### DR-003: Responsive
- Mobile-first: 375px base, 768px tablet, 1024px desktop
- Bottom navigation on mobile (max 5 items)
- No horizontal scroll at any breakpoint
