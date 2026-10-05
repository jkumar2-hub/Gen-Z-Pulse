# Gen Z Pulse — Phase 7 Plan (Analytics + Investor Metrics)

## Objective
Instrument the application to capture core engagement metrics (DAU, session length, feature usage) and expose these metrics via an "Investor Data Room" dashboard to prove product-market fit and retention.

## 1. Analytics Instrumentation Layer
- **Task 1.1:** Create `src/lib/analytics.ts` implementing a mock event tracking system (`trackEvent`, `identifyUser`).
- **Task 1.2:** Instrument key flows across the app:
  - Deep Dive read (`Story_Read`)
  - Paywall hit (`Paywall_Hit`)
  - Pro Subscribe (`Checkout_Completed`)
  - News IQ Quiz completion (`IQ_Quiz_Completed`)
- **Task 1.3:** Output events visually in the browser console for developer/demo visibility.

## 2. Investor Data Room Dashboard (`/admin/investor`)
- **Task 2.1:** Build a highly polished, locked-down dashboard at `/admin/investor` aimed at VCs.
- **Task 2.2:** Design CSS/Framer Motion powered charts for:
  - Daily Active Users (DAU) Growth.
  - Week 1-4 Retention Cohorts.
  - Conversion Funnel (Visitor -> Free Tier -> Pro).
- **Task 2.3:** Add an "Export Pitch Deck Data" button (mock).

## 3. State & Roadmap Updates
- **Task 3.1:** Update `ROADMAP.md` and `STATE.md` to mark Phase 7 as complete.

---
**Verification Requirements:**
- Clicking on a story, taking the quiz, or subscribing logs color-coded events in the developer console.
- The `/admin/investor` dashboard renders a stunning data visualization UI showcasing Gen Z Pulse's growth metrics.
