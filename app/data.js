export const siteInfo = {
  name: "Arunima Razdan",
  role: "Architect & Interior Designer",
  email: "ar.unimarazdan@gmail.com"
};

// This is your live Google Sheet link
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdjFVmR94PmnHqfezpV93TRnbCjxvMp-5PcrNxUBvL_0xp8uqmlINQXOliUklJeKTYQMmQAICtIJrv/pub?output=csv";

export async function getProjects() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const text = await response.text();
    
    // Split the CSV data into rows
    const rows = text.split('\n').filter(row => row.trim() !== "");
    const bodyRows = rows.slice(1); // Remove the header row

    return bodyRows.map(row => {
      // Split by comma, handling potential commas inside quotes
      const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      
      const title = columns[0]?.replace(/"/g, "").trim();
      const description = columns[1]?.replace(/"/g, "").trim();
      const pdfRaw = columns[2]?.trim();
      const modelRaw = columns[3]?.trim();

      return {
        title,
        description,
        // This fixes the Drive link automatically for you
        pdfLink: pdfRaw?.replace('/view?usp=sharing', '/preview'),
        modelLink: modelRaw
      };
    });
  } catch (error) {
    console.error("Error loading sheet:", error);
    return [];
  }
}
