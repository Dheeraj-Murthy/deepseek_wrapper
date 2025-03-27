const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { spawn } = require("child_process");

const app = express();
const port = 3000;
let modelOutput = "";

app.use(cors()); // Allow React Native to access this API
app.use(express.json()); // Allow JSON input from requests

// Start Ollama Serve in a new terminal
app.get("/start-ollama", (req, res) => {
  const ollamaServe = spawn("osascript", [
    "-e",
    'tell app "Terminal" to do script "ollama serve"',
  ]);

  ollamaServe.on("spawn", () => {
    console.log("Ollama Serve started.");
    res.send({ message: "Ollama Serve is running!" });
  });

  ollamaServe.on("error", (err) => {
    console.error("Error starting Ollama Serve:", err);
    res.status(500).send({ error: "Failed to start Ollama Serve" });
  });
});

async function send_request(content) {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/chat",
      {
        model: "deepseek-r1:1.5b",
        messages: [{ role: "user", content: content }],
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent: new (require("https").Agent)({
          rejectUnauthorized: false,
        }),
      }
    );

    console.log("Response: ", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

app.post("/ask-query", async (req, res) => {
  data = req.body;
  response = await send_request(data.question);
  res.send({ message: response.message.content });
});

// Fetch model output
app.get("/get-output", (req, res) => {
  res.send({ output: modelOutput });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
