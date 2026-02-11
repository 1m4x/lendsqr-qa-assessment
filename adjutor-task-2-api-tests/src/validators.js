function expectStatusIn(res, allowed) {
    expect(allowed).toContain(res.status);
  }
  
  function expectMessage(res) {
    expect(res.data).toBeDefined();
    expect(typeof res.data).toBe("object");
    expect(res.data.message).toBeDefined();
    expect(typeof res.data.message).toBe("string");
    expect(res.data.message.length).toBeGreaterThan(0);
  }
  
  module.exports = { expectStatusIn, expectMessage };
  