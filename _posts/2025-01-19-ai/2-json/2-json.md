Initial 
Generate a typescript script to parse an Excel file and convert it into a JSON file. Ensure the JSON format retains column names and supports nested
structures if needed. Convert dates and times to universal timestamps and parse them in Vienna timezone.
Please also show how I can run the script from command line and explain necessary prerequisites.

Revised
Write a TypeScript script to parse an Excel file and convert it into a JSON file. The script should:

Handle a specific Excel sheet by name (e.g., Energiedaten).
Start parsing from a specified row (e.g., row 5) to skip metadata.
Retain column names and allow mapping to custom keys in the JSON output (e.g., date, consumption, generation in English).
Convert date and time columns to universal timestamps (ISO 8601) in the Vienna timezone (Europe/Vienna).
Handle numeric data, including parsing decimal values with commas (e.g., 0,056000 to 0.056).
Support nested JSON structures if necessary.
Provide detailed instructions on how to:
*`Install any necessary prerequisites.
* Run the script from the command line, including an example invocation.
