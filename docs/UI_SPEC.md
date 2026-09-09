# SkillTrack: UI Specification & GovTech Design System

This UI specification is derived from the approved Google Stitch **Skill Track** (*Longitudinal Governance*) design system.

## 1. Aesthetic Guidelines
- **Character:** Institutional Modernism with Administrative Rigor. Serious Indian public digital service.
- **Strictly Prohibited:** Aggressive glassmorphism, neon colors, cyberpunk motifs, floating 3D balls, dark dashboard aesthetic, or exaggerated gradients.

## 2. Design Tokens

### Color Palette
- **Primary (Civic Blue):**
  - Base: `#0B3B60` — Primary action triggers, main navigation active states, institutional anchors.
  - Dark: `#002541` — Deep text anchors, high-level structural elements.
  - Hover: `#104C7E` — Interactive hover states.
  - Subtle: `#E8F0F7` — Selected row backgrounds, primary focus halos.
- **Secondary (Analytical Teal):**
  - Base: `#006876` / `#028090` — Metric progression bars, cohort milestone markers.
  - Light: `#00A896` / `#059669` — Positive trajectory tracking, baseline certification markers.
  - Subtle: `#E6F5F6` — Contextual metric cards, analytical category pills.
- **Tertiary (Saffron & Amber Accent):**
  - Base: `#E65100` — High-priority longitudinal alerts, policy compliance warnings.
  - Subtle: `#FFF3E0` — Warning container backgrounds.
- **Neutrals & Structural Grays:**
  - Canvas: `#F4F6F9` (or `#F8FAFC`) — Default background for all screens.
  - Surface: `#FFFFFF` — White cards, tables, modal sheets.
  - Border Structural: `#D1D9E2` (1px crisp division borders).
  - Border Subtle: `#E2E8F0` — Internal row dividers.
  - Text Primary: `#1C2733` — Default body text and metric values.
  - Text Secondary: `#4A5568` — Field labels, metadata, table column headers.

### Typography
- Primary Font: **Public Sans** (fallback to Inter / system sans-serif).
- Numeric & Financial Data: Always apply `font-variant-numeric: tabular-nums` (`font-mono` or `tabular-nums`) to prevent jitter in tables and metric cards.

### Shapes & Component Dimensions
- **Button Height:** Strictly 38px to 40px with consistent 16px horizontal padding.
- **Border Radius:** 4px to 6px (`rounded-md`). Never use full pills (`rounded-full`) for main buttons or cards.
- **Cards:** 1px solid border (`#D1D9E2`), subtle ambient shadow, `p-5` or `p-6` padding.

## 3. Unified Modal-Based Authentication
- Single entry point on Public Home Page (`/`).
- Two distinct steps in the same modal:
  1. Role selection card radio (Learner, Training Provider, Government).
  2. Credential inputs with Back button.
- Redirects to `/learner/dashboard`, `/provider/dashboard`, or `/government/dashboard`.
