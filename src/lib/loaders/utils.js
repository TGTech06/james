export async function computeSHA1FromFile(filePath) {
  const response = await fetch(filePath);
  const fileData = await response.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-1", fileData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const readableHash = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // console.log("readableHash from computeSHA1FromFile: ", readableHash);
  return readableHash;
}

export async function computeSHA1FromContent(content) {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const readableHash = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // console.log("readableHash from computeSHA1FromContent: ", readableHash);
  return readableHash;
}
