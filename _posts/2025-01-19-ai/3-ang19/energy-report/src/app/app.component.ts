import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnergyDemoComponent } from './energy-demo/energy-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
             imports: [RouterOutlet, EnergyDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'energy-report';
}
