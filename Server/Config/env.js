import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const refSecret = process.env.JWT_REF;
const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

export { jwtSecret, PORT, refSecret, cloudName, apiKey, apiSecret };
