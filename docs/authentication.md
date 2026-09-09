# SkillTrack: Authentication & Authorization Design

## 1. Unified 2-Step Login UX
SkillTrack implements a single public entry point (`/`) without separate login routes.
- **Step 1:** The user clicks "Login to SkillTrack". A modal opens presenting three selectable persona cards:
  - *Learner / Candidate*
  - *Training Provider*
  - *Government / Administrator*
  - The "Continue" button is strictly disabled until a persona is selected.
- **Step 2:** Form reveals email and password inputs with demo credential suggestions.
  - Clicking "Back" returns to the persona selector.
  - Submitting sends credentials to `POST /api/auth/login`.
- **Post-Authentication:** Upon receiving a signed JWT token, the client redirects directly to:
  - `/learner/dashboard`
  - `/provider/dashboard`
  - `/government/dashboard`

---

## 2. Security Guarantees
1. **Password Hashing:** Passwords are hashed with bcrypt (cost factor 12). Plaintext passwords are never stored.
2. **Server-Side Authorization:** Route handlers verify the decoded JWT claims (`role`, `sub`). The client-selected role is cross-validated against the database record; role mismatches return `403 Forbidden`.
3. **Secret Isolation:** JWT `SECRET_KEY` and Neon `DATABASE_URL` are strictly stored in `.env` and excluded from Git commits.
