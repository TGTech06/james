const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

class Document {
  constructor(pageContent, metadata) {
    this.page_content = pageContent;
    this.metadata = metadata;
  }
}

export async function processFile(
  vectorStore,
  file,
  loaderClass,
  fileSuffix,
  chunkSize,
  chunkOverlap
) {
  let fileSha = "";
  const fileName = file.name;
  const fileSize = file.size;
  const dateShort = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const tmpFile = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
  const tmpFilePath = `${tmpFile}${path.sep}${fileSuffix}`;
  fs.writeFileSync(tmpFilePath, file);

  const loader = new loaderClass(tmpFilePath);
  const documents = await loader.load();
  fileSha = await computeSHA1FromFile(tmpFilePath);

  const textSplitter = new RecursiveCharacterTextSplitter(chunkSize);
  const splitDocumentsPromise = textSplitter.splitDocuments(documents);
  const splitDocuments = await splitDocumentsPromise;

  const docsWithMetadata = splitDocuments.map((doc) => {
    const metadata = {
      file_sha1: fileSha,
      file_size: fileSize,
      file_name: fileName,
      chunk_size: chunkSize,
      chunk_overlap: chunkOverlap,
      date: dateShort,
    };
    return new Document(doc.pageContent, metadata);
  });

  vectorStore.addDocuments(docsWithMetadata);
  return;
}

function computeSHA1FromFile(filePath) {
  const hash = crypto.createHash("sha1");
  const input = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    input.on("readable", () => {
      const data = input.read();
      if (data) {
        hash.update(data);
      } else {
        resolve(hash.digest("hex"));
      }
    });

    input.on("error", (error) => {
      reject(error);
    });
  });
}
