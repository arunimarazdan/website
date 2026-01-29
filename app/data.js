export const siteInfo = {
  name: "Arunima Razdan",
  role: "Architect & Interior Designer",
  email: "ar.unimarazdan@gmail.com",
};

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdjFVmR94PmnHqfezpV93TRnbCjxvMp-5PcrNxUBvL_0xp8uqmlINQXOliUklJeKTYQMmQAICtIJrv/pub?output=csv";

// Helper to handle commas in descriptions
function splitCsvLine(line) {
  const out = []; let cur = ""; let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === "," && !inQuotes) { out.push(cur); cur = ""; }
    else { cur += ch; }
  }
  out.push(cur);
  return out.map(s => s.trim().replace(/^"|"$/g, ""));
}

export async function getProjects() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    const csvText = await res.text();
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    const headers = splitCsvLine(lines[0]);
    
    return lines.slice(1).map(line => {
      const cols = splitCsvLine(line);
      const row = {};
      headers.forEach((h, i) => row[h] = cols[i]);

      // PDF Link Auto-Fixer
      let pdf = (row.Google_drive_pdf_Link || "").replace(/\s/g, "");
      if (pdf.includes("drive.google.com")) {
        pdf = pdf.replace(/\/view.*$/, "/preview");
      }

      return {
        title: row.Title,
        description: row.Description,
        pdfLink: pdf,
        modelLink: (row["3D_Model_Link"] || "").replace(/\s/g, ""),
        mainImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000", // Placeholder
        gallery: []
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}
