const crypto = require("crypto");
const fs = require("fs");

export function computeSha1FromFile(filePath) {
  const content = fs.readFileSync(filePath);
  const readableHash = crypto.createHash("sha1").update(content).digest("hex");
  return readableHash;
}

export function computeSha1FromContent(content) {
  const readableHash = crypto.createHash("sha1").update(content).digest("hex");
  return readableHash;
}
