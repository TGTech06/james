// import { process_file } from "./common";
// import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
// // import fs from "fs";

// export async function processHtml(vector_store, file) {
//   return process_file(vector_store, file, UnstructuredLoader, ".html");
// }

// // export async function getHtml(url) {
// //   const queryParams = new URLSearchParams({ url });
// //   const endpointUrl = "https://jameswebscraper.tgtech06.workers.dev/"; // Replace with your actual Cloudflare worker URL
// //   try {
// //     const response = await fetch(
// //       `${endpointUrl}?url=${encodeURIComponent(url)}`
// //     );

// //     if (!response.ok) {
// //       throw new Error("Failed to fetch the data.");
// //     }

// //     const data = await response.text();
// //     console.log("Scraped data:", data); // You can use this data in your app as needed
// //   } catch (error) {
// //     console.error("Error occurred while scraping:", error);
// //   }
// // }

// export async function getHtml(url) {
//   try {
//     // const response = await axios.get(url);
//     // const url = "https://en.wikipedia.org/wiki/GitHub_Copilot";
//     const queryParams = new URLSearchParams({ url });
//     const apiUrl = `/api?${queryParams.toString()}`;
//     const response = await fetch(apiUrl, {
//       method: "GET",
//     });
//     if (response.status === 200) {
//       let retrievedText = await response.text();
//       return retrievedText;
//     } else {
//       console.log("error: ", response.status);
//       return null;
//     }
//   } catch (error) {
//     console.log("error: ", error);
//     return null;
//   }
// }

// class CustomFile extends Blob {
//   constructor(parts, properties) {
//     super(parts, properties);
//     this.name = properties.name;
//     this.lastModifiedDate = new Date();
//   }
// }

// export function createHtmlFile(url, content) {
//   const file_name = slugify(url) + ".html";
//   const uploaded_file = new CustomFile([content], {
//     type: "text/html",
//     name: file_name,
//   });

//   return uploaded_file;
// }

// export function deleteTempFile(temp_file_path, url, ret) {
//   try {
//     // fs.unlinkSync(temp_file_path);
//     if (ret) {
//       console.log(`✅ Content saved... ${url}`);
//     }
//   } catch (error) {
//     console.log(`❌ Error while saving content... ${url}`);
//   }
// }

// function slugify(text) {
//   text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
//   text = text
//     .replace(/[^\w\s-]/g, "")
//     .trim()
//     .toLowerCase();
//   text = text.replace(/[-\s]+/g, "-");
//   return text;
// }
import html2pdf from "html2pdf.js";
import { process_file } from "./common";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";

export async function processHtml(vector_store, file) {
  return process_file(vector_store, file, UnstructuredLoader, ".pdf");
}

export async function getHtml(url) {
  try {
    const queryParams = new URLSearchParams({ url });
    const apiUrl = `/api?${queryParams.toString()}`;
    console.log("apiUrl: ", apiUrl);
    const response = await fetch(apiUrl, { method: "GET" });
    // const response = await fetch(
    //   encodeURIComponent(url.searchParams.get("url"))
    // );
    console.log("response: ", response);

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

// export async function convertHtmlToPdf(htmlContent, url) {
//   return new Promise((resolve, reject) => {
//     const element = document.createElement("div");
//     element.innerHTML = htmlContent;

//     html2pdf(element, {
//       margin: 10,
//       filename: slugify(url),
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     })
//       .then((pdf) => {
//         const pdfBlob = pdf.output("blob");
//         resolve(pdfBlob);
//       })
//       .catch((error) => {
//         console.error("Error converting HTML to PDF:", error);
//         reject(error);
//       });
//   });
// }

export async function convertHtmlToTxt(htmlContent, url) {
  return new Promise((resolve, reject) => {
    try {
      const element = document.createElement("div");
      element.innerHTML = htmlContent;

      // Extract text content from the HTML element
      const textContent = element.textContent;

      // Create a Blob containing the text content
      const txtBlob = new Blob([textContent], { type: "text/plain" });

      resolve(txtBlob);
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
