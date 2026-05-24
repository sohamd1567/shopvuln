# ShopVuln — Deliberately Vulnerable E-Commerce App

A vulnerable target app for testing VibeAudit.

## Setup
npm install
npm run db:migrate
npm run db:seed
npm run dev

## Test Accounts
- victim@shopvuln.com / password123
- attacker@shopvuln.com / password123
- admin@shopvuln.com / password123

## Vulnerable Routes
- GET /api/orders/[orderId] — missing ownership check
- GET /api/profile/[userId] — missing ownership check

## Safe Route
- GET /api/orders — correctly protected

App runs on http://localhost:3001
