// routes/generateDialogues.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

let dialoguesCache = []; // In-memory cache for dialogues

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt Received", prompt);

  try {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB68wXRo-zlmJda3cps-8r0qYqqjjnD7Pw",
      method: "post",
      data: { contents: [{ parts: [{ text: prompt }] }] },
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;
    console.log("Generated text is: ", generatedText);

    const extractDialogues = (text) => {
      const dialogues = [];
      const startMarker = '**START**';
      const endMarker = '**ENDS**';

      let startIndex = text.indexOf(startMarker);
      while (startIndex !== -1) {
        const endIndex = text.indexOf(endMarker, startIndex + startMarker.length);
        if (endIndex === -1) break;

        const dialogue = text.substring(startIndex + startMarker.length, endIndex).trim();
        if (dialogue) {
          dialogues.push(dialogue);
        }

        startIndex = text.indexOf(startMarker, endIndex + endMarker.length);
      }

      return dialogues;
    };

    dialoguesCache = extractDialogues(generatedText); // Store dialogues in memory
    console.log("Dialogues are ", dialoguesCache);
    res.json({ dialogues: dialoguesCache });
  } catch (error) {
    console.error("Error generating dialogue:", error);
    res.status(500).json({ error: "Failed to generate dialogue" });
  }
});

router.get('/get-dialogues', (req, res) => {
  res.json({ dialogues: dialoguesCache });
});

module.exports = router;