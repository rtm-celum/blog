For my angular 19 application, I got the following data structure and service to provide the data:

export interface EnergyReport {
  date: Date; // Converted to a JavaScript Date object
  consumption: number; // Parsed as a number
  generation: number; // Parsed as a number
}

getEnergyReport(): Observable<EnergyReport[]> 

Please create a new component with a nice name, e.g., EnergyTableComponent, and use the Angular Material table to display the data. Make sure to include sorting and pagination features in the table. You can use the data from the service to populate the table.
