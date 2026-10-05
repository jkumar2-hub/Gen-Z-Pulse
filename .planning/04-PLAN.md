# Gen Z Pulse — Phase 4 Plan (Monetization & Growth)

## Objective
Convert the engaging free product into a sustainable business by introducing premium subscriptions (Gen Z Pulse Pro), free-tier gating, and viral growth mechanisms like referrals and the Campus Ambassador portal.

## 1. Razorpay Integration & Premium Gating
- **Task 1.1:** Setup Razorpay test keys and install the `razorpay` Node SDK.
- **Task 1.2:** Create a `/api/checkout` route to generate Razorpay orders for ₹49/month and ₹499/year plans.
- **Task 1.3:** Create a `/pro` or `/subscribe` page with a high-converting pricing table using Framer Motion.
- **Task 1.4:** Update `AuthContext` to track `isPro` status.
- **Task 1.5:** Implement Free Tier Gating: limit free users to reading 5 full stories per day using a `readStories` counter in `localStorage` or AuthContext. When the limit is hit, trigger the paywall modal.

## 2. Growth: Referral System & Ambassador Portal
- **Task 2.1:** Create a `ReferralCard` component to go inside the Profile page, offering "1 Free Month per 3 Referrals" with a unique invite link.
- **Task 2.2:** Build `/ambassador` page for the Campus Ambassador program, featuring sign-up, benefits, and a leaderboard UI.

## 3. Push Notifications Engine (UI)
- **Task 3.1:** Create a slick, animated "Enable Notifications" modal that pops up after the user completes their 3rd story.
- **Task 3.2:** Add a `NotificationBell` to the top navigation that opens a dropdown of latest breaking news alerts.

## 4. State & Roadmap Updates
- **Task 4.1:** Mark Phase 4 tasks as complete in `ROADMAP.md` and `STATE.md`.

---
**Verification Requirements:**
- Paywall triggers when a non-Pro user clicks more than 5 stories.
- `/subscribe` page renders the Razorpay mock checkout button.
- Ambassador portal is accessible and visually aligned with the neo-brutalist brand.
