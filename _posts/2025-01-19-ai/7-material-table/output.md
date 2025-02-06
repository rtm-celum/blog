Here's how you can create an `EnergyTableComponent` in your **Angular 19** application, using **Angular Material**'s table with sorting and pagination.

---

### 1. **Install Angular Material (if not already installed)**
Run the following command in your Angular project:
```sh
ng add @angular/material
```
Select a theme and include animations when prompted.

---

### 2. **Generate the Component**
Run the command:
```sh
ng generate component EnergyTable
```

---

### 3. **Modify `energy-table.component.ts`**
Update the component logic to use the `MatTableDataSource` for handling the data, sorting, and pagination.

#### `energy-table.component.ts`
```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { EnergyReport } from '../services/energy-report.service';
import { EnergyReportService } from '../services/energy-report.service';

@Component({
  selector: 'app-energy-table',
  templateUrl: './energy-table.component.html',
  styleUrls: ['./energy-table.component.css']
})
export class EnergyTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'consumption', 'generation'];
  dataSource: MatTableDataSource<EnergyReport> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private energyReportService: EnergyReportService) {}

  ngOnInit(): void {
    this.energyReportService.getEnergyReport().subscribe((data: EnergyReport[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
```

---

### 4. **Modify `energy-table.component.html`**
This template includes an **Angular Material table**, with sorting and pagination.

#### `energy-table.component.html`
```html
<div class="table-container">
  <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
    
    <!-- Date Column -->
    <ng-container matColumnDef="date">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
      <td mat-cell *matCellDef="let element">{{ element.date | date: 'yyyy-MM-dd' }}</td>
    </ng-container>

    <!-- Consumption Column -->
    <ng-container matColumnDef="consumption">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Consumption (kWh)</th>
      <td mat-cell *matCellDef="let element">{{ element.consumption | number: '1.1-2' }}</td>
    </ng-container>

    <!-- Generation Column -->
    <ng-container matColumnDef="generation">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Generation (kWh)</th>
      <td mat-cell *matCellDef="let element">{{ element.generation | number: '1.1-2' }}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>
</div>
```

---

### 5. **Modify `energy-table.component.css`** (Optional Styling)
#### `energy-table.component.css`
```css
.table-container {
  max-width: 900px;
  margin: 20px auto;
  overflow-x: auto;
}

table {
  width: 100%;
}

.mat-column-date {
  min-width: 120px;
}
```

---

### 6. **Ensure Angular Material Modules Are Imported**
Modify `app.module.ts` to include necessary **Angular Material** modules:

#### `app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EnergyTableComponent } from './energy-table/energy-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { EnergyReportService } from './services/energy-report.service';

@NgModule({
  declarations: [
    AppComponent,
    EnergyTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [EnergyReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

### 7. **Ensure the Service Exists**
Modify or create `energy-report.service.ts` to provide mock data.

#### `energy-report.service.ts`
```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface EnergyReport {
  date: Date;
  consumption: number;
  generation: number;
}

@Injectable({
  providedIn: 'root'
})
export class EnergyReportService {
  constructor() {}

  getEnergyReport(): Observable<EnergyReport[]> {
    const mockData: EnergyReport[] = [
      { date: new Date('2024-02-01'), consumption: 120.5, generation: 100.3 },
      { date: new Date('2024-02-02'), consumption: 130.2, generation: 105.5 },
      { date: new Date('2024-02-03'), consumption: 110.0, generation: 95.7 },
      { date: new Date('2024-02-04'), consumption: 125.8, generation: 102.2 },
      { date: new Date('2024-02-05'), consumption: 140.3, generation: 115.0 }
    ];
    return of(mockData);
  }
}
```

---

### 8. **Use the Component in `app.component.html`**
Modify `app.component.html` to include:

```html
<app-energy-table></app-energy-table>
```

---

### 9. **Run Your Application**
Start the Angular project:
```sh
ng serve
```
Then, open **http://localhost:4200** in your browser.

---

### 🎉 Final Features:
✅ **Displays energy report data in a Material Table**  
✅ **Includes sorting on all columns**  
✅ **Adds pagination**  
✅ **Formats dates and numbers**  
✅ **Fetches data from an Angular service**

Your `EnergyTableComponent` is now fully functional! 🚀 Let me know if you need any modifications.
