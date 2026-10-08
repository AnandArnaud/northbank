# northbank

Northbank is a minimal SaaS project workspace — sign up, log in, create and complete tasks, invite teammates, upgrade.

**Stack:** Next.js 15 (App Router, TypeScript)

It is intentionally small.

## Key user actions

sign up · log in · create task · complete task · invite · upgrade

## Running it

```bash
npm install
npm run dev   # http://localhost:3000
```

## Events and warehouse

The app collects its own product events (`app/collect.ts` → `/api/events` → `data/events.jsonl`) and a nightly job loads them into our Snowflake warehouse (`warehouse/`, table `PRODUCT.ANALYTICS.EVENTS`). See `warehouse/README.md`.
