// @ts-check
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx/xlsx.mjs";
XLSX.set_fs(fs);

export const OUTPUT_PATH = path.join(process.cwd(), "output");

/**
 * Creates an Excel workbook
 *
 * @param {{ outputPath: string }} [opts]
 */
export function useWorkbook(opts) {
  const outputPath = opts?.outputPath ?? OUTPUT_PATH;
  const workbook = XLSX.utils.book_new();
  const appendSheet = (sheet, name) => {
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  };
  const writeFile = (filename) => {
    const outfile = path.join(outputPath, `${filename}.xlsx`);
    XLSX.writeFile(workbook, outfile, { bookType: "xlsx" });
    console.log(`Wrote To Disk:`, outfile);
  };
  return {
    workbook,
    utils: XLSX.utils,
    writeFile,
    appendSheet,
  };
}
