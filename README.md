# Custom Payment Gateway – Turborepo Monorepo

A full-stack custom payment gateway system built using a Turborepo monorepo architecture.

This project simulates how real-world payment systems work by introducing an intermediate payment gateway between the merchant and the bank. The focus is on transaction reliability, webhook verification, idempotency, and clean separation of responsibilities.

---

## Overview

Instead of directly integrating a bank/payment provider inside the merchant backend, this system introduces a gateway layer that:

* Verifies bank webhooks
* Normalizes payment statuses
* Prevents duplicate transactions
* Maintains a secure source of truth
* Decouples merchant logic from bank logic

This mimics how providers like Stripe or Razorpay function internally.

---

## Architecture

User → Web App → Merchant Service → Payment Gateway → Bank
                      ↓
                    Bank Webhook
                      ↓
                Gateway Verification
                      ↓
                Merchant Update
                      ↓
                UI Status Update

Core principle: the frontend never decides payment success — only verified gateway events update order state.

---

## Monorepo Structure

apps/
 bank_webhook → Payment Gateway service (handles verification)
 bank_webhook_fe → Gateway UI / debugging interface
 merchant → Merchant backend (creates orders)
 user → User/account management service
 web → Main checkout frontend

packages/
 shared → Shared types & utilities

turbo.json → Turborepo pipeline
package.json → Workspace configuration

---

## Payment Flow

1. User clicks Pay → merchant creates order → CREATED
2. Merchant asks gateway to initiate payment → PENDING
3. User interacts with bank simulator
4. Bank sends webhook to gateway
5. Gateway verifies signature and transaction
6. Merchant updated → SUCCESS / FAILED
7. Frontend fetches final state

---

## Key Concepts Implemented

* Idempotency (no double charges)
* Webhook signature verification
* Payment state machine
* Async confirmation handling
* Service decoupling
* Transaction auditing

---

## Tech Stack

Node.js services
Next.js / React frontend
REST APIs
Turborepo monorepo

---

## Getting Started

Install dependencies:
npm install

Run all services:
npm run dev

---

## Why This Exists

Most payment tutorials assume success immediately after checkout.
Real systems must handle retries, fake responses, delayed confirmation, and consistency across services.

This project focuses on those reliability problems rather than UI.

---

## Future Improvements

Multi-provider routing
Retry queues
Refund support
Admin dashboard
Docker deployment

---

## Author

Built by Sounak Roy
Created to understand real payment infrastructure beyond basic integrations.
