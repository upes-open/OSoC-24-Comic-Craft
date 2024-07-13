const { generateImage, inpaintImage } = require("../services/tensorartService");
const axios = require("axios");

async function generateComic(req, res) {
  try {
    const { artStyle, pages } = req.body;

    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({ error: "Invalid pages array" });
    }
    const imageLog = [];
    const generatedPages = [];

    for (const page of pages) {
      const { scenes } = page;
      const pageImages = [];

      for (const scene of scenes) {
        const images = await generateImage(scene, artStyle);

        for (const image of images) {
          // const response = await axios.get(url, {
          //   responseType: "arraybuffer",
          // });
          // const base64Image = Buffer.from(response.data, "binary").toString(
          //   "base64"
          // );
          // pageImages.push(base64Image);
          imageLog.push(image.id);
          pageImages.push(image.url);
        }
      }

      generatedPages.push(pageImages);
    }

    res.json({ pages: generatedPages });
  } catch (error) {
    console.error("Error generating comic:", error);
    res.status(500).json({ error: "Failed to generate comic" });
  }
}

module.exports = {
  generateComic,
};
