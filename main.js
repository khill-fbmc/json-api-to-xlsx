// @ts-check
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx/xlsx.mjs";

XLSX.set_fs(fs);

const outputPath = path.join(process.cwd(), "output");

fs.mkdirSync(outputPath, { recursive: true });

/**
 * Fetch Data
 */
async function fetchJson(url) {
  return fetch(url).then((res) => res.json());
}

/**
 * Build the XLSX file
 */
async function main(url) {
  const workbook = XLSX.utils.book_new();

  const { data } = await fetchJson(url);

  const sheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, sheet);

  const outFile = path.join(outputPath, "result.xlsx");

  XLSX.writeFile(workbook, outFile, { bookType: "xlsx" });
}

/**
 * Run It!
 */
main("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
