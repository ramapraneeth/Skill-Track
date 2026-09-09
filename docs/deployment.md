# SkillTrack: Deployment Guide

## 1. Prerequisites
- Node.js v20+ or v24+
- Neon PostgreSQL serverless cloud instance (or compatible PostgreSQL database)
- Git repository connected to GitHub / GitLab / Bitbucket
- Vercel account (optional for cloud hosting)

---

## 2. Environment Variables Configuration

Create a `.env` file in the project root based on `.env.example`:

```ini
# Neon PostgreSQL Connection String (pooled connection recommended for serverless)
DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/[dbname]?sslmode=require"

# JWT Secret Key for Session Authentication
SECRET_KEY="your-production-jwt-secret-key"

# Optional Demo Account Overrides for Seeding
DEMO_ADMIN_EMAIL="demo.gov@skilltrack.gov.in"
DEMO_ADMIN_PASSWORD="YourSecurePasswordHere"
DEMO_PROVIDER_EMAIL="demo.provider@skilltrack.gov.in"
DEMO_PROVIDER_PASSWORD="YourSecurePasswordHere"
DEMO_LEARNER_EMAIL="demo.learner@skilltrack.gov.in"
DEMO_LEARNER_PASSWORD="YourSecurePasswordHere"
```

> [!CAUTION]
> Never commit actual passwords or database credentials to version control. Keep `.env` in `.gitignore`.

---

## 3. Database Initialization & Seeding

### 1. Generate Prisma Client
```bash
npx prisma generate
npx prisma validate
```

### 2. Seed Longitudinal Demo Accounts
```bash
npx tsx prisma/seed.ts
```
This provisions demonstration credentials with bcrypt password hashing for all 3 actual institutional roles (`learner`, `provider`, `government`).

---

## 4. Local Build & Execution

### Install Dependencies
```bash
npm install
```

### Run Production Build
```bash
npm run build
```

### Run Local Production Server
```bash
npm start
```
The application will serve at `http://localhost:3000`.

---

## 5. Vercel Cloud Deployment

SkillTrack is architected as a Next.js 15 App Router monolith, making it natively compatible with Vercel zero-configuration deployments:

1. **Import Project into Vercel**:
   - Push your repository to GitHub.
   - Go to [Vercel Dashboard](https://vercel.com/new) and import the repository.
   - Framework Preset: **Next.js**.
   - Root Directory: `./`.

2. **Configure Environment Variables**:
   In the Vercel Project Settings > Environment Variables, add:
   - `DATABASE_URL`: Your Neon PostgreSQL pooled connection string.
   - `SECRET_KEY`: A secure random 32-byte secret string for JWT signing.

3. **Build & Output Settings**:
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Deploy**:
   Click **Deploy**. All 23 static and dynamic routes (including all 10 API route handlers) will automatically compile to serverless edge and Node.js runtimes.
