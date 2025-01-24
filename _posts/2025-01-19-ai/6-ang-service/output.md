To import a local JSON file, `energy-report.json`, into your Angular project and use it as a data source with easy-to-use types (converting dates to `Date` objects and parsing numbers), follow these steps:

---

### 1. **Place the JSON File**
Place the `energy-report.json` file in the `src/assets` folder of your Angular project:
```
src/assets/energy-report.json
```
The `assets` folder is the recommended location for static files.

---

### 2. **Define a Type for the Data**
Create a TypeScript type that converts JSON strings into usable types like `Date` and `number`.

#### File: `src/app/models/energy-report.ts`
```typescript
export interface EnergyReport {
  date: Date; // Converted to a JavaScript Date object
  consumption: number; // Parsed as a number
  generation: number; // Parsed as a number
}
```

---

### 3. **Create a Service**
Create a service to fetch the data from the JSON file and transform it into a usable format.

#### File: `src/app/services/energy-report.service.ts`
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EnergyReport } from '../models/energy-report';

@Injectable({
  providedIn: 'root',
})
export class EnergyReportService {
  private jsonUrl = 'assets/energy-report.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  /**
   * Fetch and parse the energy report data from the JSON file.
   * @returns Observable<EnergyReport[]>
   */
  getEnergyReport(): Observable<EnergyReport[]> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map((data) =>
        data.map((item) => ({
          date: new Date(item.date), // Convert ISO string to Date object
          consumption: parseFloat(item.consumption), // Parse as number
          generation: parseFloat(item.generation), // Parse as number
        }))
      )
    );
  }
}
```

---

### 4. **Add HttpClientModule**
To use the `HttpClient` service, you must import `HttpClientModule` in your `AppModule`.

#### File: `src/app/app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

### 5. **Use the Service in a Component**
Inject the service into a component and use it to fetch and display the transformed data.

#### File: `src/app/app.component.ts`
```typescript
import { Component, OnInit } from '@angular/core';
import { EnergyReportService } from './services/energy-report.service';
import { EnergyReport } from './models/energy-report';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="energyReports">
      <h1>Energy Report</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Consumption (kWh)</th>
            <th>Generation (kWh)</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let report of energyReports">
            <td>{{ report.date | date: 'short' }}</td>
            <td>{{ report.consumption }}</td>
            <td>{{ report.generation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f4f4f4;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  energyReports: EnergyReport[] | null = null;

  constructor(private energyReportService: EnergyReportService) {}

  ngOnInit(): void {
    this.energyReportService.getEnergyReport().subscribe((data) => {
      this.energyReports = data;
    });
  }
}
```

---

### 6. **Run the Application**
Start your Angular application with:
```bash
ng serve
```
Open your browser and navigate to `http://localhost:4200`. The energy consumption data will be displayed in a table with dates formatted and numbers parsed correctly.

---

### Key Points
1. **Data Transformation**:
  - Dates are converted into `Date` objects using `new Date(item.date)`.
  - Numbers are parsed using `parseFloat(item.consumption)` and `parseFloat(item.generation)`.

2. **Reusability**:
  - The service (`EnergyReportService`) ensures that the transformation logic is centralized and reusable.

3. **Clean Structure**:
  - Models (`EnergyReport`) clearly define the shape of the data, making it easy to use throughout the project.
