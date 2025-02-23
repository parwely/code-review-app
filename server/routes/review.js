require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");


const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
    const { code } = req.body;

    const prompt = `
    Analysiere den folgenden Code auf:
    - Sicherheitslücken
    - Performance-Verbesserungen
    - Best Practices
    - Fehler oder ineffizienten Code
    
    Gib das Ergebnis im folgenden JSON-Format zurück:
    {
      "issues": [
        {
          "line": <Zeilennummer>,
          "type": "<Bug | Performance | Security | Best Practice>",
          "message": "<Beschreibung des Problems>",
          "suggestion": "<Verbesserungsvorschlag>"
        }
      ]
    }
    
    Hier ist der Code:\n\n${code}
    `;

    try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
        });

        const review = response.choices[0].message.content;
        res.json(JSON.parse(review));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

