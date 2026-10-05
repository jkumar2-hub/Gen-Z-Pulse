# Gen Z Pulse — Design System MASTER.md
> UI/UX Pro Max Generated | Style: Neo-Brutalism + Glassmorphism | Motion: 9/10

## Identity
- Product: Gen Z Pulse
- Style: Neo-Brutalism meets dark glassmorphism — bold, kinetic, Gen Z
- Variance: 9/10 (Bold, asymmetric, loud)
- Motion: 9/10 (Complex spring choreography)
- Density: 6/10 (Standard)

## Typography

### Primary Pairing: Gen Z Brutal + Editorial
| Role | Font | Weight | Size | Line Height |
|---|---|---|---|---|
| Display / Hero | Space Grotesk | 700 | 48-80px | 1.0 |
| H1 | Space Grotesk | 700 | 32-48px | 1.1 |
| H2 | Space Grotesk | 600 | 24-32px | 1.2 |
| H3 | Space Grotesk | 600 | 20-24px | 1.3 |
| Body | Epilogue | 400 | 16-18px | 1.6 |
| Body Bold | Epilogue | 600 | 16px | 1.5 |
| Caption / Label | Epilogue | 500 | 12-14px | 1.4 |
| Tag / Badge | Space Grotesk | 700 | 10-12px | 1.0 |

### Google Fonts Import
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Epilogue:wght@300;400;500;600;700&display=swap');

## Color Tokens

### Dark Mode (Primary)
| Token | Hex | Usage |
|---|---|---|
| --color-bg-base | #0A0A0F | App background |
| --color-bg-elevated | #12121A | Card background |
| --color-bg-glass | rgba(255,255,255,0.05) | Glass cards |
| --color-border | rgba(255,255,255,0.08) | Card borders |
| --color-border-accent | rgba(255,45,85,0.4) | Accent borders |
| --color-pulse-red | #FF2D55 | Breaking news, CTAs, energy |
| --color-electric-purple | #7C3AED | Premium, depth, story arc |
| --color-neon-green | #10F5A0 | IQ score, positive, action |
| --color-electric-blue | #3B82F6 | Links, context, info |
| --color-amber | #F59E0B | Developing stories, caution |
| --color-text-primary | #F8F8FF | Primary text |
| --color-text-secondary | #94A3B8 | Secondary text |
| --color-text-muted | #475569 | Muted text |

### Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| --color-breaking | #FF2D55 | Breaking news badge |
| --color-developing | #F59E0B | Developing story |
| --color-resolved | #10F5A0 | Story resolved |
| --color-impact | #7C3AED | Story impact marker |
| --color-premium | #7C3AED | Premium feature lock |

## Spacing Scale

| Token | Value | Usage |
|---|---|---|
| --space-1 | 4px | Micro gap |
| --space-2 | 8px | Component internal |
| --space-3 | 12px | Element gap |
| --space-4 | 16px | Section padding |
| --space-5 | 24px | Card padding |
| --space-6 | 32px | Section gap |
| --space-8 | 48px | Major section |
| --space-10 | 64px | Hero padding |
| --space-12 | 80px | Page top |

## Corner Radius
| Token | Value | Usage |
|---|---|---|
| --radius-sm | 4px | Tags, badges |
| --radius-md | 8px | Buttons, inputs |
| --radius-lg | 16px | Cards |
| --radius-xl | 24px | Bottom sheet, modals |
| --radius-full | 9999px | Pills, avatars |

## Motion Tokens (Framer Motion)

### Spring Presets
| Name | stiffness | damping | mass | Usage |
|---|---|---|---|---|
| snappy | 400 | 30 | 1 | Button press, tap feedback |
| bouncy | 300 | 20 | 1 | Card entrance, list items |
| smooth | 200 | 25 | 1 | Page transitions, modals |
| heavy | 150 | 28 | 1.5 | Hero elements, big reveals |

### Duration Presets
| Name | Value | Usage |
|---|---|---|
| instant | 0.1s | Hover state changes |
| fast | 0.2s | Button state |
| normal | 0.35s | Card transitions |
| slow | 0.6s | Page transitions |
| cinematic | 0.9s | Hero reveal |

### Key Animation Patterns
1. Card Entrance: { opacity: 0→1, y: 20→0, spring: bouncy, stagger: 0.06s }
2. Kinetic Headline: SplitText chars { opacity: 0→1, y: 20→0, rotateX: -40→0, stagger: 0.015s }
3. Depth Dial Expand: { height: auto, spring: smooth }
4. Story Arc Timeline: items stagger in from left { x: -20→0, opacity: 0→1, stagger: 0.08s }
5. Bottom Sheet: { y: '100%'→0, spring: snappy }
6. Page Transition: { opacity: 0→1, y: 10→0, spring: smooth }
7. Pulse Badge: { scale: 1→1.05→1, repeat: Infinity, duration: 2s }
8. News IQ Score Counter: { from: 0→score, ease: cubicOut, duration: 1.2s }

## Component Patterns

### Story Card
- Dark glass background: bg-elevated + glass overlay
- Left border: 3px solid var(--color-breaking) for breaking stories
- Category tag: Space Grotesk 700, 10px ALL CAPS, colored by category
- Source + time: Epilogue 400, text-secondary, right-aligned
- Hover: translateY(-2px), shadow elevation increase
- Active/pressed: scale(0.98), 100ms spring

### Bottom Navigation
- Max 5 items: Feed / Explore / Story Arcs / IQ Mode / Profile
- Active: icon filled + Pulse Red glow (box-shadow: 0 0 12px rgba(255,45,85,0.6))
- Inactive: icon outline, text-muted
- Blur background: backdrop-blur-md

### News IQ Score Card (Shareable)
- Dark gradient card with neon green score number
- Space Grotesk 700 headline
- Gen Z Pulse logo bottom-right
- Shareable as PNG via canvas capture

## Anti-Patterns (NEVER DO)

- No emojis as icons — use Lucide React (SVG) exclusively
- No horizontal scroll at any breakpoint
- No layout thrashing animations (never animate width/height directly — use scaleX or maxHeight)
- No color-only error states — always pair with icon + text
- No text < 12px in body content
- No placeholder-only form labels
- No uncontrolled animation without prefers-reduced-motion check
- No 3rd-party ad networks

## Pre-Delivery Checklist

- [ ] WCAG AA: 4.5:1 contrast on all text
- [ ] Lucide SVG icons (no emoji, no png icons)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover transitions: 150-300ms
- [ ] Focus rings visible for keyboard navigation
- [ ] prefers-reduced-motion: skip all non-essential motion
- [ ] Responsive: 375px / 768px / 1024px / 1440px all tested
- [ ] No horizontal scroll
- [ ] Bottom nav max 5 items
- [ ] All images: WebP format, lazy loaded, alt text present
- [ ] Forms: visible labels, inline validation, error near field
