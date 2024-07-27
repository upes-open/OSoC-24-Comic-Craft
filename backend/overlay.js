const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

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

// Function to process multiple images with dialogues
async function processImagesWithDialogues(dialogues, imageDir, outputDir) {
    for (let i = 0; i < dialogues.length; i++) {
        const imagePath = path.join(imageDir, `image_${i}.png`);
        const outputImagePath = path.join(outputDir, `output_image_${i}.png`);
        await overlayTextOnImage(imagePath, dialogues[i], outputImagePath);
    }
}

// Export the function for external usage
module.exports = processImagesWithDialogues;
