const fetch = require("node-fetch");

async function getRequest(url = "", methodType) {
  const response = await fetch(url, {
    method: methodType, // GET, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function postRequest(url = "", methodType, data = {}) {
  const response = await fetch(url, {
    method: methodType, // POST, PUT etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

module.exports = {
  getRequest,
  postRequest,
};
