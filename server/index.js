require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');


const app = express();
app.use(cors());
app.use(express.json());

const reviewRoutes = require("./routes/review");
app.use("/api/review", reviewRoutes);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/review', async (req, res) => {
    const { code } = req.body;
    const prompt = `Überprüfe folgenden Code auf Fehler und Verbesserungsvorschläge:\n\n${code}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
    });

    res.json({ review: response.choices[0].message.content });
});

app.listen(5000, () => console.log('Server läuft auf Port 5000'));

