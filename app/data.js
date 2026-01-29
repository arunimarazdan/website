export const siteInfo = {
  name: "Arunima Razdan",
  role: "Architect & Interior Designer",
  email: "ar.arunimarazdan@gmail.com",
};

// Your Google Sheet CSV Export Link
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdjFVmR94PmnHqfezpV93TRnbCjxvMp-5PcrNxUBvL_0xp8uqmlINQXOliUklJeKTYQMmQAICtIJrv/pub?output=csv";

export async function getProjects() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.trim().replace(/^"|"$/g, ""));
      const row = {};
      headers.forEach((h, i) => row[h] = cols[i]);

      return {
        title: row.Title || "Untitled Project",
        // This is where the 'Automation' happens: We map the PDF data to these keys
        summary: row.Summary || "A Victorian-themed speakeasy dining experience...",
        type: row.Type || "Hospitality // Speakeasy",
        year: row.Year || "2025",
        location: row.Location || "Glasgow, UK",
        area: row.Area || "180 sqm",
        client: row.Client || "Academic Project",
        // The images you 'extracted' and hosted
        mainImage: row.Main_Image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        gallery: row.Gallery_Images ? row.Gallery_Images.split(',') : []
      };
    });
  } catch (e) {
    console.error("Fetch error:", e);
    return [];
  }
}
