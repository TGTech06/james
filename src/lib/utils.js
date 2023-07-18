export function computeSha1FromFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      crypto.subtle
        .digest("SHA-1", arrayBuffer)
        .then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const readableHash = hashArray
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
          resolve(readableHash);
        })
        .catch((error) => {
          reject(error);
        });
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    fileReader.readAsArrayBuffer(file);
  });
}

export function computeSha1FromContent(content) {
  const arrayBuffer = new TextEncoder().encode(content);
  return crypto.subtle.digest("SHA-1", arrayBuffer).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const readableHash = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return readableHash;
  });
}
