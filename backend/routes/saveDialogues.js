const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const saveDir = path.join(__dirname, '../saved-dialogues');

// Create the directory if it does not exist
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

router.post('/save-dialogues', (req, res) => {
  const { dialogues } = req.body;

  if (!Array.isArray(dialogues) || dialogues.length === 0) {
    return res.status(400).json({ error: 'No dialogues to save' });
  }

  try {
    dialogues.forEach((dialogue, index) => {
      const filePath = path.join(saveDir, `dialogue_${index + 1}.txt`);
      fs.writeFileSync(filePath, dialogue);
    });

    res.status(200).json({ message: 'Dialogues saved successfully' });
  } catch (error) {
    console.error('Error saving dialogues:', error);
    res.status(500).json({ error: 'Failed to save dialogues' });
  }
});

module.exports = router;
