const express = require('express');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const router = express.Router();

// Define the fixed image folder path
const IMAGE_FOLDER_PATH = path.join(__dirname, '../images');
const OUTPUT_FOLDER_PATH = path.join(__dirname, '../pages');

// Function to wrap text into lines
function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    return lines;
}

// Function to overlay text on an image using canvas
async function overlayTextOnImage(imagePath, text, outputPath) {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Set the text properties
    const fontSize = 24; // Font size
    const maxWidth = image.width - 20; // Max width of text (padding of 10 on each side)
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Wrap text into lines
    const lines = wrapText(ctx, text, maxWidth);
    const lineHeight = fontSize * 1.2; // Adjust line height
    const totalHeight = lineHeight * lines.length;

    // Calculate the starting position for vertical centering
    const x = image.width / 2;
    const y = image.height - totalHeight - 20; // Margin from the bottom edge

    // Draw the text background
    ctx.fillStyle = 'white';
    lines.forEach((line, index) => {
        const lineWidth = ctx.measureText(line).width;
        ctx.fillRect(x - lineWidth / 2 - 10, y + index * lineHeight - 10, lineWidth + 20, lineHeight + 20);
    });

    // Draw each line of text
    ctx.fillStyle = 'black';
    lines.forEach((line, index) => {
        ctx.fillText(line, x, y + index * lineHeight);
    });

    // Write the canvas to a file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
}

router.post('/', async (req, res) => { // Change to handle POST requests to '/' within this router
    try {
        // Fetch dialogues from the /generate-dialogues/get-dialogues endpoint
        const dialoguesResponse = await axios.get('http://localhost:4000/generate-dialogue/get-dialogues');
        const dialogues = dialoguesResponse.data.dialogues;

        if (!dialogues || dialogues.length === 0) {
            return res.status(400).json({ error: "No dialogues found" });
        }

        // Print dialogues to console
        console.log('Received dialogues:', dialogues);

        // Ensure output directory exists
        if (!fs.existsSync(OUTPUT_FOLDER_PATH)) {
            fs.mkdirSync(OUTPUT_FOLDER_PATH, { recursive: true });
        }

        // Read all image files from the fixed folder
        const imageFiles = fs.readdirSync(IMAGE_FOLDER_PATH).filter(file => file.endsWith('.png'));

        // Check if we have enough images for the dialogues
        if (imageFiles.length < dialogues.length) {
            return res.status(400).json({ error: "Not enough images in the folder for the dialogues" });
        }

        // Process each dialogue on the corresponding image
        for (let i = 0; i < dialogues.length; i++) {
            const dialogue = dialogues[i];
            const imagePath = path.join(IMAGE_FOLDER_PATH, `image_${i}.png`);
            const outputImagePath = path.join(OUTPUT_FOLDER_PATH, `output-image${i}.png`);

            if (fs.existsSync(imagePath)) {
                await overlayTextOnImage(imagePath, dialogue, outputImagePath);
            } else {
                console.error(`Image file ${imagePath} not found`);
            }
        }

        res.json({ message: 'Images processed successfully!', outputFolderPath: OUTPUT_FOLDER_PATH });
    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({ error: 'Failed to process images' });
    }
});

module.exports = router;