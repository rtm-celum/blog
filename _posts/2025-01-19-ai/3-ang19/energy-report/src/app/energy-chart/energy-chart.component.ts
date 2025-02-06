import { Component, OnInit } from '@angular/core';
import { EnergyReportService } from '../services/energy-report.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EnergyReport } from '../models/energy-report';

@Component({
             selector: 'app-energy-chart',
             templateUrl: './energy-chart.component.html',
             standalone: true,
             styleUrls: ['./energy-chart.component.scss'],
             imports: [
               NgxChartsModule
             ]
           })
export class EnergyChartComponent implements OnInit {
  energyData: any[] = [];
  view: [number, number] = [900, 400]; // Chart size

  // Chart options
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  showDataLabels = true;
  xAxisTickFormatting = (val: string) => val.split(' ')[1]; // Show only day number

  constructor(private energyReportService: EnergyReportService) {}

  ngOnInit(): void {
    this.energyReportService.getEnergyReport().subscribe((data: EnergyReport[]) => {
      const dailyConsumption = new Map<string, number>();

      data.forEach(d => {
        const date = new Date(d.date);
        const dayLabel = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
        // Example: "Jan 01, 2024"

        if (dailyConsumption.has(dayLabel)) {
          dailyConsumption.set(dayLabel, dailyConsumption.get(dayLabel)! + d.consumption);
        } else {
          dailyConsumption.set(dayLabel, d.consumption);
        }
      });

      // Convert grouped data to ngx-charts format & sort by date
      this.energyData = Array.from(dailyConsumption.entries())
                             .map(([name, value]) => ({ name, value }))
                             .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

      console.log("Processed daily energy data:", this.energyData);
    });
  }
}
