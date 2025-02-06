To visualize energy consumption trends over time in **Angular 19**, we can use **ngx-charts**, a powerful charting library that is fully compatible with Angular and built on **D3.js**.

---

## **1. Install `ngx-charts` and Dependencies**
Run the following command:
```sh
npm install @swimlane/ngx-charts d3
```

---

## **2. Generate a New Component**
```sh
ng generate component EnergyChart
```

---

## **3. Modify `energy-chart.component.ts`**
We'll fetch data from the `EnergyReportService` and format it for **ngx-charts**.

### **`energy-chart.component.ts`**
```typescript
import { Component, OnInit } from '@angular/core';
import { EnergyReportService, EnergyReport } from '../services/energy-report.service';

@Component({
  selector: 'app-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrls: ['./energy-chart.component.css']
})
export class EnergyChartComponent implements OnInit {
  energyData: any[] = [];
  view: [number, number] = [800, 400]; // Chart size

  // Options for ngx-charts
  showLegend = true;
  showLabels = true;
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  autoScale = true;

  constructor(private energyReportService: EnergyReportService) {}

  ngOnInit(): void {
    this.energyReportService.getEnergyReport().subscribe((data: EnergyReport[]) => {
      this.energyData = [
        {
          name: "Consumption",
          series: data.map(d => ({
            name: d.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
            value: d.consumption
          }))
        }
      ];
    });
  }
}
```

---

## **4. Modify `energy-chart.component.html`**
Use the `ngx-charts-line-chart` component to render the data.

### **`energy-chart.component.html`**
```html
<div class="chart-container">
  <ngx-charts-line-chart
    [view]="view"
    [scheme]="'cool'"
    [results]="energyData"
    [gradient]="gradient"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    [legend]="showLegend"
    [showXAxisLabel]="showLabels"
    [showYAxisLabel]="showLabels"
    [autoScale]="autoScale">
  </ngx-charts-line-chart>
</div>
```

---

## **5. Modify `energy-chart.component.css`** (Optional Styling)
### **`energy-chart.component.css`**
```css
.chart-container {
  max-width: 900px;
  margin: 20px auto;
}
```

---

## **6. Update `app.module.ts`**
Import the **`NgxChartsModule`** and declare the component.

### **`app.module.ts`**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { EnergyReportService } from './services/energy-report.service';

@NgModule({
  declarations: [
    AppComponent,
    EnergyChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule
  ],
  providers: [EnergyReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## **7. Add the Component to `app.component.html`**
To display the energy trend chart on the main page, add:
```html
<app-energy-chart></app-energy-chart>
```

---

## **8. Run Your Angular App**
```sh
ng serve
```
Then, open **http://localhost:4200** in your browser.

---

### 🎉 **Final Features:**
✅ **Line chart showing energy consumption trends over time**  
✅ **Auto-scales based on data values**  
✅ **Responsive and interactive**  
✅ **Uses Angular-friendly ngx-charts**

Your **EnergyChartComponent** is now complete! 🚀 Let me know if you need modifications.
