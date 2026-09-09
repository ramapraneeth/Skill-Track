# SkillTrack: Deployment Guide

## 1. Prerequisites
- Node.js v20+ or v24+
- Neon PostgreSQL cloud instance
- Environment variables configured in `.env`

---

## 2. Environment Setup
Create a `.env` file in the project root:
```ini
DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/[dbname]?sslmode=require"
SECRET_KEY="your-production-jwt-secret-key"
```

---

## 3. Build & Run Commands

### Installation
```bash
npm install
```

### Database Synchronization
```bash
npx prisma db pull
npx prisma generate
npx prisma validate
```

### Production Build
```bash
npm run build
```

### Run Server
```bash
npm start
```
The server will bind to `http://localhost:3000`.

---

## 4. Docker Deployment
A containerized deployment can use the standard Next.js standalone output:
```bash
docker build -t skilltrack-outcome-intelligence .
docker run -p 3000:3000 --env-file .env skilltrack-outcome-intelligence
```
