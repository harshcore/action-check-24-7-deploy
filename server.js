const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const CONFIG = {
  PORT: 3000,
};

let number = 0;

const getNumberResponse = (action) => {
  const originalNumber = number;
  if (action === "inc") number += 1;
  if (action === "dec") number -= 1;
  if (action === "res") number = 0;
  return { previousNumber: originalNumber, number };
};

app.get("/:action?", (req, res) => {
  const action = req.params.action || ""; // Default to an empty string if no action is provided
  const validActions = ["inc", "dec", "res"];

  if (validActions.includes(action) || action === "") {
    const response = getNumberResponse(action);
    res.json(response);
  } else {
    res
      .status(400)
      .json({ error: "Invalid action. Use 'inc', 'dec', or 'res'." });
  }
});

server.listen(CONFIG.PORT, () => {
  console.log(`Running on port: ${CONFIG.PORT}`);
});
