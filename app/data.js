npm install pdfjs-dist
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// IMPORTANT for Next.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// ---- PROJECT SOURCES (YOU ONLY EDIT LINKS) ----
export const projectsSource = [
  {
    id: 'between-conversations',
    category: 'Interior Design',
    pdfUrl: 'https://drive.google.com/uc?export=download&id=12p_mhvXLp5ON07N8JHSL--GHQeXC7Oh5'
  }
];

// ---- CORE EXTRACTION FUNCTION ----
export async function getProjects() {
  const results = [];

  for (const project of projectsSource) {
    const data = await extractFromPDF(project.pdfUrl);

    results.push({
      id: project.id,
      category: project.category,
      ...data
    });
  }

  return results;
}

// ---- PDF PARSER ----
async function extractFromPDF(pdfUrl) {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  // ---- TEXT EXTRACTION ----
  const page1 = await pdf.getPage(1);
  const textContent = await page1.getTextContent();

  const rawText = textContent.items.map(i => i.str).join(' ');

  const title = extractTitle(rawText);
  const summary = extractSummary(rawText);

  // ---- IMAGE EXTRACTION (PAGE RENDERS) ----
  const images = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    await page.render({ canvasContext: context, viewport }).promise;
    const blob = await canvas.convertToBlob();

    images.push(URL.createObjectURL(blob));
  }

  return {
    title,
    summary,
    heroImage: images[0],
    gallery: images.slice(1)
  };
}

// ---- SMART HEURISTICS ----
function extractTitle(text) {
  const words = text.split(' ');
  return words.slice(0, 4).join(' ');
}

function extractSummary(text) {
  return text.slice(0, 280) + '…';
}
