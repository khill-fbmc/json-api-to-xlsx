// @ts-check
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx/xlsx.mjs";
XLSX.set_fs(fs);

// Define the output directory path where the generated Excel file will be stored.
const outputPath = path.join(process.cwd(), "output");

/**
 * Creates an Excel workbook
 *
 * @param {any} data
 */
export async function createXLSX(data) {
  // Ensure the output directory exists. If it doesn't, create it.
  await fs.promises.mkdir(outputPath, { recursive: true });

  // Create a new empty workbook.
  const workbook = XLSX.utils.book_new();

  // Create a new sheet using the transformed data.
  const sheet = XLSX.utils.json_to_sheet(data);

  // Append the sheet to the workbook.
  XLSX.utils.book_append_sheet(workbook, sheet);

  // Define the output file path for the resulting Excel file.
  const outFile = path.join(outputPath, "result.xlsx");

  // Write the workbook to the file system as an XLSX file.
  XLSX.writeFile(workbook, outFile, { bookType: "xlsx" });
}
