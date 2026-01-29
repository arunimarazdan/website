export const siteInfo = {
  name: "Arunima Razdan",
  role: "Architect & Interior Designer",
  email: "ar.arunimarazdan@gmail.com",
};

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdjFVmR94PmnHqfezpV93TRnbCjxvMp-5PcrNxUBvL_0xp8uqmlINQXOliUklJeKTYQMmQAICtIJrv/pub?output=csv";

export async function getProjects() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    const csvText = await res.text();
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.trim().replace(/^"|"$/g, ""));
      const row = {};
      headers.forEach((h, i) => row[h] = cols[i]);

      // THE MAGIC: Converts regular Drive link to an Embeddable Preview link
      let embedLink = (row.Google_drive_pdf_Link || "").replace(/\s/g, "");
      if (embedLink.includes("drive.google.com")) {
        embedLink = embedLink.replace(/\/view.*$/, "/preview");
      }

      return {
        title: row.Title,
        description: row.Description,
        pdfLink: embedLink,
        // We use a clean architectural placeholder if no image link is provided
        mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000", 
      };
    });
  } catch (e) {
    return [];
  }
}
