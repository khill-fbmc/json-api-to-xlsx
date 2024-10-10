import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx/xlsx.mjs";
XLSX.set_fs(fs);

// Define the output directory path where the generated Excel file will be stored.
const outputPath = path.join(process.cwd(), "output");

/**
 * Constructs the URL for fetching rosters based on the provided league ID.
 * @param {number} league_id - The unique ID of the league.
 * @returns {string} The URL for fetching roster information.
 */
function getRosterUrlByLeagueId(league_id) {
  return `https://api.sleeper.app/v1/league/${league_id}/rosters`;
}

/**
 * Fetches JSON data from the provided URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the JSON response.
 */
async function fetchJson(url) {
  return fetch(url).then(
    (res) => res.json()
  );
}

/**
 * Creates an Excel workbook, fetches data from the given URL,
 * transforms the data using a transformer function, and saves it as an XLSX file.
 * @param {number} league_id - The ID for the League.
 * @param {(data: any) => any[]} transformer - A function to transform the fetched data before creating the spreadsheet.
 */
async function createSheetFromLeagueId(
  league_id,
  transformer = (data) => data
) {
  // Ensure the output directory exists. If it doesn't, create it.
  await fs.promises.mkdir(outputPath, { recursive: true });

  // Create a new empty workbook.
  const workbook = XLSX.utils.book_new();

  // Build the API URL for the league using a specific league ID.
  const url = getRosterUrlByLeagueId(league_id);

  // Fetch the roster data from the API.
  const res = await fetchJson(url);

  // Transform the fetched data using the provided transformer function (defaults to identity function).
  const mappedData = transformer(res);

  // Return `false` from the transformer to abort and NOT write an excel file.
  if (mappedData === false) return;

  // Create a new sheet using the transformed data.
  const sheet = XLSX.utils.json_to_sheet(mappedData);

  // Append the sheet to the workbook.
  XLSX.utils.book_append_sheet(workbook, sheet);

  // Define the output file path for the resulting Excel file.
  const outFile = path.join(outputPath, "result.xlsx");

  // Write the workbook to the file system as an XLSX file.
  XLSX.writeFile(workbook, outFile, { bookType: "xlsx" });
}

/**
 * Execute the main function.
 *
 * Pass a transformer function if needed to modify
 * the data before saving to Excel.
 */
createSheetFromLeagueId(1129463776308305920, (res) => {
  console.log(res);
  return false;
  return res;
});
