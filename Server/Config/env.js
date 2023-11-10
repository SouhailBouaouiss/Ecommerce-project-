import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const refSecret = process.env.JWT_REF;

export { jwtSecret, PORT, refSecret };
