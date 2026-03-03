# Architecture

**Last Updated:** [date]

---

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | [e.g., React 19 + Vite] | [Why this choice] |
| **Backend** | [e.g., FastAPI] | [Why this choice] |
| **Database** | [e.g., Supabase/PostgreSQL] | [Why this choice] |
| **Auth** | [e.g., Supabase Auth] | [Why this choice] |
| **Deployment** | [e.g., Netlify + Railway] | [Why this choice] |
| **AI** | [e.g., Anthropic Claude API] | [Why this choice] |

---

## Project Structure

```
[project-name]/
├── VECTOR.md              # Project doctrine (read first)
├── CLAUDE.md              # Agent persona (read second)
├── ARCHITECTURE.md        # This file (read third)
├── README.md              # Public documentation
├── /src                   # Frontend application
│   ├── main.jsx           # Entry point
│   ├── App.jsx            # Root component
│   ├── App.css            # Global styles
│   └── /components        # UI components
├── /core                  # Pure business logic (no side effects)
│   ├── store.jsx          # State management (Context + useReducer)
│   └── utils.js           # Utility functions
├── /services              # External integrations (API calls, auth)
│   └── api.js             # Fetch wrapper
├── /design-system         # Visual foundation
│   └── tokens.css         # CSS variables (colors, spacing, typography)
├── /api                   # Backend (when added)
├── /vector                # Zero Vector knowledge artifacts
│   ├── /schemas           # zv-*.json schema definitions
│   ├── /research          # Structured research artifacts
│   └── /decisions         # Architecture Decision Records
└── /docs                  # Project documentation
```

---

## Conventions

### File Organization
- **core/** — Pure functions and state. Testable without mocking. No API calls, no DOM.
- **services/** — Anything that talks to the outside world. API calls, auth, storage.
- **src/components/** — React components. UI only. Business logic lives in core/.
- **design-system/** — CSS variables. Change tokens.css to change the entire theme.

### Naming
- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- CSS: `kebab-case.css`
- Schemas: `zv-[type].json`

### State Management
- Use `core/store.jsx` (Context + useReducer) for shared state
- Local component state with `useState` for UI-only state
- No Redux, no Zustand unless the project outgrows Context

### Styling
- CSS variables from `design-system/tokens.css`
- No Tailwind. No CSS-in-JS. Plain CSS with variables.
- Dark theme is the default

### API Pattern
- All API calls go through `services/api.js`
- Environment variables in `.env` (never committed)
- Backend URL via `VITE_API_URL`

---

## Decisions

Architecture Decision Records live in `/vector/decisions/`.

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| 000 | [Template] | — | Template |

When you make a significant technical choice, document it as an ADR.
