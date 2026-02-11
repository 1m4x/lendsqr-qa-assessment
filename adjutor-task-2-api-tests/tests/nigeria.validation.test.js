const { createClient } = require("../src/httpClient");
const { expectStatusIn, expectMessage } = require("../src/validators");
const { testBvn, testContact, testOtp, token } = require("../src/config");

describe("Nigeria - Validation 🇳🇬", () => {
  test("Initialize BVN Consent (POST /verification/bvn/:bvn) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.post(`/verification/bvn/${testBvn}`, {
      contact: testContact
    });

    expectStatusIn(res, [200, 201, 400, 401, 403, 422]);
    expectMessage(res);
  });

  test("Complete BVN Consent (PUT /verification/bvn/:bvn) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const payload = { otp: testOtp || "000000" }; // invalid OTP fallback
    const res = await client.put(`/verification/bvn/${testBvn}`, payload);

    expectStatusIn(res, [200, 400, 401, 403, 422]);
    expectMessage(res);
  });

  test("Initialize BVN Accounts Consent (POST /verification/bvn/:bvn/accounts) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.post(`/verification/bvn/${testBvn}/accounts`, {
      contact: testContact
    });

    expectStatusIn(res, [200, 201, 400, 401, 403, 422]);
    expectMessage(res);
  });

  test("Complete BVN Accounts Consent (PUT /verification/bvn/:bvn/accounts) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const payload = { otp: testOtp || "000000" };
    const res = await client.put(`/verification/bvn/${testBvn}/accounts`, payload);

    expectStatusIn(res, [200, 400, 401, 403, 422]);
    expectMessage(res);
  });

  test("Auth sanity: if token is empty, these endpoints should be 401/403", async () => {
    if (token) return;

    const clientNoAuth = createClient({ withAuth: false });
    const res = await clientNoAuth.post(`/verification/bvn/${testBvn}`, { contact: testContact });

    expectStatusIn(res, [401, 403]);
    expectMessage(res);
  });
});
