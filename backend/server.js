import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   PAIN SIMULATION LOGIC
========================= */
function simulatePainLevel(text) {
  text = text.toLowerCase();

  if (text.includes("emergency") || text.includes("can't bear"))
    return "HIGH";

  if (text.includes("pain") || text.includes("uncomfortable"))
    return "MEDIUM";

  return "NORMAL";
}

/* =========================
   CHAT ROUTE
========================= */
app.post("/chat", (req, res) => {
  const { message } = req.body;

  const painLevel = simulatePainLevel(message);

  // 🚨 EMERGENCY INTERRUPT
  if (painLevel === "HIGH") {
    console.log("🚨 Doctor Alert Triggered");

    return res.json({
      reply:
        "🚨 Mithra: I sensed severe discomfort. I've alerted the doctor. Please stay calm.",
      mode: "EMERGENCY"
    });
  }

  // 🤝 FRIEND MODE
  res.json({
    reply:
      "🙂  I'm here with you. Tell me what you're feeling.",
    mode: "FRIEND"
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  const runningPort = server.address().port;
  console.log(`✅ smart assist backend running on port ${PORT}`);
});
