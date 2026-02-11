const axios = require("axios");
const { baseUrl, token } = require("./config");

function createClient({ withAuth } = { withAuth: true }) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (withAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: baseUrl,
    headers,
    validateStatus: () => true 
  });
}

module.exports = { createClient };
