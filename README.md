# Lendsqr Adjutor QA Assessment - Task 2

Automated API tests for Nigerian Country Specific Endpoints** (Adjutor API Service).

## Coverage (Task 2 Requirement)
2 endpoints per Nigeria module:

### Validation 🇳🇬
- Initialize BVN Consent (POST /verification/bvn/:bvn)
- Complete BVN Consent (PUT /verification/bvn/:bvn)
- Initialize BVN Accounts Consent (POST /verification/bvn/:bvn/accounts)
- Complete BVN Accounts Consent (PUT /verification/bvn/:bvn/accounts)

### Credit Bureaus 🇳🇬
- CRC (GET /creditbureaus/crc/:bvn)
- FirstCentral (GET /creditbureaus/firstcentral/:bvn)

### Direct Debit
- Get All Banks (GET /direct-debit/banks?limit=100&page=1&sort_dir=ASC)
- Verify Bank Account Number (POST /direct-debit/banks/account-lookup)

## What the tests validate (Task 2 Requirement)
Each test includes:
- Validation of **HTTP status code**
- Validation that **response.message** exists and is non-empty

## Setup

Install dependencies

npm install

cp .env.example .env

ADJUTOR_API_TOKEN=YOUR_TOKEN_HERE

npm test

npm run test:report
