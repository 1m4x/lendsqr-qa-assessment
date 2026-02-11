const { createClient } = require("../src/httpClient");
const { expectStatusIn, expectMessage } = require("../src/validators");
const { token } = require("../src/config");

describe("Nigeria - Direct Debit", () => {
  test("Get All Banks (GET /direct-debit/banks?limit=100&page=1&sort_dir=ASC) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.get(`/direct-debit/banks?limit=100&page=1&sort_dir=ASC`);

    expectStatusIn(res, [200, 401, 403]);
    expectMessage(res);
  });

  test("Verify Bank Account Number (POST /direct-debit/banks/account-lookup) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.post(`/direct-debit/banks/account-lookup`, {
      account_number: "2150302690",
      bank_code: "057"
    });

    expectStatusIn(res, [200, 400, 401, 403, 422]);
    expectMessage(res);
  });

  test("Auth sanity: if token is empty, should be 401/403", async () => {
    if (token) return;

    const clientNoAuth = createClient({ withAuth: false });
    const res = await clientNoAuth.get(`/direct-debit/banks?limit=100&page=1&sort_dir=ASC`);

    expectStatusIn(res, [401, 403]);
    expectMessage(res);
  });
});
