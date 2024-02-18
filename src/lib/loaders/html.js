export async function getHtml(url) {
  try {
    const queryParams = new URLSearchParams({ url });
    const apiUrl = `/api?${queryParams.toString()}`;
    const response = await fetch(apiUrl, { method: "GET" });
    if (response.status === 200) {
      let retrievedText = await response.text();
      return retrievedText;
    } else {
      console.log("Error: ", response.status);
      console.log("Error: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}

export async function convertHtmlToTxt(htmlContent, url) {
  return new Promise((resolve, reject) => {
    try {
      const element = document.createElement("div");
      element.innerHTML = htmlContent;

      // Extract text content from the HTML element
      const textContent = element.textContent;

      // Create a Blob containing the text content
      const txtFile = new File([textContent], url, { type: "text/plain" });
      resolve(txtFile);
    } catch (error) {
      console.error("Error converting HTML to TXT:", error);
      reject(error);
    }
  });
}

function slugify(text) {
  text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  text = text
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase();
  text = text.replace(/[-\s]+/g, "-");
  return text;
}

class CustomFile {
  constructor(blob, name) {
    this.blob = blob;
    this.name = name;
    this.lastModifiedDate = new Date();
  }
}

export function createPdfFile(url, pdfBlob) {
  const fileName = slugify(url) + ".pdf";
  const uploadedFile = new CustomFile(pdfBlob, fileName);
  return uploadedFile;
}
