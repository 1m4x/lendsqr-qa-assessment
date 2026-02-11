require("dotenv").config();

module.exports = {
  baseUrl: process.env.ADJUTOR_BASE_URL || "https://adjutor.lendsqr.com/v2",
  token: process.env.ADJUTOR_API_TOKEN || "",
  testBvn: process.env.TEST_BVN || "22293381111",
  testContact: process.env.TEST_CONTACT || "08012345678",
};
