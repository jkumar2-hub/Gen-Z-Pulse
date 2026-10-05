# Gen Z Pulse — Phase 3 Plan (Signature Features)

## Objective
Implement Gen Z Pulse's signature features that differentiate it from generic news aggregators. This includes hooking up Supabase for the Early Access waitlist, integrating the ElevenLabs TTS API for "Morning Pulse" audio, and adding the dynamic Bias Meter visualizer to story cards.

## 1. Supabase Waitlist Integration
Replace the placeholder "Join Waitlist" or dummy login forms with a real Supabase Edge Function / Database insert.
- **Task 1.1:** Setup `@supabase/supabase-js` client in `src/lib/supabase.ts` using environment variables.
- **Task 1.2:** Create a Supabase `profiles` or `waitlist` table schema (mocked locally via Next.js API route if actual Supabase instance is missing).
- **Task 1.3:** Build a real `/api/waitlist` Next.js route handler.
- **Task 1.4:** Update `src/app/profile/page.tsx` or `AuthContext` to support a "Join Waitlist" API call instead of purely local storage.

## 2. Morning Pulse Audio (ElevenLabs)
Allow users to click an "Audio" or "Play" button on a story to hear an AI-generated TTS summary.
- **Task 2.1:** Create a new `AudioPlayer` React component with Framer Motion visualizer states (playing, paused, loading).
- **Task 2.2:** Build an API route `/api/tts` that connects to ElevenLabs API (or mocks it securely with local HTML5 Web Speech API fallback).
- **Task 2.3:** Integrate the `AudioPlayer` into `src/app/story/[id]/page.tsx`.

## 3. Bias Meter Visualizer
Gen Z demands transparency in news sourcing. Add a visual indicator showing the political/ideological lean of a story.
- **Task 3.1:** Create `src/components/ui/BiasMeter.tsx`.
- **Task 3.2:** Design a slick, animated gradient bar that moves a dial between "Left", "Center", and "Right" based on the `politicalLean` property of a story.
- **Task 3.3:** Inject the `BiasMeter` component into `StoryCard` and the detailed `Story` view.

## 4. State & Roadmap Updates
- **Task 4.1:** Mark Phase 3 tasks as complete in `ROADMAP.md` and `STATE.md`.
- **Task 4.2:** Ensure 03-REVIEW.md is cleared for final UAT.

---
**Verification Requirements:**
- Waitlist API accepts emails and returns 200 OK.
- Bias Meter visually updates when a story with a different `politicalLean` is viewed.
- Audio Player toggles play state without crashing.
