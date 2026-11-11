# HabitFlow — Personal Life & Productivity Operating System
> **Product Specification, Architecture Blueprint & 2027 Engineering Roadmap**  
> *Author:* Mars Bansiti  
> *Repository:* [https://github.com/Marsbansiti/habitflow](https://github.com/Marsbansiti/habitflow)  
> *Live Deployment:* [https://habitflow-app-wxnb.netlify.app](https://habitflow-app-wxnb.netlify.app)  
> *Vercel 1-Click Deploy:* [Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Marsbansiti/habitflow)

---

## 1. Executive Summary & Product Vision

### 1.1 The Problem
Conventional habit trackers treat personal growth as a static checklist. They suffer from three fundamental limitations:
1. **Shallow State Representation:** Habits are reduced to a single binary `completed` flag per day without context, time spent, difficulty, rest days, or historical correction capabilities.
2. **Flawed Streak Mechanics:** Hardcoded or superficial streak counters that punish users for planned recovery periods, causing streak fatigue and abandonment.
3. **Disconnected Productivity Silos:** Habit tracking, deep work focus timers, skill acquisition, and goal management are split across multiple disjointed applications.

### 1.2 The HabitFlow Solution
**HabitFlow** is an intelligent **Personal Life & Productivity Operating System** designed to bridge intentionality and execution. By synthesizing tactile micro-interactions with a deterministic historical analytics engine, HabitFlow transforms routine maintenance into a rewarding, continuous operating rhythm.

```
       ┌────────────────────────────────────────────────────────┐
       │             HabitFlow Personal Operating System        │
       └───────────────────────────┬────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
  Tactile Interface         Deterministic Engine       Intelligent Coaching
  - Emerald Noir / UV       - ISO Calendar Streak      - Daily Tactical Focus
  - SVG Micro-interactions  - Rest Day Freeze          - Habit Stacking
  - Web Audio Acoustics     - 52-Week Intensity Map    - Weekly Retrospective
```

---

## 2. Core Architectural Pillars

### 2.1 Technology Stack Matrix
| Layer | Technology | Key Responsibility |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 15 + React 19 + TypeScript | High-performance App Router with server-rendered components and client-side micro-interactions. |
| **Styling & Tokens** | Tailwind CSS + CSS Custom Properties | Semantic design system supporting Emerald Noir, Ultraviolet Pulse, Amber Forge, and Daylight Studio. |
| **Backend Services** | NestJS 10 + Node.js 22 | Enterprise modular REST API architecture with JWT authentication, rate limiting, and validation pipes. |
| **Data Persistence** | PostgreSQL + Prisma ORM | Relational schema with 18 normalized models, foreign keys, compound indexes, and audit logs. |
| **Analytics Engine** | Custom Deterministic Engine | Pure mathematical calculation of current streaks, longest streaks, adherence rates, and rest-day freezes. |
| **Audio Synthesis** | HTML5 Web Audio API | Frequency-modulated tactile completion chimes, timer ticks, and synthetic rain/binaural soundscapes. |
| **Deployment** | Netlify / Vercel + Docker Compose | Edge-optimized static and serverless deployments with zero-downtime rollouts. |

---

## 3. UI/UX Design System & Theme Specification

HabitFlow implements a tactile, glassmorphic design language engineered for long-term daily use without visual fatigue.

### 3.1 Color Palette & Theme Tokens
```
┌───────────────────┬──────────────────────────────────────────────────────────┐
│ Theme Name        │ Color Palette & Atmosphere                               │
├───────────────────┼──────────────────────────────────────────────────────────┤
│ Emerald Noir      │ Background: #0a0e0d | Surface: #131a18 | Accent: #10b981 │
│ Ultraviolet Pulse │ Background: #0b0914 | Surface: #151124 | Accent: #8b5cf6 │
│ Amber Forge       │ Background: #0f0c08 | Surface: #1c1710 | Accent: #f59e0b │
│ Daylight Studio   │ Background: #f8fafc | Surface: #ffffff | Accent: #059669 │
└───────────────────┴──────────────────────────────────────────────────────────┘
```

### 3.2 Micro-Interactions & Sensory Feedback
- **Tactile Checkbox Animation:** 400ms cubic-bezier transition combining SVG stroke dash-offset expansion, spring checkmark draw, and particle micro-burst.
- **Web Audio Acoustics:**
  - *Habit Check:* Dual-frequency sine ping (587.33 Hz → 880 Hz, D5 to A5) with exponential volume decay.
  - *Streak Milestone:* Major triad arpeggio (C5 - E5 - G5 - C6) triggered when streak thresholds are reached.
  - *Pomodoro Ambient Sound:* Procedural white-noise filtered into soothing rain patterns and 432 Hz focus tones.

---

## 4. Deterministic Streak Engine Algorithm

Unlike naive counters, HabitFlow calculates streaks dynamically using chronological logs:

```typescript
// packages/shared/src/streakEngine.ts
export function calculateStreak(
  targetDate: string,
  historyMap: Record<string, 'COMPLETED' | 'REST' | 'MISSED' | 'SKIPPED'>
): StreakResult {
  let currentStreak = 0;
  let cursor = new Date(targetDate);

  while (true) {
    const dateStr = cursor.toISOString().split('T')[0];
    const status = historyMap[dateStr];

    if (status === 'COMPLETED') {
      currentStreak++;
    } else if (status === 'REST') {
      // Rest Day preserves streak without incrementing
      continue;
    } else {
      // Missing or skipped breaks the active streak
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }

  return { currentStreak, isActive: currentStreak > 0 };
}
```

### 4.1 Key Guarantees
1. **Rest Day Protection:** Scheduled rest days freeze the streak rather than penalizing recovery.
2. **Backfill & Historical Correction:** Edits to past dates immediately trigger deterministic recalculation across the entire timeline.
3. **No Drift:** Streaks are derived strictly from database state, preventing client-side counter desynchronization.

---

## 5. Domain Models & Relational Schema (Prisma)

The production schema (`prisma/schema.prisma`) encapsulates 18 models:

1. **User:** Identity, credentials, preferences, timezone, active theme.
2. **Habit:** Core definition with priority, category, frequency, target value, and difficulty.
3. **HabitLog:** Date-based status record (`COMPLETED`, `MISSED`, `SKIPPED`, `REST`), duration, notes, and proof URLs.
4. **FocusSession:** Pomodoro and deep work tracking with ambient mode and interruption logs.
5. **SkillTrack:** Personal learning modules (e.g., Spanish, Python, Excel, Driving, Yoga).
6. **SkillLesson:** Step-by-step curriculum with theory, practice, and mastery checks.
7. **Goal:** Weekly, monthly, and quarterly target objectives.
8. **Milestone:** Distinct checkpoints with progress metrics.
9. **JournalEntry:** Daily qualitative reflections, mood tracking, and gratitude prompts.
10. **HabitStack:** Routine chains connecting sequential habits (e.g., Morning Activation, Evening Wind-Down).
11. **AICoachInsight:** Daily tactical guidance, burn-out warnings, and schedule recommendations.
12. **NotificationSchedule:** Cross-platform reminder triggers and channel configurations.

---

## 6. Application Modules & Functional Capabilities

### 6.1 Bento Dashboard
- **Progress Ring:** Real-time SVG stroke calculation displaying aggregate completion percentage for the active day.
- **Streak Flame Indicator:** Animated CSS gradient flame with dynamic particle intensity proportional to active streak length.
- **Weekly Momentum Chart:** 7-day comparative visualization graphing target trajectory against actual logged performance.
- **Quick Action Bar:** One-click habit creation, focus session launch, and rest-day toggle.

### 6.2 52-Week Productivity Heatmap
- Visualizes 365 days of activity in a 7x52 matrix.
- Color intensity mapped dynamically to daily completion volume:
  - `Level 0`: No activity recorded.
  - `Level 1`: 1 - 25% daily target completed.
  - `Level 2`: 26 - 50% daily target completed.
  - `Level 3`: 51 - 75% daily target completed.
  - `Level 4`: 76 - 100% daily target completed.

### 6.3 Focus Timer & Ambient Audio Studio
- **Timer Modes:** 25/5 Pomodoro, 50/10 Deep Work, or custom stopwatch intervals.
- **Sound Generator:** Zero-bandwidth Web Audio synthesis delivering Rain, Pink Noise, and Alpha Wave Focus Beats.
- **Session Attribution:** Automatically links elapsed time to relevant habits or learning tracks.

### 6.4 Learning & Skills Hub
Pre-configured curriculum modules with interactive lesson tracking:
- 🇪🇸 **Spanish Mastery:** Common phrases, vocabulary drills, grammar fundamentals.
- 🐍 **Python Programming:** Syntax, data structures, automation scripts, backend APIs.
- 📊 **Advanced Excel & Modeling:** VLOOKUP/XLOOKUP, Pivot tables, financial macros.
- 🚗 **Defensive Driving:** Rules of the road, situational awareness, parking maneuvers.
- 🧘 **Mindful Yoga & Mobility:** Morning mobility, desk decompression, posture reset.
- 📚 **Deep Reading & Syntopical Analysis:** Speed comprehension, note synthesis, active recall.

---

## 7. REST API Endpoints Reference

```http
### Authentication
POST   /api/v1/auth/register          # Create new account
POST   /api/v1/auth/login             # Authenticate & obtain JWT
GET    /api/v1/auth/me                # Retrieve active session profile

### Habit Management
GET    /api/v1/habits                 # List user habits with filters
POST   /api/v1/habits                 # Create new habit
GET    /api/v1/habits/:id             # Get habit details
PATCH  /api/v1/habits/:id             # Update habit configuration
DELETE /api/v1/habits/:id             # Archive or soft-delete habit
POST   /api/v1/habits/reorder         # Batch update display priority

### Completion & Historical Logs
GET    /api/v1/habits/:id/logs        # Retrieve date-range logs for habit
POST   /api/v1/habits/:id/logs        # Record or update completion log
DELETE /api/v1/habits/:id/logs/:date  # Clear or undo completion record

### Analytics & Reports
GET    /api/v1/analytics/overview     # Aggregate statistics & completion rates
GET    /api/v1/analytics/heatmap      # 365-day activity density matrix
GET    /api/v1/analytics/streaks      # Streak leaderboard & milestone data

### Focus Sessions
POST   /api/v1/sessions/start         # Initialize focus timer session
POST   /api/v1/sessions/:id/stop      # Conclude session and commit metrics
GET    /api/v1/sessions/today         # Sum of productive hours for current day

### AI Productivity Coach
GET    /api/v1/ai/daily-briefing      # Algorithmic morning optimization plan
POST   /api/v1/ai/retrospective       # Generate comprehensive weekly review
```

---

## 8. Deployment & Infrastructure

### 8.1 Netlify Production Deployment
- **Status:** **LIVE & HEALTHY**
- **Public URL:** [https://habitflow-app-wxnb.netlify.app](https://habitflow-app-wxnb.netlify.app)
- **Site ID:** `eeff3f72-d070-49f8-8d86-cbf0e637b1ed`
- **SSL:** Managed Let's Encrypt TLS with HSTS headers.

### 8.2 Vercel Deployment Guide
To deploy directly on Vercel:
1. Open the [Vercel GitHub Import Link](https://vercel.com/new/clone?repository-url=https://github.com/Marsbansiti/habitflow).
2. Select your Vercel personal or team scope.
3. Configure environment variables using `.env.example`.
4. Deploy with automatic CI/CD on every push to `main`.

### 8.3 Local Self-Hosting via Docker
```bash
# Clone the repository
git clone https://github.com/Marsbansiti/habitflow.git
cd habitflow

# Start PostgreSQL and Redis
docker-compose up -d

# Install dependencies and start development environment
npm install
npm run dev
```

---

## 9. Product Roadmap (2027)

```
[Q1 2027] Foundations & Core OS ────► [Q2 2027] Social & Habit Stacking
- Deterministic Streak Engine         - Accountability Partner Sync
- 52-Week GitHub Heatmap              - Morning/Evening Routine Stacks
- Pomodoro Audio Engine               - Native iOS/Android Companion Apps

[Q3 2027] Enterprise & AI Coach ────► [Q4 2027] Ecosystem Expansion
- Predictive Burnout Detection        - Apple Health & Google Fit Sync
- Voice Command Logging               - Hardware E-Ink Desk Display
- Team Workspace Habits               - Public Developer API & Webhooks
```

---
*HabitFlow — Designed for high-agency individuals who prioritize sustained mastery.*
