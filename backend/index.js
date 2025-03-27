const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

// Streaming function
async function send_request_stream(content, res) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:11434/api/chat",
      data: {
        model: "deepseek-r1:1.5b",
        messages: [{ role: "user", content: content }],
        stream: true, // Enable streaming
      },
      responseType: "stream", // Set response type to stream
      headers: { "Content-Type": "application/json" },
    });

    res.setHeader("Content-Type", "text/plain");

    response.data.on("data", (chunk) => {
      try {
        const data = JSON.parse(chunk.toString());
        if (data.message && data.message.content) {
          res.write(data.message.content); // Send data chunk to client
        }
      } catch (err) {
        console.error("Error parsing chunk:", err);
      }
    });

    response.data.on("end", () => {
      res.end(); // Close connection when streaming is complete
    });

    response.data.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).send("Streaming failed.");
    });
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).send("Error occurred while sending request.");
  }
}

// Handle user query with streaming response
app.post("/ask-query", async (req, res) => {
  const { question } = req.body;
  send_request_stream(question, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
