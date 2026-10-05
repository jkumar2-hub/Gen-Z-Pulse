# Gen Z Pulse — Business & Analytics Dashboards

This document explains the two hidden administrative dashboards within Gen Z Pulse: **Pulse Brands (B2B)** and the **Investor Data Room**. These dashboards represent the core monetization and growth-tracking engines of the startup.

---

## 🏢 1. Pulse Brands (The B2B Dashboard)

**Target Audience:** Marketing agencies, consumer brands (Nike, Zomato, Apple), and market researchers.
**The Value Proposition:** Gen Z Pulse collects high-fidelity, real-time behavioral data based on how users swipe, read, and engage with the news. Pulse Brands sanitizes and aggregates this data, allowing corporate clients to pay for access to "Gen Z Sentiment."

### Dashboard Sections Explained:

* **Gen Z Attention Index (Header Metrics):**
  * **Active Readers:** Shows the live concurrent users engaging with the app.
  * **Total Deep Dives:** Tracks how many users tapped the "Depth Dial" to read beyond the 60-word summary. High numbers here indicate high engagement.
  * **Avg Session Time:** Tracks how long users stay in the app per session. An 8+ minute session time proves the swipe UI is highly addictive and effectively retains attention.

* **Trending Story Arcs:**
  * Rather than listing individual news articles, this section groups news into broader cultural events (e.g., "AI in Bangalore", "Fast Fashion Backlash").
  * **Demographics:** Shows exactly *who* is driving this trend (e.g., Campus students, 18-24).
  * **Sentiment Score / Bias Bar:** A visual indicator (Positive/Neutral/Negative) representing how the demographic feels about the topic. If "Fast Fashion" shows a 28% Negative score, a clothing brand knows they need to adjust their marketing strategy immediately.
  * **View Deep Dive Button:** In production, this opens a massive, multi-page data analytics report on that specific cultural trend.

* **API Access (Enterprise CTA):**
  * An upsell section at the bottom prompting brands to pay for API keys so they can pipe this raw sentiment data directly into their own internal business intelligence (BI) tools.

---

## 📈 2. Investor Data Room

**Target Audience:** Venture Capitalists (VCs), Angel Investors, and internal stakeholders.
**The Value Proposition:** Investors need proof that a cool consumer app can actually make money. The Data Room visualizes the unit economics and cohort retention of the app to prove financial viability.

### Dashboard Sections Explained:

* **Startup Health Metrics (Header Cards):**
  * **MoM Growth (Month-over-Month):** Tracks the percentage increase in active users. 24% MoM is hyper-growth, signaling strong product-market fit.
  * **CAC (Customer Acquisition Cost):** How much marketing spend it takes to acquire one new user (e.g., $1.12). The lower, the better.
  * **LTV (Lifetime Value):** The total revenue expected from a user over their time on the app (e.g., $18.40). Because LTV is significantly higher than CAC, the business is highly profitable per user.

* **Revenue & Growth Chart (Visual Graph):**
  * A dual-axis line chart comparing **Total Users** (the blue line) against **MRR / Monthly Recurring Revenue** (the green line).
  * *Why it matters:* It proves to investors that as the user base grows, revenue is scaling alongside it (meaning the paywall is actually working).

* **User Funnel (Conversion Metrics):**
  * **App Installs → Active Readers → Pro Subscribers:** A visual breakdown of the conversion funnel.
  * *Why it matters:* It shows exactly where users drop off. If 100,000 people install the app, but only 8,000 buy the PRO subscription, the conversion rate is 8%. This helps the team know they need to optimize the Paywall flow.

* **Retention by Cohort (The Heatmap):**
  * Displays user retention across weeks (Week 1, Week 2, Week 3, etc.).
  * *Why it matters:* Consumer apps die if users don't come back. A strong Week 4 retention rate proves that the gamification (News IQ quizzes and Daily Streaks) is successfully keeping users addicted to the platform.
