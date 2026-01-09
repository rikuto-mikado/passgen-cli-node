import crypto from "crypto";

const DEFAULT_CHARSET =
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "0123456789" +
  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

export function generatePassword(length, charset= DEFAULT_CHARSET) {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error("length must be a positive integer");
    }
    if (typeof charset !== "string" || charset.length === 0) {
        throw Error("charset must be a non-empty string");
    }

    // Define the output password string
    let out = "";

    for (let i = 0; i < length; i++) {
        const idx = crypto.randomInt(0, charset.length);
        out += charset[idx];
    }
    return out;
}