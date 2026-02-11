const { createClient } = require("../src/httpClient");
const { expectStatusIn, expectMessage } = require("../src/validators");
const { testBvn, token } = require("../src/config");

describe("Nigeria - Credit Bureaus 🇳🇬", () => {
  test("CRC Credit Bureau (GET /creditbureaus/crc/:bvn) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.get(`/creditbureaus/crc/${testBvn}`);

    expectStatusIn(res, [200, 400, 401, 403, 404, 422]);
    expectMessage(res);
  });

  test("FirstCentral Credit Bureau (GET /creditbureaus/firstcentral/:bvn) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.get(`/creditbureaus/firstcentral/${testBvn}`);

    expectStatusIn(res, [200, 400, 401, 403, 404, 422]);
    expectMessage(res);
  });

  test("Auth sanity: if token is empty, should be 401/403", async () => {
    if (token) return;

    const clientNoAuth = createClient({ withAuth: false });
    const res = await clientNoAuth.get(`/creditbureaus/crc/${testBvn}`);

    expectStatusIn(res, [401, 403]);
    expectMessage(res);
  });
});
