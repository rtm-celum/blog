import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import * as fs from 'fs';

// Function to parse Excel file and convert to JSON
function parseExcelToJson(filePath: string, sheetName: string, timeZone: string = 'Europe/Vienna'): any {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Check if the specified sheet exists
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`Sheet "${sheetName}" not found in the Excel file.`);
  }

  // Extract the specified sheet
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Check if data exists and is valid
  if (!Array.isArray(jsonData) || jsonData.length < 5) {
    throw new Error(`The sheet "${sheetName}" does not contain enough rows or is invalid.`);
  }

  // Start parsing from row 5 (index 4 in zero-based indexing)
  const dataRows = jsonData.slice(4);

  // Manually define headers for date, consumption, and generation
  const headers = ["date", "consumption", "generation"];

  // Map the data into desired JSON structure
  const processedData = dataRows.map((row: any[]) => {
    const record: { [key: string]: any } = {};

    headers.forEach((header, index) => {
      let value = row[index];

      // Handle date parsing for the "date" field
      if (header === "date" && typeof value === "string") {
        const parsedDate = DateTime.fromFormat(value, "dd.MM.yyyy HH:mm:ss", {
          zone: timeZone,
        });
        record[header] = parsedDate.isValid ? parsedDate.toUTC().toISO() : value;
      }
      // Handle numeric fields for "consumption" and "generation"
      else if (header === "consumption" || header === "generation") {
        record[header] = typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;
      } else {
        record[header] = value;
      }
    });

    return record;
  });

  return processedData;
}

// Save JSON to a file
function saveJsonToFile(jsonData: any, outputPath: string) {
  fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`JSON saved to ${outputPath}`);
}

// Main execution
const excelFilePath = 'energy-report.xlsx'; // Replace with your Excel file path
const sheetName = 'Energiedaten'; // Specify the sheet name
const jsonOutputPath = 'energy-report.json'; // Replace with your desired JSON output path

try {
  const jsonResult = parseExcelToJson(excelFilePath, sheetName);
  saveJsonToFile(jsonResult, jsonOutputPath);
} catch (error) {
  console.error('Error parsing Excel file:', error);
}
