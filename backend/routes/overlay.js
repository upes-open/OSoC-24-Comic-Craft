const express = require('express');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const sizeOf = require('image-size');
const nodemailer = require('nodemailer');
const router = express.Router();

// Define the fixed image folder path
const IMAGE_FOLDER_PATH = path.join(__dirname, '../images');
const OUTPUT_FOLDER_PATH = path.join(__dirname, '../pages');
const OUTPUT_PDF_PATH = path.join(__dirname, 'comic.pdf');

// Define the page size for the PDF
const PAGE_WIDTH = 595.276; // A4 width in points
const PAGE_HEIGHT = 841.890; // A4 height in points

// Nodemailer configuration with hardcoded details
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'comiccraftopen@gmail.com',
        pass: 'diqo ergn pefq tqwa' // Hardcoded password
    }
});

// Function to send email and return a promise
function sendMailPromise(mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

// Function to send email notification with PDF attached
async function sendEmailNotification(pdfPath, recipientEmail) {
    const mailOptions = {
        from: 'comiccraftopen@gmail.com',
        to: recipientEmail,
        subject: 'HERE IS YOUR COMIC!!!',
        text: `Your Comic has been crafted successfully. Here is your attached Comic PDF that you can download. Looking forward to telling more tales together. HAPPY CRAFTING!!!`,
        attachments: [
            {
                filename: path.basename(pdfPath),
                path: pdfPath
            }
        ]
    };

    try {
        const info = await sendMailPromise(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

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

// Function to create a PDF from specific images in a folder
function createPdfFromSelectedImages(folderPath, outputFilePath) {
    // Create a new PDF document
    const doc = new PDFDocument({
        autoFirstPage: false // We add pages manually
    });

    // Stream the PDF to a file
    doc.pipe(fs.createWriteStream(outputFilePath));

    // Read the files in the folder
    const files = fs.readdirSync(folderPath);

    // Filter and sort the image files by number
    const imageFiles = files.filter(file => {
        const match = file.match(/^output-image(\d+)\.(jpg|jpeg|png|gif)$/i);
        return match;
    }).sort((a, b) => {
        const numA = parseInt(a.match(/^output-image(\d+)\./)[1], 10);
        const numB = parseInt(b.match(/^output-image(\d+)\./)[1], 10);
        return numA - numB;
    });

    if (imageFiles.length === 0) {
        console.log('No matching images found in the folder.');
        doc.end();
        return;
    }

    // Add each image to the PDF
    imageFiles.forEach(file => {
        const imagePath = path.join(folderPath, file);

        // Read image dimensions
        const dimensions = sizeOf(imagePath);
        const imageWidth = dimensions.width;
        const imageHeight = dimensions.height;

        // Add a new page with A4 size
        doc.addPage({
            size: [PAGE_WIDTH, PAGE_HEIGHT]
        });

        // Calculate fit dimensions
        const aspectRatio = imageWidth / imageHeight;

        let fitWidth, fitHeight;

        if (PAGE_WIDTH / PAGE_HEIGHT < aspectRatio) {
            // Fit to width
            fitWidth = PAGE_WIDTH;
            fitHeight = fitWidth / aspectRatio;
        } else {
            // Fit to height
            fitHeight = PAGE_HEIGHT;
            fitWidth = fitHeight * aspectRatio;
        }

        // Center image on the page
        const x = (PAGE_WIDTH - fitWidth) / 2;
        const y = (PAGE_HEIGHT - fitHeight) / 2;

        doc.image(imagePath, x, y, {
            width: fitWidth,
            height: fitHeight
        });

        console.log(`Added ${file} to PDF.`);
    });

    // Finalize the PDF file
    doc.end();
    console.log('PDF created successfully:', outputFilePath);

    // Send email notification with PDF attached
    sendEmailNotification(outputFilePath, 'recipient@example.com'); // Replace with actual recipient email
}

// Function to clear content of specified directories
function clearDirectories(paths) {
    paths.forEach(folderPath => {
        fs.readdir(folderPath, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                const filePath = path.join(folderPath, file);
                fs.unlink(filePath, err => {
                    if (err) throw err;
                });
            }
        });
    });
}

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

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

        // Create a PDF from the processed images
        createPdfFromSelectedImages(OUTPUT_FOLDER_PATH, OUTPUT_PDF_PATH);

        // Clear content of folders after PDF is created
        clearDirectories([IMAGE_FOLDER_PATH, OUTPUT_FOLDER_PATH]);

        // Send email notification with the PDF attached
        await sendEmailNotification(OUTPUT_PDF_PATH, email);

        res.json({ message: 'Images processed successfully and PDF created!', outputPdfPath: OUTPUT_PDF_PATH });
    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({ error: 'Failed to process images' });
    }
});

module.exports = router;
