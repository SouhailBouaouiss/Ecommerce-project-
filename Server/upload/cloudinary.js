import { cloudName, apiKey, apiSecret } from "../Config/env.js";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return res;
}

export { handleUpload };
