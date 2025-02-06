import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EnergyReportService } from '../services/energy-report.service';
import { EnergyReport } from '../models/energy-report';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
             standalone: true,
             selector: 'app-energy-table',
             templateUrl: './energy-table.component.html',
             styleUrls: ['./energy-table.component.scss'],
             imports: [
               MatTableModule,
               MatSortModule,
               MatPaginatorModule,
               MatButtonModule,
               DatePipe,
               DecimalPipe,
             ]
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
