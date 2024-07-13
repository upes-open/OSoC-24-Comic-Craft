const axios = require("axios");
const FormData = require("form-data");
const config = require("../config/config");
const crypto = require("crypto");

const appId = config.TENSORART_APP_ID;
const modelId = config.TENSORART_MODEL_ID;
const token = config.TENSORART_TOKEN;
const apiEndpoint = config.TENSORART_API_ENDPOINT;

async function makeApiRequest(payload) {
  return axios.post(`https://${apiEndpoint}/v1/jobs`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function pollJobStatus(jobId) {
  const maxAttempts = 30; // Adjust as needed
  const pollInterval = 5000; // 5 seconds, adjust as needed

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await axios.get(
      `https://${apiEndpoint}/v1/jobs/${jobId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jobStatus = response.data.job.status;

    if (jobStatus === "SUCCESS") {
      return response.data.job.successInfo.images;
    } else if (jobStatus === "FAILED") {
      throw new Error(`Job failed: ${response.data.job.failedInfo.reason}`);
    }

    // If job is still processing, wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error("Job timed out");
}

const generateImage = async (prompt, artStype, count = 1) => {
  const payload = {
    request_id: `req_${Date.now()}`, // Generate a unique request ID
    stages: [
      {
        type: "INPUT_INITIALIZE",
        inputInitialize: {
          seed: -1,
          count: count,
        },
      },
      {
        type: "DIFFUSION",
        diffusion: {
          width: 512,
          height: 512,
          prompts: [
            {
              text: `${prompt} in ${artStype} style`,
            },
          ],
          sampler: "DPM++ 2M Karras",
          sdVae: "Automatic",
          steps: 15,
          sd_model: modelId,
          clip_skip: 2,
          cfg_scale: 7,
        },
      },
    ],
  };

  try {
    const response = await makeApiRequest(payload);
    const jobId = response.data.job.id;

    // Poll for job completion
    const images = await pollJobStatus(jobId);

    // Return array of image URLs
    console.log(images);

    return images.map((image) => ({
      id: image.id,
      url: image.url,
    }));
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

// module.exports = generateImage;
module.exports = { generateImage };
