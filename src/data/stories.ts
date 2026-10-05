/**
 * Gen Z Pulse — Mock News Data
 * Phase 2: JSON fixtures simulating the real API (wired in Phase 3)
 */

export type StoryCategory = "breaking" | "developing" | "tech" | "politics" | "world" | "campus" | "finance" | "climate";

export type ArcStage = {
  label: "Breaking" | "Developing" | "Context" | "Impact" | "Resolved";
  date: string;
  summary: string;
};

export type ActionPathway = {
  type: "learn" | "career" | "act";
  label: string;
  description: string;
  url?: string;
};

export type AISummary = {
  tl_dr: string[];
  genZTake: string;
  executiveBrief: string;
  keyTakeaway: string;
};

export type Story = {
  id: string;
  category: StoryCategory;
  headline: string;
  summary: string;          // 60-word pulse
  context: string;          // 300-word context layer
  deepDive: string;         // 1500-word deep dive (truncated here for mock)
  source: string;
  sourceUrl?: string;
  imageUrl: string;         // hero image for swipe card
  credibilityScore: number; // 0-10
  politicalLean: "left" | "center" | "right" | "none";
  time: string;
  readTime: number;         // minutes
  arcId?: string;
  whyItMatters: string;
  consequences: string[];   // 2nd/3rd order effects
  actionPathways: ActionPathway[];
  isBlindspot?: boolean;
  aiSummary?: AISummary;
};

export type StoryArc = {
  id: string;
  title: string;
  currentStage: ArcStage["label"];
  stages: ArcStage[];
  relatedStoryIds: string[];
};

// ─── STORY ARCS ───────────────────────────────
export const STORY_ARCS: StoryArc[] = [
  {
    id: "arc-rbi-rate-cut",
    title: "RBI Rate Cut 2025",
    currentStage: "Resolved",
    stages: [
      { label: "Breaking",   date: "Sep 15", summary: "RBI Governor hints at rate cut if inflation stays below 4% for two months." },
      { label: "Developing", date: "Oct 1",  summary: "CPI inflation: 3.8% for September — second consecutive month below target." },
      { label: "Context",    date: "Oct 5",  summary: "Economists: 25bps cut likely, but RBI may hold for US Fed decision first." },
      { label: "Impact",     date: "Oct 8",  summary: "Markets rally 400 pts on cut expectations. Housing EMIs may drop ₹400/month." },
      { label: "Resolved",   date: "Oct 9",  summary: "MPC votes 5-1 to cut repo rate. EMI relief for 8.4 crore home loan borrowers." },
    ],
    relatedStoryIds: ["story-1", "story-5"],
  },
  {
    id: "arc-cuet-2026",
    title: "CUET 2026 Pattern Changes",
    currentStage: "Developing",
    stages: [
      { label: "Breaking",   date: "Sep 20", summary: "NTA confirms CUET 2026 format will be overhauled after student feedback." },
      { label: "Developing", date: "Oct 2",  summary: "40% fewer sections and 30-min shorter duration confirmed. Science paper revamped." },
      { label: "Context",    date: "Oct 10", summary: "Education Ministry review panel to publish full syllabus changes by Oct 20." },
    ],
    relatedStoryIds: ["story-3"],
  },
  {
    id: "arc-india-ai-policy",
    title: "India AI Governance Policy",
    currentStage: "Context",
    stages: [
      { label: "Breaking",   date: "Aug 5",  summary: "MeitY releases draft AI governance framework for public comment." },
      { label: "Developing", date: "Sep 1",  summary: "1,200+ responses received; majority support mandatory impact assessments." },
      { label: "Context",    date: "Oct 1",  summary: "India signs G20 AI accord; domestic legislation expected by Q1 2026." },
    ],
    relatedStoryIds: ["story-2", "story-4"],
  },
];

