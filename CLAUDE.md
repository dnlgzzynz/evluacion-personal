# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal professional evaluation dashboard built with React + Vite. It visualizes professional competencies across 10 different career profiles, tracks skill gaps, and generates personalized learning prompts based on Gardner's Multiple Intelligences theory.

The application is highly specialized for personal skills tracking and learning path generation, with all data hardcoded in the main component (intentionally static, not database-driven).

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (usually runs on port 5173, but will auto-increment if busy)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run ESLint
npm run lint
```

## Architecture

### Single-Page Application Structure
- **Entry point**: `src/main.jsx` → renders App in StrictMode
- **Root component**: `src/App.jsx` → renders FullProfileDashboard
- **Main component**: `src/components/FullProfileDashboard.jsx` (1400+ lines)
  - Contains ALL application logic and data
  - No routing, uses internal view state (`view` state variable)
  - 7 different views: overview, radar, gaps, detail, roadmap, gardner, prompts

### Data Model (Hardcoded in FullProfileDashboard.jsx)

**PROFILES array** (lines 18-259):
- 10 professional profiles (BIM Management, Revit API, Construction, Automation, AI/ML, DevOps, Sustainability, Parametric Design, Software Dev, Business)
- Each profile has: id, name, icon, color, description, skills array, strengths, gaps, nextSteps
- Skills have: name, level (current %), target (goal %)

**GARDNER array** (lines 261-406):
- 8 multiple intelligences (Spatial-Visual, Logical-Mathematical, Interpersonal, Linguistic, Intrapersonal, Naturalistic, Kinesthetic, Musical)
- Each has: id, name, icon, color, level, description, indicators (boolean), strengths, development areas

**Key functions** (lines 408-614):
- `generatePrompt()`: Creates detailed learning prompts for skill gaps (used in Prompts view)
- Helper functions: `getAvg()`, `getTargetAvg()`, `getGap()`, `getLevelColor()`, `getLevelLabel()`

### Theme System
- Theme object `T` (lines 8-16) defines all colors
- Dark theme with accent colors mapped to profiles
- Consistent color coding: accent (green) for high skills, warning (orange) for medium, danger (red) for low

### Visualization
- **Recharts library** for all charts (RadarChart, BarChart, PieChart)
- Custom tooltip components
- Responsive containers for all charts
- Custom `SkillBar` component with progress indicators

## Important Implementation Details

### State Management
All state is local React state (no Redux, no Context):
- `view`: Current tab/section (overview, radar, gaps, etc.)
- `selectedProfile`: Which profile is selected in detail view
- `sortBy`: Sorting preference for overview (level, gap, name)
- `promptEdits`: Tracks user edits to learning prompts
- `copiedId`: Tracks which prompt was copied to clipboard
- `promptFilter`: Filters prompts by profile or Gardner

### View Rendering Pattern
Each view is conditionally rendered based on `view` state:
```javascript
{view === "overview" && <OverviewView />}
{view === "radar" && <RadarView />}
// etc.
```

### Data Flow
1. Static data (PROFILES, GARDNER) →
2. useMemo computations (overviewData, radarData, etc.) →
3. Recharts components or custom UI components

### Prompt Generation
The `generatePrompt()` function creates comprehensive learning prompts with:
- 11 structured sections (glossary, concept map, timeline, study plan, formulas, resources, exercises, self-assessment, flowchart, strategic connections, next iteration)
- Context about the user (Daniel, architect, CEO of BAC consulting)
- Current skill levels and targets
- Spanish language output

## Modifying the Application

### To add a new profile:
1. Add object to `PROFILES` array with all required fields
2. Component will auto-update (no routing changes needed)

### To modify skill data:
1. Edit the `skills` array within relevant profile in `PROFILES`
2. Update `level` (current) and `target` (goal) percentages

### To adjust visualizations:
1. Recharts components are in view-specific render blocks
2. Chart data is computed in useMemo hooks (overviewData, radarData, etc.)
3. Customize via Recharts props (colors, sizes, tooltips)

### To change theme:
1. Modify the `T` theme object at the top of FullProfileDashboard.jsx
2. All colors reference this object

## Spanish Language Context

The UI is entirely in Spanish. Key terms:
- "Brecha" = Gap (skill gap)
- "Nivel" = Level
- "Objetivo" = Target/Goal
- "Promedio" = Average
- "Fortalezas" = Strengths
- "Próximos pasos" = Next steps

## ESLint Configuration

Custom ESLint setup (eslint.config.js):
- Ignores capital letter variables (for theme object T, component names, etc.)
- React hooks rules enabled
- React refresh for Vite HMR

## Vite Configuration

Minimal Vite config (vite.config.js):
- Single plugin: @vitejs/plugin-react
- No custom build settings
- Default port behavior (starts at 5173, increments if busy)

## Performance Considerations

- Large component (~1400 lines) but acceptable for this single-purpose app
- useMemo prevents unnecessary recalculations of chart data
- No external API calls = instant load time
- All data bundled with app = no loading states needed

## DO NOT

- Do not split FullProfileDashboard into smaller components unless explicitly requested (intentionally monolithic for easy editing of all data in one place)
- Do not add routing (single page by design)
- Do not fetch data from APIs (static data is intentional)
- Do not add a database (this is a personal dashboard, not multi-user)