import { Component, OnInit } from '@angular/core';
import { EnergyReportService } from '../services/energy-report.service';
import { NgIf } from '@angular/common';
import { EnergyTableComponent } from '../energy-table/energy-table.component';
import { EnergyChartComponent } from '../energy-chart/energy-chart.component';

@Component({
             standalone: true,
             selector: 'app-energy-demo',
             templateUrl: './energy-demo.component.html',
             styleUrls: ['./energy-demo.component.scss'],
             imports: [NgIf, EnergyTableComponent, EnergyChartComponent]
           })
export class EnergyDemoComponent implements OnInit {
  entryCount: number | null = null; // To store the count of entries

  constructor(private energyReportService: EnergyReportService) {}

  ngOnInit(): void {
    // Fetch the energy report and calculate the count
    this.energyReportService.getEnergyReport().subscribe((data) => {
      this.entryCount = data.length;
    });
  }
}
