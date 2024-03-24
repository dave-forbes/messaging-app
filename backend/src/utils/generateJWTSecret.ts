import crypto from "crypto";

// Generate a random JWT secret with 64 bytes length (512 bits)
const jwtSecret = crypto.randomBytes(64).toString("hex");

export default jwtSecret;
