const axios = require("axios");

async function create(port) {
  return await axios
    .request(`http://127.0.0.1:${port}/api/command`, {
      method: "POST",
      data: "GetStatus",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data.Status.config;
    })
    .catch((err) => {
      console.log(err);
      return "No";
    });
}

module.exports = create;
