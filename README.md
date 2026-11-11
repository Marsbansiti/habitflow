# HabitFlow — Personal Life & Productivity Operating System

A scalable personal productivity platform engineered with **Next.js (React 19)**, **NestJS**, **PostgreSQL**, **Prisma ORM**, **Redis**, and an **Intelligent AI Productivity Coach**.

---

## 🏛️ Monorepo Architecture

```
habitflow/
├── apps/
│   ├── web/                    # Next.js 15+ / React 19 Frontend
│   │   ├── app/                # App Router (page.tsx, layout.tsx)
│   │   ├── components/         # Reusable Bento & UI components
│   │   │   ├── dashboard/      # ProgressRing, StreakCounter, Header, Nav
│   │   │   ├── habits/         # HabitList, HabitCard, CreationModal
│   │   │   ├── calendar/       # Monthly HabitCalendar & Date Inspector
│   │   │   ├── analytics/      # GitHub-style ProductivityHeatmap
│   │   │   ├── timer/          # FocusTimer, Pomodoro & Ambient sounds
│   │   │   ├── learning/       # LearningHub (Languages, Vocab, Tech)
│   │   │   ├── ai/             # AI Productivity Coach & Chat
│   │   │   └── ui/             # TactileCheckbox, Flame, Roller
│   │   └── types/              # Frontend interfaces
│   └── api/                    # NestJS REST API Backend
│       └── src/
│           ├── auth/           # JWT, Registration, Password hashing
│           ├── habits/         # Habit CRUD, Schedules, Reorder
│           ├── habit-logs/     # Historical Date Logs & Corrections
│           ├── sessions/       # Focus & Pomodoro Time Tracking
│           ├── analytics/      # Daily/Weekly/Monthly metrics & Heatmap
│           ├── ai/             # AI Daily Coach & Weekly Review
│           ├── prisma/         # Prisma Client Service & Module
│           └── common/         # Guards, Interceptors, Filters
├── packages/
│   ├── shared/                 # Deterministic StreakEngine
│   └── types/                  # Shared Domain Types & Contracts
├── prisma/
│   └── schema.prisma           # 18 Relational PostgreSQL Models
├── docker-compose.yml          # PostgreSQL 16 + Redis 7 + API + Web
└── .env.example                # Environment variables template
```

---

## ⚡ Key Highlights & Systems

1. **Deterministic Streak Engine (`packages/shared/src/streakEngine.ts`)**:
   - Calculates consecutive scheduled completion dates.
   - Rest Day & Streak Freeze (`🛡️ FREEZE`) protection preserves streaks during planned recovery.
   - Calculates verified current streaks, personal bests, and windowed consistency rates (7d, 30d, 90d, 365d).
2. **18 Relational PostgreSQL Models (`prisma/schema.prisma`)**:
   - Enforces UUID primary keys, user data isolation, unique date constraints (`@@unique([habitId, date])`), and audit timestamps.
   - Fully separates habit definitions from historical daily completion logs.
3. **AI Productivity Coach (`apps/api/src/ai/`)**:
   - Analyzes real historical execution to generate daily habit stacking recommendations.
   - Generates weekly grades (e.g., Grade A+), winning pattern analysis, and fatigue drop-off detection.
4. **Interactive Focus Timer & Time Tracking (`apps/web/components/timer/`)**:
   - Circular countdown timer with Pomodoro, Deep Flow, and Break presets.
   - Automatically attributes focused minutes to the linked habit and daily productivity database records.
5. **Multi-Theme System Preserved**:
   - **Emerald Noir**, **Ultraviolet Pulse**, **Amber Forge**, and **Daylight Studio** with tactile spring physics and Web Audio synthesizer.

---

## 🚀 Running with Docker Compose

```bash
# 1. Clone or navigate to the directory
cd c:/Users/User/Downloads/Saas/habitflow

# 2. Copy environment template
cp .env.example .env

# 3. Start PostgreSQL, Redis, NestJS API, and Next.js Web
docker-compose up --build
```

- **Frontend Application**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:4000`
- **PostgreSQL Database**: `localhost:5432`
