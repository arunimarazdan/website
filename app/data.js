export const siteInfo = {
  name: "Arunima Razdan",
  role: "Architect & Interior Designer",
  email: "ar.unimarazdan@gmail.com",
};

// ✅ Your published CSV link (This is your "Dashboard")
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdjFVmR94PmnHqfezpV93TRnbCjxvMp-5PcrNxUBvL_0xp8uqmlINQXOliUklJeKTYQMmQAICtIJrv/pub?output=csv";

// --- Helpers ---
function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseCsv(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((h) => h.replace(/^\uFEFF/, "")); 
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

// --- Fetching Logic ---
export async function fetchProjectsFromSheet() {
  const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not fetch Google Sheet CSV");

  const csvText = await res.text();
  const rows = parseCsv(csvText);

  return rows
    .filter((r) => (r.Title || "").trim().length > 0)
    .map((r) => {
      const title = (r.Title || "").trim();
      const description = (r.Description || "").trim();

      // ✅ SMART LINK PATCH: Automatically converts Drive links to professional previews
      let pdfLink = (r.Google_drive_pdf_Link || "").trim();
      if (pdfLink.includes("drive.google.com")) {
        pdfLink = pdfLink
          .replace("/view?usp=sharing", "/preview")
          .replace("/view?usp=drive_link", "/preview")
          .replace(/\/view(\?.*)?$/, "/preview");
      }

      const modelLink = (r["3D_Model_Link"] || "").trim();

      // Placeholder for images if not provided in sheet
      const cover = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80";

      return {
        title,
        description,
        mainImage: cover,
        pdfLink,
        modelLink,
        gallery: [cover],
      };
    });
}