// ─── STORIES ──────────────────────────────────
export const STORIES: Story[] = [
  {
    id: "story-1",
    category: "breaking",
    headline: "RBI Cuts Repo Rate for First Time in 4 Years",
    summary: "The Reserve Bank of India has slashed the repo rate by 25 basis points to 6.25%, marking its first rate cut since May 2020. This move comes as domestic retail inflation eases below the 4% target for two consecutive months. For consumers, this directly translates to lower EMIs on home and auto loans, providing much-needed relief ahead of the upcoming festive season.",
    context: "The Monetary Policy Committee voted 5-1 in favour of a 25bps repo rate cut, citing two consecutive months of CPI inflation below 4%. This is the first rate cut since May 2020. The dissenting vote came from external member Prof. Jayanth Varma, who pushed for a bolder 50bps cut. Governor Malhotra struck a cautious note on global uncertainty but signalled openness to further easing if food inflation remains benign through Q4.",
    deepDive: "Background: India's repo rate had been held at 6.5% since February 2023, as the RBI prioritized inflation management over growth stimulation. The global rate cycle turned first in the US, where the Federal Reserve began cutting in September 2024. India's CPI inflation crossed below the 4% target in August 2025 (3.9%) and stayed there in September (3.8%), giving the MPC enough comfort to act.\n\nThe 5-1 vote saw the dissent from external member Prof. Jayanth Varma, who argued for a larger 50bps cut given the food price normalization and benign core inflation at 3.5%. The majority chose caution, wary of El Niño-driven vegetable price volatility in Q4 and an uncertain global backdrop following resumed US-China trade tensions.\n\nImpact on borrowers: ~8.4 crore home loan accounts in India are on floating rate contracts linked to the repo rate via EBLR (External Benchmark Lending Rate). A 25bps cut, if fully transmitted, reduces a ₹40L, 20-year loan's EMI by approximately ₹390/month. Banks typically transmit repo cuts within 1-3 months for EBLR-linked loans.\n\nWhat to watch next: The December 2025 MPC meeting — if October–November inflation stays below 4.5%, a second 25bps cut becomes probable. Markets are pricing in a total of 75bps of easing over the current cycle.",
    source: "The Economic Times",
    sourceUrl: "https://economictimes.indiatimes.com/news/economy/policy/rbi-monetary-policy-committee-meeting-repo-rate-cut-decision/articleshow/114032145.cms",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    credibilityScore: 9.6,
    politicalLean: "none",
    time: "2 min ago",
    readTime: 3,
    arcId: "arc-rbi-rate-cut",
    whyItMatters: "For Gen Z students with education loans, or anyone with a floating-rate home loan, this directly reduces your monthly EMI. It also makes fixed deposits slightly less attractive — time to look at debt mutual funds.",
    consequences: [
      "Home loan EMIs drop ~₹390/month for a ₹40L loan",
      "FD rates likely fall 0.25–0.5% at major banks within 30 days",
      "Equity markets may see a short-term rally — sectors like real estate and autos benefit most",
    ],
    actionPathways: [
      { type: "learn",  label: "Understand Repo Rate", description: "RBI's explainer on how the repo rate affects everyday finances", url: "https://rbi.org.in" },
      { type: "career", label: "Career Angle", description: "Banking & finance hiring picks up when rate cycles turn — check current openings at HDFC, ICICI, Kotak" },
      { type: "act",    label: "Check Your Loan", description: "Ask your bank if your loan is EBLR-linked — if yes, expect a lower EMI next month automatically" },
    ],
    aiSummary: {
      tl_dr: [
        "The Reserve Bank of India reduced the benchmark repo rate by 25 basis points to 6.25% — the first rate cut since May 2020.",
        "Inflation dipping under 4% (3.8% in September) gave the MPC headroom to lower borrowing costs ahead of festive retail demand.",
        "8.4 crore floating-rate loan accounts benefit directly, lowering monthly EMIs by roughly ₹390 per ₹40 lakh borrowed.",
      ],
      genZTake: "Real talk: interest on loans just got cheaper across India. If you or your family are paying car or house EMIs, your monthly payments will drop automatically next month. On the flip side, bank FDs will pay less interest, so it's a great moment to learn about index funds and diversified debt mutual funds.",
      executiveBrief: "The MPC approved a 25bps cut (5-1 vote, with external member Prof. Jayanth Varma pushing for 50bps). Commercial banks will transmit the easing within 30-60 days. Auto and residential real estate credit offtake is projected to expand 12-14% over Q4.",
      keyTakeaway: "Lower debt costs across India, injecting liquidity into equities, festive commerce, and consumer loans.",
    },
  },
  {
    id: "story-2",
    category: "tech",
    headline: "India's AI Startup Ecosystem Hits $2.1B in 2025 Funding",
    summary: "India's artificial intelligence startup ecosystem has attracted a record-breaking $2.1 billion in venture funding in 2025 across more than 200 deals, outpacing the previous year's total by three times. Bangalore continues to lead the charge, capturing 40% of all AI venture activity. B2B enterprise AI solutions and Indic-language models are seeing the highest traction among international and domestic investors alike.",
    context: "The surge is driven by enterprise AI adoption, with B2B SaaS tools for legal, healthcare, and manufacturing seeing the most traction. Sarvam AI, Krutrim, and Gnani.ai lead the pack in language-model infrastructure for Indic languages. International VCs including Sequoia, Lightspeed, and Peak XV are doubling down, while domestic participation from Tata Capital and Manipal Group signals institutional confidence.",
    deepDive: "India's AI funding boom is part of a broader structural shift. Unlike the 2021–22 consumer app bubble, this wave is enterprise-first. Over 60% of the 200+ deals in 2025 went to B2B AI companies selling to corporates, government agencies, or SMEs — not end consumers.\n\nKey verticals: Legal tech AI (contract review, compliance automation), Healthcare AI (diagnostic assistance, patient management), Manufacturing AI (quality control, predictive maintenance), and Financial AI (credit underwriting, fraud detection).\n\nThe Indic language opportunity is particularly significant. India has 22 official languages and 780+ dialects, yet most global AI models underperform dramatically on languages beyond English and Hindi. Sarvam AI's IndicLM model, trained on 4T tokens of Indic language data, has attracted interest from state government portals and rural fintech companies.\n\nFor Gen Z: This is where the jobs are. AI/ML engineers with 1–2 years of experience are commanding ₹18–35 LPA in Bangalore's AI startup scene. Data labelling, prompt engineering, and RAG implementation are the most in-demand entry-level skills.",
    source: "Inc42",
    sourceUrl: "https://inc42.com/features/generative-ai-landscape-in-india-funding-trends/",
    imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80",
    credibilityScore: 9.1,
    politicalLean: "none",
    time: "18 min ago",
    readTime: 4,
    arcId: "arc-india-ai-policy",
    whyItMatters: "If you're in tech, this is the single biggest career opportunity right now. India's AI ecosystem is at its 2015 moment — the equivalent of when e-commerce and fintech were exploding. Getting in now means riding the next decade of growth.",
    consequences: [
      "AI/ML job openings in India expected to triple in 2026 vs 2024",
      "Tier-2 cities (Pune, Hyderabad, Chennai) seeing AI startup clusters emerge",
      "Non-CS students with domain expertise (legal, medical, finance) increasingly valuable as AI trainers",
    ],
    actionPathways: [
      { type: "learn",  label: "Free AI Course", description: "Google's free Intro to Generative AI on Coursera — 6 hours, no coding needed", url: "https://coursera.org" },
      { type: "career", label: "AI Internships", description: "Sarvam AI, Krutrim, and Gnani.ai are actively hiring interns — apply directly on LinkedIn" },
      { type: "act",    label: "Build a Portfolio", description: "Start a simple AI project on Hugging Face Spaces — even a basic demo gets recruiter attention" },
    ],
    aiSummary: {
      tl_dr: [
        "Indian AI startups reached an unprecedented $2.1 billion in venture funding in 2025, 3x higher than 2024 totals.",
        "Bangalore led 40% of all deals, with major focus on enterprise B2B workflow AI and Indic language models.",
        "Tier-1 funds (Peak XV, Lightspeed, Tata Capital) backed infrastructure players like Sarvam AI and Krutrim.",
      ],
      genZTake: "No cap: this is the 2015 Flipkart/e-commerce moment for Indian AI. Startups aren't just creating simple ChatGPT wrappers; they are building core tools for Indian hospitals, courtrooms, and banks. Freshers with PyTorch, prompt tuning, or RAG skills are getting offered ₹18-35 LPA right out of college.",
      executiveBrief: "Over 60% of capital flowed to B2B enterprise automation. Indic foundational models trained on vernacular data represent massive defensive moats against Silicon Valley giants in public sector and rural fintech contracts.",
      keyTakeaway: "India is solidifying its position as the premier enterprise and multilingual AI innovation hub.",
    },
  },
  {
    id: "story-3",
    category: "campus",
    headline: "CUET 2026: Pattern Changes Confirmed by NTA",
    summary: "The National Testing Agency has officially confirmed sweeping changes to the CUET 2026 examination format following widespread student feedback. The upcoming test will feature 40% fewer sections and a 30-minute shorter overall duration to reduce test fatigue. Additionally, Science students will see a completely revamped domain paper, shifting focus from rote memorization to application-based questions, easing the burden on applicants.",
    context: "After widespread student criticism of CUET 2025's complexity and technical glitches, the National Testing Agency has officially confirmed sweeping changes. The number of test sections drops from 14 to 8. Each domain subject now has fewer questions but higher per-question weightage. The English section is no longer mandatory for STEM applicants.",
    deepDive: "The CUET reforms follow a high-level review ordered by the Education Ministry after 14.9 lakh candidates appeared for CUET 2025, with 23% reporting technical issues including screen freezes and answer-deselection bugs. The NTA's new test design draws partly from SAT's adaptive model.\n\nKey changes confirmed for 2026:\n- Total duration: 3 hours (down from 3.5)\n- Sections: 8 domain papers + 1 general test (was 14 + 2)\n- Negative marking: Reduced from -1 to -0.5 per wrong answer\n- Language section: Now optional for pure STEM programmes\n- Science domain: Completely rewritten with more application-based questions, less rote recall\n- Results timeline: Results in 25 days (was 45 days)\n\nUniversities participating: DU, JNU, BHU, and 280+ central universities have confirmed participation. IITs and NITs remain separate (JEE). 14 private universities joining for the first time in 2026.",
    source: "The Indian Express",
    sourceUrl: "https://indianexpress.com/article/education/cuet-ug-exam-format-overhaul-nta-changes/",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    credibilityScore: 9.7,
    politicalLean: "none",
    time: "1 hr ago",
    readTime: 3,
    arcId: "arc-cuet-2026",
    whyItMatters: "If you're in Class 11 or 12 right now, CUET 2026 is your exam. The reduced sections and shorter duration are genuinely student-friendly changes. The science paper revamp means last year's prep strategy is partially outdated — start fresh.",
    consequences: [
      "Coaching institutes will need to revise CUET 2026 materials significantly",
      "Higher completion rates expected (less test fatigue)",
      "Students strong in application-based thinking advantaged over rote learners",
    ],
    actionPathways: [
      { type: "learn",  label: "CUET 2026 Syllabus", description: "Download the official revised syllabus from NTA's website", url: "https://nta.ac.in" },
      { type: "career", label: "Universities to Target", description: "DU's FYUP programmes see highest CUET competition — plan your cutoff targets now" },
      { type: "act",    label: "Mock Test", description: "NTA releases free practice tests 3 months before exam — bookmark the portal now" },
    ],
    aiSummary: {
      tl_dr: [
        "NTA confirmed major exam overhauls for CUET UG 2026, cutting total sections from 14 down to 8.",
        "Total test time reduced by 30 minutes, negative marking softened to -0.5, and English made optional for STEM aspirants.",
        "Science questions revamped to prioritize real-world problem solving and application over textbook cramming.",
      ],
      genZTake: "Massive win for 11th and 12th graders: CUET is finally ditching its brutal 14-section marathon. Less screen fatigue, fairer negative marking, and no mandatory English exam if you're taking physics or math. Just remember: cramming answers won't work — focus on understanding core principles.",
      executiveBrief: "Prompted by feedback from 1.49M students, NTA's redesigned format mirrors international standardized tests. Shorter turnaround (25 days vs 45) will synchronize the academic calendar across 280+ Central and State universities.",
      keyTakeaway: "A student-centric exam revamp that rewards conceptual mastery while drastically cutting test anxiety.",
    },
  },
  {
    id: "story-4",
    category: "world",
    headline: "G20 Agrees on Global AI Governance Framework",
    summary: "All 20 nations have successfully signed a landmark AI accord setting minimum safety standards, transparency rules, and a shared incident-reporting protocol by 2027. Negotiated over 14 months, this binding framework requires developers of frontier AI models to disclose training data sources. India played a critical role as co-chair, ensuring developing nations receive flexibility clauses to protect their domestic startup ecosystems.",
    context: "The framework, negotiated over 14 months, establishes three binding commitments: mandatory disclosure of training data sources for frontier AI models, a shared incident database for AI-related harms, and national AI safety institutes in all G20 nations by 2027. India played a key role as co-chair, pushing for developing-nation flexibility clauses.",
    deepDive: "The G20 AI Governance Framework, signed in Rio de Janeiro on October 8, 2025, is the first multilateral binding agreement on artificial intelligence. Unlike the EU AI Act (which covers only EU nations) or the US Executive Order on AI (non-binding for foreign companies), this framework applies to AI systems deployed in any G20 country.\n\nKey provisions: All frontier AI models (above 10^24 FLOPs training compute) must disclose their training data sources to a shared G20 repository. Companies operating in G20 markets must report significant AI incidents (causing harm to >100 people) within 72 hours to a new G20 AI Safety Clearinghouse. By 2027, each G20 nation must establish a national AI safety institute with minimum staffing and budget standards.\n\nIndia's position: India secured a 'developing nation flexibility clause' allowing a 2-year extension on compliance for domestic startups under ₹100Cr annual revenue. This was a key demand from the Indian delegation, supported by Brazil and South Africa.",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/technology/artificial-intelligence/g20-ai-governance-framework-declaration/",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    credibilityScore: 9.8,
    politicalLean: "none",
    time: "3 hr ago",
    readTime: 5,
    arcId: "arc-india-ai-policy",
    whyItMatters: "This shapes what AI products can and can't do in India for the next decade. For Gen Z entering the workforce, understanding AI regulation is becoming as important as understanding AI itself — 'AI compliance' is already a job category.",
    consequences: [
      "Indian AI startups get 2-year compliance grace period — reduces regulatory burden",
      "New job category: AI safety engineers and compliance officers at every major tech firm",
      "Open-source AI models face new scrutiny — Llama, Mistral deployments need audit trails",
    ],
    actionPathways: [
      { type: "learn",  label: "Read the Framework", description: "Full G20 AI accord text available at g20.org — 40-page read, worth it for policy enthusiasts" },
      { type: "career", label: "AI Policy Careers", description: "NASSCOM, MeitY, and think tanks like iSPIRT are hiring AI policy analysts — no CS degree required" },
      { type: "act",    label: "Public Comment", description: "MeitY's AI policy portal accepts public comments from citizens — your voice counts" },
    ],
    isBlindspot: true,
    aiSummary: {
      tl_dr: [
        "20 major world powers signed the Rio AI Accord, setting worldwide binding standards for frontier AI safety by 2027.",
        "Model creators must disclose training datasets and report severe algorithmic harms within 72 hours.",
        "India successfully negotiated a 2-year compliance grace period for early-stage startups under ₹100 Cr revenue.",
      ],
      genZTake: "Governments around the globe just created the universal rules for AI. Big AI labs like OpenAI and Google will have to be transparent about what data they scrape. If you're into tech law, policy, or cybersecurity, 'AI Safety & Compliance' is becoming one of the most lucrative and future-proof career fields.",
      executiveBrief: "The accord establishes uniform safety standards across 85% of global GDP, preventing a fractured regulatory environment while shielding developing market startups from stifling compliance costs.",
      keyTakeaway: "A historic global governance treaty balancing frontier safety with developing market innovation.",
    },
  },
  {
    id: "story-5",
    category: "finance",
    headline: "Nifty 50 Hits All-Time High of 28,400 on Rate Cut Euphoria",
    summary: "Indian equities surged to unprecedented record highs, with the Nifty 50 crossing the 28,400 mark following the RBI's surprise repo rate cut. The broader market rally was largely led by the auto, real estate, and banking sectors, all of which directly benefit from lower borrowing costs. Foreign institutional investors also returned strongly, contributing their highest single-day inflow since early 2024.",
    context: "The Nifty 50 closed at 28,412 — a new all-time high — gaining 1.8% in a single session following the RBI's surprise 25bps rate cut. FIIs net bought ₹4,200 Cr, the highest single-day inflow since January 2024. The rally was broad-based, with 42 of 50 Nifty constituents closing in the green.",
    deepDive: "Rate cuts and equity markets: When the RBI cuts rates, the mechanism that drives stock prices higher is two-fold. First, lower interest rates reduce the discount rate used to value future corporate earnings — making current earnings worth more. Second, lower deposit rates push savers toward higher-return assets like equities.\n\nSectors that benefit most: Banking (lower cost of funds → better NIMs), Auto (lower EMIs → higher demand), Real estate (lower home loan rates → higher volumes), and Capital goods (lower borrowing costs → more corporate expansion).\n\nSectors that may underperform: IT exporters (rupee may strengthen slightly on capital inflows), NBFCs with high fixed-rate liabilities, and FD-dependent businesses.\n\nFor Gen Z investors: If you're investing via SIPs (Systematic Investment Plans), a rate cut environment historically favors staying invested. Don't time the market — the best response is to maintain your SIP and potentially add to equity allocation in debt mutual funds that benefit from falling yields.",
    source: "Mint",
    sourceUrl: "https://www.livemint.com/market/stock-market-news/nifty-50-record-high-rally-monetary-policy/",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    credibilityScore: 9.4,
    politicalLean: "none",
    time: "4 hr ago",
    readTime: 3,
    arcId: "arc-rbi-rate-cut",
    whyItMatters: "Even if you don't invest, this affects you. Pension funds, insurance companies, and your parents' retirement savings all depend on market performance. Understanding these cycles helps you make smarter financial decisions when you start earning.",
    consequences: [
      "Mutual fund NAVs for equity funds rise — if you have SIPs, your portfolio value goes up today",
      "FD interest rates at banks likely fall within 30 days — lock in current rates if you can",
      "Real estate developers may launch new projects — watch for pre-launch offers in your city",
    ],
    actionPathways: [
      { type: "learn",  label: "SIP Basics", description: "Zerodha Varsity's free course on mutual funds — best free finance education in India", url: "https://zerodha.com/varsity" },
      { type: "career", label: "Finance Internships", description: "Zerodha, Groww, and Angel One are hiring fintech interns — apply on their careers pages" },
      { type: "act",    label: "Start a SIP", description: "₹500/month in a Nifty index fund, started at 20, becomes ₹1Cr+ by retirement — do the math" },
    ],
    aiSummary: {
      tl_dr: [
        "The Nifty 50 spiked 1.8% to a historic high of 28,412 following the central bank's rate reduction.",
        "Foreign investors poured in ₹4,200 crore in single-day net buying — the highest institutional inflow since Jan 2024.",
        "Rate-sensitive equities (Housing, Automobiles, and Private Banks) drove over 70% of total index gains.",
      ],
      genZTake: "The Indian stock market went full bull-mode today. If you're doing a monthly SIP in index mutual funds, your returns just climbed. Big takeaway: don't get FOMO or try to time day-trading highs; let dollar-cost averaging do its compounding magic.",
      executiveBrief: "Lower discounting rates boosted forward valuation multiples across Indian blue chips. With 42 of 50 constituents in the green and robust foreign institutional participation, market sentiment indicates extended capital expansion.",
      keyTakeaway: "Unprecedented market rally propelled by central bank liquidity and heavy foreign institutional purchases.",
    },
  },
  {
    id: "story-6",
    category: "climate",
    headline: "Chennai Faces Day Zero Water Crisis by March 2026, Study Warns",
    summary: "A newly published study by IIT-Madras warns that Chennai's four major reservoirs could hit zero capacity by March 2026. This severe Day Zero crisis is highly likely if upcoming monsoon rains remain 20% below their historical normal. Over 12 lakh residents and major IT corridors could face strict water rationing, reviving memories of the severe water shortages the city experienced in 2019.",
    context: "The study, published in the journal Nature Water, models Chennai's water supply under three rainfall scenarios. In the moderate-deficit scenario (20% below normal), Day Zero — the point when taps run dry — arrives by March 26, 2026. The city last faced Day Zero in June 2019, when it flew in water by train from Vellore.",
    deepDive: "Chennai's water crisis is structural, not just meteorological. The city draws from four reservoirs (Poondi, Chembarambakkam, Red Hills, Cholavaram) with a combined capacity of ~11,000 mcft. As of October 2025, the combined storage is at 43% — below the 5-year average of 58% for this time of year.\n\nThe 2019 crisis cost Chennai's economy an estimated ₹1,200 Cr over three months in lost productivity, water trucking costs, and emergency infrastructure. IT companies in OMR and Sholinganallur reduced office hours; restaurants closed early; construction halted.\n\nWater conservation in Chennai: The CWSSB (Chennai Metropolitan Water Supply & Sewerage Board) has installed 1.2 lakh rainwater harvesting systems since 2020, but enforcement of mandatory RWH for new buildings remains weak. Groundwater depletion in Porur and Korattur has worsened significantly in the past five years.\n\nWhat can residents do: Rainwater harvesting retrofits cost ₹8,000–₹25,000 depending on roof size. The Tamil Nadu government subsidizes 50% of the cost for below-the-poverty-line families. Middle-class residents can apply for partial subsidies through the CWSSB portal.",
    source: "Nature Water",
    sourceUrl: "https://www.nature.com/articles/s44221-024-00215-6",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    credibilityScore: 9.8,
    politicalLean: "none",
    time: "6 hr ago",
    readTime: 4,
    whyItMatters: "Water scarcity is the climate story closest to home for South India's Gen Z. This isn't abstract — it affects where you can work, where you'll want to live, and what urban careers are viable by 2030. Climate adaptation is a real career field now.",
    consequences: [
      "IT companies in OMR may push work-from-home policies to reduce office water usage",
      "Property prices in well-connected water-secure suburbs (Tambaram, Poonamallee) may rise",
      "Water tech startups (grey water recycling, RWH) seeing investor interest",
    ],
    actionPathways: [
      { type: "learn",  label: "Water Crisis Deep Dive", description: "IIT-Madras Nature Water study available free at nature.com — 18-page PDF" },
      { type: "career", label: "Climate Tech Careers", description: "WRI India, TERI, and Jain Irrigation are hiring climate analysts — non-engineering roles available" },
      { type: "act",    label: "Save Water Today", description: "Fix leaking taps (saves 20L/day), take 4-minute showers, collect AC condensate for plants" },
    ],
    isBlindspot: true,
    aiSummary: {
      tl_dr: [
        "Peer-reviewed models from IIT-Madras in Nature Water indicate Chennai reservoirs could dry out by March 2026 under a 20% rain deficit.",
        "Current storage is lagging at 43%, leaving 12 lakh residents and core IT tech corridors vulnerable to emergency rationing.",
        "Echoes the 2019 crisis which cost the metropolitan economy over ₹1,200 Cr in water freighting and lost hours.",
      ],
      genZTake: "Climate change is happening on our doorsteps. If you're living in Chennai or working along OMR, water shortages might force companies into mandatory WFH again. On the startup side, climate tech founders building IoT water metering and decentralized water recycling are about to see immense funding.",
      executiveBrief: "Structural reliance on four primary reservoirs (combined 11,000 mcft) without modernized groundwater recharge leaves industrial tech corridors acutely exposed. Corporate ESG mandates must prioritize closed-loop on-site water recycling.",
      keyTakeaway: "Urgent wake-up call for Southern urban infrastructure and municipal climate resilience planning.",
    },
  },
  {
    id: "story-7",
    category: "tech",
    headline: "Apple Reaches Deal with OpenAI to Bring ChatGPT to iOS 18",
    summary: "Apple has officially finalized an agreement with OpenAI to deeply integrate ChatGPT features into iOS 18, fundamentally transforming Siri. This partnership will introduce advanced, context-aware text generation and summarization capabilities directly into the iPhone operating system natively. It marks a significant shift in Apple's AI strategy, positioning them aggressively against Google's Gemini integration in the Android ecosystem.",
    context: "Apple has struck a deal with OpenAI to bring generative AI to iPhones, integrating ChatGPT's underlying models into iOS 18. This move aims to supercharge Siri, which has lagged behind rivals like Google Assistant and Amazon Alexa in conversational capabilities. The partnership allows Apple to offer cutting-edge AI without fully developing a proprietary foundational model from scratch.",
    deepDive: "Background: Apple has historically been cautious with generative AI, prioritizing user privacy and on-device processing. However, the rapid advancement of LLMs (Large Language Models) like ChatGPT forced a strategic pivot. By partnering with OpenAI, Apple bridges the AI gap immediately while continuing to develop its internal 'Ajax' models in the background.\n\nHow it works: The integration is expected to be seamless. Siri will act as the primary interface, handling basic tasks on-device for speed and privacy. For complex queries (e.g., summarizing long documents, creative writing, or complex coding queries), Siri will seamlessly hand off the request to OpenAI's cloud-based models. Users will likely have granular control over what data is sent to the cloud, maintaining Apple's strict privacy stance.\n\nMarket Impact: This deal is a massive win for OpenAI, securing prime real estate on over 1.5 billion active iOS devices globally. It also puts immense pressure on Google, whose lucrative search default deal with Apple is already under antitrust scrutiny. If Siri+ChatGPT becomes the default answer engine, Google Search traffic on iOS could take a significant hit.",
    source: "The Verge",
    sourceUrl: "https://www.theverge.com/2024/6/10/24175344/apple-openai-chatgpt-partnership-ios-18-siri-ai",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    credibilityScore: 9.7,
    politicalLean: "none",
    time: "7 hr ago",
    readTime: 4,
    whyItMatters: "If you own an iPhone, your daily digital interactions are about to fundamentally change. Siri will finally become genuinely useful, moving from a basic timer-setter to a proactive, highly intelligent personal assistant capable of understanding complex, multi-step commands.",
    consequences: [
      "Significant upgrade in productivity for iOS users",
      "Increased pressure on Google to accelerate Gemini's Android integration",
      "Potential privacy concerns regarding OpenAI's data handling practices on iOS",
    ],
    actionPathways: [
      { type: "learn",  label: "LLM Architectures", description: "Read up on how Large Language Models like ChatGPT actually work under the hood" },
      { type: "career", label: "Prompt Engineering", description: "Understanding how to talk to AI is becoming a core skill — practice refining your prompts" },
      { type: "act",    label: "Check Device Compatibility", description: "Ensure your iPhone model will support iOS 18 to receive these new AI features" },
    ],
    aiSummary: {
      tl_dr: [
        "Apple formally inked a landmark pact with OpenAI to integrate ChatGPT-4o natively across iOS 18, iPadOS, and macOS.",
        "Siri routes complex prompts, document summarization, and writing tasks directly to ChatGPT with zero required account creation.",
        "Zero cash was exchanged: OpenAI captures direct distribution across 1.5B devices, while Apple satisfies consumer AI expectations.",
      ],
      genZTake: "Siri is finally useful. Instead of serving useless web links, Siri will now write emails, debug code snippets, and edit photos using ChatGPT natively on your lock screen. It's totally opt-in and shields your IP address, so your search privacy stays intact.",
      executiveBrief: "A tactical coup for Apple: they instantly neutralized Google's Gemini head-start on Android without incurring multi-billion-dollar GPU training costs, while retaining leverage for future deals with Anthropic or Google.",
      keyTakeaway: "Generative AI reaches ubiquitous consumer scale directly through the native iOS user experience.",
    },
  },
  {
    id: "story-8",
    category: "world",
    headline: "SpaceX Starship Successfully Completes First Commercial Payload Orbit",
    summary: "SpaceX has achieved a massive aerospace milestone by successfully launching its colossal Starship rocket and deploying a commercial payload into low Earth orbit for the first time. The fully reusable spacecraft completed its mission flawlessly before returning for a controlled splashdown. This success drastically reduces the cost per kilogram to orbit, opening entirely new possibilities for space infrastructure.",
    context: "After several test flights that ended in spectacular explosions, SpaceX's Starship finally achieved its primary objective: deploying a commercial payload into orbit and returning intact. This mission proves the viability of a fully reusable, super-heavy lift launch vehicle, which is crucial for NASA's Artemis program and Elon Musk's Mars ambitions.",
    deepDive: "The Mission: Starship lifted off from Starbase in Boca Chica, Texas. The Super Heavy booster separated and executed a perfect return, being caught by the 'Mechazilla' launch tower arms. The Starship upper stage continued into orbit, deployed a constellation of next-generation Starlink satellites (V3), and then executed a controlled reentry and splashdown in the Indian Ocean.\n\nWhy this is revolutionary: Traditional rockets are expendable, meaning millions of dollars of hardware burn up in the atmosphere after one use. Starship is designed to be fully and rapidly reusable, like an airplane. This reduces the cost of launching mass into orbit by a factor of 10 to 100. Starship can carry 150 metric tonnes to orbit in a reusable configuration.\n\nThe Future: With orbital deployment proven, SpaceX will rapidly increase launch cadence. Starship is the designated human lander for NASA's Artemis III mission, aiming to return humans to the Moon by 2026. Furthermore, its massive payload capacity enables the construction of larger space stations, space-based solar power, and eventually, the colonization of Mars.",
    source: "Space.com",
    sourceUrl: "https://www.space.com/spacex-starship-flight-5-launch-super-heavy-booster-catch",
    imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    credibilityScore: 9.9,
    politicalLean: "none",
    time: "10 hr ago",
    readTime: 5,
    whyItMatters: "We are entering the true commercial space age. Starship's success makes large-scale space manufacturing and asteroid mining economically viable. For Gen Z engineers, the aerospace sector is shifting from government-led exploration to booming commercial enterprise.",
    consequences: [
      "Launch costs drop dramatically, enabling smaller startups to put hardware in space",
      "Accelerated timeline for the Artemis Moon missions",
      "Increased deployment of mega-constellations, raising concerns about space debris and astronomy interference",
    ],
    actionPathways: [
      { type: "learn",  label: "Orbital Mechanics", description: "Try Kerbal Space Program — it's genuinely the best intuitive way to learn how rockets work" },
      { type: "career", label: "Space Tech Startups", description: "Look beyond SpaceX: companies like Rocket Lab, Relativity Space, and Skyroot (India) are hiring" },
      { type: "act",    label: "Track Satellites", description: "Download a satellite tracking app to spot the ISS or Starlink trains passing overhead" },
    ],
    aiSummary: {
      tl_dr: [
        "SpaceX completed its first commercial orbital deployment with Starship, releasing Starlink V3 satellites into orbit.",
        "The 232-foot Super Heavy booster executed a historic return and was caught mid-air by the Mechazilla launch tower arms.",
        "150-tonne payload capability slashes orbital launch cost-per-kilogram by up to 90%, cementing NASA Artemis III timelines.",
      ],
      genZTake: "A 20-story rocket booster just got caught out of the sky by giant robotic chopsticks. It sounds like sci-fi, but it means rockets can now land, get refueled, and fly again like commercial airplanes. Space travel and orbital tech just became 100x cheaper.",
      executiveBrief: "Full reusability radically shifts aerospace capital expenditure. Commercial orbital economics will unlock private space stations, asteroid resource prospecting, and high-cadence satellite constellations.",
      keyTakeaway: "Aerospace logistics has entered the era of commercial airline-style turnaround and low-cost orbital transit.",
    },
  },
  {
    id: "story-9",
    category: "climate",
    headline: "Global Solar Capacity Surpasses Coal for the First Time in History",
    summary: "In a monumental shift for global energy, total installed solar power capacity worldwide has officially surpassed coal power generation for the first time in history. Driven by plummeting panel costs and aggressive expansion in China and India, this milestone represents a critical turning point. Analysts predict solar will become the largest single source of electricity globally by 2028.",
    context: "The International Energy Agency (IEA) confirmed that global solar photovoltaic (PV) capacity crossed the 2,500 GW mark, narrowly edging past the total installed capacity of coal-fired power plants. This transition is accelerating much faster than previously modeled, primarily due to manufacturing scale in Asia dropping hardware costs by 80% over the last decade.",
    deepDive: "The Numbers: In 2025 alone, the world added over 500 GW of new solar capacity — equivalent to building a new nuclear power plant every day for a year. China accounted for roughly 60% of these additions, while India, the US, and the EU made up the bulk of the remainder. \n\nThe Economics: Solar is now the cheapest source of new electricity generation in most countries. The Levelized Cost of Energy (LCOE) for utility-scale solar has dropped so significantly that it is often cheaper to build new solar farms than to continue operating existing coal plants. \n\nThe Challenge: While capacity (potential power) has surpassed coal, actual generation (energy produced) still lags because solar only generates power during the day. The next critical bottleneck is grid-scale energy storage (batteries, pumped hydro) and grid modernization to handle the variable output of renewables. Interconnection queues — the waiting list for new solar projects to connect to the grid — span years in many regions.",
    source: "The Guardian",
    sourceUrl: "https://www.theguardian.com/environment/2024/may/08/renewables-generated-record-30-per-cent-global-electricity-2023",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-1f95091bd506?w=800&q=80",
    credibilityScore: 9.8,
    politicalLean: "none",
    time: "12 hr ago",
    readTime: 4,
    whyItMatters: "The energy transition is actually happening, and it's happening fast. This proves that climate action doesn't have to rely purely on policy; sheer economics is now driving the shift away from fossil fuels. It's a massive source of optimism.",
    consequences: [
      "Coal plants face accelerated retirement due to unprofitability",
      "Massive boom in the energy storage (battery) sector to solve the intermittency problem",
      "Geopolitical shifts as reliance on petrostates decreases in favor of critical mineral suppliers",
    ],
    actionPathways: [
      { type: "learn",  label: "The Duck Curve", description: "Understand the 'Duck Curve' problem — why solar causes grid management headaches at sunset" },
      { type: "career", label: "Renewable Energy Jobs", description: "The renewable sector is creating jobs 3x faster than the broader economy — look into solar project management" },
      { type: "act",    label: "Community Solar", description: "Research if community solar programs exist in your state to run your home on clean energy" },
    ],
    isBlindspot: true,
    aiSummary: {
      tl_dr: [
        "Global solar photovoltaic capacity topped 2,500 GW, officially outstripping installed coal power capacity for the first time.",
        "Over 500 GW added in 2025 alone, driven by an 80% decline in solar panel manufacturing costs over the decade.",
        "Economics, not just policy, is leading the change: Levelized Cost of Energy (LCOE) makes solar cheaper than coal operations.",
      ],
      genZTake: "Real climate optimism: solar panels are now officially bigger than coal power worldwide. It's not just governments telling people to be green; building solar farms is now cheaper than running coal plants. The next massive challenge to solve is big battery storage for when the sun goes down.",
      executiveBrief: "The renewable inflection point is established. While nameplate solar leads, capital is now urgently pivoting into grid-scale battery storage (BESS) and high-voltage transmission interconnects to balance the Duck Curve.",
      keyTakeaway: "Unstoppable economic fundamentals have cemented solar as humanity's dominant future power source.",
    },
  },
  {
    id: "story-10",
    category: "campus",
    headline: "Indian Universities Implement AI-Proof Assessment Methods",
    summary: "Leading Indian universities, including several IITs and Delhi University, are fundamentally overhauling their grading systems to combat rampant AI-assisted cheating. Moving away from take-home essays, institutions are pivoting to in-person oral vivas, handwritten proctored exams, and project-based continuous evaluations. This marks the biggest shift in higher education assessment formats in the country in over two decades.",
    context: "Following a surge in assignments generated by ChatGPT and Claude, universities realized traditional plagiarism detectors were failing. Instead of fighting AI usage, academia is changing how it measures learning. The focus is shifting from the final output (which AI can easily generate) to the process of creation and real-time comprehension.",
    deepDive: "The Problem: Throughout 2024, professors reported that upwards of 40% of submitted essays and coding assignments showed signs of being AI-generated. Tools designed to detect AI writing proved unreliable, often falsely accusing innocent students while missing heavily edited AI text.\n\nThe Solution: Institutions are adopting 'AI-Resilient' assessments. \n1. The Viva Revival: Oral examinations are returning. Students must defend their written assignments in person, explaining their methodology and answering spontaneous questions.\n2. In-Class 'Flipped' Assessments: Students use AI to research at home, but write the synthesis in a proctored, tech-free environment on campus.\n3. Process over Product: Grading now heavily weights drafts, outlines, and version histories rather than just the final submitted paper.\n\nThe Debate: Some progressive educators argue we should integrate AI completely — testing students on how well they can prompt and refine AI outputs, treating it like a calculator for writing. However, traditionalists worry this degrades foundational critical thinking skills.",
    source: "The Hindu",
    sourceUrl: "https://www.thehindu.com/education/indian-universities-overhaul-assessments-ai-plagiarism/",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    credibilityScore: 9.6,
    politicalLean: "none",
    time: "15 hr ago",
    readTime: 4,
    whyItMatters: "If you're in college, your exams are about to get harder to fake but potentially more valuable for real learning. Rote memorization and generic essay writing are dead skills. Being able to articulate your thoughts verbally is becoming the premium skill.",
    consequences: [
      "Increased anxiety among students unaccustomed to oral presentations",
      "Higher administrative burden on professors conducting individual vivas",
      "A widening gap between universities that adapt and those that stick to vulnerable, outdated testing",
    ],
    actionPathways: [
      { type: "learn",  label: "Socratic Method", description: "Read up on the Socratic method of questioning — it's what your professors will use in your vivas" },
      { type: "career", label: "Communication Skills", description: "Join a debate club or Toastmasters — verbal articulation is now your biggest defense against AI replacement" },
      { type: "act",    label: "Cite Your AI", description: "Start explicitly citing how you used AI in your assignments (e.g., 'Used ChatGPT for initial brainstorming')" },
    ],
    aiSummary: {
      tl_dr: [
        "Premier Indian institutions (IITs, DU, JNU) are replacing standard take-home assignments with mandatory in-person oral vivas.",
        "Response to data showing 40%+ of student submissions were AI-generated, while automated AI detectors yielded false positives.",
        "New grading formulas heavily evaluate live student defense, draft iterations, and spontaneous problem-solving.",
      ],
      genZTake: "Copy-pasting assignments from ChatGPT is officially done. Colleges are bringing back viva exams where you have to defend your work to a professor face-to-face. The new cheat code isn't AI generation; it's learning how to articulate and speak with confidence.",
      executiveBrief: "Higher education is shifting grading from end-product verification to process observation. This shift better aligns student capabilities with employer expectations that prioritize verbal communication over static text outputs.",
      keyTakeaway: "Universities move past AI panic by adopting oral vivas and real-time comprehension defense.",
    },
  }
];

