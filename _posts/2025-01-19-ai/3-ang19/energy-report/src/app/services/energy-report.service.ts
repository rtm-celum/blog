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
