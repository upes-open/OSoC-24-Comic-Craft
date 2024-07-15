// routes/generateDialogues.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB68wXRo-zlmJda3cps-8r0qYqqjjnD7Pw",
      method: "post",
      data: { "contents": [{ "parts": [{ "text": question }] }] }
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;
    res.json({ generatedText });
  } catch (error) {
    console.error('Error generating dialogue:', error);
    res.status(500).json({ error: 'Failed to generate dialogue' });
  }
});

module.exports = router;
