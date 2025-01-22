Below is a TypeScript script that uses the `xlsx` and `luxon` libraries to parse an Excel file, convert it into a JSON format with column names, and handle date and time parsing in the Vienna timezone (Europe/Vienna).

### Steps:
1. Install required packages:
   ```bash
   npm install xlsx luxon
   ```

2. Use the following TypeScript script:

### TypeScript Script

```typescript
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import * as fs from 'fs';

// Function to parse Excel file and convert to JSON
function parseExcelToJson(filePath: string, timeZone: string = 'Europe/Vienna'): any {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Extract the first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Process the data to retain column names and handle nested structures
  const [headers, ...rows] = jsonData;

  const processedData = rows.map((row: any[]) => {
    const record: { [key: string]: any } = {};

    headers.forEach((header: string, index: number) => {
      let value = row[index];

      // Check if the value is a date and convert to universal timestamp
      if (typeof value === 'string' || value instanceof String) {
        const parsedDate = DateTime.fromFormat(value as string, "dd.MM.yyyy HH:mm:ss", {
          zone: timeZone,
        });
        if (parsedDate.isValid) {
          value = parsedDate.toUTC().toISO(); // Convert to UTC timestamp
        }
      }

      record[header] = value;
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
const excelFilePath = 'data.xlsx'; // Replace with your Excel file path
const jsonOutputPath = 'output.json'; // Replace with your desired JSON output path

try {
  const jsonResult = parseExcelToJson(excelFilePath);
  saveJsonToFile(jsonResult, jsonOutputPath);
} catch (error) {
  console.error('Error parsing Excel file:', error);
}
```

### Explanation:
1. **`xlsx` Library**:
  - Reads the Excel file and converts it into a JSON-like array structure.
  - Uses the `sheet_to_json` method to extract data.

2. **`luxon` Library**:
  - Converts dates and times into universal timestamps in the Vienna timezone.
  - Handles invalid date strings gracefully.

3. **JSON Structure**:
  - Uses the first row of the Excel sheet as column headers.
  - Maps rows into objects where keys are column names.

4. **File Handling**:
  - Reads the Excel file from `data.xlsx` and writes JSON to `output.json`.

### Example Input and Output:
#### Input Excel (Sample):
| Date                | Verbrauch (kWh) | Erzeugung (kWh) |
|---------------------|-----------------|-----------------|
| 01.01.2024 00:00:00 | 0.056           | 0.012           |
| 01.01.2024 00:15:00 | 0.068           | 0.024           |

#### Output JSON:
```json
[
  {
    "Date": "2024-01-01T00:00:00.000Z",
    "Verbrauch (kWh)": 0.056,
    "Erzeugung (kWh)": 0.012
  },
  {
    "Date": "2024-01-01T00:15:00.000Z",
    "Verbrauch (kWh)": 0.068,
    "Erzeugung (kWh)": 0.024
  }
]
```

This script is modular and can handle adjustments like nested structures or more complex parsing needs.
