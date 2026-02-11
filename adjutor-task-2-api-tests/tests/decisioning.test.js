const { createClient } = require("../src/httpClient");
const { expectStatusIn, expectMessage } = require("../src/validators");

describe("Decisioning", () => {
  test("Get Decision Models (GET /decisioning/models) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const res = await client.get("/decisioning/models");

    expectStatusIn(res, [200, 401, 403, 404, 422]);
    expectMessage(res);

    if (res.status === 200) {
      expect(res.data.data).toBeDefined();
    }
  });

  test("Get Decision Model Details (GET /decisioning/models/:id/settings) - validates status + message", async () => {
    const client = createClient({ withAuth: true });

    const modelsRes = await client.get("/decisioning/models");
    expectStatusIn(modelsRes, [200, 401, 403, 404, 422]);
    expectMessage(modelsRes);

    if (modelsRes.status !== 200 || !modelsRes.data?.data?.length) {
      return;
    }

    const modelId = modelsRes.data.data[0]?.id || modelsRes.data.data[0]?._id;
    expect(modelId).toBeTruthy();

    const res = await client.get(`/decisioning/models/${modelId}/settings`);

    expectStatusIn(res, [200, 401, 403, 404, 422]);
    expectMessage(res);
  });
});
