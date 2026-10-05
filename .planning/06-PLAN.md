# Gen Z Pulse — Phase 6 Plan (Advanced Content & Credibility)

## Objective
Establish Gen Z Pulse as the most trustworthy news platform for Gen Z by introducing "Source DNA" credibility scoring. Simultaneously, open a new revenue stream by launching the MVP of our B2B Brand Trend Dashboard.

## 1. Source DNA (Credibility Scoring UI)
- **Task 1.1:** Extend the story details view (`/story/[id]`) to include a "Source DNA" section.
- **Task 1.2:** Design a "Credibility Score" (e.g., 92/100) based on factors like:
  - Publisher Track Record
  - Primary Source Citations
  - Fact-Check Verification
- **Task 1.3:** Build an interactive component that lets users tap to see *why* a story received its credibility score, integrating seamlessly with the existing Bias Meter.

## 2. B2B Dashboard MVP (Brand Trend Reports)
- **Task 2.1:** Create a new protected route `/b2b` (or `/brands`) serving as the B2B portal.
- **Task 2.2:** Build a data-rich dashboard tailored for brand marketers (e.g., Zomato, Nike, Netflix).
- **Task 2.3:** Include key widgets:
  - **Gen Z Attention Index:** What topics/arcs are dominating screen time.
  - **Sentiment Analysis:** How Gen Z feels about specific news arcs (Positive/Neutral/Negative).
  - **Demographic Split:** Breakdowns by College/Region (mock data).
- **Task 2.4:** Style the dashboard with a slightly more professional, enterprise-grade variation of our dark-mode glassmorphism design system.

## 3. State & Roadmap Updates
- **Task 3.1:** Update `ROADMAP.md` to reflect the completion of these Advanced Content / Ecosystem tasks.
- **Task 3.2:** Mark Phase 6 as complete in `STATE.md`.

---
**Verification Requirements:**
- A user can view the Source DNA credibility breakdown on a story page.
- A user can navigate to `/b2b` and view the Brand Trend Reports dashboard.