// ─── HELPER FUNCTIONS ─────────────────────────
export function getStoryById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function getArcById(id: string): StoryArc | undefined {
  return STORY_ARCS.find((a) => a.id === id);
}

export function getStoriesByCategory(category: StoryCategory): Story[] {
  return STORIES.filter((s) => s.category === category);
}

export function getBlindspotStories(): Story[] {
  return STORIES.filter((s) => s.isBlindspot);
}

export function getStoriesForArc(arcId: string): Story[] {
  return STORIES.filter((s) => s.arcId === arcId);
}

export function getAISummary(story: Story): AISummary {
  if (story.aiSummary) return story.aiSummary;

  return {
    tl_dr: [
      `Key Scoop: ${story.summary.slice(0, 160)}...`,
      `Why It Matters: ${story.whyItMatters}`,
      `What's Next: ${story.consequences[0] || "Key developments expected across coming months."}`,
    ],
    genZTake: `Real talk on ${story.headline}: things are moving fast. ${story.whyItMatters} Keep this on your radar because it directly impacts your career and lifestyle.`,
    executiveBrief: `${story.context}\n\nKey Strategic Impact: Reported by ${story.source} with a credibility rating of ${story.credibilityScore}/10.`,
    keyTakeaway: story.whyItMatters || story.summary,
  };
}

export const CATEGORIES: { key: StoryCategory | "all"; label: string; color: string }[] = [
  { key: "all",       label: "All",     color: "#FF2D55" },
  { key: "breaking",  label: "Breaking", color: "#FF2D55" },
  { key: "tech",      label: "Tech",    color: "#3B82F6" },
  { key: "campus",    label: "Campus",  color: "#F97316" },
  { key: "finance",   label: "Finance", color: "#10F5A0" },
  { key: "world",     label: "World",   color: "#7C3AED" },
  { key: "climate",   label: "Climate", color: "#F59E0B" },
  { key: "politics",  label: "Politics",color: "#EC4899" },
];
